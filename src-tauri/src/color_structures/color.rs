use serde::de::{self, Visitor};
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq)]
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

    pub fn get_shade(&self, multiplier: f32) -> Result<Self, ()> {
        if multiplier < 0f32 {
            return Err(());
        }
        let mut res = self.clone();
        res.red = (res.red as f32 * multiplier) as u8;
        res.green = (res.green as f32 * multiplier) as u8;
        res.blue = (res.green as f32 * multiplier) as u8;
        Ok(res)
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
