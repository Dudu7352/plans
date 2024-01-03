use chrono::NaiveDateTime;
use serde::{Serialize, Deserialize};

use super::calendar_event::CalendarEvent;
use super::calendar_deadline::CalendarDeadline;

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
pub enum Entry {
    Event(CalendarEvent),
    Deadline(CalendarDeadline)
}

impl Entry {
    pub fn get_date_time(&self) -> &NaiveDateTime {
        match self {
            Entry::Event(event) => todo!(),
            Entry::Deadline(deadline) => &deadline.date_until,
        }
    }

    pub fn get_id(&self) -> &String {
        match self {
            Entry::Event(event) => &event.calendar_entry_id,
            Entry::Deadline(deadline) => &deadline.calendar_entry_id,
        }
    }
}