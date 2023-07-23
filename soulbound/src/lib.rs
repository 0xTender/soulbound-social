use account::AccountOwner;
use async_graphql::{Request, Response, SimpleObject};
use linera_sdk::base::{ContractAbi, ServiceAbi};
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
}

#[derive(Clone, Debug, Default, serde::Serialize, serde::Deserialize, SimpleObject)]
pub struct AccountDetails {
    pub first_name: String,
    pub last_name: String,
    pub image: String,
}
