use crate::{color_structures::color::Color, consts::{SHADE_UP, SHADE_DOWN}};

#[tauri::command]
pub fn get_shade_up(color: Color) -> Color {
    color.get_shade(SHADE_UP).unwrap()
}

#[tauri::command]
pub fn get_shade_down(color: Color) -> Color {
    color.get_shade(SHADE_DOWN).unwrap()
}