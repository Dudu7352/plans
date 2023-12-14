-- Your SQL goes here
CREATE TABLE IF NOT EXISTS calendar_entry (
    id TEXT PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS calendar_event (
    id TEXT PRIMARY KEY NOT NULL,
    event_name TEXT NOT NULL,
    date_start TIMESTAMP NOT NULL,
    date_end TIMESTAMP NOT NULL,
    color TEXT NOT NULL,
    FOREIGN KEY(id) REFERENCES calendar_entry(id)
);

CREATE TABLE IF NOT EXISTS calendar_deadline (
    id TEXT PRIMARY KEY NOT NULL,
    deadline_name TEXT NOT NULL,
    date_until TIMESTAMP NOT NULL,
    color TEXT NOT NULL,
    FOREIGN KEY(id) REFERENCES calendar_entry(id)
);