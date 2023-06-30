// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod file_manager;
mod app_state;
mod commands;
mod date_structures;
mod event_structures;
mod consts;

use std::sync::Mutex;
use app_state::AppState;
use commands::date::*;
use commands::event::*;

fn main() {
    tauri::Builder::default()
        .manage(Mutex::new(AppState::new()))
        .invoke_handler(tauri::generate_handler![
            get_current_year, 
            get_first_weekday,
            get_year_details, 
            get_week_details,
            try_add_event,
            try_delete_event
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
