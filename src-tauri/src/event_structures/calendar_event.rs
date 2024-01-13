use crate::event_structures::calendar_entry::CalendarEntry;
use chrono::{naive::serde::ts_seconds, NaiveDateTime};
use diesel::{prelude::Insertable, Selectable};
use serde::{Deserialize, Serialize};
use diesel::prelude::*;

use crate::schema::calendar_event;

#[derive(
    Serialize,
    Deserialize,
    Clone,
    Debug,
    PartialEq,
    Selectable,
    Insertable,
    AsChangeset,
    Queryable,
    Identifiable,
    Associations,
)]
#[diesel(belongs_to(CalendarEntry))]
#[diesel(primary_key(calendar_entry_id))]
#[diesel(table_name = calendar_event)]
#[serde(rename_all = "camelCase")]
pub struct CalendarEvent {
    #[diesel(deserialize_as = String)]
    pub calendar_entry_id: Option<String>,
    pub event_name: String,
    #[serde(with = "ts_seconds")]
    pub date_start: NaiveDateTime,
    #[serde(with = "ts_seconds")]
    pub date_end: NaiveDateTime,
    pub color: String,
}

impl CalendarEvent {
    pub fn new(
        calendar_entry: Option<String>,
        event_name: String,
        date_start: NaiveDateTime,
        date_end: NaiveDateTime,
        color: String,
    ) -> Self {
        Self {
            calendar_entry_id: calendar_entry,
            event_name,
            date_start,
            date_end,
            color,
        }
    }
}