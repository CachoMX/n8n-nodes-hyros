# Hyros API Complete Endpoints Documentation

**Base URL:** `https://api.hyros.com/v1`
**API Version:** 1.31
**Authentication:** API-Key header required for all requests

## Authentication
All endpoints require an API-Key header:
```
API-Key: b12a19f4521d44abc8d613efca7f9c23c88
```

## Status Codes
- `200 OK` - Successful request
- `400 Bad Request` - Malformed request or validation errors
- `401 Unauthorized` - Wrong or missing API-Key
- `429 Too Many Requests` - Rate limit exceeded

---

## 1. LEADS

### 1.1 Retrieve Leads
**Endpoint:** `GET /api/v1.0/leads`

**Query Parameters:**
- `ids` (optional, array) - Array of lead ids (max 50)
- `emails` (optional, array) - Array of emails or email prefixes (max 50)
- `fromDate` (optional, string) - ISO 8601 formatted date
- `toDate` (optional, string) - ISO 8601 formatted date
- `pageSize` (optional, number) - Max results per page (1-250)
- `pageId` (optional, string) - ID for next page

**Authentication:** Required (API-Key header)

**Response Structure:**
```json
{
  "result": [
    {
      "email": "string",
      "id": "string",
      "creationDate": "string",
      "tags": ["string"],
      "ips": ["string"],
      "phoneNumbers": ["string"],
      "provider": {
        "id": "string",
        "integration": {
          "name": "string",
          "type": "string",
          "id": "string"
        }
      }
    }
  ],
  "nextPageId": "string",
  "request_id": "string"
}
```

**Errors:**
- ids: Maximum 50 ids allowed
- emails: Maximum 50 emails allowed
- from_date/to_date: Invalid date format
- pageSize: Must be between 1 and 250

---

### 1.2 Create Lead
**Endpoint:** `POST /api/v1.0/leads`

**Request Body:**
```json
{
  "email": "string (optional)",
  "firstName": "string (optional)",
  "lastName": "string (optional)",
  "tags": ["string (optional)"],
  "leadIps": ["string (optional)"],
  "phoneNumbers": ["string (optional)"],
  "stage": "string (optional)"
}
```

**Notes:**
- Either `email` or `phoneNumbers` is required
- If tag matches a Product tag, a sale will be generated

**Response:**
```json
{
  "request_id": "string",
  "result": "OK"
}
```

**Errors:**
- email: Email is not valid / Required if no phone number
- phoneNumbers: Required if no email

---

### 1.3 Retrieve Leads Journey
**Endpoint:** `GET /api/v1.0/leads/journey`

**Query Parameters:**
- `ids` (required, array) - Array of lead IDs

**Authentication:** Required (API-Key header)

**Response Structure:**
```json
{
  "result": [
    {
      "lead": {
        "email": "string",
        "id": "string",
        "creationDate": "string",
        "isOriginLead": "boolean",
        "tags": ["string"],
        "provider": {}
      },
      "sales": [
        {
          "id": "string",
          "orderId": "string",
          "recurring": "boolean",
          "quantity": "number",
          "creationDate": "string",
          "qualified": "boolean",
          "score": "number",
          "product": {},
          "price": {},
          "usdPrice": {},
          "provider": {},
          "firstSource": {},
          "lastSource": {}
        }
      ],
      "calls": [],
      "carts": [],
      "linkedLeads": []
    }
  ]
}
```

---

## 2. SALES

### 2.1 Retrieve Sales
**Endpoint:** `GET /api/v1.0/sales`

**Query Parameters:**
- `ids` (optional, array) - Array of sale ids (max 50)
- `emails` (optional, array) - Array of emails (max 50)
- `leadIds` (optional, array) - Array of lead ids (max 50)
- `productTags` (optional, array) - Array of product tags (max 20)
- `isRecurringSale` (optional, string) - Values: `RECURRING`, `NON_RECURRING`, `ALL` (default: ALL)
- `saleRefundedState` (optional, string) - Values: `REFUNDED`, `NON_REFUNDED`, `ALL` (default: ALL)
- `fromDate` (optional, string) - ISO 8601 formatted date
- `toDate` (optional, string) - ISO 8601 formatted date
- `pageSize` (optional, number) - Range: 1-250
- `pageId` (optional, string) - Next page ID

**Authentication:** Required (API-Key header)

**Response Structure:**
```json
{
  "result": [
    {
      "id": "string",
      "orderId": "string",
      "creationDate": "string",
      "qualified": "boolean",
      "score": "number",
      "recurring": "boolean",
      "quantity": "number",
      "lead": {
        "email": "string",
        "id": "string",
        "creationDate": "string",
        "ips": ["string"],
        "tags": ["string"]
      },
      "firstSource": {},
      "lastSource": {},
      "price": {
        "price": "number",
        "discount": "number",
        "hardCost": "number",
        "refunded": "number",
        "currency": "string"
      },
      "product": {
        "id": "string",
        "name": "string",
        "tag": "string",
        "category": {}
      },
      "provider": {}
    }
  ],
  "nextPageId": "string",
  "request_id": "string"
}
```

