use chrono::NaiveDateTime;
use serde::{Serialize, Deserialize};

use super::event_details::EventDetails;
use super::deadline_details::DeadlineDetails;

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
pub enum EventType {
    EVENT(EventDetails),
    DEADLINE(DeadlineDetails)
}

impl EventType {
    pub fn get_date_time(&self) -> &NaiveDateTime {
        match self {
            EventType::EVENT(event) => &event.date_time,
            EventType::DEADLINE(deadline) => &deadline.date_time,
        }
    }
}