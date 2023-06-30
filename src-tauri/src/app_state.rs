use std::{collections::HashMap, ops::Index};

use chrono::{Duration, NaiveDate};
use serde::Serialize;

use crate::{event_structures::event_details::EventDetails, file_manager::FileManager};

#[derive(Serialize)]
pub struct AppState {
    pub event_list: HashMap<NaiveDate, Vec<EventDetails>>,
    file_manager: FileManager,
}

impl AppState {
    pub fn new() -> Self {
        let mut file_manager = FileManager::new();

        let event_list: HashMap<NaiveDate, Vec<EventDetails>> = file_manager.load_data();

        Self {
            event_list,
            file_manager,
        }
    }

    pub fn add_event(&mut self, new_event: EventDetails) -> Result<(), ()> {
        let day_key = new_event.date_time.date();
        let new_event_end =
            new_event.date_time + Duration::seconds(new_event.duration_seconds as i64);

        if new_event.date_time.date() != new_event_end.date() {
            return Err(());
        }

        match self.event_list.get_mut(&day_key) {
            Some(day_list) => {
                for event in day_list.iter() {
                    let event_end =
                        event.date_time + Duration::seconds(event.duration_seconds as i64);

                    if (event.date_time < new_event.date_time && new_event.date_time < event_end)
                        || (event.date_time < new_event_end && new_event_end < event_end)
                    {
                        return Err(());
                    }
                }
                day_list.push(new_event);
                self.file_manager.save_data(&self.event_list);
                Ok(())
            },
            None => {
                self.event_list.insert(day_key, vec![new_event]);
                self.file_manager.save_data(&self.event_list);
                Ok(())
            },
        }
    }

    pub fn delete_event(&mut self, event_details: EventDetails) -> Result<(), ()> {
        match self.event_list.get_mut(&event_details.date_time.date()) {
            Some(day_list) => match day_list.iter().position(|r| r == &event_details) {
                Some(index) => {
                    for i in index + 1..day_list.len() {
                        day_list[i - 1] = day_list.index(i).clone();
                    }
                    day_list.pop();
                    Ok(())
                }
                None => Err(()),
            },
            None => Err(()),
        }
    }
}
