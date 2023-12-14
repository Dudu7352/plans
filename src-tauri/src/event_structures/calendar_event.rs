use chrono::{naive::serde::ts_seconds, NaiveDateTime};
use diesel::{prelude::Insertable, Selectable};
use serde::{Deserialize, Serialize};

use crate::color_structures::color::Color;
use crate::schema::calendar_event;

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Selectable, Insertable)]
#[diesel(table_name = calendar_event)]
#[serde(rename_all = "camelCase")]
pub struct CalendarEvent {
    pub id: String,
    pub event_name: String,
    #[serde(with = "ts_seconds")]
    pub date_start: NaiveDateTime,
    #[serde(with = "ts_seconds")]
    pub date_end: NaiveDateTime,
    pub color: Color,
}

impl CalendarEvent {
    pub fn new(
        id: String,
        event_name: String,
        date_start: NaiveDateTime,
        date_end: NaiveDateTime,
        color: Color,
    ) -> Self {
        Self {
            id,
            event_name,
            date_start,
            date_end,
            color,
        }
    }
}
