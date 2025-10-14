# Hyros API - Quick Reference Table

## All 29 Endpoints At a Glance

| # | Resource | Operation | Method | Endpoint | Key Parameters |
|---|----------|-----------|--------|----------|----------------|
| 1 | Lead | Get Leads | GET | `/api/v1.0/leads` | ids, emails, fromDate, toDate, pageSize, pageId |
| 2 | Lead | Create Lead | POST | `/api/v1.0/leads` | email, firstName, lastName, tags, leadIps, phoneNumbers, stage |
| 3 | Lead | Get Journey | GET | `/api/v1.0/leads/journey` | ids (required) |
| 4 | Sale | Get Sales | GET | `/api/v1.0/sales` | ids, emails, leadIds, productTags, isRecurringSale, saleRefundedState, fromDate, toDate, pageSize, pageId |
| 5 | Sale | Update Sales | PUT | `/api/v1.0/sales` | ids (required), isRecurringSale, isRefunded, refundedDate, refundedAmount |
| 6 | Sale | Delete Sale | DELETE | `/api/v1.0/sales/{id}` | id (path param) |
| 7 | Order | Create Order | POST | `/api/v1.0/orders` | email, items (required), orderId, date, shippingCost, taxes, orderDiscount, currency |
| 8 | Order | Refund Order | DELETE | `/api/v1.0/orders/{id}` | id (path param), refundedAmount |
| 9 | Call | Get Calls | GET | `/api/v1.0/calls` | ids, emails, leadIds, productTags, fromDate, toDate, pageSize, pageId, qualified, qualificationStages, state |
| 10 | Call | Create Call | POST | `/api/v1.0/calls` | name (required), email (required), firstName, lastName, leadIps, stage, phoneNumbers, id, date, qualification, state |
| 11 | Call | Update Calls | PUT | `/api/v1.0/calls` | ids (required), qualification, state, qualified (deprecated) |
| 12 | Call | Delete Call | DELETE | `/api/v1.0/calls/{id}` | id (path param) |
| 13 | Attribution | Get Ads Attribution | GET | `/api/v1.0/attribution` | attributionModel (required), startDate (required), endDate (required), level (required), fields (required), ids (required), currency, scientificDaysRange |
| 14 | Attribution | Get Ad Account Attribution | GET | `/api/v1.0/attribution/ad-account` | attributionModel (required), startDate (required), endDate (required), fields (required), ids (required - single ID only), currency, dateTimeGroupingOption |
| 15 | Product | Create Product | POST | `/api/v1.0/products` | name (required), price (required), category, packages |
| 16 | Tag | List Tags | GET | `/api/v1.0/tags` | None |
| 17 | Source | List Sources | GET | `/api/v1.0/sources` | adSourceIds, includeOrganic, includeDisregarded, integrationType, pageSize, pageId |
| 18 | Source | Create Source | POST | `/api/v1.0/sources` | name (required), category, goal, trafficSource, isDisregard, isOrganic, integrationType, adSourceId, accountId, adspendSubType, campaignId |
| 19 | Ad | List Ads | GET | `/api/v1.0/ads` | adSourceIds, integrationType, pageSize, pageId |
| 20 | Custom Cost | Create Custom Cost | POST | `/api/v1.0/custom-costs` | startDate (required), endDate, frequency (required), cost (required), tags (required, max 10) |
| 21 | Click | Create Click | POST | `/api/v1.0/clicks` | referrerUrl (required), sessionId, previousUrl, userAgent, ip, sourceLinkTag, isOrganic, integrationType, adSourceId, email |
| 22 | Click | Get Clicks | GET | `/api/v1.0/leads/clicks` | leadId OR email (one required), pageSize, pageId |
| 23 | Cart | Create Cart | POST | `/api/v1.0/carts` | items (required), cartId, email, firstName, lastName, leadIps, phoneNumbers, date, priceFormat, currency |
| 24 | Cart | Update Cart | PUT | `/api/v1.0/carts` | cartId (required), items (required), email, firstName, lastName, leadIps, phoneNumbers, date, priceFormat, currency |
| 25 | User Info | Get User Info | GET | `/api/v1.0/user-info` | None |
| 26 | Keyword | Get Keywords | GET | `/api/v1.0/keywords` | adgroupId, pageSize, pageId |
| 27 | Subscription | Get Subscriptions | GET | `/api/v1.0/subscriptions` | ids, emails, leadIds, productTags, subscriptionStates, fromDate, toDate, pageSize, pageId |
| 28 | Subscription | Create Subscription | POST | `/api/v1.0/subscriptions` | status (required), startDate (required), price (required), periodicity (required), email, parentEmail, firstName, lastName, subscriptionId, name, planId |
| 29 | Subscription | Update Subscription | PUT | `/api/v1.0/subscriptions` | ids (required), price (required), name, status, startDate, endDate, cancelAtDate, trialStartDate, trialEndDate |

---

## Endpoints by HTTP Method

