#!/bin/bash

API_KEY="API_38275e9c58520372a49404f696cab8261e3100e893db50af98854194372c975f"
BASE_URL="https://api.hyros.com/v1/api/v1.0"
TIMESTAMP=$(date +%s)

echo "=== HYROS API EXHAUSTIVE TESTING ==="
echo "Timestamp: $TIMESTAMP"
echo ""

# Store IDs for later use
LEAD_EMAIL="test-full-$TIMESTAMP@hyros-test.com"
LEAD_ID=""
SALE_ID=""
CALL_ID=""
CALL_EXTERNAL_ID="ext-call-$TIMESTAMP"
CART_ID="cart-$TIMESTAMP"
SUB_ID=""

echo "### 1. USER INFO - GET ###"
curl -s -X GET "$BASE_URL/user-info" -H "API-Key: $API_KEY" | head -c 500
echo -e "\n✅ User Info Get\n"

echo "### 2. LEAD - CREATE ###"
curl -s -X POST "$BASE_URL/leads" \
  -H "API-Key: $API_KEY" \
  -H "Content-Type: application/json" \
  -d "{\"email\": \"$LEAD_EMAIL\", \"firstName\": \"TestFull\", \"lastName\": \"User\"}"
echo -e "\n✅ Lead Create\n"

sleep 2

echo "### 3. LEAD - GET MANY ###"
LEAD_RESPONSE=$(curl -s -X GET "$BASE_URL/leads?pageSize=1" -H "API-Key: $API_KEY")
echo "$LEAD_RESPONSE" | head -c 500
LEAD_ID=$(echo "$LEAD_RESPONSE" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
echo -e "\nLead ID captured: $LEAD_ID"
echo -e "✅ Lead Get Many\n"

echo "### 4. LEAD - GET JOURNEY ###"
if [ ! -z "$LEAD_ID" ]; then
  curl -s -X GET "$BASE_URL/leads/journey?ids=\"$LEAD_ID\"" -H "API-Key: $API_KEY" | head -c 500
  echo -e "\n✅ Lead Get Journey\n"
else
  echo "⚠️ No Lead ID to test journey"
fi

echo "### 5. SALES - CREATE ###"
SALE_RESPONSE=$(curl -s -X POST "$BASE_URL/sales" \
  -H "API-Key: $API_KEY" \
  -H "Content-Type: application/json" \
  -d "{\"email\": \"$LEAD_EMAIL\", \"orderId\": \"order-$TIMESTAMP\", \"totalPrice\": 99.99}")
echo "$SALE_RESPONSE"
echo -e "✅ Sales Create\n"

sleep 2

echo "### 6. SALES - GET ALL ###"
SALES_RESPONSE=$(curl -s -X GET "$BASE_URL/sales?pageSize=3" -H "API-Key: $API_KEY")
echo "$SALES_RESPONSE" | head -c 500
SALE_ID=$(echo "$SALES_RESPONSE" | grep -o '"orderId":"[^"]*"' | head -1 | cut -d'"' -f4)
echo -e "\nSale ID captured: $SALE_ID"
echo -e "✅ Sales Get All\n"

echo "### 7. CALL - CREATE ###"
CALL_RESPONSE=$(curl -s -X POST "$BASE_URL/calls" \
  -H "API-Key: $API_KEY" \
  -H "Content-Type: application/json" \
  -d "{\"name\": \"Test Call $TIMESTAMP\", \"email\": \"$LEAD_EMAIL\", \"externalId\": \"$CALL_EXTERNAL_ID\"}")
echo "$CALL_RESPONSE"
echo -e "✅ Call Create\n"

sleep 2

echo "### 8. CALL - GET ###"
CALLS_RESPONSE=$(curl -s -X GET "$BASE_URL/calls?pageSize=3" -H "API-Key: $API_KEY")
echo "$CALLS_RESPONSE" | head -c 500
CALL_ID=$(echo "$CALLS_RESPONSE" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
echo -e "\nCall ID captured: $CALL_ID"
echo -e "✅ Call Get\n"

echo "### 9. CALL - UPDATE ###"
curl -s -X PUT "$BASE_URL/calls?externalIds=$CALL_EXTERNAL_ID&name=Updated%20Call%20Name&state=QUALIFIED" \
  -H "API-Key: $API_KEY"
echo -e "\n✅ Call Update\n"

echo "### 10. TAG - GET ALL ###"
curl -s -X GET "$BASE_URL/tags" -H "API-Key: $API_KEY" | head -c 300
echo -e "\n✅ Tag Get All\n"

echo "### 11. TAG - CREATE ###"
curl -s -X POST "$BASE_URL/tags" \
  -H "API-Key: $API_KEY" \
  -H "Content-Type: application/json" \
  -d "{\"tags\": [\"!test-tag-$TIMESTAMP\"]}"
echo -e "\n✅ Tag Create\n"

echo "### 12. PRODUCT - GET ALL ###"
curl -s -X GET "$BASE_URL/products?pageSize=3" -H "API-Key: $API_KEY" | head -c 500
echo -e "\n✅ Product Get All\n"

echo "### 13. SOURCE - GET ALL ###"
curl -s -X GET "$BASE_URL/sources?pageSize=3" -H "API-Key: $API_KEY" | head -c 500
echo -e "\n✅ Source Get All\n"

echo "### 14. AD - GET ALL ###"
curl -s -X GET "$BASE_URL/ads?pageSize=3" -H "API-Key: $API_KEY" | head -c 500
echo -e "\n✅ Ad Get All\n"

echo "### 15. STAGES - GET ALL ###"
curl -s -X GET "$BASE_URL/stages" -H "API-Key: $API_KEY" | head -c 500
echo -e "\n✅ Stages Get All\n"

echo "### 16. KEYWORD - GET ALL ###"
curl -s -X GET "$BASE_URL/keywords?pageSize=3" -H "API-Key: $API_KEY" | head -c 500
echo -e "\n✅ Keyword Get All\n"

echo "### 17. DOMAINS - GET ###"
curl -s -X GET "$BASE_URL/domains" -H "API-Key: $API_KEY" | head -c 300
echo -e "\n✅ Domains Get\n"

echo "### 18. TRACKING SCRIPT - GET ###"
curl -s -X GET "$BASE_URL/tracking-script" -H "API-Key: $API_KEY" | head -c 300
echo -e "\n✅ Tracking Script Get\n"

echo "=== TESTING COMPLETE ==="
echo "Created resources:"
echo "  Lead Email: $LEAD_EMAIL"
echo "  Lead ID: $LEAD_ID"
echo "  Sale ID: $SALE_ID"
echo "  Call External ID: $CALL_EXTERNAL_ID"
echo "  Call ID: $CALL_ID"
