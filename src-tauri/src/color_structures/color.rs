use diesel::backend::Backend;
use diesel::deserialize::FromSql;
use diesel::expression::AsExpression;
use diesel::serialize::ToSql;
use diesel::sql_types::Text;
use diesel::sqlite;
use serde::de::{self, Visitor};
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, AsExpression, FromSqlRow)]
#[sql_type = "Text"]
pub struct Color {
    pub red: u8,
    pub green: u8,
    pub blue: u8,
}

impl<'de> Deserialize<'de> for Color {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        deserializer.deserialize_str(ColorVisitor)
    }
}

impl Serialize for Color {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        serializer.serialize_str(self.to_hex().as_str())
    }
}

impl<DB: Backend> ToSql<Text, DB> for Color {
    fn to_sql<'b>(&'b self, out: &mut diesel::serialize::Output<'b, '_, DB>) -> diesel::serialize::Result {
        let str = self.to_hex();
        <String as ToSql<String, DB>>::to_sql(&str, out)
    }
}

impl<DB: Backend> FromSql<Text, DB> for Color {
    fn from_sql(bytes: <DB as Backend>::RawValue<'_>) -> diesel::deserialize::Result<Self> {
        <String as FromSql<String, DB>>::from_sql(bytes).map(|x| Self::from_hex(x).unwrap())
    }
}

impl Color {
    pub fn new(red: u8, green: u8, blue: u8) -> Self { Self { red, green, blue } }

    pub fn from_hex(mut hex: String) -> Result<Self, ()> {
        if hex.len() != 7 {
            return Err(());
        }
        let _ = hex.remove(0);
        match u32::from_str_radix(hex.as_str(), 16) {
            Ok(color) => Ok(Self {
                red: (color >> 16) as u8,
                green: ((color >> 8) % 256) as u8,
                blue: (color % 256) as u8,
            }),
            Err(_) => Err(()),
        }
    }

    pub fn to_hex(&self) -> String {
        format!("#{:0>2x}{:0>2x}{:0>2x}", self.red, self.green, self.blue)
    }
}

struct ColorVisitor;

impl<'de> Visitor<'de> for ColorVisitor {
    type Value = Color;

    fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
        formatter.write_str("hex string representing color with only red, green and blue channels")
    }

    fn visit_str<E>(self, value: &str) -> Result<Self::Value, E>
    where
        E: de::Error,
    {
        match Color::from_hex(value.to_string()) {
            Ok(color) => Ok(color),
            Err(_) => Err(E::custom(format!(
                "This string cannot be interpreted as a color: {}",
                value
            ))),
        }
    }
}
