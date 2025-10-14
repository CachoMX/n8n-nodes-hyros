# n8n-nodes-hyros

This is an n8n community node that provides complete integration with the Hyros API.

[Hyros](https://www.hyros.com/) is a powerful ad tracking and attribution platform that helps businesses track their advertising campaigns across multiple platforms and optimize their marketing spend.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Table of Contents

- [Installation](#installation)
- [Operations](#operations)
- [Credentials](#credentials)
- [Compatibility](#compatibility)
- [Usage](#usage)
- [Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### Community Nodes (Recommended)

1. Go to **Settings > Community Nodes**
2. Select **Install**
3. Enter `n8n-nodes-hyros` in **Enter npm package name**
4. Agree to the [risks](https://docs.n8n.io/integrations/community-nodes/risks/) of using community nodes
5. Select **Install**

### Manual Installation

To install manually, run the following command in your n8n installation directory:

```bash
npm install n8n-nodes-hyros
```

## Operations

This node provides **complete coverage** of all 29 Hyros API endpoints across 15 resources:

### Lead (3 operations)
- **Create**: Create a new lead with email and tracking information
- **Get**: Retrieve lead information by email
- **Get Journey**: Get complete customer journey with sales, calls, carts, and linked leads

### Sales (3 operations)
- **Get Many**: Retrieve sales with filtering and pagination
- **Update**: Update sale information
- **Delete**: Remove a sale record

### Order (2 operations)
- **Create**: Create a new order with items and tracking
- **Refund**: Process order refund (partial or full)

### Call (4 operations)
- **Create**: Log a new call event
- **Get**: Retrieve call information
- **Update**: Update call details
- **Delete**: Remove a call record

### Attribution (2 operations)
- **Get Ads Report**: Get attribution data for ads at various levels (campaigns, adsets, ads, keywords, etc.)
- **Get Ad Account Report**: Get attribution data at ad account level

### Product (1 operation)
- **Create**: Create a new product in Hyros

### Tag (1 operation)
- **Get Many**: Retrieve all available tags

### Source (2 operations)
- **Get Many**: List all traffic sources
- **Create**: Create a new traffic source

### Ad (1 operation)
- **Get Many**: Retrieve ads from advertising platforms with filtering

### Custom Cost (1 operation)
- **Create**: Add custom cost for any source

### Click (2 operations)
- **Create**: Track a click event
- **Get**: Retrieve click information

### Cart (2 operations)
- **Create**: Create a new cart with items
- **Update**: Update cart contents

### User Info (1 operation)
- **Get**: Retrieve user account information

### Keyword (1 operation)
- **Get**: Retrieve keyword information

### Subscription (3 operations)
- **Get**: Retrieve subscription details
- **Create**: Create a new subscription
- **Update**: Update subscription status and details

## Credentials

This node requires Hyros API credentials:

1. **API Key**: Your Hyros API key (found in your Hyros account settings)
2. **Base URL**: The Hyros API base URL (default: `https://api.hyros.com/v1`)

### How to Get Your API Key

1. Log in to your Hyros account
2. Navigate to **Settings** > **API**
3. Copy your API key
4. Paste it into the n8n credentials configuration

## Compatibility

- Minimum n8n version: 0.220.0
- Tested with n8n version: 1.0.0+

## Usage

### Example 1: Create a Lead and Track Journey

```json
{
  "nodes": [
    {
      "parameters": {
        "resource": "lead",
        "operation": "create",
        "email": "customer@example.com",
        "additionalFields": {
          "firstName": "John",
          "lastName": "Doe",
          "phone": "+1234567890",
          "tags": "newsletter,webinar",
          "source": "facebook",
          "fbclid": "fb_click_id_here"
        }
      },
      "name": "Create Lead",
      "type": "n8n-nodes-hyros.hyros",
      "position": [250, 300]
    },
    {
      "parameters": {
        "resource": "lead",
        "operation": "getJourney",
        "email": "={{$json[\"email\"]}}"
      },
      "name": "Get Lead Journey",
      "type": "n8n-nodes-hyros.hyros",
      "position": [450, 300]
    }
  ]
}
```

### Example 2: Create Order with Multiple Items

```json
{
  "parameters": {
    "resource": "order",
    "operation": "create",
    "email": "customer@example.com",
    "orderNumber": "ORD-12345",
    "items": {
      "item": [
        {
          "productId": "PROD-001",
          "productName": "Premium Course",
          "price": 997,
          "quantity": 1
        },
        {
          "productId": "PROD-002",
          "productName": "Bonus Template Pack",
          "price": 97,
          "quantity": 1
        }
      ]
    },
    "additionalFields": {
      "total": 1094,
      "currency": "USD",
      "source": "email_campaign",
      "tags": "black-friday-sale"
    }
  }
}
```

### Example 3: Get Attribution Report

```json
{
  "parameters": {
    "resource": "attribution",
    "operation": "getAdsReport",
    "platform": "facebook",
    "level": "campaigns",
    "startDate": "2024-01-01T00:00:00Z",
    "endDate": "2024-01-31T23:59:59Z",
    "returnAll": false,
    "limit": 100,
    "additionalFields": {
      "attributionModel": "scientific",
      "metrics": [
        "ad_spend",
        "leads",
        "sales",
        "revenue",
        "roas",
        "profit"
      ],
      "timezone": "America/New_York",
      "currency": "USD"
    }
  }
}
```

### Example 4: Track Call Event

```json
{
  "parameters": {
    "resource": "call",
    "operation": "create",
    "email": "customer@example.com",
    "callId": "CALL-12345",
    "additionalFields": {
      "phoneNumber": "+1234567890",
      "duration": 1200,
      "status": "answered",
      "direction": "inbound",
      "value": 500,
      "tags": "sales-qualified",
      "notes": "Interested in premium package"
    }
  }
}
```

### Example 5: Create Subscription

```json
{
  "parameters": {
    "resource": "subscription",
    "operation": "create",
    "email": "customer@example.com",
    "subscriptionId": "SUB-12345",
    "additionalFields": {
      "productId": "PROD-MONTHLY",
      "productName": "Monthly Membership",
      "planName": "Standard Plan",
      "amount": 97,
      "currency": "USD",
      "billingInterval": "monthly",
      "status": "active",
      "startDate": "2024-01-01T00:00:00Z",
      "tags": "recurring-revenue"
    }
  }
}
```

## Features

### Complete API Coverage
- **All 29 endpoints** from the Hyros API Blueprint are implemented
- No endpoints are missing or omitted

### Attribution Tracking
- Support for **8 advertising platforms**: Facebook, Google, TikTok, Snapchat, LinkedIn, Twitter, Pinterest, Bing
- **16 attribution levels**: campaigns, adsets, ads, keywords, placements, devices, ages, genders, locations, publishers, ad positions, landing pages, creatives, ad types, video views, interests
- **3 attribution models**: last_click, scientific, first_click
- **92+ attribution metrics** available

### Flexible Data Handling
- Support for custom fields (JSON objects)
- Comprehensive filtering and pagination
- Date range queries with timezone support
- Multiple items support (orders, carts)

### Error Handling
- Proper error messages for all operations
- Validation of required parameters
- Continue on fail option for batch processing

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Hyros API Documentation](https://docs.hyros.com/)
- [Hyros Website](https://www.hyros.com/)

## Development

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

### Format

```bash
npm run format
```

## Version History

### 1.0.0 (Initial Release)
- Complete implementation of all 29 Hyros API endpoints
- Support for 15 resources
- Full attribution reporting capabilities
- Comprehensive tracking features

## License

[MIT](LICENSE.md)

## Author

Created by **Carlos Aragon**

- 🌐 Website: [carlosaragon.online](https://carlosaragon.online/)
- 📧 Email: info@carlosaragon.online
- 💻 GitHub: [@CachoMX](https://github.com/CachoMX)

## Support

For issues, questions, or contributions, please visit the [GitHub repository](https://github.com/CachoMX/n8n-nodes-hyros) or contact Carlos at info@carlosaragon.online.

---

**Note**: This is a community-maintained node created by Carlos Aragon. For official Hyros support, please contact Hyros support or refer to their official documentation.
