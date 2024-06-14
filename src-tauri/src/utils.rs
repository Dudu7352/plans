use std::{env, path::PathBuf};

use chrono::{Months, NaiveDate};

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

pub fn get_month_days(date: NaiveDate) -> i64 {
    let after_month_date = date.checked_add_months(Months::new(1)).unwrap();
    after_month_date.signed_duration_since(date).num_days()
}
