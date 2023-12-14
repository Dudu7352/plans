use chrono::NaiveDateTime;
use serde::{Serialize, Deserialize};

use super::calendar_event::CalendarEvent;
use super::calendar_deadline::CalendarDeadline;

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
pub enum CalendarEntry {
    EVENT(CalendarEvent),
    DEADLINE(CalendarDeadline)
}

impl CalendarEntry {
    pub fn get_date_time(&self) -> &NaiveDateTime {
        match self {
            CalendarEntry::EVENT(event) => todo!(),
            CalendarEntry::DEADLINE(deadline) => &deadline.date_time,
        }
    }

    pub fn get_id(&self) -> &String {
        match self {
            CalendarEntry::EVENT(event) => &event.id,
            CalendarEntry::DEADLINE(deadline) => &deadline.id,
        }
    }
}