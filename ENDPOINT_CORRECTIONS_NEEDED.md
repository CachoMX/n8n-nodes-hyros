# Endpoint Corrections Needed

Based on analysis of hyros.apib vs current implementation

## ✅ CORRECT Implementations

### Leads
- ✅ POST /leads - Correct (uses request body)
- ✅ GET /leads - Correct (uses query params with emails)
- ✅ GET /leads/journey - Correct (uses query params with ids)

### Attribution
- ❓ Need to verify parameters match blueprint exactly

## ❌ INCORRECT Implementations - Need Fixing

### 1. Sales - CRITICAL ISSUES

**Current Implementation:**
- PUT `/sales/{saleId}` with request body
- DELETE `/sales/{saleId}` no query params

**Correct According to Blueprint:**
- PUT `/sales` with QUERY parameters (ids, isRecurringSale, isRefunded, refundedDate, refundedAmount)
- DELETE `/sales/{id}` - Correct path param

**Fix Required:** Sales UPDATE is completely wrong!

---

### 2. Orders - CRITICAL ISSUES

**Current Implementation:**
- POST `/order` (singular)
- POST `/order/refund` with request body

**Correct According to Blueprint:**
- POST `/orders` (PLURAL!)
- DELETE `/orders/{id}` with optional refundedAmount query param

**Fix Required:**
- Change `/order` to `/orders` (plural)
- Change refund from POST `/order/refund` to DELETE `/orders/{id}`

---

### 3. Calls - CRITICAL ISSUES

**Current Implementation:**
- POST `/call` (singular)
- GET `/call/{callId}` with path param
- PUT `/call/{callId}` with request body and path param
- DELETE `/call/{callId}` with path param

**Correct According to Blueprint:**
- POST `/calls` (PLURAL!)
- GET `/calls` with query params (no single call endpoint!)
- PUT `/calls` with QUERY params (ids, qualification, state, qualified)
- DELETE `/calls/{id}` with path param - CORRECT

**Fix Required:**
- Change all `/call` to `/calls` (plural)
- Remove GET single call - use GET /calls with query filter
- Change PUT to use query params instead of path param

---

### 4. Products - MINOR ISSUE

**Current Implementation:**
- POST `/product` (singular)

**Correct According to Blueprint:**
- POST `/products` (PLURAL!)

**Fix Required:** Change `/product` to `/products`

---

### 5. Sources - MINOR ISSUE

**Current Implementation:**
- POST `/source` (singular)

**Correct According to Blueprint:**
- POST `/sources` (PLURAL!)

**Fix Required:** Change `/source` to `/sources`

---

### 6. Custom Costs - CRITICAL ISSUE

**Current Implementation:**
- POST `/custom-cost` (singular)
- Body: { source, date, cost }

**Correct According to Blueprint:**
- POST `/custom-costs` (PLURAL!)
- Body: { startDate, endDate, frequency, cost, tags[] }

**Fix Required:**
- Change endpoint to plural
- Fix request body structure completely

---

### 7. Clicks - MIXED ISSUES

**Current Implementation:**
- POST `/click` (singular)
- GET `/click/{clickId}` with path param

**Correct According to Blueprint:**
- POST `/clicks` (PLURAL!)
- GET `/leads/clicks` with query params (leadId or email)

**Fix Required:**
- Change POST `/click` to `/clicks`
- Change GET `/click/{id}` to `/leads/clicks?leadId=xxx` or `?email=xxx`

---

### 8. Carts - MINOR ISSUE

**Current Implementation:**
- POST `/cart` (singular)
- PUT `/cart/{cartId}` with path param

**Correct According to Blueprint:**
- POST `/carts` (PLURAL!)
- PUT `/carts` with cartId in request body (not path param!)

**Fix Required:**
- Change `/cart` to `/carts`
- Move cartId from path to body for PUT

---

### 9. Keywords - MINOR ISSUE

**Current Implementation:**
- GET `/keyword/{keywordId}` with path param

**Correct According to Blueprint:**
- GET `/keywords` (PLURAL!) with query param `adgroupId`

**Fix Required:**
- Change `/keyword/{id}` to `/keywords?adgroupId=xxx`

---

### 10. Subscriptions - CRITICAL ISSUE

**Current Implementation:**
- GET `/subscription/{subscriptionId}` with path param
- POST `/subscription` (singular)
- PUT `/subscription/{subscriptionId}` with path param and body

**Correct According to Blueprint:**
- GET `/subscriptions` (PLURAL!) with query params (ids, emails, leadIds, etc.)
- POST `/subscriptions` (PLURAL!)
- PUT `/subscriptions` with ids[] in request body (not path param!)

**Fix Required:**
- Change all `/subscription` to `/subscriptions`
- Remove path params, use query/body params
- PUT needs ids array in body

---

## Summary of Issues

### Pluralization Issues (Easy fixes)
- `/order` → `/orders` ✘
- `/call` → `/calls` ✘
- `/product` → `/products` ✘
- `/source` → `/sources` ✘
- `/custom-cost` → `/custom-costs` ✘
- `/click` → `/clicks` ✘
- `/cart` → `/carts` ✘
- `/keyword` → `/keywords` ✘
- `/subscription` → `/subscriptions` ✘

### Path vs Query/Body Parameter Issues (Complex fixes)
- Sales PUT: Path param → Query params ✘
- Calls GET: Path param → Query params ✘
- Calls PUT: Path param → Query params ✘
- Clicks GET: Path param → Query params ✘
- Carts PUT: Path param → Body param ✘
- Keywords GET: Path param → Query param ✘
- Subscriptions GET: Path param → Query params ✘
- Subscriptions PUT: Path param → Body param ✘

### Structural Issues (Major fixes)
- Order refund: POST → DELETE ✘
- Custom costs: Complete body structure change ✘

---

## Impact Assessment

**CRITICAL (Breaking changes):**
1. Orders - Wrong endpoint and method for refund
2. Sales - Wrong method for update (PUT path vs query)
3. Calls - Multiple wrong paths
4. Custom Costs - Wrong body structure
5. Subscriptions - Wrong all operations

**HIGH (Functionality broken):**
- All pluralization issues
- All path vs query parameter issues

**Priority Order:**
1. Fix all endpoint pluralization
2. Fix Sales PUT (query params)
3. Fix Orders refund (DELETE not POST)
4. Fix Calls (GET, PUT parameters)
5. Fix Custom Costs (body structure)
6. Fix Clicks GET (query params)
7. Fix Carts PUT (body param)
8. Fix Keywords GET (query param)
9. Fix Subscriptions (all operations)
10. Verify Attribution parameters

---

**Total Endpoints Needing Fixes: ~15-20 out of 29**
