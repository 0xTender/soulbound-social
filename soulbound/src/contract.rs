#![cfg_attr(target_arch = "wasm32", no_main)]

mod state;

use self::state::Application;
use account::AccountOwner;
use async_trait::async_trait;
use linera_sdk::{
    base::{ApplicationId, Owner, SessionId, WithContractAbi},
    ApplicationCallResult, CalleeContext, Contract, ExecutionResult, MessageContext,
    OperationContext, SessionCallResult, ViewStateStorage,
};
use soulbound::AccountId;
use thiserror::Error;

linera_sdk::contract!(Application);

impl WithContractAbi for Application {
    type Abi = soulbound::ApplicationAbi;
}

#[async_trait]
impl Contract for Application {
    type Error = ContractError;
    type Storage = ViewStateStorage<Self>;

    async fn initialize(
        &mut self,
        _context: &OperationContext,
        _argument: Self::InitializationArgument,
    ) -> Result<ExecutionResult<Self::Message>, Self::Error> {
        Ok(ExecutionResult::default())
    }

    async fn execute_operation(
        &mut self,
        context: &OperationContext,
        operation: Self::Operation,
    ) -> Result<ExecutionResult<Self::Message>, Self::Error> {
        let result = ExecutionResult::default();
        match operation {
            soulbound::Operation::UpdateCounter { counter } => {
                self.execute_update_counter(counter).await?
            }
            soulbound::Operation::UpdateCounterPersonal {
                account_id,
                counter,
            } => {
                Self::check_account_authentication(None, context.authenticated_signer, account_id)?;
                self.execute_update_values(account_id, counter).await?;
            }
            soulbound::Operation::CreateAccount {
                account_id,
                first_name,
                last_name,
                image,
            } => {
                Self::check_account_authentication(None, context.authenticated_signer, account_id)?;
                self.init_account(account_id, first_name, last_name, image)
                    .await;
            }
            soulbound::Operation::UpdateAccountData {
                account_id,
                first_name,
                last_name,
                image,
            } => {
                Self::check_account_authentication(None, context.authenticated_signer, account_id)?;
                self.update_account_data(account_id, first_name, last_name, image)
                    .await;
            }
        }

        Ok(result)
    }

    async fn execute_message(
        &mut self,
        _context: &MessageContext,
        _message: Self::Message,
    ) -> Result<ExecutionResult<Self::Message>, Self::Error> {
        Ok(ExecutionResult::default())
    }

    async fn handle_application_call(
        &mut self,
        _context: &CalleeContext,
        _call: Self::ApplicationCall,
        _forwarded_sessions: Vec<SessionId>,
    ) -> Result<ApplicationCallResult<Self::Message, Self::Response, Self::SessionState>, Self::Error>
    {
        Ok(ApplicationCallResult::default())
    }

    async fn handle_session_call(
        &mut self,
        _context: &CalleeContext,
        _session: Self::SessionState,
        _call: Self::SessionCall,
        _forwarded_sessions: Vec<SessionId>,
    ) -> Result<SessionCallResult<Self::Message, Self::Response, Self::SessionState>, Self::Error>
    {
        Ok(SessionCallResult::default())
    }
}

impl Application {
    async fn execute_update_counter(&mut self, counter: u64) -> Result<(), ContractError> {
        self.increment(counter);

        Ok(())
    }

    async fn execute_update_values(
        &mut self,
        account_id: AccountId,
        counter: u64,
    ) -> Result<(), ContractError> {
        self.update_values(account_id, counter).await;

        Ok(())
    }

    fn check_account_authentication(
        authenticated_application_id: Option<ApplicationId>,
        authenticated_signer: Option<Owner>,
        owner: AccountOwner,
    ) -> Result<(), ContractError> {
        match owner {
            AccountOwner::User(address) if authenticated_signer == Some(address) => Ok(()),
            AccountOwner::Application(id) if authenticated_application_id == Some(id) => Ok(()),
            _ => Err(ContractError::IncorrectAuthentication),
        }
    }
}

/// An error that can occur during the contract execution.
#[derive(Debug, Error)]
pub enum ContractError {
    /// Failed to deserialize BCS bytes
    #[error("Failed to deserialize BCS bytes")]
    BcsError(#[from] bcs::Error),

    /// Failed to deserialize JSON string
    #[error("Failed to deserialize JSON string")]
    JsonError(#[from] serde_json::Error),
    // Add more error variants here.
    /// Requested transfer does not have permission on this account.
    #[error("The requested transfer is not correctly authenticated.")]
    IncorrectAuthentication,
}
