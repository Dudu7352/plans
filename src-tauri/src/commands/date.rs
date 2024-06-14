use chrono::{Datelike, NaiveDate, NaiveTime};
use std::sync::Mutex;
use tauri::State;

use crate::{
    app_state::AppState,
    date_structures::{day_data::DayData, month_data::MonthData},
    event_structures::entry::Entry,
    utils,
};

#[tauri::command]
pub fn get_month(
    state: State<Mutex<AppState>>,
    month: u32,
    year: i32,
) -> Option<MonthData> {
    println!("{} {}", year, month+1);
    let start_date = NaiveDate::from_ymd_opt(year, month+1, 1)?;
    let month_days = utils::get_month_days(start_date);
    let end_date = NaiveDate::from_ymd_opt(year, month+1, month_days as u32)?;
    let mut days: Vec<DayData> = Vec::with_capacity(month_days as usize);

    for day in 1..=month_days {
        days.push(DayData::new(
            NaiveDate::from_ymd_opt(year, month+1, day as u32)?.and_time(NaiveTime::MIN),
            vec![],
        ))
    }

    let entries: Vec<Entry> = match state.lock() {
        Ok(mut app_state) => app_state.get_all_events(start_date, end_date),
        Err(_) => panic!("my gawd, it not unlocking!"),
    };

    for entry in entries.into_iter() {
        let month_day = &mut days[entry.get_date_time().day0() as usize];
        month_day.entries.push(entry);
    }

    Some(MonthData::new(
        start_date
            .and_time(NaiveTime::MIN)
            .weekday()
            .num_days_from_monday() as u8,
        month as u8,
        days,
    ))
}

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
    dur.num_weeks()
}