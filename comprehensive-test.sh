#!/bin/bash

API_KEY="API_38275e9c58520372a49404f696cab8261e3100e893db50af98854194372c975f"
BASE_URL="https://api.hyros.com/v1/api/v1.0"
RESULTS_FILE="/c/Projects/hyros/COMPREHENSIVE_TEST_RESULTS.txt"

echo "==================================================" | tee $RESULTS_FILE
echo "HYROS API COMPREHENSIVE TESTING - ALL ENDPOINTS" | tee -a $RESULTS_FILE
echo "Started: $(date)" | tee -a $RESULTS_FILE
echo "==================================================" | tee -a $RESULTS_FILE
echo "" | tee -a $RESULTS_FILE

test_endpoint() {
    local name="$1"
    local method="$2"
    local url="$3"
    local data="$4"
    local expected_status="$5"
    
    echo "---------------------------------------------------" | tee -a $RESULTS_FILE
    echo "TEST: $name" | tee -a $RESULTS_FILE
    echo "METHOD: $method" | tee -a $RESULTS_FILE
    echo "URL: $url" | tee -a $RESULTS_FILE
    if [ ! -z "$data" ]; then
        echo "DATA: $data" | tee -a $RESULTS_FILE
    fi
    echo "" | tee -a $RESULTS_FILE
    
    if [ "$method" = "GET" ]; then
        response=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X GET "$url" -H "API-Key: $API_KEY")
    elif [ "$method" = "POST" ]; then
        response=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X POST "$url" -H "API-Key: $API_KEY" -H "Content-Type: application/json" -d "$data")
    elif [ "$method" = "PUT" ]; then
        response=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X PUT "$url" -H "API-Key: $API_KEY" -H "Content-Type: application/json" -d "$data")
    elif [ "$method" = "DELETE" ]; then
        response=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X DELETE "$url" -H "API-Key: $API_KEY")
    fi
    
    http_status=$(echo "$response" | grep "HTTP_STATUS" | cut -d: -f2)
    body=$(echo "$response" | sed '/HTTP_STATUS/d')
    
    echo "HTTP STATUS: $http_status" | tee -a $RESULTS_FILE
    echo "RESPONSE: ${body:0:500}" | tee -a $RESULTS_FILE
    
    if [ "$http_status" = "$expected_status" ]; then
        echo "✅ PASS - Got expected status $expected_status" | tee -a $RESULTS_FILE
        return 0
    else
        echo "❌ FAIL - Expected $expected_status but got $http_status" | tee -a $RESULTS_FILE
        return 1
    fi
    echo "" | tee -a $RESULTS_FILE
}

pass_count=0
fail_count=0

increment_pass() { ((pass_count++)); }
increment_fail() { ((fail_count++)); }

echo "============================================" | tee -a $RESULTS_FILE
echo "PHASE 1: GET ENDPOINTS (READ-ONLY)" | tee -a $RESULTS_FILE
echo "============================================" | tee -a $RESULTS_FILE
echo "" | tee -a $RESULTS_FILE

# 1. User Info - Get
test_endpoint "User Info - Get" "GET" "$BASE_URL/user-info" "" "200" && increment_pass || increment_fail
sleep 1

# 2. Lead - Get Many
test_endpoint "Lead - Get Many" "GET" "$BASE_URL/leads?pageSize=3" "" "200" && increment_pass || increment_fail
sleep 1

