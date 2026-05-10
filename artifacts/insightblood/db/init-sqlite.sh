#!/usr/bin/env bash
set -euo pipefail

DB_PATH="${1:-./db/insightblood.sqlite}"
SCHEMA_PATH="$(dirname "$0")/schema.sql"

mkdir -p "$(dirname "$DB_PATH")"
sqlite3 "$DB_PATH" < "$SCHEMA_PATH"
echo "Initialized SQLite database at: $DB_PATH"
