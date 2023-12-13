use chrono::{NaiveDate, NaiveDateTime};
use diesel::{prelude::SqliteConnection, Connection};

use crate::{utils::get_database_path, event_structures::event_type::EventType};

struct PlansDbConn {
    conn: SqliteConnection
}

impl PlansDbConn {
    pub fn new() -> Self {
        let url = get_database_path();
        Self {
            conn: SqliteConnection::establish(get_database_path().to_str().unwrap()).expect("Could not connect to the database")
        }
    }

    pub fn get_entries(&self, start: NaiveDateTime, end: NaiveDateTime) -> Vec<EventType> {
        todo!()
    }

    pub fn insert_entry(&self, calendar_entry: EventType) {
        todo!()
    }

    pub fn delete_entry(&self, id: &str) {
        todo!()
    }

    pub fn update_entry(&self, calendar_entry: EventType) {
        todo!()
    }
}