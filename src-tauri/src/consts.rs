use diesel_migrations::EmbeddedMigrations;

pub(crate) const YEAR_MONTHS: [u8; 12] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
pub(crate) const LEAP_YEAR_MONTHS: [u8; 12] = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
pub const MIGRATIONS: EmbeddedMigrations = diesel_migrations::embed_migrations!();