**Errors:**
- ids: Maximum 50 ids
- emails: Maximum 50 emails
- leadIds: Maximum 50 ids
- productTags: Maximum 20 tags
- isRecurringSale/saleRefundedState: Invalid value
- pageSize: Must be between 1 and 250

---

### 2.2 Update Sales
**Endpoint:** `PUT /api/v1.0/sales`

**Query Parameters:**
- `ids` (required, array) - Array of sale ids (max 50)
- `isRecurringSale` (optional, boolean) - Set recurring status
- `isRefunded` (optional, boolean) - Set refunded status
- `refundedDate` (optional, string) - ISO 8601 date (required if isRefunded=true)
- `refundedAmount` (optional, string) - Amount to refund

**Authentication:** Required (API-Key header)

**Response:**
```json
{
  "request_id": "string",
  "result": "OK"
}
```

---

### 2.3 Delete Sale
**Endpoint:** `DELETE /api/v1.0/sales/{id}`

**Path Parameters:**
- `id` (required, string) - Sale ID to delete

**Authentication:** Required (API-Key header)

**Response:**
```json
{
  "request_id": "string",
  "result": "OK"
}
```

---

## 3. ORDERS

### 3.1 Create Order
**Endpoint:** `POST /api/v1.0/orders`

**Request Body:**
```json
{
  "email": "string (optional)",
  "parentEmail": "string (optional)",
  "firstName": "string (optional)",
  "lastName": "string (optional)",
  "leadIps": ["string (optional)"],
  "stage": "string (optional)",
  "phoneNumbers": ["string (optional)"],
  "orderId": "string (optional)",
  "externalSubscriptionId": "string (optional)",
  "cartId": "string (optional)",
  "date": "string (optional, ISO 8601)",
  "shippingCost": "number (optional, default: 0)",
  "taxes": "number (optional, default: 0)",
  "orderDiscount": "number (optional)",
  "priceFormat": "string (optional, values: DECIMAL, INTEGER, default: DECIMAL)",
  "currency": "string (optional)",
  "items": [
    {
      "name": "string (required)",
      "price": "number (required)",
      "externalId": "string (optional)",
      "quantity": "number (optional, default: 1)",
      "costOfGoods": "number (optional, default: 0)",
      "taxes": "number (optional, default: 0)",
      "itemDiscount": "number (optional)",
      "packages": ["string (optional)"],
      "tag": "string (optional)",
      "categoryName": "string (optional)"
    }
  ]
}
```

**Notes:**
- Either `email` or `phoneNumbers` is required
- `items` array must have at least 1 item
- `orderId` only accepts letters, numbers, underscores, hyphens, periods, colons (no spaces)

**Authentication:** Required (API-Key header)

**Response:**
```json
{
  "request_id": "string",
  "result": "OK"
}
```

**Errors:**
- email: Email is not valid / Required if no phone number
- parentEmail: parentEmail is not valid
- phoneNumbers: Required if no email
- date: Invalid date format
- shippingCost/taxes/orderDiscount: Invalid format
- currency: Invalid currency
- items: Various validation errors per item

---

### 3.2 Refund Order
**Endpoint:** `DELETE /api/v1.0/orders/{id}`

**Path Parameters:**
- `id` (required, string) - Order ID to refund

**Query Parameters:**
- `refundedAmount` (optional, string) - Amount to refund

**Authentication:** Required (API-Key header)

**Response:**
```json
{
  "request_id": "string",
  "result": "OK"
}
```

---

## 4. CALLS

### 4.1 Retrieve Calls
**Endpoint:** `GET /api/v1.0/calls`

**Query Parameters:**
- `ids` (optional, array) - Array of call ids (max 50)
- `emails` (optional, array) - Array of emails (max 50)
- `leadIds` (optional, array) - Array of lead ids (max 50)
- `productTags` (optional, array) - Array of product tags (max 20)
- `fromDate` (optional, string) - ISO 8601 formatted date
- `toDate` (optional, string) - ISO 8601 formatted date
- `pageSize` (optional, number) - Range: 1-250
- `pageId` (optional, string) - Next page ID
- `qualified` (optional, boolean) - Filter by qualification status
- `qualificationStages` (optional, array) - Array of qualification stage names (max 50)
- `state` (optional, enum) - Values: `QUALIFIED`, `UNQUALIFIED`, `CANCELLED`, `NO_SHOW`

**Authentication:** Required (API-Key header)

**Response Structure:**
```json
{
  "result": [
    {
      "id": "string",
      "tag": "string",
      "qualified": "boolean",
      "score": "number",
      "creationDate": "string",
      "state": "string",
      "qualification": {
        "name": "string",
        "oldName": "string"
      },
      "lead": {},
      "firstSource": {},
      "lastSource": {}
    }
  ],
  "nextPageId": "string",
  "request_id": "string"
}
```

