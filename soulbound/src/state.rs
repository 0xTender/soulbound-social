use async_graphql::SimpleObject;
use linera_sdk::views::{CustomCollectionView, MapView, RegisterView, ViewStorageContext};
use linera_views::views::{GraphQLView, RootView, View};
use serde::{Deserialize, Serialize};
use soulbound::{AccountDetails, AccountId, Like, Post};

// User Account Details
// First Name
// Last Name
// Profile Image
// My Posts
// Messages

#[derive(Clone, Debug, Deserialize, Serialize, SimpleObject)]
pub struct OrderEntry {
    pub owner: AccountId,
}

#[derive(View, GraphQLView)]
#[view(context = "ViewStorageContext")]
pub struct LevelView {
    pub account: MapView<AccountId, bool>,
}

#[derive(RootView, GraphQLView)]
#[view(context = "ViewStorageContext")]
pub struct Application {
    pub value: RegisterView<u64>,
    pub values: MapView<AccountId, u64>,
    // Add fields here.
    pub accounts: MapView<AccountId, AccountDetails>,
    // post_id
    pub current_post_id: RegisterView<u64>,
    // posts (post_id, post)
    pub posts: MapView<u64, Post>,

    pub likes: CustomCollectionView<Like, LevelView>,
    pub likes_count: MapView<u64, u64>,
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
        username: String,
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
                    username,
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

    #[allow(dead_code)]
    pub async fn add_post(&mut self, author: AccountId, text: String) {
        let post_id = self.current_post_id.get_mut();
        *post_id = *post_id + 1;

        self.posts
            .insert(&post_id, Post { author, text })
            .expect("Adding post failed");
    }

    #[allow(dead_code)]
    pub async fn like_post(&mut self, owner: AccountId, post_id: u64) {
        let like = Like { post_id };
        let latest_post_id = self.current_post_id.get_mut();

        assert!(
            post_id <= *latest_post_id,
            "Post does not exist. Latest post id: {}, post id: {}",
            latest_post_id,
            post_id
        );

        let likes_count = match self.likes_count.get_mut(&post_id).await.unwrap() {
            Some(count) => count,
            None => {
                self.likes_count.insert(&post_id, 0).unwrap();
                self.likes_count.get_mut(&post_id).await.unwrap().unwrap()
            }
        };

        let view = self.likes.load_entry_mut(&like).await.unwrap();
        if view.account.get(&owner).await.unwrap().is_none() {
            view.account.insert(&owner, true).unwrap();
            *likes_count += 1;
        } else {
            view.account.remove(&owner).unwrap();
            *likes_count -= 1;
        }
    }
}
