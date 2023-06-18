use super::month_details::MonthDetails;

#[derive(serde::Serialize, serde::Deserialize)]
pub struct YearDetails {
    pub year: i32,
    pub month_details_list: Vec<MonthDetails>,
    pub is_leap: bool,
}