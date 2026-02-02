# n8n-nodes-hyros

[![npm version](https://img.shields.io/npm/v/n8n-nodes-hyros.svg)](https://www.npmjs.com/package/n8n-nodes-hyros)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Complete Hyros API integration for n8n with full endpoint coverage**

Developed by **[Carlos Aragon](https://carlosaragon.online/)** - A comprehensive n8n community node that provides seamless integration with the Hyros advertising attribution and analytics platform.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## ✨ Features

- 🎯 **Complete API Coverage** - All 18 Hyros resources fully implemented
- ✅ **34+ Operations** - Create, read, update, delete operations for all resources
- 🔧 **Production Ready** - Thoroughly tested with 100% test pass rate
- 📊 **Advanced Attribution** - Full support for attribution reports and analytics
- 🔄 **Real-time Tracking** - Track leads, sales, calls, clicks, and conversions
- 🛡️ **Type Safe** - Full TypeScript implementation with proper error handling
- 📦 **Easy Installation** - One-click install from n8n Community Nodes

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### Community Nodes (Recommended)

1. Go to **Settings > Community Nodes** in your n8n instance
2. Select **Install**
3. Enter `n8n-nodes-hyros` in the **Package Name** field
4. Agree to the [risks](https://docs.n8n.io/integrations/community-nodes/risks/) and select **Install**

### Manual Installation

To install manually, run the following command in your n8n root directory:

```bash
npm install n8n-nodes-hyros
```

## Credentials

This node requires a Hyros API Key. You can obtain your API key from your Hyros account settings.

### Setting up credentials:
1. In n8n, create new credentials of type **Hyros API**
2. Enter your API Key
3. Save the credentials

## Compatibility

- **n8n version:** 1.0.0 or later
- **Hyros API version:** v1.0

## Resources

This node provides complete coverage of the Hyros API with the following resources:

### Core Resources
- **Leads** - Create, read, update leads and retrieve journey data
- **Sales** - Manage sales data and track conversions
- **Orders** - Create and manage orders with items
- **Calls** - Track and manage call events

### Attribution & Analytics
- **Attribution** - Get attribution reports for ads and ad accounts
- **Ads** - Retrieve ad data from various platforms (Facebook, Google, TikTok, etc.)

### Products & Subscriptions
- **Products** - Create and manage products
- **Subscriptions** - Track recurring subscriptions

### User & Account
- **User Info** - Get user account information
- **Tags** - Retrieve available tags
- **Sources** - Manage traffic sources
- **Stages** - Get lead stages
- **Domains** - Retrieve verified domains

### Tracking
- **Tracking Script** - Get tracking scripts for your domains
- **Clicks** - Track click events
- **Carts** - Manage cart events
- **Keywords** - Retrieve keyword data
- **Custom Costs** - Add custom cost data

## Operations

Each resource supports various operations including:
- **Create** - Add new records
- **Get** - Retrieve single or multiple records
- **Get All** - Retrieve all records with pagination
- **Update** - Modify existing records
- **Delete** - Remove records

See the node's built-in documentation for detailed operation parameters.

## 🚀 Quick Start Examples

### Example 1: Track a New Lead
```javascript
// When a new contact is added to your CRM, create a lead in Hyros
{
  "resource": "lead",
  "operation": "create",
  "email": "customer@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "tags": ["newsletter", "webinar"],
  "phoneNumbers": ["+1-555-0100"]
}
```

### Example 2: Get Sales Data with Filters
```javascript
// Retrieve all non-refunded sales from the last 30 days
{
  "resource": "sales",
  "operation": "getAll",
  "filters": {
    "fromDate": "2024-01-01T00:00:00",
    "toDate": "2024-01-31T23:59:59",
    "saleRefundedState": "NON_REFUNDED"
  }
}
```

### Example 3: Create an Order with Items
```javascript
// Track a new order when a customer completes checkout
{
  "resource": "order",
  "operation": "create",
  "email": "customer@example.com",
  "orderId": "ORDER-12345",
  "items": [
    {
      "name": "Premium Course",
      "price": 297.00,
      "quantity": 1
    }
  ],
  "currency": "USD"
}
```

### Example 4: Get Attribution Data
```javascript
// Get Facebook ad performance data
{
  "resource": "attribution",
  "operation": "getAdsReport",
  "attributionModel": "last_click",
  "level": "facebook_adset",
  "startDate": "2024-01-01",
  "endDate": "2024-01-31",
  "fields": ["sales", "revenue", "cost", "roi", "roas"]
}
```

### Example 5: Update Lead Journey
```javascript
// Update an existing lead with new information
{
  "resource": "lead",
  "operation": "update",
  "searchBy": "email",
  "email": "customer@example.com",
  "firstName": "Jane",
  "tags": ["vip-customer"]
}
```

## 📊 Complete API Coverage

This node provides **100% coverage** of the Hyros API v1.0:

| Feature | Coverage |
|---------|----------|
| Resources | ✅ All 18 resources |
| Operations | ✅ All 34+ operations |
| Parameters | ✅ Complete support |
| Error Handling | ✅ Comprehensive |
| Pagination | ✅ Full support |
| Type Safety | ✅ TypeScript |
| Testing | ✅ 100% pass rate |

### Supported Platforms
- ✅ Facebook Ads
- ✅ Google Ads (including Google v2)
- ✅ TikTok Ads
- ✅ Snapchat Ads
- ✅ LinkedIn Ads
- ✅ Twitter Ads
- ✅ Pinterest Ads
- ✅ Bing Ads

## Version History

### 2.1.3 (Current)
- Clean repository structure (moved internal docs to Docs/ folder)

### 2.1.2
- Sync README version history

### 2.1.1
- Updated README version history

### 2.1.0
- Complete API implementation with all endpoints fixed and tested
- Fixed 21 critical endpoint issues identified in comprehensive audit
- Added 3 new resources: Tracking Script, Domains, and Stages
- Corrected required fields across all resources (Call, Product, Click, Subscription, Attribution, Lead, Order, Sales, Source, Ad, Cart)
- Fixed parameter locations (query vs body) for all operations
- Added missing UPDATE operation for Leads resource
- All endpoints tested and validated with 100% pass rate

### 2.0.3
- Complete API coverage with all endpoints
- Fixed all parameter mappings to match API specification
- Added new resources: Tracking Script, Domains, Stages
- Improved error handling and validation
- Added comprehensive field support for all resources

### 2.0.2
- Optimized logo to SVG format

### 2.0.1
- Added official Hyros logo

### 2.0.0
- Major fixes: Corrected all endpoint implementations
- Updated field names to match API specification
- Added missing operations and parameters

## Development

```bash
# Install dependencies
npm install

# Build the node
npm run build

# Run linter
npm run lint

# Auto-fix linting issues
npm run lintfix
```

## 🔧 Use Cases

This node is perfect for:

- **Marketing Automation** - Automatically sync leads and conversions from your funnels
- **Attribution Tracking** - Track and analyze ad performance across multiple platforms
- **E-commerce Integration** - Sync orders and customer data in real-time
- **CRM Integration** - Keep your customer data synchronized with Hyros
- **Analytics Workflows** - Build custom reporting and analytics dashboards
- **Lead Scoring** - Automatically update lead stages based on behavior
- **Revenue Tracking** - Monitor sales, refunds, and recurring revenue

## 📚 Resources & Support

- 📖 [Hyros API Documentation](https://help.hyros.com/en/collections/2439298-hyros-api)
- 💬 [n8n Community Forum](https://community.n8n.io/)
- 🐛 [Report Issues](https://github.com/CachoMX/n8n-nodes-hyros/issues)
- 🌐 [Developer Website](https://carlosaragon.online/)

## 👨‍💻 Author

<div align="center">

### **Carlos Aragon**

[![Website](https://img.shields.io/badge/Website-carlosaragon.online-blue?style=for-the-badge&logo=google-chrome)](https://carlosaragon.online/)
[![Email](https://img.shields.io/badge/Email-info@carlosaragon.online-red?style=for-the-badge&logo=gmail)](mailto:info@carlosaragon.online)

**Full Stack Developer & n8n Automation Expert**

*Specialized in API integrations, workflow automation, and marketing technology solutions*

</div>

---

### About This Node

This node was meticulously developed and tested by **Carlos Aragon** to provide the most complete and reliable Hyros integration available for n8n. With **100% API coverage** and **extensive testing**, it's built for production use in demanding marketing automation scenarios.

- ✅ Professionally developed and maintained
- ✅ Thoroughly tested with real API
- ✅ Regular updates and improvements
- ✅ Community-driven support

Visit [carlosaragon.online](https://carlosaragon.online/) for more automation solutions and consulting services.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](https://github.com/CachoMX/n8n-nodes-hyros/issues) if you want to contribute.

### How to Contribute

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

[MIT](https://github.com/n8n-io/n8n-nodes-starter/blob/master/LICENSE.md)

Copyright © 2024 [Carlos Aragon](https://carlosaragon.online/)

## ⚠️ Disclaimer

This is a **community-maintained node** developed independently by Carlos Aragon and is not officially supported by Hyros. For official Hyros support, please contact Hyros directly.

## 🙏 Acknowledgments

- Thanks to the n8n community for the excellent workflow automation platform
- Thanks to Hyros for providing a comprehensive API
- Thanks to all contributors and users of this node

---

<div align="center">

**Made with ❤️ by [Carlos Aragon](https://carlosaragon.online/)**

⭐ Star this repo if you find it useful!

</div>
