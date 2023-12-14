use chrono::NaiveDateTime;
use serde::{Serialize, Deserialize};

use super::calendar_event::CalendarEvent;
use super::calendar_deadline::CalendarDeadline;

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
pub enum CalendarEntry {
    Event(CalendarEvent),
    Deadline(CalendarDeadline)
}

impl CalendarEntry {
    pub fn get_date_time(&self) -> &NaiveDateTime {
        match self {
            CalendarEntry::Event(event) => todo!(),
            CalendarEntry::Deadline(deadline) => &deadline.date_until,
        }
    }

    pub fn get_id(&self) -> &String {
        match self {
            CalendarEntry::Event(event) => &event.id,
            CalendarEntry::Deadline(deadline) => &deadline.id,
        }
    }
}