use chrono::NaiveDateTime;
use diesel::RunQueryDsl;
use diesel::{prelude::SqliteConnection, Connection, QueryDsl, ExpressionMethods, SelectableHelper};

use crate::event_structures::calendar_deadline::CalendarDeadline;
use crate::{utils::get_database_path, event_structures::{entry::Entry, calendar_event::CalendarEvent}, schema};

struct PlansDbConn {
    conn: SqliteConnection
}

impl PlansDbConn {
    pub fn new() -> Self {
        Self {
            conn: SqliteConnection::establish(get_database_path().to_str().unwrap()).expect("Could not connect to the database")
        }
    }

    pub fn get_entries(&mut self, start: NaiveDateTime, end: NaiveDateTime) -> Vec<Entry> {
        use schema::calendar_event::dsl::*;
        use schema::calendar_deadline::dsl::*;
        let mut entries: Vec<Entry> = Vec::new();
        entries.extend(calendar_event
            .filter(schema::calendar_event::date_start.ge(start))
            .filter(schema::calendar_event::date_end.le(end))
            .select(CalendarEvent::as_select())
            .load::<CalendarEvent>(&mut self.conn).map_or(vec![], |v| v.into_iter().map(|e| Entry::Event(e)).collect()));
        entries.extend(calendar_deadline
            .filter(schema::calendar_deadline::date_until.ge(start))
            .filter(schema::calendar_deadline::date_until.le(end))
            .select(CalendarDeadline::as_select())
            .load::<CalendarDeadline>(&mut self.conn).map_or(vec![], |v| v.into_iter().map(|e| Entry::Deadline(e)).collect()));
        entries
    }

    pub fn insert_entry(&self, calendar_entry: Entry) {
        todo!()
    }

    pub fn delete_entry(&self, id: &str) {
        todo!()
    }

    pub fn update_entry(&self, calendar_entry: Entry) {
        todo!()
    }
}