# Get a lead ID for journey test
LEAD_ID=$(curl -s -X GET "$BASE_URL/leads?pageSize=1" -H "API-Key: $API_KEY" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
echo "Captured Lead ID for testing: $LEAD_ID" | tee -a $RESULTS_FILE

# 3. Lead - Get Journey
if [ ! -z "$LEAD_ID" ]; then
    test_endpoint "Lead - Get Journey" "GET" "$BASE_URL/leads/journey?ids=$LEAD_ID" "" "200" && increment_pass || increment_fail
else
    echo "⚠️ SKIP - Lead Get Journey (no lead ID available)" | tee -a $RESULTS_FILE
fi
sleep 1

# 4. Sales - Get All
test_endpoint "Sales - Get All" "GET" "$BASE_URL/sales?pageSize=3" "" "200" && increment_pass || increment_fail
sleep 1

# 5. Call - Get
test_endpoint "Call - Get" "GET" "$BASE_URL/calls?pageSize=3" "" "200" && increment_pass || increment_fail
sleep 1

# 6. Click - Get
test_endpoint "Click - Get (by email)" "GET" "$BASE_URL/leads/clicks?email=testlead@example.com&pageSize=3" "" "200" && increment_pass || increment_fail
sleep 1

# 7. Subscription - Get
test_endpoint "Subscription - Get" "GET" "$BASE_URL/subscriptions?pageSize=3" "" "200" && increment_pass || increment_fail
sleep 1

# 8. Product - Get All
test_endpoint "Product - Get All" "GET" "$BASE_URL/products?pageSize=3" "" "200" && increment_pass || increment_fail
sleep 1

# 9. Tag - Get All
test_endpoint "Tag - Get All" "GET" "$BASE_URL/tags" "" "200" && increment_pass || increment_fail
sleep 1

# 10. Source - Get All
test_endpoint "Source - Get All" "GET" "$BASE_URL/sources?pageSize=3" "" "200" && increment_pass || increment_fail
sleep 1

# 11. Ad - Get All
test_endpoint "Ad - Get All" "GET" "$BASE_URL/ads?pageSize=3" "" "200" && increment_pass || increment_fail
sleep 1

# 12. Stages - Get All
test_endpoint "Stages - Get All" "GET" "$BASE_URL/stages" "" "200" && increment_pass || increment_fail
sleep 1

# 13. Keyword - Get All (may fail if no Google V2 account)
test_endpoint "Keyword - Get All" "GET" "$BASE_URL/keywords?pageSize=3" "" "200" && increment_pass || increment_fail
sleep 1

# 14. Domains - Get
test_endpoint "Domains - Get" "GET" "$BASE_URL/domains" "" "200" && increment_pass || increment_fail
sleep 1

# 15. Tracking Script - Get
test_endpoint "Tracking Script - Get" "GET" "$BASE_URL/tracking-script" "" "200" && increment_pass || increment_fail
sleep 1

echo "" | tee -a $RESULTS_FILE
echo "============================================" | tee -a $RESULTS_FILE
echo "PHASE 1 SUMMARY" | tee -a $RESULTS_FILE
echo "============================================" | tee -a $RESULTS_FILE
echo "✅ Passed: $pass_count" | tee -a $RESULTS_FILE
echo "❌ Failed: $fail_count" | tee -a $RESULTS_FILE
echo "Total: $((pass_count + fail_count))" | tee -a $RESULTS_FILE
echo "" | tee -a $RESULTS_FILE

echo "Completed: $(date)" | tee -a $RESULTS_FILE
echo "Full results saved to: $RESULTS_FILE"


# Reset counters for Phase 2
pass_count=0
fail_count=0

TIMESTAMP=$(date +%s)

echo "" | tee -a $RESULTS_FILE
echo "============================================" | tee -a $RESULTS_FILE
echo "PHASE 2: POST ENDPOINTS (CREATE)" | tee -a $RESULTS_FILE
echo "============================================" | tee -a $RESULTS_FILE
echo "" | tee -a $RESULTS_FILE

# Store created IDs for later use
TEST_LEAD_EMAIL="test-phase2-$TIMESTAMP@hyros-test.com"
TEST_LEAD_ID=""
TEST_SALE_ID="sale-$TIMESTAMP"
TEST_CALL_EXTERNAL_ID="call-ext-$TIMESTAMP"
TEST_CART_ID="cart-$TIMESTAMP"
TEST_SUB_ID=""

# 1. Lead - Create
test_endpoint "Lead - Create" "POST" "$BASE_URL/leads" \
  "{\"email\": \"$TEST_LEAD_EMAIL\", \"firstName\": \"Phase2\", \"lastName\": \"TestLead\"}" \
  "200" && increment_pass || increment_fail
sleep 2

# Get the created lead ID
LEAD_RESPONSE=$(curl -s -X GET "$BASE_URL/leads?emails=\"$TEST_LEAD_EMAIL\"&pageSize=1" -H "API-Key: $API_KEY")
TEST_LEAD_ID=$(echo "$LEAD_RESPONSE" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
echo "Created Lead ID: $TEST_LEAD_ID" | tee -a $RESULTS_FILE
sleep 1

# 2. Sales - Create (requires valid email)
test_endpoint "Sales - Create" "POST" "$BASE_URL/sales" \
  "{\"email\": \"$TEST_LEAD_EMAIL\", \"orderId\": \"$TEST_SALE_ID\", \"totalPrice\": 149.99, \"productTags\": [\"#test-product\"]}" \
  "200" && increment_pass || increment_fail
sleep 2

# 3. Order - Create
test_endpoint "Order - Create" "POST" "$BASE_URL/orders" \
  "{\"email\": \"$TEST_LEAD_EMAIL\", \"orderId\": \"order-$TIMESTAMP\", \"items\": [{\"name\": \"Test Product\", \"price\": 99.99, \"quantity\": 1, \"productTags\": [\"#test\"]}]}" \
  "200" && increment_pass || increment_fail
sleep 2

# 4. Call - Create
test_endpoint "Call - Create" "POST" "$BASE_URL/calls" \
  "{\"name\": \"Test Call Phase 2\", \"email\": \"$TEST_LEAD_EMAIL\", \"externalId\": \"$TEST_CALL_EXTERNAL_ID\"}" \
  "200" && increment_pass || increment_fail
sleep 2

# 5. Cart - Create
test_endpoint "Cart - Create" "POST" "$BASE_URL/carts" \
  "{\"cartId\": \"$TEST_CART_ID\", \"email\": \"$TEST_LEAD_EMAIL\", \"items\": [{\"name\": \"Test Cart Item\", \"price\": 49.99, \"quantity\": 2}]}" \
  "200" && increment_pass || increment_fail
sleep 2

# 6. Click - Create
test_endpoint "Click - Create" "POST" "$BASE_URL/clicks" \
  "{\"email\": \"$TEST_LEAD_EMAIL\", \"trackedUrl\": \"https://test.example.com/click-$TIMESTAMP\", \"page\": \"https://test.example.com\"}" \
  "200" && increment_pass || increment_fail
sleep 2

# 7. Subscription - Create
test_endpoint "Subscription - Create" "POST" "$BASE_URL/subscriptions" \
  "{\"subscriptionId\": \"sub-test-$TIMESTAMP\", \"email\": \"$TEST_LEAD_EMAIL\", \"name\": \"Test Subscription\", \"price\": 29.99, \"status\": \"ACTIVE\", \"periodicity\": \"MONTH\"}" \
  "200" && increment_pass || increment_fail
sleep 2

# 8. Product - Create
test_endpoint "Product - Create" "POST" "$BASE_URL/products" \
  "{\"productTag\": \"#test-product-$TIMESTAMP\", \"price\": 99.99, \"name\": \"Test Product $TIMESTAMP\"}" \
  "200" && increment_pass || increment_fail
sleep 2

# 9. Tag - Create
test_endpoint "Tag - Create" "POST" "$BASE_URL/tags" \
  "{\"tags\": [\"!test-tag-phase2-$TIMESTAMP\"]}" \
  "200" && increment_pass || increment_fail
sleep 2

# 10. Custom Cost - Create
test_endpoint "Custom Cost - Create" "POST" "$BASE_URL/custom-costs" \
  "{\"date\": \"2026-02-02T12:00:00-05:00\", \"cost\": 100.50, \"adAccountId\": \"test-account-$TIMESTAMP\", \"platform\": \"OTHER\"}" \
  "200" && increment_pass || increment_fail
sleep 2

echo "" | tee -a $RESULTS_FILE
echo "============================================" | tee -a $RESULTS_FILE
echo "PHASE 2 SUMMARY" | tee -a $RESULTS_FILE
echo "============================================" | tee -a $RESULTS_FILE
echo "✅ Passed: $pass_count" | tee -a $RESULTS_FILE
echo "❌ Failed: $fail_count" | tee -a $RESULTS_FILE
echo "Total: $((pass_count + fail_count))" | tee -a $RESULTS_FILE
echo "" | tee -a $RESULTS_FILE

echo "Phase 2 Completed: $(date)" | tee -a $RESULTS_FILE

# Save created IDs for Phase 3 (UPDATE tests)
echo "TEST_LEAD_EMAIL=$TEST_LEAD_EMAIL" > /c/Projects/hyros/test-ids.env
echo "TEST_LEAD_ID=$TEST_LEAD_ID" >> /c/Projects/hyros/test-ids.env
echo "TEST_SALE_ID=$TEST_SALE_ID" >> /c/Projects/hyros/test-ids.env
echo "TEST_CALL_EXTERNAL_ID=$TEST_CALL_EXTERNAL_ID" >> /c/Projects/hyros/test-ids.env
echo "TEST_CART_ID=$TEST_CART_ID" >> /c/Projects/hyros/test-ids.env

