use std::{ collections::HashMap, ops::Index, env, fs::create_dir_all, path::PathBuf };

use chrono::{ Duration, NaiveDate };
use serde::Serialize;

use crate::{
  utils::events_collide,
  event_structures::event_type::EventType,
  file_manager::FileManager,
  color_structures::color::Color,
};

#[derive(Serialize)]
pub struct AppState {
  pub event_list: HashMap<NaiveDate, Vec<EventType>>,
  pub color_list: Vec<Color>,
  events_file_path: PathBuf,
  colors_file_path: PathBuf,
}

impl AppState {
  pub fn new() -> Self {
    let mut data_path = home::home_dir().unwrap();
    match env::consts::OS {
      "windows" => {
        data_path.push("AppData");
        data_path.push("Local");
        data_path.push("plans-app");
        data_path.push("plans");
      }
      "linux" => {
        data_path.push(".local");
        data_path.push("share");
        data_path.push("plans-app");
      }
      _ => {
        data_path.push(".plans");
      }
    }
    let _ = create_dir_all(&data_path);

    data_path.set_extension("json");

    let mut events_file_path = data_path.clone();
    let mut colors_file_path = data_path.clone();
    events_file_path.push("events");
    events_file_path.set_file_name("events");

    colors_file_path.push("colors");
    colors_file_path.set_file_name("colors");

    let event_list = FileManager::load_data::<HashMap<NaiveDate, Vec<EventType>>>(
      &events_file_path
    ).unwrap_or(HashMap::new());
    let color_list = FileManager::load_data::<Vec<Color>>(&colors_file_path).unwrap_or(
      vec![Color::new(32, 191, 85), Color::new(11, 79, 108), Color::new(254, 93, 38)]
    );

    Self {
      event_list,
      color_list,
      events_file_path,
      colors_file_path,
    }
  }

  pub fn add_event(&mut self, e: EventType) -> Result<(), ()> {
    let date_time = e.get_date_time();
    let day_key = date_time.date();

    if let EventType::EVENT(new_event) = &e {
      let new_event_end =
        new_event.date_time + Duration::minutes(new_event.duration_minutes as i64);

      if new_event.date_time.date() != new_event_end.date() {
        return Err(());
      }
    }

    match self.event_list.get_mut(&day_key) {
      Some(day_list) => {
        for event in day_list.iter() {
          if events_collide(event, &e) {
            return Err(());
          }
        }
        day_list.push(e);
      }
      None => {
        self.event_list.insert(day_key, vec![e]);
      }
    }
    FileManager::save_data::<HashMap<NaiveDate, Vec<EventType>>>(
      &self.events_file_path,
      &self.event_list
    );
    Ok(())
  }

  pub fn delete_event(&mut self, new_event: EventType) -> Result<(), ()> {
    match self.event_list.get_mut(&new_event.get_date_time().date()) {
      Some(day_list) =>
        match day_list.iter().position(|r| r == &new_event) {
          Some(index) => {
            for i in index + 1..day_list.len() {
              day_list[i - 1] = day_list.index(i).clone();
            }
            day_list.pop();
            FileManager::save_data::<HashMap<NaiveDate, Vec<EventType>>>(
              &self.events_file_path,
              &self.event_list
            );
            Ok(())
          }
          None => Err(()),
        }
      None => Err(()),
    }
  }
}