**Errors:**
- ids: Maximum 50 ids
- emails: Maximum 50 emails
- leadIds: Maximum 50 ids
- productTags: Maximum 20 tags
- pageSize: Must be between 1 and 250

---

### 4.2 Create Call
**Endpoint:** `POST /api/v1.0/calls`

**Request Body:**
```json
{
  "name": "string (required)",
  "email": "string (required)",
  "firstName": "string (optional)",
  "lastName": "string (optional)",
  "leadIps": ["string (optional)"],
  "stage": "string (optional)",
  "phoneNumbers": ["string (optional)"],
  "id": "string (optional)",
  "date": "string (optional, ISO 8601)",
  "qualified": "boolean (optional, DEPRECATED - use state)",
  "qualification": "string (optional)",
  "state": "string (optional, values: QUALIFIED, UNQUALIFIED, CANCELLED, NO_SHOW)"
}
```

**Authentication:** Required (API-Key header)

**Response:**
```json
{
  "request_id": "string",
  "result": "OK"
}
```

---

### 4.3 Update Calls
**Endpoint:** `PUT /api/v1.0/calls`

**Query Parameters:**
- `ids` (required, array) - Array of call ids (max 50)
- `qualification` (optional, string) - Call qualification name
- `state` (optional, enum) - Values: `QUALIFIED`, `UNQUALIFIED`, `CANCELLED`, `NO_SHOW`
- `qualified` (optional, boolean) - DEPRECATED, use state instead

**Authentication:** Required (API-Key header)

**Response:**
```json
{
  "request_id": "string",
  "result": "OK"
}
```

---

### 4.4 Delete Call
**Endpoint:** `DELETE /api/v1.0/calls/{id}`

**Path Parameters:**
- `id` (required, string) - Call ID to delete

**Authentication:** Required (API-Key header)

**Response:**
```json
{
  "request_id": "string",
  "result": "OK"
}
```

---

## 5. AD ATTRIBUTION

### 5.1 Get Ads Attribution Report
**Endpoint:** `GET /api/v1.0/attribution`

**Query Parameters:**
- `attributionModel` (required, enum) - Values: `last_click`, `scientific`, `first_click`
- `startDate` (required, string) - ISO 8601 formatted date
- `endDate` (required, string) - ISO 8601 formatted date
- `level` (required, enum) - Values:
  - `google_campaign`
  - `google_v2_adgroup` (only for Google v2 integration)
  - `google_ad`
  - `google_v2_keyword` (only for Google v2 integration)
  - `facebook_adset`
  - `tiktok_adgroup`
  - `snapchat_adsquad`
  - `pinterest_adgroup`
  - `twitter_adgroup`
  - `bing_adgroup`
  - `linkedin_campaign`
  - `facebook_ad`
  - `tiktok_ad`
  - `snapchat_ad`
  - `pinterest_ad`
  - `bing_ad`
- `fields` (required, string) - Comma-separated list of metrics:
  - `sales`, `revenue`, `calls`, `total_revenue`, `recurring_revenue`
  - `refund`, `unique_sales`, `leads`, `new_leads`, `cost`
  - `profit`, `roi`, `roas`, `refund_count`, `refund_sales_percentage`
  - `refund_revenue_percentage`, `cost_per_call`, `cost_per_lead`
  - `cost_per_sale`, `cost_per_new_lead`, `cost_per_unique_sale`
  - `unique_customers`, `unique_customers_revenue`, `cost_per_unique_customer`
  - `net_profit`, `hard_costs`, `qualified_calls`, `unqualified_calls`
  - `cost_per_qualified_call`, `time_of_sale_attribution`, `time_of_call_attribution`
  - `clicks`, `new_visits`, `cost_per_new_visit`, `cost_per_click`
  - `reported`, `reported_result`, `shop_reported_result`, `reported_vs_revenue`
  - `new_customers_percentage`, `recurring_customers`, `total_customers`, `customers`
  - `ctr`, `cpm`, `cvr`, `impressions`, `gross_margins`
  - `partial_video_views`, `unique_calls`, `canceled_calls`, `cost_per_unique_call`
  - `net_profit_percentage`, `taxes`, `cost_of_goods`, `shipping_value`
  - `30_days_ltv`, `60_days_ltv`, `90_days_ltv`, `6_months_ltv`, `1_year_ltv`
  - `30_days_ltv_forecast`, `60_days_ltv_forecast`, `90_days_ltv_forecast`
  - `6_months_ltv_forecast`, `1_year_ltv_forecast`, `churn_rate`, `one_time_sales`
  - `subscription_30_days_forecast`, `subscription_60_days_forecast`, `subscription_90_days_forecast`
  - `subscription_6_months_forecast`, `subscription_1_year_forecast`
  - `cac`, `aov`, `new_subscriptions`, `canceled_subscriptions`, `direct_subscriptions`
  - `new_mrr`, `new_trials`, `converted_trials`, `canceled_trials`
  - `cost_per_new_subscriptions`, `cost_per_new_trials`
  - `carts`, `atc_events`, `purchased_carts`, `atc_cvr`, `atc_rate`, `cost_per_atc`
  - `name`, `parent_name`
