## SoundBound Social Platform

- Cross Chain Communication
- Post Information
- Like Posts

# Development Details for Fish CLI

```fish
set -gx LINERA_PATH /Users/aniketchowdhury/Experiments/0xTender/linera-protocol/

set -gx LINERA_WALLET (string join '' $LINERA_PATH "target/debug/wallet.json")
set -gx LINERA_STORAGE (string join '' "rocksdb:" $LINERA_PATH "target/debug/linera.db")

set -gx LINERA_WALLET_2 (string join '' $LINERA_PATH "target/debug/wallet_2.json")
set -gx LINERA_STORAGE_2 (string join '' "rocksdb:" $LINERA_PATH "target/debug/linera_2.db")

cargo build --release

linera --wallet $LINERA_WALLET --storage $LINERA_STORAGE publish-and-create target/wasm32-unknown-unknown/release/soulbound_{contract,service}.wasm

linera --wallet $LINERA_WALLET --storage $LINERA_STORAGE wallet show

linera --wallet $LINERA_WALLET --storage $LINERA_STORAGE service --port 8080

```
