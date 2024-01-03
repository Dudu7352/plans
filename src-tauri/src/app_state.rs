use std::{collections::HashMap, fs::create_dir_all, path::PathBuf};

use chrono::NaiveDate;
use serde::Serialize;

use crate::{
    color_structures::color::Color,
    event_structures::entry::Entry,
    file_manager::FileManager,
    utils::get_data_path, 
};

pub struct AppState {
    pub event_list: HashMap<NaiveDate, Vec<Entry>>,
    pub color_list: Vec<Color>,
    events_file_path: PathBuf,
    colors_file_path: PathBuf,
}

impl Serialize for AppState {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where S: serde::Serializer {
        serializer.collect_str("")
    }
}

impl AppState {
    pub async fn new() -> Self {
        let data_path = get_data_path();
        let _ = create_dir_all(&data_path);

        let mut events_file_path = data_path.clone();
        let mut colors_file_path = data_path.clone();

        events_file_path.push("plans-app");
        events_file_path.set_file_name("events");
        events_file_path.set_extension("json");

        colors_file_path.push("plans-app");
        colors_file_path.set_file_name("colors");
        colors_file_path.set_extension("json");

        let event_list =
            FileManager::load_data::<HashMap<NaiveDate, Vec<Entry>>>(&events_file_path)
                .unwrap_or(HashMap::new());
        let color_list = match FileManager::load_data::<Vec<Color>>(&colors_file_path) {
            Ok(file_data) => file_data,
            Err(_) => {
                let new_data: Vec<Color> = vec![
                    Color::new(32, 191, 85),
                    Color::new(11, 79, 108),
                    Color::new(254, 93, 38),
                ];
                FileManager::save_data(&colors_file_path, &new_data);
                new_data
            }
        };

        Self {
            event_list,
            color_list,
            events_file_path,
            colors_file_path,
        }
    }

    pub async fn get_all_events(&self, _start: NaiveDate, _end: NaiveDate) -> Result<Vec<Entry>, ()> {
        todo!()
    }

    pub async fn add_event(&mut self, e: Entry) -> Result<(), ()> {
        let date_time = e.get_date_time();
        let _day_key = date_time.date();

        if let Entry::Event(new_event) = &e {
            if new_event.date_start.date() != new_event.date_start.date() {
                return Err(());
            }
        }

        todo!()
    }

    pub async fn delete_event(&mut self, _id: String) -> Result<(), ()> {
        todo!()
    }
}
