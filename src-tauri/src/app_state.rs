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

    pub async fn add_event(&mut self, e: Entry) -> Result<(), ()> {
        let date_time = e.get_date_time();
        let _day_key = date_time.date();

        if let Entry::Event(new_event) = &e {
            if new_event.date_start.date() != new_event.date_start.date() {
                return Err(());
            }
        }

        self.db.insert_entry(e).map_err(|_| ())
    }

    pub async fn delete_event(&mut self, id: String) -> Result<(), ()> {
        self.db.delete_entry(id.as_str()).map_err(|_| ())
    }
}
