-- Your SQL goes here
CREATE TABLE IF NOT EXISTS calendar_entry (
    id TEXT PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS activity (
    calendar_entry_id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    from_date TIMESTAMP NOT NULL,
    until_date TIMESTAMP NOT NULL,
    color TEXT DEFAULT NULL,
    FOREIGN KEY(calendar_entry_id) REFERENCES calendar_entry(id)
);

CREATE TABLE IF NOT EXISTS deadline (
    calendar_entry_id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    until_date TIMESTAMP NOT NULL,
    color TEXT DEFAULT NULL,
    FOREIGN KEY(calendar_entry_id) REFERENCES calendar_entry(id)
);