use chrono::{NaiveDate, NaiveTime};
use diesel::{ExpressionMethods, RunQueryDsl};
use diesel::{
    prelude::SqliteConnection, Connection, QueryDsl, SelectableHelper,
};

use crate::consts::MIGRATIONS;
use crate::event_structures::calendar_deadline::CalendarDeadline;
use crate::event_structures::calendar_entry::CalendarEntry;
use crate::{
    event_structures::{activity::CalendarEvent, entry::Entry},
    schema,
    utils::get_database_path,
};
use diesel_migrations::MigrationHarness;
use uuid::Uuid;

pub struct PlansDbConn {
    conn: SqliteConnection,
}

impl PlansDbConn {
    pub fn new() -> Option<Self> {
        let db_path = get_database_path();
        let conn = SqliteConnection::establish(db_path.to_str().unwrap());
        match conn {
            Ok(mut conn) => {
                let _ = conn.run_pending_migrations(MIGRATIONS);
                Some(Self { conn })
            },
            Err(_) => None
        }
    }

    pub fn get_entries(&mut self, start: NaiveDate, end: NaiveDate) -> Vec<Entry> {
        use schema::deadline::dsl::*;
        use schema::activity::dsl::*;
        let mut entries: Vec<Entry> = Vec::new();
        let start_datetime = start.and_time(NaiveTime::MIN);
        let end_datetime = end.succ_opt().unwrap().and_time(NaiveTime::MIN);
        entries.extend(
            activity
                .filter(schema::activity::from_date.ge(start_datetime))
                .filter(schema::activity::until_date.lt(end_datetime))
                .select(CalendarEvent::as_select())
                .load::<CalendarEvent>(&mut self.conn)
                .map_or(vec![], |v| v.into_iter().map(Entry::Event).collect()),
        );
        entries.extend(
            deadline
                .filter(schema::deadline::until_date.ge(start_datetime))
                .filter(schema::deadline::until_date.lt(end_datetime))
                .select(CalendarDeadline::as_select())
                .load::<CalendarDeadline>(&mut self.conn)
                .map_or(vec![], |v| {
                    v.into_iter().map(Entry::Deadline).collect()
                }),
        );
        entries
    }

    pub fn insert_entry(&mut self, mut calendar_entry: Entry) -> Result<(), diesel::result::Error> {
        let id = if let Some(c_id) = calendar_entry.get_id().clone() {
            c_id.clone()
        } else {
            let id = Uuid::new_v4().to_string();
            calendar_entry.set_id(id.clone());
            id
        };
        diesel::insert_into(schema::calendar_entry::table)
            .values(CalendarEntry::new(id.clone()))
            .execute(&mut self.conn)?;
        match calendar_entry {
            Entry::Event(event) => {
                diesel::insert_into(schema::activity::table)
                    .values(event)
                    .execute(&mut self.conn)?;
            }
            Entry::Deadline(deadline) => {
                diesel::insert_into(schema::deadline::table)
                    .values(deadline)
                    .execute(&mut self.conn)?;
            }
        }
        Ok(())
    }

    pub fn delete_entry(&mut self, id: &str) -> Result<(), diesel::result::Error> {
        let _ = diesel::delete(schema::activity::dsl::activity.find(id))
            .execute(&mut self.conn);
        let _ = diesel::delete(schema::deadline::dsl::deadline.find(id))
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
                diesel::update(schema::activity::dsl::activity.find(id))
                    .set(event)
                    .execute(&mut self.conn)?;
            }
            Entry::Deadline(deadline) => {
                diesel::update(schema::deadline::dsl::deadline.find(id))
                    .set(deadline)
                    .execute(&mut self.conn)?;
            }
        }
        Ok(())
    }
}
