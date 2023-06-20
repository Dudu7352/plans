use std::collections::HashMap;

use chrono::Duration;
use serde::Serialize;

use crate::event_structures::event_details::EventDetails;

#[derive(Serialize)]
pub struct AppState {
    pub event_list: HashMap<i64, Vec<EventDetails>>,
}

impl AppState {
    pub fn new() -> Self {
        let event_list: HashMap<i64, Vec<EventDetails>> = HashMap::new();
        Self { event_list }
    }

    pub fn add_event(&mut self, new_event: EventDetails) -> Result<(), ()> {
        let day_key = new_event.date_time.timestamp() / (3600 * 24);
        let new_event_end =
            new_event.date_time + Duration::seconds(new_event.duration_seconds as i64);

        if new_event.date_time.date() != new_event_end.date() {
            return Err(());
        }

        if !self.event_list.contains_key(&day_key) {
            self.event_list.insert(day_key, vec![new_event]);
            return Ok(());
        }

        let day_list = self.event_list.get_mut(&day_key).unwrap();

        for event in day_list.iter() {
            let event_end = event.date_time + Duration::seconds(event.duration_seconds as i64);
            if (event.date_time < new_event.date_time && new_event.date_time < event_end)
                || (event.date_time < new_event_end && new_event_end < event_end)
            {
                return Err(());
            }
        }

        day_list.push(new_event);
        return Ok(());
    }
}
