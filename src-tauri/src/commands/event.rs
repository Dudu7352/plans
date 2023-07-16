use std::sync::Mutex;

use crate::{
    app_state::AppState,
    event_structures::event_details::{EventType, EventDetails},
};
use tauri::State;

#[tauri::command]
pub fn try_add_event(state: State<'_, Mutex<AppState>>, event: EventType) -> bool {
    match state.lock() {
        Ok(mut app_state) => app_state.add_event(event).is_ok(),
        Err(_) => false,
    }
}

#[tauri::command]
pub fn try_delete_event(state: State<'_, Mutex<AppState>>, event: EventType) -> bool {
    match state.lock() {
        Ok(mut app_state) => app_state.delete_event(event).is_ok(),
        Err(_) => false,
    }
}
