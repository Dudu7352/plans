use crate::event_structures::calendar_entry::CalendarEntry;
use chrono::{naive::serde::ts_seconds, NaiveDateTime};
use diesel::prelude::*;
use serde::{Deserialize, Serialize};

use crate::schema::deadline;

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
    QueryableByName,
    Identifiable,
    Associations,
)]
#[diesel(belongs_to(CalendarEntry))]
#[diesel(primary_key(calendar_entry_id))]
#[diesel(table_name = deadline)]
#[serde(rename_all = "camelCase")]
pub struct CalendarDeadline {
    #[diesel(deserialize_as = String)]
    pub calendar_entry_id: Option<String>,
    pub name: String,
    #[serde(with = "ts_seconds")]
    pub until_date: NaiveDateTime,
    pub color: Option<String>,
}

impl CalendarDeadline {
    pub fn new(
        calendar_entry_id: Option<String>,
        name: String,
        until_date: NaiveDateTime,
        color: Option<String>,
    ) -> Self {
        Self {
            calendar_entry_id,
            until_date,
            name,
            color,
        }
    }
}
