#![cfg_attr(target_arch = "wasm32", no_main)]

mod state;

use self::state::Application;
use async_graphql::{EmptySubscription, Object, Schema};
use async_trait::async_trait;
use linera_sdk::{base::WithServiceAbi, QueryContext, Service, ViewStateStorage};
use soulbound::{AccountId, Operation};
use std::{sync::Arc, u64};
use thiserror::Error;

linera_sdk::service!(Application);

impl WithServiceAbi for Application {
    type Abi = soulbound::ApplicationAbi;
}

#[async_trait]
impl Service for Application {
    type Error = ServiceError;
    type Storage = ViewStateStorage<Self>;

    async fn query_application(
        self: Arc<Self>,
        _context: &QueryContext,
        request: Self::Query,
    ) -> Result<Self::QueryResponse, Self::Error> {
        let schema = Schema::build(self.clone(), MutationRoot {}, EmptySubscription).finish();
        let response = schema.execute(request).await;
        Ok(response)
    }
}

struct MutationRoot;

#[Object]
impl MutationRoot {
    async fn update_counter(&self, counter: u64) -> Vec<u8> {
        bcs::to_bytes(&Operation::UpdateCounter { counter }).unwrap()
    }

    async fn update_counter_personal(&self, account_id: AccountId, counter: u64) -> Vec<u8> {
        bcs::to_bytes(&Operation::UpdateCounterPersonal {
            account_id,
            counter,
        })
        .unwrap()
    }

    async fn create_account(
        &self,
        account_id: AccountId,
        first_name: String,
        last_name: String,
        image: String,
    ) -> Vec<u8> {
        bcs::to_bytes(&Operation::CreateAccount {
            account_id,
            first_name,
            last_name,
            image,
        })
        .unwrap()
    }

    async fn update_account_data(
        &self,
        account_id: AccountId,
        first_name: Option<String>,
        last_name: Option<String>,
        image: Option<String>,
    ) -> Vec<u8> {
        bcs::to_bytes(&Operation::UpdateAccountData {
            account_id,
            first_name,
            last_name,
            image,
        })
        .unwrap()
    }

    async fn add_post(&self, author: AccountId, text: String) -> Vec<u8> {
        bcs::to_bytes(&Operation::AddPost { author, text }).unwrap()
    }

    async fn like_post(&self, owner: AccountId, post_id: u64) -> Vec<u8> {
        bcs::to_bytes(&Operation::LikePost { owner, post_id }).unwrap()
    }
}

/// An error that can occur while querying the service.
#[derive(Debug, Error)]
pub enum ServiceError {
    /// Query not supported by the application.
    #[error("Queries not supported by application")]
    QueriesNotSupported,

    /// Invalid query argument; could not deserialize request.
    #[error("Invalid query argument; could not deserialize request")]
    InvalidQuery(#[from] serde_json::Error),
    // Add error variants here.
}
