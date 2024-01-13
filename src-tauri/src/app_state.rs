use chrono::NaiveDateTime;
use serde::Serialize;

use crate::{
    event_structures::entry::Entry,
    database::PlansDbConn, 
};

pub struct AppState {
    db: Option<PlansDbConn>,
}

impl Serialize for AppState {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where S: serde::Serializer {
        serializer.collect_str("")
    }
}

impl AppState {
    pub async fn new() -> Self {
        Self {
            db: PlansDbConn::new(),
        }
    }

    pub fn get_all_events(&mut self, start: NaiveDateTime, end: NaiveDateTime) -> Vec<Entry> {
        match &mut self.db {
            Some(db) => db.get_entries(start, end),
            None => Vec::new(),
        }
    }

    pub fn add_event(&mut self, e: Entry) -> Result<(), String> {
        if let Entry::Event(new_event) = &e {
            if new_event.date_start > new_event.date_end {
                return Err(String::from("Event cannot have start date after end date"));
            }
        }

        match &mut self.db {
            Some(ref mut db) => db.insert_entry(e).map_err(|_| String::from("Error inserting entry")),
            None => Err(String::from("Error inserting entry")),
        }
    }

    pub fn update_event(&mut self, e: Entry) -> Result<(), String> {
        println!("AppState: Updating event: {:?}", e);

        if let Entry::Event(new_event) = &e {
            if new_event.date_start > new_event.date_end {
                return Err(String::from("Event cannot have start date after end date"));
            }
        }

        match &mut self.db {
            Some(db) => db.update_entry(e).map_err(|_| String::from("Error inserting entry")),
            None => Err(String::from("Error updating entry")),
        }
    }

    pub fn delete_event(&mut self, id: String) -> Result<(), String> {
        match &mut self.db {
            Some(db) => db.delete_entry(&id).map_err(|_| String::from("Error inserting entry")),
            None => Err(String::from("Error deleting entry")),
        }
    }
}
