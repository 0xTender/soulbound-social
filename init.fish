set LINERA_PATH /Users/aniketchowdhury/Experiments/0xTender/soulbound/
set LINERA_WALLET (string join '' $LINERA_PATH "target/debug/wallet.json")
set LINERA_STORAGE (string join '' "rocksdb:" $LINERA_PATH "target/debug/linera.db")

set LINERA_WALLET_2 (string join '' $LINERA_PATH "target/debug/wallet_2.json")
set LINERA_STORAGE_2 (string join '' "rocksdb:" $LINERA_PATH "target/debug/linera_2.db")