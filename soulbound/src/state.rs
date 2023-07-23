use linera_sdk::views::{MapView, RegisterView, ViewStorageContext};
use linera_views::views::{GraphQLView, RootView};
use soulbound::{AccountDetails, AccountId};

// User Account Details
// First Name
// Last Name
// Profile Image
// My Posts
// Messages

#[derive(RootView, GraphQLView)]
#[view(context = "ViewStorageContext")]
pub struct Application {
    pub value: RegisterView<u64>,
    pub values: MapView<AccountId, u64>,
    // Add fields here.
    pub accounts: MapView<AccountId, AccountDetails>,
}

impl Application {
    #[allow(dead_code)]
    pub fn increment(&mut self, counter: u64) {
        let v = self.value.get_mut();
        *v = *v + counter;
    }

    #[allow(dead_code)]
    pub async fn update_values(&mut self, account_id: AccountId, counter: u64) {
        let value = self.values.get(&account_id).await.unwrap().unwrap_or(0);

        self.values.insert(&account_id, value + counter).unwrap();
    }

    #[allow(dead_code)]
    pub async fn init_account(
        &mut self,
        account_id: AccountId,
        first_name: String,
        last_name: String,
        image: String,
    ) {
        let account = self.accounts.get(&account_id).await.unwrap();
        assert!(account.is_none(), "Account already exists");

        self.accounts
            .insert(
                &account_id,
                AccountDetails {
                    first_name,
                    last_name,
                    image,
                },
            )
            .unwrap();
    }

    #[allow(dead_code)]
    pub async fn update_account_data(
        &mut self,
        account_id: AccountId,
        first_name: Option<String>,
        last_name: Option<String>,
        image: Option<String>,
    ) {
        let value = self
            .accounts
            .get_mut(&account_id)
            .await
            .expect("Failed to get account")
            .expect("Account not found");

        if first_name.is_some() {
            value.first_name = first_name.unwrap();
        }
        if last_name.is_some() {
            value.last_name = last_name.unwrap();
        }

        if image.is_some() {
            value.image = image.unwrap();
        }
    }
}
