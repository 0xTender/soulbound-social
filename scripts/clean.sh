#!/bin/bash
SCRIPT_DIR="${LINERA_PATH}/target/debug"

echo $SCRIPT_DIR

cd $SCRIPT_DIR

# Clean up data files
rm -rf *.json *.txt *.db