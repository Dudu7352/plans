use chrono::{NaiveDate, NaiveDateTime};
use diesel::{prelude::SqliteConnection, Connection};

use crate::{utils::get_database_path, event_structures::calendar_entry::CalendarEntry};

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

    pub fn get_entries(&self, start: NaiveDateTime, end: NaiveDateTime) -> Vec<CalendarEntry> {
        todo!()
    }

    pub fn insert_entry(&self, calendar_entry: CalendarEntry) {
        todo!()
    }

    pub fn delete_entry(&self, id: &str) {
        todo!()
    }

    pub fn update_entry(&self, calendar_entry: CalendarEntry) {
        todo!()
    }
}