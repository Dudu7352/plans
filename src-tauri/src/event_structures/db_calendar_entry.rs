use crate::schema::calendar_entry;

use super::calendar_entry::CalendarEntry;

#[derive(Debug, Queryable, Insertable)]
#[diesel(table_name = calendar_entry)]
pub struct DbCalendarEntry {
    pub id: String
}

impl Into<CalendarEntry> for DbCalendarEntry {
    fn into(self) -> CalendarEntry {
        todo!()
    }
}