### GET Endpoints (13)
1. GET `/api/v1.0/leads` - Retrieve leads
2. GET `/api/v1.0/leads/journey` - Retrieve lead journey
3. GET `/api/v1.0/sales` - Retrieve sales
4. GET `/api/v1.0/calls` - Retrieve calls
5. GET `/api/v1.0/attribution` - Get ads attribution report
6. GET `/api/v1.0/attribution/ad-account` - Get ad account attribution report
7. GET `/api/v1.0/tags` - List all tags
8. GET `/api/v1.0/sources` - List all sources
9. GET `/api/v1.0/ads` - List all ads
10. GET `/api/v1.0/leads/clicks` - Retrieve clicks
11. GET `/api/v1.0/user-info` - Retrieve user information
12. GET `/api/v1.0/keywords` - Retrieve keywords
13. GET `/api/v1.0/subscriptions` - Retrieve subscriptions

### POST Endpoints (10)
1. POST `/api/v1.0/leads` - Create lead
2. POST `/api/v1.0/orders` - Create order
3. POST `/api/v1.0/calls` - Create call
4. POST `/api/v1.0/products` - Create product
5. POST `/api/v1.0/sources` - Create source
6. POST `/api/v1.0/custom-costs` - Create custom cost
7. POST `/api/v1.0/clicks` - Create click
8. POST `/api/v1.0/carts` - Create cart
9. POST `/api/v1.0/subscriptions` - Create subscription

### PUT Endpoints (4)
1. PUT `/api/v1.0/sales` - Update sales
2. PUT `/api/v1.0/calls` - Update calls
3. PUT `/api/v1.0/carts` - Update cart
4. PUT `/api/v1.0/subscriptions` - Update subscription

### DELETE Endpoints (3)
1. DELETE `/api/v1.0/sales/{id}` - Delete sale
2. DELETE `/api/v1.0/orders/{id}` - Refund order
3. DELETE `/api/v1.0/calls/{id}` - Delete call

---

## Endpoints by Complexity

### Simple Endpoints (No parameters or minimal)
- GET `/api/v1.0/tags` - No parameters
- GET `/api/v1.0/user-info` - No parameters
- POST `/api/v1.0/products` - 4 parameters (2 required)

### Moderate Complexity (5-10 parameters)
- GET `/api/v1.0/leads` - 6 parameters
- POST `/api/v1.0/leads` - 7 parameters
- POST `/api/v1.0/calls` - 10 parameters
- DELETE `/api/v1.0/sales/{id}` - 1 parameter
- DELETE `/api/v1.0/calls/{id}` - 1 parameter
- DELETE `/api/v1.0/orders/{id}` - 2 parameters
- GET `/api/v1.0/sources` - 6 parameters
- GET `/api/v1.0/ads` - 4 parameters
- GET `/api/v1.0/keywords` - 3 parameters

### High Complexity (10+ parameters)
- GET `/api/v1.0/sales` - 10 parameters
- GET `/api/v1.0/calls` - 11 parameters
- POST `/api/v1.0/orders` - 14 parameters + nested items array
- PUT `/api/v1.0/sales` - 5 parameters
- PUT `/api/v1.0/calls` - 4 parameters
- POST `/api/v1.0/sources` - 11 parameters
- POST `/api/v1.0/clicks` - 14 parameters
- POST `/api/v1.0/carts` - 10 parameters + nested items array
- PUT `/api/v1.0/carts` - 10 parameters + nested items array
- GET `/api/v1.0/subscriptions` - 10 parameters
- POST `/api/v1.0/subscriptions` - 18 parameters
- PUT `/api/v1.0/subscriptions` - 10 parameters

### Very High Complexity (15+ parameters with special logic)
- GET `/api/v1.0/attribution` - 18 parameters, 92 possible field values
- GET `/api/v1.0/attribution/ad-account` - 17 parameters, 92 possible field values
- GET `/api/v1.0/leads/journey` - Returns complex nested structure

---

## Required vs Optional Parameters Summary

### Endpoints with ALL Required Parameters
- GET `/api/v1.0/tags` - 0 parameters
- GET `/api/v1.0/user-info` - 0 parameters
- DELETE `/api/v1.0/sales/{id}` - 1 required (id)
- DELETE `/api/v1.0/calls/{id}` - 1 required (id)
- DELETE `/api/v1.0/orders/{id}` - 1 required (id)
- GET `/api/v1.0/leads/journey` - 1 required (ids)

### Endpoints with Most Required Parameters
1. **GET `/api/v1.0/attribution`** - 6 required: attributionModel, startDate, endDate, level, fields, ids
2. **GET `/api/v1.0/attribution/ad-account`** - 5 required: attributionModel, startDate, endDate, fields, ids
3. **POST `/api/v1.0/subscriptions`** - 4 required: status, startDate, price, periodicity
4. **POST `/api/v1.0/orders`** - 1 required array: items (but email OR phoneNumbers required)
5. **POST `/api/v1.0/calls`** - 2 required: name, email

