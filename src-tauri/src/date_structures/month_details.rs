#[derive(serde::Serialize, serde::Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct MonthDetails {
    pub beginning_weekday: u8,
    pub month_length: u8,
}