use async_graphql::scalar;
use linera_sdk::base::{ApplicationId, Owner};
use serde::{de::Error, Deserialize, Deserializer, Serialize, Serializer};

use std::str::FromStr;

scalar!(AccountOwner);

/// An account owner.
#[derive(Clone, Copy, Debug, Eq, Ord, PartialEq, PartialOrd)]
pub enum AccountOwner {
    /// An account owned by a user.
    User(Owner),
    /// An account for an application.
    Application(ApplicationId),
}

impl Serialize for AccountOwner {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        match self {
            AccountOwner::User(owner) => {
                let key = format!("User:{}", owner);
                serializer.serialize_str(&key)
            }
            AccountOwner::Application(app_id) => {
                let key = format!("Application:{}", app_id);
                serializer.serialize_str(&key)
            }
        }
    }
}

impl<'de> Deserialize<'de> for AccountOwner {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: Deserializer<'de>,
    {
        struct AccountOwnerVisitor;

        impl<'de> serde::de::Visitor<'de> for AccountOwnerVisitor {
            type Value = AccountOwner;

            fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
                formatter.write_str("a string representing an AccountOwner")
            }

            fn visit_str<E>(self, value: &str) -> Result<Self::Value, E>
            where
                E: serde::de::Error,
            {
                let parts: Vec<&str> = value.splitn(2, ':').collect();
                if parts.len() != 2 {
                    return Err(Error::custom("string does not contain colon"));
                }

                match parts[0] {
                    "User" => {
                        let owner = Owner::from_str(parts[1]).map_err(|_| {
                            Error::custom(format!(
                                "failed to parse Owner from string: {}",
                                parts[1]
                            ))
                        })?;
                        Ok(AccountOwner::User(owner))
                    }
                    "Application" => {
                        let app_id = ApplicationId::from_str(parts[1]).map_err(|_| {
                            Error::custom(format!(
                                "failed to parse ApplicationId from string: {}",
                                parts[1]
                            ))
                        })?;
                        Ok(AccountOwner::Application(app_id))
                    }
                    _ => Err(Error::unknown_variant(parts[0], &["User", "Application"])),
                }
            }
        }
        deserializer.deserialize_str(AccountOwnerVisitor)
    }
}

impl<T> From<T> for AccountOwner
where
    T: Into<Owner>,
{
    fn from(owner: T) -> Self {
        AccountOwner::User(owner.into())
    }
}
