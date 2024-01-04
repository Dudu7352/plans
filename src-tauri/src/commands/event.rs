use std::sync::Mutex;

use crate::{
    app_state::AppState,
    event_structures::entry::Entry,
};
use tauri::State;

#[tauri::command]
pub fn try_add_event(state: State<'_, Mutex<AppState>>, event: Entry) -> bool {
    match state.lock() {
        Ok(mut app_state) => {
            println!("Adding event: {:?}", event);
            let _ = app_state.add_event(event);
            true
        },
        Err(_) => false,
    }
}

#[tauri::command]
pub fn try_delete_event(state: State<'_, Mutex<AppState>>, event: Entry) -> bool {
    match state.lock() {
        Ok(mut app_state) => {
            let _ = app_state.delete_event(event.get_id().clone());
            true
        },
        Err(_) => false,
    }
}
