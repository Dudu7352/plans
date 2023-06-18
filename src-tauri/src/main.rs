// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod date_structures;

mod commands;
use commands::date::{get_current_year, get_year_details};

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_current_year, get_year_details])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
