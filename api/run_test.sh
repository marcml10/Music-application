#!/bin/bash
cd /home/esaumuieh/kaita_koime/SDL/Porjedts/Form/api

# Try to use node 22 to run wrangler dev
source ~/.nvm/nvm.sh
nvm install 22
nvm use 22

# Start wrangler in background
npm run dev > wrangler_log.txt 2>&1 &
WRANGLER_PID=$!

# Wait for it to start
sleep 5

# Make the request
echo "Making request..."
curl -v http://localhost:8787/api/sync

# Wait a sec for logs to flush
sleep 2

# Kill wrangler
kill $WRANGLER_PID

# Print logs
echo "--- WRANGLER LOGS ---"
cat wrangler_log.txt
