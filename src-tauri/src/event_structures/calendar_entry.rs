use chrono::NaiveDateTime;
use serde::{Serialize, Deserialize};

use super::event_details::EventDetails;
use super::deadline_details::DeadlineDetails;

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
pub enum CalendarEntry {
    EVENT(EventDetails),
    DEADLINE(DeadlineDetails)
}

impl CalendarEntry {
    pub fn get_date_time(&self) -> &NaiveDateTime {
        match self {
            CalendarEntry::EVENT(event) => &event.date_time,
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