use serde_json::from_str;
use std::fs::OpenOptions;
use std::io::prelude::*;
use std::path::PathBuf;

pub struct FileManager;

impl FileManager {
    pub fn save_data<T: serde::Serialize>(data_path: &PathBuf, data: &T) {
        println!("Saving data! to {:?}", data_path.to_str());
        let mut binding = OpenOptions::new();
        let open_options = binding.write(true).create(true).truncate(true);
        if let Ok(mut data_file) = open_options.open(data_path) {
            let data = serde_json::to_string(&data).unwrap_or(String::from("{}"));
            if let Err(_) = data_file.write_all(data.as_bytes()) {
                println!("Could not write data to a file");
            }
            let _ = data_file.flush();
        }
    }

    pub fn load_data<T: for<'a> serde::Deserialize<'a>>(data_path: &PathBuf) -> Result<T, ()> {
        let mut binding = OpenOptions::new();
        let open_options = binding.read(true);
        match open_options.open(data_path) {
            Ok(mut data_file) => {
                let mut contents = String::new();
                let _ = data_file.read_to_string(&mut contents);
                match from_str::<T>(&contents) {
                    Ok(data) => Ok(data),
                    Err(_) => Err(()),
                }
            }
            Err(err) => {
                println!("load_data error: {}", err);
                Err(())
            }
        }
    }
}
