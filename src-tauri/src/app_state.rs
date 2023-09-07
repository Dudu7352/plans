use std::{collections::HashMap, fs::create_dir_all, ops::Index, path::PathBuf};

use chrono::{Duration, NaiveDate, DateTime, Offset, FixedOffset, TimeZone, Utc};
use serde::Serialize;

use crate::{
    color_structures::color::Color,
    event_structures::{event_type::EventType, event_details::EventDetails, deadline_details::DeadlineDetails},
    file_manager::FileManager,
    utils::{events_collide, get_data_path}, 
    prisma::{PrismaClient, new_client, event::{WhereParam, UniqueWhereParam}},
};

pub struct AppState {
    pub event_list: HashMap<NaiveDate, Vec<EventType>>,
    pub color_list: Vec<Color>,
    client: PrismaClient,
    events_file_path: PathBuf,
    colors_file_path: PathBuf,
}

impl Serialize for AppState {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where S: serde::Serializer {
        serializer.collect_str("")
    }
}

impl AppState {
    pub async fn new() -> Self {
        let data_path = get_data_path();
        let _ = create_dir_all(&data_path);

        let mut events_file_path = data_path.clone();
        let mut colors_file_path = data_path.clone();

        events_file_path.push("plans-app");
        events_file_path.set_file_name("events");
        events_file_path.set_extension("json");

        colors_file_path.push("plans-app");
        colors_file_path.set_file_name("colors");
        colors_file_path.set_extension("json");

        let event_list =
            FileManager::load_data::<HashMap<NaiveDate, Vec<EventType>>>(&events_file_path)
                .unwrap_or(HashMap::new());
        let color_list = match FileManager::load_data::<Vec<Color>>(&colors_file_path) {
            Ok(file_data) => file_data,
            Err(_) => {
                let new_data: Vec<Color> = vec![
                    Color::new(32, 191, 85),
                    Color::new(11, 79, 108),
                    Color::new(254, 93, 38),
                ];
                FileManager::save_data(&colors_file_path, &new_data);
                new_data
            }
        };
        let client = PrismaClient::_builder()
            .build()
            .await
            .unwrap(); // TODO: Handle errors

        Self {
            event_list,
            color_list,
            client,
            events_file_path,
            colors_file_path,
        }
    }

    pub async fn get_all_events(&self, start: NaiveDate, end: NaiveDate) -> Result<Vec<EventType>, ()> {
        match self.client.event().find_many(vec![]).exec().await {
            Ok(data_vec) => {
                let mut result: Vec<EventType> = Vec::new();
                for data in data_vec {
                    if let Ok(event_data) = data.event_details() {
                        let event_details = event_data.unwrap();
                        result.push(
                            EventType::EVENT(
                                EventDetails::new(
                                    data.id.clone(),
                                    event_details.start.naive_local(),
                                    event_details.name.clone(),
                                    event_details.duration_minutes as u32,
                                    Color::from_hex(event_details.color.clone()).unwrap()
                                )
                            )
                        );
                    } else if let Ok(deadline_data) = data.deadline_details() {
                        let deadline_details = deadline_data.unwrap();
                        result.push(
                            EventType::DEADLINE(
                                DeadlineDetails::new(
                                    data.id.clone(),
                                    deadline_details.start.naive_local(),
                                    deadline_details.name.clone(),
                                    Color::from_hex(deadline_details.color.clone()).unwrap()
                                )
                            )
                        );
                    }
                }
                Ok(result)
            },
            Err(err) => {
                println!("Error while fetching events");
                Err(())
            },
        }
    }

    pub async fn add_event(&mut self, e: EventType) -> Result<(), ()> {
        let date_time = e.get_date_time();
        let day_key = date_time.date();

        if let EventType::EVENT(new_event) = &e {
            let new_event_end =
                new_event.date_time + Duration::minutes(new_event.duration_minutes as i64);

            if new_event.date_time.date() != new_event_end.date() {
                return Err(());
            }
        }

        return match self.client.event().create(
            vec![]
        ).exec().await {
            Ok(data) => {
                match &e {
                    EventType::EVENT(ev) => {
                        self.client.event_details().create(
                            ev.name.clone(), 
                            ev.color.to_hex(), 
                            ev.date_time.and_local_timezone(FixedOffset::east_opt(0).unwrap()).unwrap(),
                            ev.duration_minutes as i32,
                            crate::prisma::event::UniqueWhereParam::IdEquals(data.id),
                            vec![]
                        );
                        Ok(())
                    },
                    EventType::DEADLINE(de) => {
                        Err(())
                    },
                }
            },
            Err(err) => {
                println!("Could not add the EventType\nError:\n{:?}", err);
                Err(())
            },
        }
    }

    pub async fn delete_event(&mut self, id: String) -> Result<(), ()> {
        let param = UniqueWhereParam::IdEquals(id);
        match self.client.event().delete().exec().await {
            Ok(data) => {
                data.id
            },
            Err(err) => {
                println!("Error while deleting event");
                Err(())
            },
        }
    }
}
