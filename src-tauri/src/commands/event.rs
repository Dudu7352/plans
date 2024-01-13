use std::sync::Mutex;

use crate::{
    app_state::AppState,
    event_structures::entry::Entry,
};
use tauri::State;

#[tauri::command]
pub fn try_add_event(state: State<'_, Mutex<AppState>>, event: Entry) -> Result<(), String> {
    match state.lock() {
        Ok(mut app_state) => {
            app_state.add_event(event)
        },
        Err(_) => Err(String::from("Failed to lock app state")),
    }
}

#[tauri::command]
pub fn try_delete_event(state: State<'_, Mutex<AppState>>, event: Entry) -> Result<(), String> {
    match state.lock() {
        Ok(mut app_state) => {
            match event.get_id() {
                Some(id) => {
                    app_state.delete_event(id.clone())
                },
                None => {
                    Err(String::from("Failed to get id of event"))
                },
            }
        },
        Err(_) => Err(String::from("Failed to lock app state")),
    }
}

#[tauri::command]
pub fn try_update_event(state: State<'_, Mutex<AppState>>, event: Entry) -> Result<(), String> {
    match state.lock() {
        Ok(mut app_state) => {
            app_state.update_event(event)
        },
        Err(_) =>  Err(String::from("Failed to lock app state")),
    }
  
}