- `ids` (required, string) - Comma-separated IDs based on level (or ad account ID if isAdAccountId=true)
- `keywordsIds` (optional, string) - Map of ad group ids and keywords (format: `66457534290:[391764277422,10000010]`)
- `currency` (optional, string) - Values: `user_currency` (default), `usd`
- `dayOfAttribution` (optional, boolean) - Default: false
- `scientificDaysRange` (optional, number) - Range: 1-30, default: 30
- `sourceConfiguration` (optional, enum) - Values: `all_sources`, `only_organic`, `only_paid`, `prioritize_organic`, `prioritize_paid`
- `ignoreRecurringSales` (optional, boolean) - Default: false
- `isAdAccountId` (optional, boolean) - Default: false
- `forecastingOption` (optional, enum) - Values: `first_sale` (default), `total_sales`
- `windowAttributionDaysRange` (optional, number) - Range: 0-365, default: 0
- `newCustomerConfiguration` (optional, enum) - Values: `all_customers` (default), `only_returning_customers`, `only_unique_customers`

**Authentication:** Required (API-Key header)

**Response Structure:**
```json
{
  "result": [
    {
      "id": "string",
      "revenue": "number",
      "sales": "number",
      "calls": "number",
      "campaign_id": "string"
    }
  ],
  "request_id": "string"
}
```

**Errors:**
- attributionModel: Missing or invalid
- startDate/endDate: Missing or invalid
- level: Missing or invalid/unsupported
- fields: Missing or invalid
- ids: Missing required field
- currency: Invalid currency
- scientificDaysRange: Invalid range

---

### 5.2 Get Ad Accounts Attribution Report
**Endpoint:** `GET /api/v1.0/attribution/ad-account`

**Query Parameters:**
- `attributionModel` (required, enum) - Values: `last_click`, `scientific`, `first_click`
- `startDate` (required, string) - ISO 8601 formatted date
- `endDate` (required, string) - ISO 8601 formatted date
- `fields` (required, string) - Same fields as Ad Attribution endpoint
- `ids` (required, string) - Single Ad Account ID only
- `currency` (optional, string) - Values: `user_currency` (default), `usd`
- `dayOfAttribution` (optional, boolean) - Default: false
- `scientificDaysRange` (optional, number) - Range: 1-30, default: 30
- `sourceConfiguration` (optional, enum) - Values: `all_sources`, `only_organic`, `only_paid`, `prioritize_organic`, `prioritize_paid`
- `dateTimeGroupingOption` (optional, enum) - Values: `ad_account` (default), `day`, `week`, `month`, `year`
- `ignoreRecurringSales` (optional, boolean) - Default: false
- `forecastingOption` (optional, enum) - Values: `first_sale` (default), `total_sales`
- `windowAttributionDaysRange` (optional, number) - Range: 0-365, default: 0
- `newCustomerConfiguration` (optional, enum) - Values: `all_customers` (default), `only_returning_customers`, `only_unique_customers`

**Authentication:** Required (API-Key header)

**Response Structure:**
```json
{
  "result": [
    {
      "id": "string",
      "sales": "number",
      "leads": "number",
      "total_revenue": "number",
      "cost": "number",
      "cost_per_sale": "number",
      "start_date": "string",
      "end_date": "string"
    }
  ],
  "request_id": "string"
}
```

**Errors:**
- startDate/endDate: Missing or invalid
- fields: Missing or invalid
- ids: Missing or more than one ad account id
- currency: Invalid currency
- scientificDaysRange: Invalid range

---

## 6. PRODUCTS

### 6.1 Create Product
**Endpoint:** `POST /api/v1.0/products`

**Request Body:**
```json
{
  "name": "string (required)",
  "price": "number (required)",
  "category": "string (optional)",
  "packages": ["string (optional)"]
}
```

**Notes:**
- Tag will be created automatically from product name

**Authentication:** Required (API-Key header)

**Response:**
```json
{
  "request_id": "string",
  "result": "OK"
}
```

**Errors:**
- name: Missing or empty
- price: Cannot be null or invalid format

---

## 7. TAGS

### 7.1 List All Tags
**Endpoint:** `GET /api/v1.0/tags`

**Authentication:** Required (API-Key header)

**Response Structure:**
```json
{
  "request_id": "string",
  "result": ["!tag1", "!tag2", "$sale1"]
}
```

---

## 8. SOURCES

### 8.1 List All Sources
**Endpoint:** `GET /api/v1.0/sources`

**Query Parameters:**
- `adSourceIds` (optional, array) - Array of ad source IDs
- `includeOrganic` (optional, boolean) - Include organic sources
- `includeDisregarded` (optional, boolean) - Include disregarded sources
- `integrationType` (optional, enum) - Values: `FACEBOOK`, `GOOGLE`, `SNAPCHAT`, `TIKTOK`, `TWITTER`, `LINKEDIN`, `PINTEREST`, `BING`
- `pageSize` (optional, number) - Range: 0-250
- `pageId` (optional, string) - Next page ID

