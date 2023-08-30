use sqlx::{pool::Pool, SqlitePool, Sqlite};

pub struct Conn {
  pool: Pool<Sqlite>
}

impl Conn {
  pub async fn new(url: &str) -> Self {
      let pool = SqlitePool::connect(url).await.unwrap(); //TODO: Handle result
      Self {
          pool
      }
  }

  pub async fn setup(&self) -> Result<(), ()> {
      let event_table_result = sqlx::query("CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY NOT NULL AUTOINCEREMENT, date_time INTEGER NOT NULL, name TEXT NOT NULL, duration_minutes INTEGET NOT NULL, color TEXT)")
          .execute(&self.pool).await;

      if let Err(err) = event_table_result {
          println!("Could not create event table. Error: {:?}", err);
          return Err(());
      }

      let deadline_table_result = sqlx::query("CREATE TABLE IF NOT EXISTS deadlines (id INTEGER PRIMARY KEY NOT NULL AUTOINCEREMENT, date_time INTEGER NOT NULL, name TEXT NOT NULL, color TEXT)")
          .execute(&self.pool).await;

      if let Err(err) = deadline_table_result {
          println!("Could not create deadline table. Error: {:?}", err);
          return Err(());
      }

      Ok(())
  }
}