use std::path::PathBuf;

use sqlx::{Connection, SqliteConnection, sqlite::SqliteConnectOptions, ConnectOptions};


pub mod conn;

struct Conn {
    conn: SqliteConnection
}

impl Conn {
    pub async fn new(path: PathBuf) -> Self {
        let options = SqliteConnectOptions::new().filename(&path).create_if_missing(true);
        Self {
            conn: options.connect().await.unwrap()
        }
    }
}