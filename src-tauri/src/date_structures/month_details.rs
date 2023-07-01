#[serde(rename_all = "camelCase")]
#[derive(serde::Serialize, serde::Deserialize, Debug)]
pub struct MonthDetails {
    pub beginning_weekday: u8,
    pub month_length: u8,
}