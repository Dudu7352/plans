use chrono::{naive::serde::ts_seconds, NaiveDateTime};
use serde::{Serialize, Deserialize};

use crate::color_structures::color::Color;

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
#[serde(rename_all = "camelCase")]
pub struct CalendarEvent {
    pub id: String,
    #[serde(with = "ts_seconds")]
    pub date_time: NaiveDateTime,
    pub name: String,
    pub duration_minutes: u32,
    pub color: Color
}

impl CalendarEvent {
    pub fn new(id: String, date_time: NaiveDateTime, name: String, duration_minutes: u32, color: Color) -> Self { 
        Self { id, date_time, name, duration_minutes, color }
    }
}
