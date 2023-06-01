// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use chrono::{
    Datelike,
    NaiveDateTime, 
    naive::serde::ts_seconds,
    NaiveDate, 
};
use serde::Serialize;

#[tauri::command]
fn get_current_year() -> i32 {
    chrono::Utc::now().date_naive().year()
}

#[derive(serde::Serialize, serde::Deserialize)]
struct YearDetails {
    beginning_weekday_list: [u32; 12],
    is_leap: bool,
}

#[derive(Serialize)]
struct EventDetails {
    #[serde(with = "ts_seconds")]
    date_time: NaiveDateTime,
    duration_seconds: u32,
    name: String
}

#[tauri::command]
fn get_year_details(year: i32) -> YearDetails {
    let mut weekday_list: [u32; 12] = [0; 12];
    let mut date: NaiveDate;
    for month in 1..=12 {
        date = NaiveDate::from_ymd_opt(year, month, 1).unwrap();
        weekday_list[(month-1) as usize] = date.weekday().num_days_from_monday();
    }

    return YearDetails { 
        beginning_weekday_list: weekday_list, 
        is_leap: year%4 == 0 && year%100 != 0 || year%400 == 0
    }
}


fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            get_current_year,
            get_year_details
            ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
