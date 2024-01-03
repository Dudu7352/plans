use crate::schema::calendar_entry;

#[derive(Debug, PartialEq, Queryable, Selectable, Insertable, Identifiable)]
#[diesel(table_name = calendar_entry)]
pub struct CalendarEntry {
    pub id: String
}