#[derive(Serialize)]
pub struct EventDetails {
    #[serde(with = "ts_seconds")]
    pub date_time: NaiveDateTime,
    pub duration_seconds: u32,
    pub name: String,
}