**Authentication:** Required (API-Key header)

**Response Structure:**
```json
{
  "result": [
    {
      "name": "string",
      "tag": "string",
      "disregarded": "boolean",
      "organic": "boolean",
      "adSource": {
        "adSourceId": "string",
        "adAccountId": "string",
        "platform": "string"
      },
      "trafficSource": {},
      "goal": {},
      "category": {},
      "creationDate": "number"
    }
  ],
  "nextPageId": "string",
  "request_id": "string"
}
```

---

### 8.2 Create Source
**Endpoint:** `POST /api/v1.0/sources`

**Request Body:**
```json
{
  "name": "string (required)",
  "category": "string (optional)",
  "goal": "string (optional)",
  "trafficSource": "string (optional)",
  "isDisregard": "boolean (optional)",
  "isOrganic": "boolean (optional)",
  "integrationType": "string (optional, enum: FACEBOOK, GOOGLE, TIKTOK, SNAPCHAT, LINKEDIN, TWITTER, PINTEREST, BING)",
  "adSourceId": "string (optional, required if integrationType present)",
  "accountId": "string (optional, required if integrationType present)",
  "adspendSubType": "string (optional, enum: DISPLAY, VIDEO - required for GOOGLE)",
  "campaignId": "string (optional, required for FACEBOOK)"
}
```

**Notes:**
- For Facebook: adSourceId = adset id
- For Google: adSourceId = campaign id
- For TikTok: adSourceId = ad group id
- For Snapchat: adSourceId = ad squad id
- For LinkedIn: adSourceId = campaign id

**Authentication:** Required (API-Key header)

**Response:**
```json
{
  "request_id": "string",
  "result": "OK"
}
```

**Errors:**
- name: Invalid name
- integrationType: Not valid or missing (if adSourceId provided)
- adSourceId: Missing or invalid
- accountId: Missing or invalid
- adspendSubType: Not valid or missing (for GOOGLE)
- campaignId: Missing (for FACEBOOK)

---

## 9. ADS

### 9.1 List All Ads
**Endpoint:** `GET /api/v1.0/ads`

**Query Parameters:**
- `adSourceIds` (optional, array) - Array of ad source IDs
- `integrationType` (optional, enum) - Values: `FACEBOOK`, `GOOGLE`, `SNAPCHAT`, `TIKTOK`, `TWITTER`, `LINKEDIN`, `PINTEREST`, `BING`
- `pageSize` (optional, number) - Range: 0-250
- `pageId` (optional, string) - Next page ID

**Authentication:** Required (API-Key header)

**Response Structure:**
```json
{
  "result": [
    {
      "name": "string",
      "adSource": {
        "adSourceId": "string",
        "adAccountId": "string",
        "platform": "string"
      },
      "source": {
        "name": "string",
        "tag": "string",
        "disregarded": "boolean",
        "organic": "boolean",
        "adSource": {},
        "trafficSource": {},
        "goal": {},
        "category": {},
        "creationDate": "number"
      },
      "creationDate": "number"
    }
  ],
  "nextPageId": "string",
  "request_id": "string"
}
```

---

## 10. CUSTOM COSTS

### 10.1 Create Custom Cost
**Endpoint:** `POST /api/v1.0/custom-costs`

**Request Body:**
```json
{
  "startDate": "string (required, ISO 8601)",
  "endDate": "string (optional, ISO 8601)",
  "frequency": "string (required, values: DAILY, ONE_TIME)",
  "cost": "number (required, must be > 0)",
  "tags": ["string (required, max 10 tags)"]
}
```

**Authentication:** Required (API-Key header)

**Response:**
```json
{
  "request_id": "string",
  "result": "OK"
}
```

---

## 11. CLICKS

### 11.1 Create Click
**Endpoint:** `POST /api/v1.0/clicks`

**Request Body:**
```json
{
  "referrerUrl": "string (required)",
  "sessionId": "string (optional)",
  "previousUrl": "string (optional)",
  "userAgent": "string (optional)",
  "ip": "string (optional)",
  "sourceLinkTag": "string (optional, must start with @)",
  "isOrganic": "boolean (optional)",
  "integrationType": "string (optional, enum: FACEBOOK, GOOGLE, TIKTOK, SNAPCHAT, LINKEDIN, TWITTER, PINTEREST, BING)",
  "adSourceId": "string (optional, required if integrationType present)",
  "adspendAdId": "string (optional)",
  "adSourceClickId": "string (optional)",
  "email": "string (optional)",
  "phones": ["string (optional)"],
  "tag": "string (optional)",
  "date": "string (optional, ISO 8601)"
}
```

**Notes:**
- For Facebook: adSourceId = adset id
- For Google: adSourceId = campaign id
- For TikTok: adSourceId = ad group id
- For Snapchat: adSourceId = ad squad id
- For LinkedIn: adSourceId = campaign id

