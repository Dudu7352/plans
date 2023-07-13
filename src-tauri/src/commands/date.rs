use std::{cmp::min, sync::Mutex};

use chrono::{Datelike, Duration, NaiveDate};
use tauri::State;

use crate::{
    app_state::AppState,
    consts::{LEAP_YEAR_MONTHS, YEAR_MONTHS},
    date_structures::{
        day_details::DayDetails, month_details::MonthDetails, year_details::YearDetails,
    },
    event_structures::event_details::EventType,
};

#[tauri::command]
pub fn get_current_year() -> i32 {
    chrono::Utc::now().date_naive().year()
}

#[tauri::command]
pub fn get_first_weekday(year: i32) -> u32 {
    NaiveDate::from_yo_opt(year, 1)
        .unwrap()
        .weekday()
        .num_days_from_monday()
}

#[tauri::command]
pub fn get_current_week() -> i64 {
    let today = chrono::offset::Local::now().date_naive();
    let first = today.with_day(1).unwrap().with_month(1).unwrap();
    let dur = today - first;
    return dur.num_weeks();
}

#[tauri::command]
pub fn get_year_details(year: i32) -> YearDetails {
    let mut month_details_list = Vec::with_capacity(12);
    let mut date: NaiveDate;
    let is_leap = year % 4 == 0 && year % 100 != 0 || year % 400 == 0;

    for month in 1..=12 {
        date = NaiveDate::from_ymd_opt(year, month, 1).unwrap();

        let beginning_weekday = date.weekday().num_days_from_monday() as u8;

        let m_i = (month - 1) as usize;

        let month_details = MonthDetails {
            beginning_weekday,
            month_length: if is_leap {
                LEAP_YEAR_MONTHS[m_i]
            } else {
                YEAR_MONTHS[m_i]
            },
        };

        month_details_list.push(month_details);
    }

    return YearDetails {
        year,
        month_details_list,
        is_leap,
    };
}

#[tauri::command]
pub fn get_week_details(state: State<Mutex<AppState>>, year: i32, week: i64) -> Vec<DayDetails> {
    let year_start = NaiveDate::from_yo_opt(year, 1).unwrap();
    let mut week_start = year_start + Duration::days(week * 7);
    if week > 0 {
        week_start -= Duration::days(year_start.weekday().num_days_from_monday() as i64)
    }

    let new_year = NaiveDate::from_yo_opt(year + 1, 1).unwrap() - Duration::days(-1);
    let year_remaining = (new_year - week_start).num_days() - 1;
    let mut week_remaining = 7;
    if week == 0 {
        week_remaining -= year_start.weekday().num_days_from_monday() as i64;
    }

    let mut week_details: Vec<DayDetails> = Vec::new();

    if let Ok(app_state) = state.lock() {
        let empty: Vec<EventType> = Vec::new();
        for i in 0..min(week_remaining, year_remaining) {
            let day = week_start + Duration::days(i);
            let events = app_state.event_list.get(&day).unwrap_or(&empty);
            week_details.push(DayDetails::new(day, events.to_vec()));
        }
    }

    week_details
}
