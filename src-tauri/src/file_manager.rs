use std::io::prelude::*;
use std::path::PathBuf;
use std::{
    collections::HashMap,
    env,
    fs::{File, OpenOptions},
};

use crate::event_structures::event_details::EventDetails;
use chrono::NaiveDate;
use serde::ser::{Serialize, SerializeStruct};

pub struct FileManager {
    data_file: File,
    data_path: PathBuf
}

impl Serialize for FileManager {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        let mut s = serializer.serialize_struct("FileManager", 1)?;
        let _ = s.serialize_field("data_path", self.data_path.to_str().unwrap_or(""));
        s.end()
    }
}

impl FileManager {
    pub fn new() -> Self {
        let mut data_path = home::home_dir().unwrap();
        match env::consts::OS {
            "windows" => {
                data_path.push("AppData");
                data_path.push("Local");
            }
            "linux" => {
                data_path.push(".local");
                data_path.push("share");
            }
            _ => {
                data_path.push(".plans");
            }
        };

        data_path.push("plans");
        data_path.set_file_name("events");
        data_path.set_extension("json");

        let mut binding = OpenOptions::new();
        let open_options = binding.read(true).write(true).create(true);

        let data_file = open_options.open(&data_path).unwrap();

        return FileManager { data_file, data_path };
    }

    pub fn save_data(&mut self, event_list: &HashMap<NaiveDate, Vec<EventDetails>>) {
        let data = serde_json::to_string(&event_list).unwrap_or(String::from("{}"));
        let _ = self.data_file.write_all(data.as_bytes());
    }

    pub fn load_data(&mut self) -> HashMap<NaiveDate, Vec<EventDetails>> {
        let mut contents = String::new();
        let _ = self.data_file.read_to_string(&mut contents);

        let data: HashMap<NaiveDate, Vec<EventDetails>> =
            serde_json::from_str(&contents).unwrap_or(HashMap::new());
        data
    }
}
