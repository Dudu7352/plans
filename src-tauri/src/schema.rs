// @generated automatically by Diesel CLI.

diesel::table! {
    calendar_deadline (id) {
        id -> Text,
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
    calendar_event (id) {
        id -> Text,
        event_name -> Text,
        date_start -> Timestamp,
        date_end -> Timestamp,
        color -> Text,
    }
}

diesel::joinable!(calendar_deadline -> calendar_entry (id));
diesel::joinable!(calendar_event -> calendar_entry (id));

diesel::allow_tables_to_appear_in_same_query!(
    calendar_deadline,
    calendar_entry,
    calendar_event,
);
