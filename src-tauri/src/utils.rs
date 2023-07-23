use chrono::Duration;

use crate::event_structures::event_type::EventType;

pub fn events_collide(e1: &EventType, e2: &EventType) -> bool {
    let e1_start = e1.get_date_time();
    let e2_start = e2.get_date_time();
    let e1_end = match e1 {
        EventType::EVENT(e) => e.date_time + Duration::minutes(e.duration_minutes as i64),
        EventType::DEADLINE(_) => e1_start.clone(),
    };
    let e2_end = match e2 {
        EventType::EVENT(e) => e.date_time + Duration::minutes(e.duration_minutes as i64),
        EventType::DEADLINE(_) => e2_start.clone(),
    };
    e1_start < e2_start && e2_start < &e1_end || e2_start < e1_start && e1_start < &e2_end
}
