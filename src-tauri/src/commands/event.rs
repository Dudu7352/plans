use std::sync::Mutex;

use tauri::State;
use crate::{app_state::AppState, event_structures::event_details::EventDetails};

#[tauri::command]
pub fn try_add_event(state: State<'_, Mutex<AppState>>, new_event: EventDetails) -> bool {
    let lock = state.lock();
    if lock.is_err() {
        return false;
    }
    return lock.unwrap().add_event(new_event).is_ok();
}