**Authentication:** Required (API-Key header)

**Response:**
```json
{
  "request_id": "string",
  "result": "OK"
}
```

**Errors:**
- sessionId: Missing or invalid
- referrerUrl: Missing or invalid
- ip: Invalid IP
- sourceLinkTag: Invalid format
- integrationType: Not valid or missing
- adSourceId: Missing
- date: Invalid format

---

### 11.2 Retrieve Clicks
**Endpoint:** `GET /api/v1.0/leads/clicks`

**Query Parameters:**
- `leadId` (optional, string) - Lead ID (required if email not provided)
- `email` (optional, string) - Lead email (required if leadId not provided)
- `pageSize` (optional, number) - Range: 0-250
- `pageId` (optional, string) - Next page ID

**Notes:**
- Must provide either `leadId` or `email`, not both

**Authentication:** Required (API-Key header)

**Response Structure:**
```json
{
  "result": [
    {
      "id": "string",
      "date": "string",
      "trackedUrl": "string",
      "page": "string",
      "previousUrl": "string",
      "adspendType": "string",
      "sourceLinkName": "string",
      "ip": "string",
      "agent": "string",
      "cartId": "string",
      "deduplicationParams": {},
      "adSpendId": "number"
    }
  ],
  "nextPageId": "string",
  "request_id": "string"
}
```

**Errors:**
- Search params: Must provide either 'leadId' or 'email', not both

---

## 12. CARTS

### 12.1 Create Cart
**Endpoint:** `POST /api/v1.0/carts`

**Request Body:**
```json
{
  "cartId": "string (optional)",
  "email": "string (optional)",
  "firstName": "string (optional)",
  "lastName": "string (optional)",
  "leadIps": ["string (optional)"],
  "phoneNumbers": ["string (optional)"],
  "date": "string (optional, ISO 8601)",
  "priceFormat": "string (optional, values: DECIMAL, INTEGER, default: DECIMAL)",
  "currency": "string (optional)",
  "items": [
    {
      "name": "string (required)",
      "price": "number (required)",
      "externalId": "string (optional)",
      "quantity": "number (optional, default: 1)",
      "sku": "string (optional)"
    }
  ]
}
```

**Authentication:** Required (API-Key header)

**Response:**
```json
{
  "request_id": "string",
  "result": "OK",
  "message": ["external_cart_id: {cartId}"]
}
```

**Errors:**
- date: Invalid date format
- currency: Invalid currency
- items: Must have at least 1 item
- items: Various validation errors per item

---

### 12.2 Update Cart
**Endpoint:** `PUT /api/v1.0/carts`

**Request Body:**
```json
{
  "cartId": "string (required)",
  "email": "string (optional)",
  "firstName": "string (optional)",
  "lastName": "string (optional)",
  "leadIps": ["string (optional)"],
  "phoneNumbers": ["string (optional)"],
  "date": "string (optional, ISO 8601)",
  "priceFormat": "string (optional, values: DECIMAL, INTEGER)",
  "currency": "string (optional)",
  "items": [
    {
      "name": "string (required)",
      "price": "number (required)",
      "externalId": "string (optional)",
      "quantity": "number (optional)",
      "sku": "string (optional)"
    }
  ]
}
```

**Authentication:** Required (API-Key header)

**Response:**
```json
{
  "request_id": "string",
  "result": "OK"
}
```

**Errors:**
- cartId: Must provide a Cart ID
- date: Invalid date format
- currency: Invalid currency
- items: Must have at least 1 item

---

## 13. USER INFORMATION

### 13.1 Retrieve User Information
**Endpoint:** `GET /api/v1.0/user-info`

**Authentication:** Required (API-Key header)

**Response Structure:**
```json
{
  "result": {
    "userProfile": {
      "email": "string",
      "firstName": "string",
      "lastName": "string",
      "phoneNumber": "number",
      "companyName": "string",
      "profilePicture": "string",
      "vat": "string",
      "helpNotes": "boolean",
      "notificationsEnabled": "boolean",
      "timezone": "string",
      "userAddress": {
        "street": "string",
        "city": "string",
        "state": "string",
        "zipCode": "string"
      }
    },
    "allowedAccounts": [
      {
        "firstName": "string",
        "lastName": "string",
        "companyName": "string",
        "email": "string",
        "pictureUrl": "string",
        "status": "string"
      }
    ],
    "accessibleAccounts": [],
    "trueTrackingData": {
      "RECURRING_PRODUCTS_ENABLED": "string",
      "AUTOMATIC_SL_CREATION": "string",
      "REPEATED_CALLS_TOGGLE": "string",
      "AUTOMATIC_RECURRING_SALES_TIMEFRAME": "string",
      "ORIGIN_LEAD_ASSIGNATION_OPTIONS": "string",
      "PROCESS_RECURRING_SALES": "string",
      "AUTOMATIC_RECURRING_SALES_PRODUCT_BASED": "string",
      "TRACK_EU_CUSTOMERS": "string",
      "REPEATED_CALLS_TIMEFRAME": "string",
      "PENDING_CONVERSIONS_ATTRIBUTION_MODE": "string",
      "SALE_GROUPING_TIMEFRAME": "string",
      "SALE_GROUPING_ENABLED": "string",
      "DISREGARD_SOURCE_TIMEFRAME": "string",
      "ADDRESS_INFORMATION_COLLECTED": "string",
      "PENDING_CONVERSIONS_IGNORE_ORGANIC_SOURCES": "string",
      "AUTOMATIC_RECURRING_SALES": "string",
      "LEAD_ATTRIBUTION_TIMEFRAME": "string"
    }
  },
  "request_id": "string"
}
```

