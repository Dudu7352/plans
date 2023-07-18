use std::{collections::HashMap, ops::Index};

use chrono::{Duration, NaiveDate};
use serde::Serialize;

use crate::{
    file_manager::FileManager, utils::events_collide, event_structures::event_type::EventType,
};

#[derive(Serialize)]
pub struct AppState {
    pub event_list: HashMap<NaiveDate, Vec<EventType>>,
    file_manager: FileManager,
}

impl AppState {
    pub fn new() -> Self {
        let mut file_manager = FileManager::new();

        let event_list: HashMap<NaiveDate, Vec<EventType>> = file_manager.load_data();

        Self {
            event_list,
            file_manager,
        }
    }

    pub fn add_event(&mut self, e: EventType) -> Result<(), ()> {
        let date_time = e.get_date_time();
        let day_key = date_time.date();

        if let EventType::EVENT(new_event) = &e {
            let new_event_end =
                new_event.date_time + Duration::minutes(new_event.duration_minutes as i64);

            if new_event.date_time.date() != new_event_end.date() {
                return Err(());
            }
        }

        match self.event_list.get_mut(&day_key) {
            Some(day_list) => {
                for event in day_list.iter() {
                    if events_collide(event, &e) {
                        return Err(());
                    }
                }
                day_list.push(e);
            }
            None => {
                self.event_list.insert(day_key, vec![e]);
            }
        }
        self.file_manager.save_data(&self.event_list);
        Ok(())
    }

    pub fn delete_event(&mut self, new_event: EventType) -> Result<(), ()> {
        match self.event_list.get_mut(&new_event.get_date_time().date()) {
            Some(day_list) => match day_list.iter().position(|r| r == &new_event) {
                Some(index) => {
                    for i in index + 1..day_list.len() {
                        day_list[i - 1] = day_list.index(i).clone();
                    }
                    day_list.pop();
                    self.file_manager.save_data(&self.event_list);
                    Ok(())
                }
                None => Err(()),
            },
            None => Err(()),
        }
    }
}
