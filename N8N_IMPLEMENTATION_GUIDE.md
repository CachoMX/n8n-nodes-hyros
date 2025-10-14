# Hyros API - n8n Implementation Guide

## Quick Reference for n8n Community Node Development

### API Overview
- **Base URL:** `https://api.hyros.com/v1`
- **Authentication:** API-Key in header
- **Total Endpoints:** 29 endpoints across 15 categories

---

## Resource Categories (for n8n node structure)

### 1. **Leads** (3 operations)
- Get Leads
- Create Lead
- Get Lead Journey

### 2. **Sales** (3 operations)
- Get Sales
- Update Sales
- Delete Sale

### 3. **Orders** (2 operations)
- Create Order
- Refund Order

### 4. **Calls** (4 operations)
- Get Calls
- Create Call
- Update Calls
- Delete Call

### 5. **Attribution** (2 operations)
- Get Ads Attribution
- Get Ad Account Attribution

### 6. **Products** (1 operation)
- Create Product

### 7. **Tags** (1 operation)
- List Tags

### 8. **Sources** (2 operations)
- List Sources
- Create Source

### 9. **Ads** (1 operation)
- List Ads

### 10. **Custom Costs** (1 operation)
- Create Custom Cost

### 11. **Clicks** (2 operations)
- Create Click
- Get Clicks

### 12. **Carts** (2 operations)
- Create Cart
- Update Cart

### 13. **User Info** (1 operation)
- Get User Info

### 14. **Keywords** (1 operation)
- Get Keywords

### 15. **Subscriptions** (3 operations)
- Get Subscriptions
- Create Subscription
- Update Subscription

---

## Common Patterns

### Pagination
Most GET endpoints support pagination with:
```
pageSize: 1-250 (number of results)
pageId: string (for next page)
```

Response includes `nextPageId` field.

### Date Filtering
Most GET endpoints support date range filtering:
```
fromDate: ISO 8601 formatted date
toDate: ISO 8601 formatted date
```

### Array Parameters
Maximum limits for array parameters:
- `ids`: 50 items max
- `emails`: 50 items max
- `leadIds`: 50 items max
- `productTags`: 20 items max
- `qualificationStages`: 50 items max
- `tags` (custom costs): 10 items max

### Required Lead Identifiers
For creating leads/orders/calls/subscriptions:
- Either `email` OR `phoneNumbers` is required (not both optional)

---

## Key Enumerations

### Platform Types (AdspendType)
```javascript
['FACEBOOK', 'GOOGLE', 'TIKTOK', 'SNAPCHAT', 'LINKEDIN', 'TWITTER', 'PINTEREST', 'BING']
```

### Call States
```javascript
['QUALIFIED', 'UNQUALIFIED', 'CANCELLED', 'NO_SHOW']
```

### Subscription Status
```javascript
['ACTIVE', 'TRIALING', 'CANCELED', 'PAST_DUE', 'INCOMPLETE', 'INCOMPLETE_EXPIRED', 'UNPAID', 'COMPLETED', 'PAUSED']
```

### Attribution Models
```javascript
['last_click', 'scientific', 'first_click']
```

### Attribution Levels
```javascript
[
  'google_campaign', 'google_v2_adgroup', 'google_ad', 'google_v2_keyword',
  'facebook_adset', 'facebook_ad',
  'tiktok_adgroup', 'tiktok_ad',
  'snapchat_adsquad', 'snapchat_ad',
  'pinterest_adgroup', 'pinterest_ad',
  'twitter_adgroup',
  'bing_adgroup', 'bing_ad',
  'linkedin_campaign'
]
```

---

## Attribution Metrics (92 total)

### Core Metrics
- sales, revenue, calls, leads, cost, profit, roi, roas

### Customer Metrics
- unique_customers, new_leads, total_customers, customers
- new_customers_percentage, recurring_customers

### Cost Metrics
- cost_per_call, cost_per_lead, cost_per_sale, cost_per_new_lead
- cost_per_unique_sale, cost_per_unique_customer, cost_per_qualified_call
- cost_per_new_visit, cost_per_click, cac, cost_per_atc
- cost_per_new_subscriptions, cost_per_new_trials

### Revenue Metrics
- total_revenue, recurring_revenue, unique_customers_revenue
- net_profit, hard_costs, gross_margins, aov, new_mrr

### Refund Metrics
- refund, refund_count, refund_sales_percentage, refund_revenue_percentage

### Performance Metrics
- clicks, impressions, new_visits, ctr, cpm, cvr
- partial_video_views

### Call Metrics
- qualified_calls, unqualified_calls, unique_calls, canceled_calls

### Time-based Metrics
- time_of_sale_attribution, time_of_call_attribution

### LTV Metrics
- 30_days_ltv, 60_days_ltv, 90_days_ltv, 6_months_ltv, 1_year_ltv
- 30_days_ltv_forecast, 60_days_ltv_forecast, 90_days_ltv_forecast
- 6_months_ltv_forecast, 1_year_ltv_forecast

### Subscription Metrics
- new_subscriptions, canceled_subscriptions, direct_subscriptions
- new_trials, converted_trials, canceled_trials, churn_rate
- subscription_30_days_forecast, subscription_60_days_forecast
- subscription_90_days_forecast, subscription_6_months_forecast
- subscription_1_year_forecast

### Cart Metrics
- carts, atc_events, purchased_carts, atc_cvr, atc_rate

### Other Metrics
- reported, reported_result, shop_reported_result, reported_vs_revenue
- one_time_sales, taxes, cost_of_goods, shipping_value
- net_profit_percentage, name, parent_name

