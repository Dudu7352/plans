use chrono::{naive::serde::ts_seconds, NaiveDateTime};
use serde::{Serialize, Deserialize};

use crate::color_structures::color::Color;
use crate::schema::calendar_deadline;

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Selectable, Insertable)]
#[diesel(table_name = calendar_deadline)]
#[serde(rename_all = "camelCase")]
pub struct CalendarDeadline {
    pub id: String,
    pub deadline_name: String,
    #[serde(with = "ts_seconds")]
    pub date_until: NaiveDateTime,
    pub color: Color
}

impl CalendarDeadline {
    pub fn new(id: String, deadline_name: String, date_until: NaiveDateTime, color: Color) -> Self { 
        Self { id, date_until, deadline_name, color } 
    }
}
