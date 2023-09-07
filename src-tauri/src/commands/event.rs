use std::sync::Mutex;

use crate::{
    app_state::AppState,
    event_structures::event_type::EventType,
};
use tauri::{State, async_runtime};

#[tauri::command]
pub fn try_add_event(state: State<'_, Mutex<AppState>>, event: EventType) -> bool {
    match state.lock() {
        Ok(mut app_state) => {
            async move {
                app_state.add_event(event)
            };
            true
        },
        Err(_) => false,
    }
}

#[tauri::command]
pub fn try_delete_event(state: State<'_, Mutex<AppState>>, event: EventType) -> bool {
    match state.lock() {
        Ok(mut app_state) => {
            async move {
                app_state.delete_event(*event.get_id());
            };
            true
        },
        Err(_) => false,
    }
}
