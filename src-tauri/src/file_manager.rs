use serde_json::from_str;
  use std::io::prelude::*;
  use std::path::PathBuf;
  use std::fs::OpenOptions;

pub struct FileManager;

impl FileManager {
  pub fn save_data<T: serde::Serialize>(data_path: &PathBuf, data: &T) {
    let mut binding = OpenOptions::new();
    let open_options = binding.read(true).write(true).create(true).truncate(true);

    if let Ok(mut data_file) = open_options.open(data_path) {
      let data = serde_json::to_string(&data).unwrap_or(String::from("{}"));
      let _ = data_file.write_all(data.as_bytes());
      let _ = data_file.flush();
    }
  }

  pub fn load_data<T: for<'a> serde::Deserialize<'a>>(data_path: &PathBuf) -> Result<T, ()> {
    let mut binding = OpenOptions::new();
    let open_options = binding.read(true).write(true).create(true);
    match open_options.open(data_path) {
        Ok(mut data_file) => {
            let mut contents = String::new();
            let _ = data_file.read_to_string(&mut contents);
            match from_str::<T>(&contents) {
                Ok(data) => Ok(data),
                Err(_) => Err(())
            }
        },
        Err(_) => Err(()),
    }
  }
}
