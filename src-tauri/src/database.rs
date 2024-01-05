use chrono::NaiveDateTime;
use diesel::RunQueryDsl;
use diesel::{
    prelude::SqliteConnection, Connection, ExpressionMethods, QueryDsl, SelectableHelper,
};

use crate::consts::MIGRATIONS;
use crate::event_structures::calendar_deadline::CalendarDeadline;
use crate::event_structures::calendar_entry::CalendarEntry;
use crate::{
    event_structures::{calendar_event::CalendarEvent, entry::Entry},
    schema,
    utils::get_database_path,
};
use diesel_migrations::MigrationHarness;
use uuid::Uuid;

pub struct PlansDbConn {
    conn: SqliteConnection,
}

impl PlansDbConn {
    pub fn new() -> Self {
        // TODO: Handle errors
        let db_path = get_database_path();
        println!("Database path: {:?}", db_path);
        let mut conn = SqliteConnection::establish(db_path.to_str().unwrap())
            .expect("Could not connect to the database");
        let _ = conn.run_pending_migrations(MIGRATIONS);
        Self { conn }
    }

    pub fn get_entries(&mut self, start: NaiveDateTime, end: NaiveDateTime) -> Vec<Entry> {
        use schema::calendar_deadline::dsl::*;
        use schema::calendar_event::dsl::*;
        let mut entries: Vec<Entry> = Vec::new();
        entries.extend(
            calendar_event
                .filter(schema::calendar_event::date_start.ge(start))
                .filter(schema::calendar_event::date_end.le(end))
                .select(CalendarEvent::as_select())
                .load::<CalendarEvent>(&mut self.conn)
                .map_or(vec![], |v| v.into_iter().map(|e| Entry::Event(e)).collect()),
        );
        entries.extend(
            calendar_deadline
                .filter(schema::calendar_deadline::date_until.ge(start))
                .filter(schema::calendar_deadline::date_until.le(end))
                .select(CalendarDeadline::as_select())
                .load::<CalendarDeadline>(&mut self.conn)
                .map_or(vec![], |v| {
                    v.into_iter().map(|e| Entry::Deadline(e)).collect()
                }),
        );
        println!("Entries: {:?}", entries);
        entries
    }

    pub fn insert_entry(&mut self, mut calendar_entry: Entry) -> Result<(), diesel::result::Error> {
        let id = if let Some(c_id) = calendar_entry.get_id().clone() {
            c_id
        } else {
            let id = Uuid::new_v4().to_string();
            calendar_entry.set_id(id.clone());
            id
        };
        println!("Inserting entry with id: {}", id);
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
        let id = if let Some(v) = calendar_entry.get_id() {
            v.clone()
        } else {
            return Ok(());
        };
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
