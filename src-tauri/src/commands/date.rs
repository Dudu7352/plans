use std::{cmp::min, sync::Mutex};

use chrono::{Datelike, Duration, NaiveDate};
use tauri::State;

use crate::{
    app_state::AppState,
    date_structures::{
        day_details::DayDetails, month_details::MonthDetails, year_details::YearDetails,
    },
    event_structures::event_details::EventDetails,
};

#[tauri::command]
pub fn get_current_year() -> i32 {
    chrono::Utc::now().date_naive().year()
}

#[tauri::command]
pub fn get_year_details(year: i32) -> YearDetails {
    let mut month_details_list = Vec::with_capacity(12);
    let mut date: NaiveDate = NaiveDate::from_ymd_opt(year, 1, 1).unwrap();

    for month in 1..=12 {
        let beginning_weekday = date.weekday().num_days_from_monday() as u8;
        date = NaiveDate::from_ymd_opt(
            if month == 12 { year + 1 } else { year },
            if month == 12 { 12 } else { month + 1 },
            1,
        )
        .unwrap();
        let month_details = MonthDetails {
            beginning_weekday,
            month_length: date.pred_opt().unwrap().day0() as u8 + 1,
        };

        month_details_list.push(month_details);
    }

    return YearDetails {
        year,
        month_details_list,
        is_leap: year % 4 == 0 && year % 100 != 0 || year % 400 == 0,
    };
}

#[tauri::command]
pub fn get_week_details(state: State<Mutex<AppState>>, year: i32, week: i64) -> Vec<DayDetails> {
    let start = NaiveDate::from_yo_opt(year, 1).unwrap() + Duration::days((week - 1) * 7 + 1);
    let new_year = NaiveDate::from_yo_opt(year + 1, 1).unwrap() - Duration::days(-1);
    let remaining = (new_year - start).num_days();

    let mut week_details: Vec<DayDetails> = Vec::new();

    let lock = state.lock();
    if lock.is_err() {
        return vec![];
    }
    let event_list = &lock.unwrap().event_list;

    let empty: Vec<EventDetails> = Vec::new();

    for i in 0..min(7, remaining) {
        let day = start + Duration::days(i);
        let events = event_list.get(&day).unwrap_or(&empty);
        week_details.push(DayDetails::new(day, events.to_vec())); // TODO: get data from tauri state and return it
    }

    return week_details;
}
