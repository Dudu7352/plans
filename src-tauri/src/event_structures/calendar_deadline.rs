use crate::event_structures::calendar_entry::CalendarEntry;
use chrono::{naive::serde::ts_seconds, NaiveDateTime};
use diesel::prelude::*;
use serde::{Deserialize, Serialize};

use crate::schema::calendar_deadline;

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
#[diesel(table_name = calendar_deadline)]
#[serde(rename_all = "camelCase")]
pub struct CalendarDeadline {
    #[diesel(deserialize_as = String)]
    pub calendar_entry_id: Option<String>,
    pub deadline_name: String,
    #[serde(with = "ts_seconds")]
    pub date_until: NaiveDateTime,
    pub color: String,
}

impl CalendarDeadline {
    pub fn new(
        calendar_entry_id: Option<String>,
        deadline_name: String,
        date_until: NaiveDateTime,
        color: String,
    ) -> Self {
        Self {
            calendar_entry_id,
            date_until,
            deadline_name,
            color,
        }
    }
}
