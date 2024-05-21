// @generated automatically by Diesel CLI.

diesel::table! {
    activity (calendar_entry_id) {
        calendar_entry_id -> Text,
        name -> Text,
        from_date -> Timestamp,
        until_date -> Timestamp,
        color -> Nullable<Text>,
    }
}

diesel::table! {
    calendar_entry (id) {
        id -> Text,
    }
}

diesel::table! {
    deadline (calendar_entry_id) {
        calendar_entry_id -> Text,
        name -> Text,
        until_date -> Timestamp,
        color -> Nullable<Text>,
    }
}

diesel::joinable!(activity -> calendar_entry (calendar_entry_id));
diesel::joinable!(deadline -> calendar_entry (calendar_entry_id));

diesel::allow_tables_to_appear_in_same_query!(
    activity,
    calendar_entry,
    deadline,
);
