use super::day_data::DayData;
use serde::Deserialize;

#[derive(serde::Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct MonthData {
    pub beginning: u8,
    pub month_id: u8,
    pub days: Vec<DayData>,
}

impl MonthData {
    pub fn new(beginning: u8, month_id: u8, days: Vec<DayData>) -> Self {
        Self {
            beginning,
            month_id,
            days,
        }
    }
}
