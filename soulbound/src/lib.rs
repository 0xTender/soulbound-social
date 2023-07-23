use async_graphql::{Request, Response};
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
pub type AccountId = u64;

/// Operations that can be executed by the application.
#[derive(Debug, Deserialize, Serialize)]
#[allow(clippy::large_enum_variant)]
pub enum Operation {
    UpdateCounter { counter: u64 },
}
