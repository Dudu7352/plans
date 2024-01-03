use chrono::NaiveDateTime;
use diesel::RunQueryDsl;
use diesel::{prelude::SqliteConnection, Connection, QueryDsl, ExpressionMethods, SelectableHelper};

use crate::event_structures::calendar_deadline::CalendarDeadline;
use crate::event_structures::calendar_entry::{self, CalendarEntry};
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

    pub fn insert_entry(&mut self, calendar_entry: Entry) -> Result<(), diesel::result::Error> {
        let id = calendar_entry.get_id();
        diesel::insert_into(schema::calendar_entry::table)
            .values(CalendarEntry::new(id.clone()))
            .execute(&mut self.conn)
            .expect("Error inserting new entry");
        match calendar_entry {
            Entry::Event(event) => {
                diesel::insert_into(schema::calendar_event::table)
                    .values(event)
                    .execute(&mut self.conn)?;
            }
            Entry::Deadline(deadline) => {
                diesel::insert_into(schema::calendar_deadline::table)
                    .values(deadline)
                    .execute(&mut self.conn)?;
            }
        }
        Ok(())
    }

    pub fn delete_entry(&mut self, id: &str) -> Result<(), diesel::result::Error> {
        let _ = diesel::delete(schema::calendar_event::dsl::calendar_event.find(id))
            .execute(&mut self.conn);
        let _ = diesel::delete(schema::calendar_deadline::dsl::calendar_deadline.find(id))
            .execute(&mut self.conn);
        diesel::delete(schema::calendar_entry::dsl::calendar_entry.find(id))
            .execute(&mut self.conn)?;
        Ok(())
    }

    pub fn update_entry(&mut self, calendar_entry: Entry) -> Result<(), diesel::result::Error> {
        let id = calendar_entry.get_id().clone();
        match calendar_entry {
            Entry::Event(event) => {
                diesel::update(schema::calendar_event::dsl::calendar_event.find(id))
                    .set(event)
                    .execute(&mut self.conn)?;
            }
            Entry::Deadline(deadline) => {
                diesel::update(schema::calendar_deadline::dsl::calendar_deadline.find(id))
                    .set(deadline)
                    .execute(&mut self.conn)?;
            }
        }
        Ok(())
    }
}