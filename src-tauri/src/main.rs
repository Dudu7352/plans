// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use chrono::Datelike;


#[tauri::command]
fn get_current_year() -> i32 {
    chrono::Utc::now().date_naive().year()
}

#[derive(serde::Serialize, serde::Deserialize)]
struct YearDetails {
    beginning_weekday_list: [i32; 12],
    is_leap: bool,
}

struct MeetingDetails {
    
}

#[tauri::command]
fn get_month_data(year: i32) -> YearDetails {
    return YearDetails { 
        beginning_weekday_list: [0,0,0,0,0,0,0,0,0,0,0,0], 
        is_leap: false 
    }
}

#[tauri::command]
fn add_meeting() -> Result<(), String> {
  Ok(())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            get_current_year,
            get_month_data
            ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