**Errors:**
- id: API key does not return any attached user

---

## 14. KEYWORDS

### 14.1 Retrieve Keywords
**Endpoint:** `GET /api/v1.0/keywords`

**Query Parameters:**
- `adgroupId` (optional, string) - Google Ad Group ID
- `pageSize` (optional, number) - Range: 0-250
- `pageId` (optional, string) - Next page ID

**Notes:**
- Requires valid Google_V2 account

**Authentication:** Required (API-Key header)

**Response Structure:**
```json
{
  "result": [
    {
      "id": "string",
      "name": "string",
      "adGroupId": "string",
      "adGroupName": "string"
    }
  ],
  "nextPageId": "string",
  "request_id": "string"
}
```

**Errors:**
- Google account required: Valid Google_V2 account required

---

## 15. SUBSCRIPTIONS

### 15.1 Retrieve Subscriptions
**Endpoint:** `GET /api/v1.0/subscriptions`

**Query Parameters:**
- `ids` (optional, array) - Array of subscription ids (max 50)
- `emails` (optional, array) - Array of emails (max 50)
- `leadIds` (optional, array) - Array of lead ids (max 50)
- `productTags` (optional, array) - Array of product tags (max 20)
- `subscriptionStates` (optional, enum) - Values: `ACTIVE`, `TRIALING`, `CANCELED`, `PAST_DUE`, `INCOMPLETE`, `INCOMPLETE_EXPIRED`, `UNPAID`, `COMPLETED`, `PAUSED`
- `fromDate` (optional, string) - ISO 8601 formatted date
- `toDate` (optional, string) - ISO 8601 formatted date
- `pageSize` (optional, number) - Range: 1-250
- `pageId` (optional, string) - Next page ID

**Authentication:** Required (API-Key header)

**Response Structure:**
```json
{
  "result": [
    {
      "id": "string",
      "subscriptionId": "string",
      "startDate": "string",
      "endDate": "string",
      "cancelAtDate": "string",
      "trialStartDate": "string",
      "trialEndDate": "string",
      "price": "number",
      "status": "string",
      "periodicity": "string",
      "planId": "string",
      "tag": "string",
      "name": "string",
      "lead": {},
      "firstSource": {},
      "lastSource": {},
      "category": {},
      "provider": {}
    }
  ],
  "nextPageId": "string",
  "request_id": "string"
}
```

**Errors:**
- ids: Maximum 50 ids
- emails: Maximum 50 emails
- leadIds: Maximum 50 ids
- productTags: Maximum 20 tags
- subscriptionStates: Not valid
- pageSize: Must be between 1 and 250

---

### 15.2 Create Subscription
**Endpoint:** `POST /api/v1.0/subscriptions`

**Request Body:**
```json
{
  "email": "string (optional)",
  "parentEmail": "string (optional)",
  "firstName": "string (optional)",
  "lastName": "string (optional)",
  "leadIps": ["string (optional)"],
  "stage": "string (optional)",
  "phoneNumbers": ["string (optional)"],
  "subscriptionId": "string (optional)",
  "name": "string (optional)",
  "status": "string (required, enum: ACTIVE, TRIALING, CANCELED, PAST_DUE, INCOMPLETE, INCOMPLETE_EXPIRED, UNPAID, COMPLETED, PAUSED)",
  "startDate": "string (required, ISO 8601)",
  "endDate": "string (optional, ISO 8601)",
  "cancelAtDate": "string (optional, ISO 8601)",
  "trialStartDate": "string (optional, ISO 8601)",
  "trialEndDate": "string (optional, ISO 8601)",
  "planId": "string (optional)",
  "price": "number (required)",
  "periodicity": "string (required, values: DAY, WEEK, MONTH, QUARTER, YEAR)"
}
```

**Notes:**
- Either `email` or `phoneNumbers` is required

**Authentication:** Required (API-Key header)

**Response:**
```json
{
  "request_id": "string",
  "result": "OK"
}
```

**Errors:**
- email: Email is not valid / Required if no phone number
- parentEmail: parentEmail is not valid
- phoneNumbers: Required if no email
- startDate/endDate/cancelAtDate/trialStartDate/trialEndDate: Invalid date format
- price: Invalid price format
- periodicity: Not valid
- status: Not valid

