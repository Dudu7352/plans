-- Your SQL goes here
CREATE TABLE IF NOT EXISTS calendar_entry (
    id TEXT PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS calendar_event (
    id TEXT PRIMARY KEY,
    event_name TEXT NOT NULL,
    date_start DATE NOT NULL,
    date_end DATE NOT NULL,
    FOREIGN KEY(id) REFERENCES calendar_entry(id)
);

CREATE TABLE IF NOT EXISTS calendar_deadline (
    id TEXT PRIMARY KEY,
    deadline_name TEXT NOT NULL,
    date_until DATE NOT NULL,
    FOREIGN KEY(id) REFERENCES calendar_entry(id)
);