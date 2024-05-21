use crate::event_structures::calendar_entry::CalendarEntry;
use chrono::{naive::serde::ts_seconds, NaiveDateTime};
use diesel::{prelude::Insertable, Selectable};
use serde::{Deserialize, Serialize};
use diesel::prelude::*;

use crate::schema::activity;

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
#[diesel(table_name = activity)]
#[serde(rename_all = "camelCase")]
pub struct CalendarEvent {
    #[diesel(deserialize_as = String)]
    pub calendar_entry_id: Option<String>,
    pub name: String,
    #[serde(with = "ts_seconds")]
    pub from_date: NaiveDateTime,
    #[serde(with = "ts_seconds")]
    pub until_date: NaiveDateTime,
    pub color: Option<String>,
}

impl CalendarEvent {
    pub fn new(
        calendar_entry: Option<String>,
        name: String,
        from_date: NaiveDateTime,
        until_date: NaiveDateTime,
        color: Option<String>,
    ) -> Self {
        Self {
            calendar_entry_id: calendar_entry,
            name,
            from_date,
            until_date,
            color,
        }
    }
}