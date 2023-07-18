use serde_json::from_str;
use std::fs::create_dir_all;
use std::io::prelude::*;
use std::path::PathBuf;
use std::{collections::HashMap, env, fs::OpenOptions};

use crate::event_structures::event_type::EventType;
use chrono::NaiveDate;

#[derive(serde::Serialize)]
pub struct FileManager {
    data_path: PathBuf,
}

impl FileManager {
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
        };
        let _ = create_dir_all(&data_path);

        data_path.push("events");
        data_path.set_file_name("events");
        data_path.set_extension("json");

        return FileManager { data_path };
    }

    pub fn save_data(&mut self, event_list: &HashMap<NaiveDate, Vec<EventType>>) {
        let mut binding = OpenOptions::new();
        let open_options = binding.read(true).write(true).create(true).truncate(true);

        if let Ok(mut data_file) = open_options.open(&self.data_path) {
            let data = serde_json::to_string(&event_list).unwrap_or(String::from("{}"));
            let _ = data_file.write_all(data.as_bytes());
            let _ = data_file.flush();
        }
    }

    pub fn load_data(&mut self) -> HashMap<NaiveDate, Vec<EventType>> {
        let mut binding = OpenOptions::new();
        let open_options = binding.read(true).write(true).create(true);
        let err_data: HashMap<NaiveDate, Vec<EventType>> = HashMap::new();
        match open_options.open(&self.data_path) {
            Ok(mut data_file) => {
                let mut contents = String::new();
                let _ = data_file.read_to_string(&mut contents);
                match from_str::<HashMap<NaiveDate, Vec<EventType>>>(&contents) {
                    Ok(data) => data,
                    Err(_) => err_data,
                }
            }
            Err(_) => err_data,
        }
    }
}

impl Default for FileManager {
    fn default() -> Self {
        Self::new()
    }
}
