use account::AccountOwner;
use async_graphql::{InputObject, Request, Response, SimpleObject};
use linera_sdk::base::{ContractAbi, ServiceAbi};
use linera_views::{common::CustomSerialize, views::ViewError};
use serde::{Deserialize, Serialize};

pub struct ApplicationAbi;

impl ContractAbi for ApplicationAbi {
    type Parameters = ();
    type InitializationArgument = ();
    type Operation = Operation;
    type Message = ();
    type ApplicationCall = ();
    type SessionCall = ();
    type SessionState = ();
    type Response = ();
}

impl ServiceAbi for ApplicationAbi {
    type Parameters = ();
    type Query = Request;
    type QueryResponse = Response;
}

/// An identifier for AccountId
pub type AccountId = AccountOwner;

/// Operations that can be executed by the application.
#[derive(Debug, Deserialize, Serialize)]
#[allow(clippy::large_enum_variant)]
pub enum Operation {
    UpdateCounter {
        counter: u64,
    },
    UpdateCounterPersonal {
        account_id: AccountId,
        counter: u64,
    },
    CreateAccount {
        account_id: AccountId,
        first_name: String,
        last_name: String,
        image: String,
    },
    UpdateAccountData {
        account_id: AccountId,
        first_name: Option<String>,
        last_name: Option<String>,
        image: Option<String>,
    },
    AddPost {
        author: AccountId,
        text: String,
    },
    LikePost {
        owner: AccountId,
        post_id: u64,
    },
}

#[derive(Clone, Debug, Default, serde::Serialize, serde::Deserialize, SimpleObject)]
pub struct AccountDetails {
    pub first_name: String,
    pub last_name: String,
    pub image: String,
}

#[derive(Clone, Debug, serde::Serialize, serde::Deserialize, SimpleObject)]
pub struct Post {
    pub author: AccountId,
    pub text: String,
}

#[derive(
    Clone, Copy, Debug, PartialEq, PartialOrd, Deserialize, Serialize, SimpleObject, InputObject,
)]
#[graphql(input_name = "LikeInput")]
pub struct Like {
    pub post_id: u64,
}

impl CustomSerialize for Like {
    fn to_custom_bytes(&self) -> Result<Vec<u8>, ViewError> {
        let mut short_key = bcs::to_bytes(&self.post_id)?;
        short_key.reverse();
        Ok(short_key)
    }

    fn from_custom_bytes(short_key: &[u8]) -> Result<Self, ViewError> {
        let mut bytes = short_key.to_vec();
        bytes.reverse();
        let value = bcs::from_bytes(&bytes)?;
        Ok(value)
    }
}
