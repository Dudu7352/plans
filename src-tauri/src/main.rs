// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use chrono::{naive::serde::ts_seconds, Datelike, NaiveDate, NaiveDateTime};
use serde::Serialize;

#[derive(serde::Serialize, serde::Deserialize)]
struct YearDetails {
    year: i32,
    month_details_list: Vec<MonthDetails>,
    is_leap: bool,
}

#[derive(serde::Serialize, serde::Deserialize, Debug)]
struct MonthDetails {
    beginning_weekday: u8,
    month_length: u8,
}

#[derive(Serialize)]
struct EventDetails {
    #[serde(with = "ts_seconds")]
    date_time: NaiveDateTime,
    duration_seconds: u32,
    name: String,
}

#[tauri::command]
fn get_current_year() -> i32 { chrono::Utc::now().date_naive().year() }

#[tauri::command]
fn get_year_details(year: i32) -> YearDetails {
    let mut month_details_list = Vec::with_capacity(12);
    let mut date: NaiveDate = NaiveDate::from_ymd_opt(year, 1, 1).unwrap();

    for month in 1..=12 {
        let beginning_weekday = date.weekday().num_days_from_monday() as u8;
        date = NaiveDate::from_ymd_opt(
            if month == 12 {year + 1} else {year}, 
            if month == 12 {12} else {month + 1}, 
            1).unwrap();
        let month_details = MonthDetails {
            beginning_weekday,
            month_length: date.pred_opt().unwrap().day0() as u8 + 1,
        };

        println!("{:?} -> {:?}", date, month_details);
        month_details_list.push(month_details);
    }

    return YearDetails {
        year,
        month_details_list,
        is_leap: year % 4 == 0 && year % 100 != 0 || year % 400 == 0,
    };
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_current_year, get_year_details])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
