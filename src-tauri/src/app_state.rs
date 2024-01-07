use chrono::NaiveDateTime;
use serde::Serialize;

use crate::{
    event_structures::entry::Entry,
    database::PlansDbConn, 
};

pub struct AppState {
    db: PlansDbConn,
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
        self.db.get_entries(start, end)
    }

    pub fn add_event(&mut self, e: Entry) -> Result<(), ()> {
        println!("AppState: Adding event: {:?}", e);

        if let Entry::Event(new_event) = &e {
            if new_event.date_start > new_event.date_end {
                println!("Event cannot have start date after end date");
                return Err(());
            }
        }


        self.db.insert_entry(e).map_err(|e| {
            println!("Error inserting entry: {:?}", e);
        })
    }

    pub fn update_event(&mut self, e: Entry) -> Result<(), ()> {
        println!("AppState: Updating event: {:?}", e);

        if let Entry::Event(new_event) = &e {
            if new_event.date_start > new_event.date_end {
                println!("Event cannot have start date after end date");
                return Err(());
            }
        }

        self.db.update_entry(e).map_err(|e| {
            println!("Error updating entry: {:?}", e);
        })
    }

    pub fn delete_event(&mut self, id: String) -> Result<(), ()> {
        self.db.delete_entry(id.as_str()).map_err(|_| ())
    }
}
