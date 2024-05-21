use chrono::NaiveDateTime;
use serde::{Serialize, Deserialize};

use super::activity::CalendarEvent;
use super::calendar_deadline::CalendarDeadline;

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
pub enum Entry {
    Event(CalendarEvent),
    Deadline(CalendarDeadline)
}

impl Entry {
    pub fn get_date_time(&self) -> &NaiveDateTime {
        match self {
            Entry::Event(event) => &event.from_date,
            Entry::Deadline(deadline) => &deadline.until_date,
        }
    }

    pub fn get_id(&self) -> &Option<String> {
        match self {
            Entry::Event(event) => &event.calendar_entry_id,
            Entry::Deadline(deadline) => &deadline.calendar_entry_id,
        }
    }

    pub fn set_id(&mut self, id: String) {
        match self {
            Entry::Event(event) => event.calendar_entry_id = Some(id),
            Entry::Deadline(deadline) => deadline.calendar_entry_id = Some(id),
        }
    }
}