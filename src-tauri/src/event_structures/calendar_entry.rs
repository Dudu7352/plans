use crate::schema::calendar_entry;

#[derive(Debug, PartialEq, Queryable, Selectable, Insertable, Identifiable)]
#[diesel(table_name = calendar_entry)]
pub struct CalendarEntry {
    pub id: String
}

impl CalendarEntry {
    pub fn new(id: String) -> Self { Self { id } }
}