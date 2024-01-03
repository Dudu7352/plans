// @generated automatically by Diesel CLI.

diesel::table! {
    calendar_deadline (calendar_entry_id) {
        calendar_entry_id -> Text,
        deadline_name -> Text,
        date_until -> Timestamp,
        color -> Text,
    }
}

diesel::table! {
    calendar_entry (id) {
        id -> Text,
    }
}

diesel::table! {
    calendar_event (calendar_entry_id) {
        calendar_entry_id -> Text,
        event_name -> Text,
        date_start -> Timestamp,
        date_end -> Timestamp,
        color -> Text,
    }
}

diesel::joinable!(calendar_deadline -> calendar_entry (calendar_entry_id));
diesel::joinable!(calendar_event -> calendar_entry (calendar_entry_id));

diesel::allow_tables_to_appear_in_same_query!(
    calendar_deadline,
    calendar_entry,
    calendar_event,
);
