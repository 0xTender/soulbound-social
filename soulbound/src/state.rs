use async_graphql::SimpleObject;
use linera_sdk::views::{MapView, RegisterView, ViewStorageContext};
use linera_views::views::{GraphQLView, RootView};
use soulbound::AccountId;

// User Account Details
// First Name
// Last Name
// Profile Image
// My Posts
// Messages

#[derive(Clone, Debug, serde::Serialize, serde::Deserialize, SimpleObject)]
pub struct AccountDetails {
    pub first_name: String,
    pub last_name: String,
    pub image: String,
}

#[derive(RootView, GraphQLView)]
#[view(context = "ViewStorageContext")]
pub struct Application {
    pub value: RegisterView<u64>,
    // Add fields here.
    pub accounts: MapView<AccountId, AccountDetails>,
}

impl Application {
    #[allow(dead_code)]
    pub fn increment(&mut self, counter: u64) {
        let v = self.value.get_mut();
        *v = *v + counter;
    }
}
