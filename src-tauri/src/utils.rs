use std::{path::PathBuf, env};

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

pub fn get_database_path() -> PathBuf {
  let mut home_path = get_data_path();
  home_path.push("plans.db");
  home_path
}