// @generated automatically by Diesel CLI.

diesel::table! {
    calendar_deadline (id) {
        id -> Nullable<Text>,
        deadline_name -> Text,
        date_until -> Date,
        color -> Text,
    }
}

diesel::table! {
    calendar_entry (id) {
        id -> Nullable<Text>,
    }
}

diesel::table! {
    calendar_event (id) {
        id -> Nullable<Text>,
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
