use std::{path::PathBuf, env};

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

pub fn get_data_path() -> PathBuf {
    let mut data_path = home::home_dir().unwrap();
    match env::consts::OS {
      "windows" => {
        data_path.push("AppData");
        data_path.push("Local");
        data_path.push("plans-app");
      }
      "linux" => {
        data_path.push(".local");
        data_path.push("share");
        data_path.push("plans-app");
        data_path.push("plans");
      }
      _ => {
        data_path.push(".plans");
      }
    }
    data_path
}