---

## Pagination Support

All GET endpoints for collections support pagination (13 endpoints):
- `/api/v1.0/leads`
- `/api/v1.0/sales`
- `/api/v1.0/calls`
- `/api/v1.0/sources`
- `/api/v1.0/ads`
- `/api/v1.0/leads/clicks`
- `/api/v1.0/keywords`
- `/api/v1.0/subscriptions`

**Pagination parameters:**
- `pageSize` (optional, number, range: 1-250 or 0-250 depending on endpoint)
- `pageId` (optional, string)

**Pagination response:**
- `result` array
- `nextPageId` (if more results available)
- `request_id`

---

## Date Filtering Support

Endpoints supporting date range filtering (5 endpoints):
- GET `/api/v1.0/leads` - fromDate, toDate
- GET `/api/v1.0/sales` - fromDate, toDate
- GET `/api/v1.0/calls` - fromDate, toDate
- GET `/api/v1.0/subscriptions` - fromDate, toDate
- GET `/api/v1.0/attribution` - startDate, endDate (required)
- GET `/api/v1.0/attribution/ad-account` - startDate, endDate (required)

---

## Endpoints by Use Case

### Lead Management
- Create leads
- Retrieve leads with filters
- Get complete lead journey
- Track lead clicks

### Sales & Revenue Tracking
- Create orders with items
- Retrieve sales data
- Update sale status (recurring/refunded)
- Delete/refund sales and orders

### Call Tracking
- Create call records
- Retrieve call data with filters
- Update call qualification
- Delete call records

### Attribution & Analytics
- Get attribution reports by ad/adset/campaign
- Get ad account level attribution
- Support for multiple attribution models
- 92 different metrics available

### Marketing Operations
- Create traffic sources (organic & paid)
- List sources and ads
- Track clicks
- Create custom costs for attribution

### E-commerce
- Create and update carts
- Create orders with items
- Track subscriptions
- Manage products

### Account Management
- Get user information
- List tags
- Retrieve keywords (Google Ads)

---

## Most Commonly Used Endpoints (Estimated)

### Tier 1 - Critical (Daily Use)
1. POST `/api/v1.0/orders` - Create orders
2. POST `/api/v1.0/leads` - Create leads
3. GET `/api/v1.0/attribution` - Get attribution data
4. POST `/api/v1.0/calls` - Create calls
5. GET `/api/v1.0/sales` - Retrieve sales

### Tier 2 - Important (Regular Use)
6. GET `/api/v1.0/leads` - Retrieve leads
7. POST `/api/v1.0/clicks` - Track clicks
8. GET `/api/v1.0/leads/journey` - Get customer journey
9. POST `/api/v1.0/sources` - Create sources
10. GET `/api/v1.0/calls` - Retrieve calls

### Tier 3 - Supporting (Occasional Use)
11. GET `/api/v1.0/sources` - List sources
12. POST `/api/v1.0/carts` - Create carts
13. PUT `/api/v1.0/sales` - Update sales
14. DELETE `/api/v1.0/orders/{id}` - Refund orders
15. POST `/api/v1.0/subscriptions` - Create subscriptions

### Tier 4 - Administrative (Infrequent Use)
16. GET `/api/v1.0/tags` - List tags
17. GET `/api/v1.0/user-info` - Get user info
18. POST `/api/v1.0/products` - Create products
19. GET `/api/v1.0/ads` - List ads
20. GET `/api/v1.0/keywords` - Get keywords

---

## Implementation Priority for n8n

### Phase 1 - Core Functionality (MVP)
1. Leads (Create, Get)
2. Orders (Create)
3. Sales (Get)
4. Attribution (Get Ads Attribution)

### Phase 2 - Extended Tracking
5. Calls (Create, Get, Update)
6. Clicks (Create, Get)
7. Sales (Update, Delete)

### Phase 3 - Advanced Features
8. Lead Journey (Get)
9. Sources (Create, List)
10. Carts (Create, Update)
11. Attribution (Get Ad Account)

### Phase 4 - Complete Coverage
12. Subscriptions (Create, Get, Update)
13. Products (Create)
14. Custom Costs (Create)
15. Ads (List)
16. Keywords (Get)
17. Tags (List)
18. User Info (Get)

---

## Response Time Considerations

### Fast Endpoints (< 1 second typical)
- Single record operations (Create, Delete)
- Simple GET with small datasets
- GET `/api/v1.0/tags`
- GET `/api/v1.0/user-info`

### Medium Endpoints (1-5 seconds typical)
- GET endpoints with pagination
- GET with date range filtering
- Update operations

### Slower Endpoints (5-30+ seconds potential)
- GET `/api/v1.0/attribution` - Complex calculations
- GET `/api/v1.0/attribution/ad-account` - Complex calculations
- GET `/api/v1.0/leads/journey` - Complex data aggregation

**Note:** Attribution endpoints may return 400 error "Already processing a request for id: <id>" if the same request is sent before the first one completes.
