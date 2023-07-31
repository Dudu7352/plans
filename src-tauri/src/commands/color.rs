use std::sync::Mutex;

use tauri::State;

use crate::{color_structures::color::Color, consts::{SHADE_UP, SHADE_DOWN}, app_state::AppState};

#[tauri::command]
pub fn get_shade_up(color: Color) -> Color {
    color.get_shade(SHADE_UP).unwrap()
}

#[tauri::command]
pub fn get_shade_down(color: Color) -> Color {
    color.get_shade(SHADE_DOWN).unwrap()
}

#[tauri::command]
pub fn get_template_colors(state: State<'_, Mutex<AppState>>) -> Vec<Color> {
    match state.lock() {
        Ok(mut app_state) => app_state.color_list.clone(),
        Err(_) => Vec::new()
    }
}