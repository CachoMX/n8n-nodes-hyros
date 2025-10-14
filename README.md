# Hyros API Documentation - Complete Analysis

This repository contains a comprehensive analysis of the Hyros API (v1.31) extracted from the `hyros.apib` API Blueprint file.

## 📋 Overview

The Hyros API provides 29 endpoints across 15 resource categories for managing advertising attribution, leads, sales, calls, and e-commerce data.

**Base URL:** `https://api.hyros.com/v1`
**Authentication:** API-Key header
**Total Endpoints:** 29

## 📁 Documentation Files

### 1. **API_ENDPOINTS_DOCUMENTATION.md**
Complete endpoint documentation with:
- Full parameter specifications
- Request/response schemas
- Error handling details
- All 29 endpoints organized by resource

### 2. **API_ENDPOINTS_BY_CATEGORY.json**
Structured JSON format containing:
- All endpoints organized by category
- Complete parameter definitions with types
- Enumerations and constraints
- 92 attribution metrics list
- Ready for programmatic parsing

### 3. **N8N_IMPLEMENTATION_GUIDE.md**
Practical guide for implementing an n8n community node:
- Resource organization suggestions
- Common patterns and best practices
- Field priority recommendations
- Testing checklist
- Error handling strategies
- Rate limiting considerations

### 4. **ENDPOINTS_QUICK_REFERENCE.md**
At-a-glance reference tables:
- All 29 endpoints in a single table
- Endpoints grouped by HTTP method
- Complexity ratings
- Pagination and filtering support
- Implementation priority recommendations
- Performance considerations

## 🎯 Key API Features

### Resources (15 categories)
1. **Leads** - Create and manage leads, retrieve journey data
2. **Sales** - Track and manage sales, refunds, recurring revenue
3. **Orders** - Create orders with items, handle refunds
4. **Calls** - Track call conversions and qualifications
5. **Attribution** - Advanced attribution reporting with 92 metrics
6. **Products** - Manage product catalog
7. **Tags** - Retrieve available tags
8. **Sources** - Manage traffic sources (organic & paid)
9. **Ads** - Retrieve ad information
10. **Custom Costs** - Add custom costs for attribution
11. **Clicks** - Track and retrieve click data
12. **Carts** - Manage shopping cart data
13. **User Info** - Retrieve account information
14. **Keywords** - Get Google Ads keywords
15. **Subscriptions** - Manage subscription lifecycle

### Platform Support
- Facebook Ads
- Google Ads (including Google v2)
- TikTok Ads
- Snapchat Ads
- LinkedIn Ads
- Twitter Ads
- Pinterest Ads
- Bing Ads

### Attribution Features
- 3 attribution models: last_click, scientific, first_click
- 16 attribution levels (campaigns, adsets, ads, keywords)
- 92 different metrics available
- LTV forecasting (30-day to 1-year)
- Subscription metrics and forecasting
- Custom attribution windows

## 🔑 Key Concepts

### Authentication
All endpoints require an `API-Key` header:
```
API-Key: your_api_key_here
```

### Pagination
Most GET endpoints support pagination:
- `pageSize`: 1-250 (results per page)
- `pageId`: Next page identifier
- Response includes `nextPageId` when more data available

### Date Filtering
Date range filtering uses ISO 8601 format:
- `fromDate`: Start date
- `toDate`: End date
- Timezone assumed from account settings if not specified

### Common Patterns
- Either `email` OR `phoneNumbers` required for creating leads/orders/calls
- Maximum array sizes: 50 for ids/emails/leadIds, 20 for productTags
- Ad source IDs vary by platform (adset, campaign, ad group, ad squad)

## 📊 Endpoint Statistics

- **GET endpoints:** 13 (retrieve data)
- **POST endpoints:** 10 (create resources)
- **PUT endpoints:** 4 (update resources)
- **DELETE endpoints:** 3 (delete/refund)

## 🚀 Implementation Priority (for n8n)

### Phase 1 - MVP (Must Have)
- Leads: Create, Get
- Orders: Create
- Sales: Get
- Attribution: Get Ads Attribution

### Phase 2 - Core Features
- Calls: Create, Get, Update
- Clicks: Create, Get
- Sales: Update, Delete

### Phase 3 - Advanced
- Lead Journey
- Sources: Create, List
- Carts: Create, Update
- Ad Account Attribution

### Phase 4 - Complete
- Subscriptions (all operations)
- Products, Custom Costs
- Ads, Keywords, Tags, User Info

## ⚠️ Special Considerations

### Google Integration
- Requires `adspendSubType` (DISPLAY or VIDEO)
- Google v2 supports keyword-level attribution
- `adSourceId` = campaign ID

### Facebook Integration
- Requires `campaignId` when creating sources
- `adSourceId` = adset ID

### Attribution Endpoints
- May take 5-30+ seconds for complex queries
- Returns error if same request sent before completion
- Support 92 different metrics via comma-separated `fields` parameter

### Order IDs
- Only accepts: letters, numbers, `_`, `-`, `.`, `:`
- No spaces allowed

## 📖 Usage Examples

### Create a Lead
```http
POST /api/v1.0/leads
API-Key: your_api_key

{
  "email": "john@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "tags": ["!newsletter"],
  "phoneNumbers": ["555-1234"]
}
```

### Get Attribution Data
```http
GET /api/v1.0/attribution?attributionModel=last_click&startDate=2024-01-01T00:00:00&endDate=2024-01-31T23:59:59&level=facebook_adset&fields=sales,revenue,cost,roi&ids=123456,789012
API-Key: your_api_key
```

### Create an Order
```http
POST /api/v1.0/orders
API-Key: your_api_key

{
  "email": "customer@example.com",
  "orderId": "ORD-12345",
  "items": [
    {
      "name": "Product A",
      "price": 29.99,
      "quantity": 2
    }
  ]
}
```

## 🔗 Related Files

- `hyros.apib` - Original API Blueprint specification
- All documentation files listed above

## 📝 Notes

- API version documented: 1.31
- Analysis completed: 2025
- File analyzed completely in sections to ensure no endpoints were missed
- All 29 endpoints documented with complete parameter and response details

## 🎯 Ready for n8n Implementation

This documentation provides everything needed to implement a complete n8n community node for Hyros:
- Full endpoint specifications
- Parameter validation rules
- Error handling patterns
- Field organization recommendations
- Testing checklists
- Implementation priorities

## Status Codes

- `200 OK` - Successful request
- `400 Bad Request` - Validation errors
- `401 Unauthorized` - Invalid/missing API key
- `429 Too Many Requests` - Rate limit exceeded

## Support

For questions about the Hyros API, refer to:
- Official Hyros documentation
- API Blueprint file: `hyros.apib`
- Complete endpoint docs: `API_ENDPOINTS_DOCUMENTATION.md`
