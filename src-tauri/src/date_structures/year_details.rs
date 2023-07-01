use super::month_details::MonthDetails;

#[serde(rename_all = "camelCase")]
#[derive(serde::Serialize, serde::Deserialize)]
pub struct YearDetails {
    pub year: i32,
    pub month_details_list: Vec<MonthDetails>,
    pub is_leap: bool,
}