---

## Complex Objects

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

---

## Special Considerations for n8n

### 1. **Ad Source IDs by Platform**
Document clearly that `adSourceId` means different things per platform:
- **Facebook:** Adset ID
- **Google:** Campaign ID
- **TikTok:** Ad Group ID
- **Snapchat:** Ad Squad ID
- **LinkedIn:** Campaign ID

### 2. **Required Fields for Google**
When `integrationType` = "GOOGLE":
- `adspendSubType` is REQUIRED (values: DISPLAY, VIDEO)

### 3. **Required Fields for Facebook**
When `integrationType` = "FACEBOOK":
- `campaignId` is REQUIRED

### 4. **Order ID Restrictions**
For creating orders, `orderId` field:
- Only accepts: letters, numbers, underscores (_), hyphens (-), periods (.), colons (:)
- NO SPACES allowed

### 5. **Deprecated Fields**
- `qualified` parameter in Calls endpoints (use `state` instead)

### 6. **Special API Behaviors**

#### Attribution Endpoints
- Support 92 different metrics via `fields` parameter
- Fields must be comma-separated string
- `ids` parameter format varies by level
- For `google_v2_keyword` level, `ids` field is NOT required
- If `isAdAccountId=true`, only 1 ID allowed in `ids` parameter

#### Lead Journey
- Returns comprehensive customer journey including:
  - Lead details
  - All sales
  - All calls
  - All carts
  - Linked leads

#### Clicks
- Retrieve endpoint requires EITHER `leadId` OR `email` (not both)

### 7. **Date Format Notes**
- ISO 8601 format required
- If timezone not included, account timezone is assumed
- Example: `2021-04-16T20:35:00-05:00`

### 8. **Response Format**
Standard success response:
```json
{
  "request_id": "string",
  "result": "OK" | [array] | {object}
}
```

Standard error response:
```json
{
  "result": "ERROR",
  "message": ["error message"]
}
```

---

## n8n Node Structure Recommendation

### Credentials
```typescript
{
  name: 'hyrosApi',
  displayName: 'Hyros API',
  properties: [
    {
      displayName: 'API Key',
      name: 'apiKey',
      type: 'string',
      typeOptions: { password: true },
      default: ''
    }
  ]
}
```

### Resource Types
Create main resource dropdown with 15 options:
1. Lead
2. Sale
3. Order
4. Call
5. Attribution
6. Product
7. Tag
8. Source
9. Ad
10. Custom Cost
11. Click
12. Cart
13. User Info
14. Keyword
15. Subscription

### Operation Types (per resource)
Each resource should expose relevant operations (Get, Create, Update, Delete)

### Field Recommendations

#### High Priority Fields (show by default)
- email
- firstName, lastName
- date fields
- id fields
- tags
- phoneNumbers

#### Optional Fields (show under "Additional Fields")
- leadIps
- stage
- parentEmail
- provider information
- custom parameters

#### Attribution Fields
Consider creating a multi-select for `fields` parameter with all 92 metrics grouped by category.

---

## Testing Checklist

### Authentication
- [ ] Test with valid API key
- [ ] Test with invalid API key (should return 401)

### Leads
- [ ] Get leads with pagination
- [ ] Create lead with email only
- [ ] Create lead with phone only
- [ ] Create lead with tags
- [ ] Get lead journey

### Sales
- [ ] Get sales with filters
- [ ] Update sale (recurring, refunded)
- [ ] Delete sale

### Orders
- [ ] Create order with single item
- [ ] Create order with multiple items
- [ ] Create order with discounts, taxes, shipping
- [ ] Refund order

### Calls
- [ ] Get calls
- [ ] Create call
- [ ] Update call state
- [ ] Delete call

### Attribution
- [ ] Get ads attribution with multiple metrics
- [ ] Get ad account attribution
- [ ] Test different attribution models
- [ ] Test different levels

### Sources & Ads
- [ ] List sources with filters
- [ ] Create organic source
- [ ] Create paid source (Facebook, Google)
- [ ] List ads

### Clicks
- [ ] Create click for organic source
- [ ] Create click for paid source
- [ ] Get clicks by leadId
- [ ] Get clicks by email

### Carts
- [ ] Create cart
- [ ] Update cart

### Subscriptions
- [ ] Get subscriptions
- [ ] Create subscription
- [ ] Update subscription status

---

## Error Handling

Common errors to handle:
1. **400 Bad Request** - Validation errors (check message array)
2. **401 Unauthorized** - Invalid API key
3. **429 Too Many Requests** - Rate limiting (implement retry logic)

Validation errors to expect:
- Email format validation
- Date format validation (ISO 8601)
- Array size limits (50 items for most)
- Required field combinations (email OR phone)
- Enum value validation

---

## Rate Limiting

- API returns `429 Too Many Requests` when limit exceeded
- Implement exponential backoff retry strategy
- Consider adding delay between requests in batch operations

---

## Summary Statistics

- **Total Endpoints:** 29
- **Total Resources:** 15
- **Total Operations:** 29
- **Supported Platforms:** 8 (Facebook, Google, TikTok, Snapchat, LinkedIn, Twitter, Pinterest, Bing)
- **Attribution Metrics:** 92
- **Attribution Levels:** 16

---

## Additional Resources

- Full documentation: `API_ENDPOINTS_DOCUMENTATION.md`
- JSON structure: `API_ENDPOINTS_BY_CATEGORY.json`
- Original API Blueprint: `hyros.apib`