---

### 15.3 Update Subscription
**Endpoint:** `PUT /api/v1.0/subscriptions`

**Request Body:**
```json
{
  "ids": ["string (required, max 50)"],
  "name": "string (optional)",
  "status": "string (optional, enum: ACTIVE, TRIALING, CANCELED, PAST_DUE, INCOMPLETE, INCOMPLETE_EXPIRED, UNPAID, COMPLETED, PAUSED)",
  "startDate": "string (optional, ISO 8601)",
  "endDate": "string (optional, ISO 8601)",
  "cancelAtDate": "string (optional, ISO 8601)",
  "trialStartDate": "string (optional, ISO 8601)",
  "trialEndDate": "string (optional, ISO 8601)",
  "price": "number (required)"
}
```

**Authentication:** Required (API-Key header)

**Response:**
```json
{
  "request_id": "string",
  "result": "OK"
}
```

**Errors:**
- ids: Maximum 50 ids
- startDate/endDate/cancelAtDate/trialStartDate/trialEndDate: Invalid date format
- price: Invalid price format
- status: Not valid

---

## DATA STRUCTURES

### Item (for Orders)
```json
{
  "name": "string (required)",
  "price": "number (required)",
  "externalId": "string (optional)",
  "quantity": "number (optional, default: 1)",
  "costOfGoods": "number (optional, default: 0)",
  "taxes": "number (optional, default: 0)",
  "itemDiscount": "number (optional)",
  "packages": ["string (optional)"],
  "tag": "string (optional)",
  "categoryName": "string (optional)"
}
```

### CartItem (for Carts)
```json
{
  "name": "string (required)",
  "price": "number (required)",
  "externalId": "string (optional)",
  "quantity": "number (optional, default: 1)",
  "sku": "string (optional)"
}
```

### AdspendType (Enum)
- `FACEBOOK`
- `GOOGLE`
- `TIKTOK`
- `SNAPCHAT`
- `LINKEDIN`
- `TWITTER`
- `PINTEREST`
- `BING`

### AdspendSubType (Enum)
- `DISPLAY`
- `VIDEO`

### SubscriptionStatus (Enum)
- `ACTIVE`
- `TRIALING`
- `CANCELED`
- `PAST_DUE`
- `INCOMPLETE`
- `INCOMPLETE_EXPIRED`
- `UNPAID`
- `COMPLETED`
- `PAUSED`

### CallState (Enum)
- `QUALIFIED`
- `UNQUALIFIED`
- `CANCELLED`
- `NO_SHOW`

---

## SUMMARY OF ALL ENDPOINTS

### Leads (3 endpoints)
1. `GET /api/v1.0/leads` - Retrieve leads
2. `POST /api/v1.0/leads` - Create lead
3. `GET /api/v1.0/leads/journey` - Retrieve leads journey

### Sales (3 endpoints)
4. `GET /api/v1.0/sales` - Retrieve sales
5. `PUT /api/v1.0/sales` - Update sales
6. `DELETE /api/v1.0/sales/{id}` - Delete sale

### Orders (2 endpoints)
7. `POST /api/v1.0/orders` - Create order
8. `DELETE /api/v1.0/orders/{id}` - Refund order

### Calls (4 endpoints)
9. `GET /api/v1.0/calls` - Retrieve calls
10. `POST /api/v1.0/calls` - Create call
11. `PUT /api/v1.0/calls` - Update calls
12. `DELETE /api/v1.0/calls/{id}` - Delete call

### Attribution (2 endpoints)
13. `GET /api/v1.0/attribution` - Get ads attribution report
14. `GET /api/v1.0/attribution/ad-account` - Get ad accounts attribution report

### Products (1 endpoint)
15. `POST /api/v1.0/products` - Create product

### Tags (1 endpoint)
16. `GET /api/v1.0/tags` - List all tags

### Sources (2 endpoints)
17. `GET /api/v1.0/sources` - List all sources
18. `POST /api/v1.0/sources` - Create source

### Ads (1 endpoint)
19. `GET /api/v1.0/ads` - List all ads

### Custom Costs (1 endpoint)
20. `POST /api/v1.0/custom-costs` - Create custom cost

### Clicks (2 endpoints)
21. `POST /api/v1.0/clicks` - Create click
22. `GET /api/v1.0/leads/clicks` - Retrieve clicks

### Carts (2 endpoints)
23. `POST /api/v1.0/carts` - Create cart
24. `PUT /api/v1.0/carts` - Update cart

### User Information (1 endpoint)
25. `GET /api/v1.0/user-info` - Retrieve user information

### Keywords (1 endpoint)
26. `GET /api/v1.0/keywords` - Retrieve keywords

### Subscriptions (3 endpoints)
27. `GET /api/v1.0/subscriptions` - Retrieve subscriptions
28. `POST /api/v1.0/subscriptions` - Create subscription
29. `PUT /api/v1.0/subscriptions` - Update subscription

---

**TOTAL: 29 API ENDPOINTS**
