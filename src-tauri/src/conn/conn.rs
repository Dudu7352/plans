use std::path::PathBuf;

use sqlx::{Connection, SqliteConnection};

struct Conn {
    connection: Option<SqliteConnection>
}

impl Conn {
    pub async fn new(path: PathBuf) {
        let conn = SqliteConnection::connect(path.to_str().unwrap());
    }
}