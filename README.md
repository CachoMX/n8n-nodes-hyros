# n8n-nodes-hyros

[![npm version](https://img.shields.io/npm/v/n8n-nodes-hyros.svg)](https://www.npmjs.com/package/n8n-nodes-hyros)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Complete Hyros API integration for n8n with full endpoint coverage**

Developed by **[Carlos Aragon](https://carlosaragon.online/)** - A complete n8n community node that provides seamless integration with the Hyros advertising attribution and analytics platform.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## ✨ Features

- 🎯 **Complete API Coverage** - All 22 Hyros resources fully implemented (API v1.41)
- ✅ **57 Operations** - Every operation the API documents, including create, read, update and delete where the API supports them
- 🔧 **Production Ready** - Audited line by line against the v1.41 OpenAPI reference, with live-account verification of testable endpoints
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
- **Hyros API version:** v1.41 (base path `/api/v1.0`)

## Resources

This node provides complete coverage of the Hyros API with the following resources:

### Core Resources
- **Leads** - Create, read, update and delete leads, and retrieve journey data. Filter by tag, stage, phone, join date, last-updated date or tag-application date (Tag From/To Date); add and remove tags (with optional backdating via Tags Date) and remove lead stages.
- **Sales** - Manage sales data and track conversions
- **Orders** - Create, update (replace items and order-level fields) and refund orders, including payment-processor fees via Hard Cost
- **Calls** - Track and manage call events

### Attribution & Analytics
- **Attribution** - Get attribution reports for ads and ad accounts, single-entity ROAS, and the marginal CAC curve with its saturation point
- **Ad Accounts** - List the ad accounts connected to Hyros, with the IDs the attribution reports need
- **Ads** - Retrieve ad data from various platforms (Facebook, Google, TikTok, etc.)

### Products & Subscriptions
- **Products** - Create, list, update and delete products, including price and cost of goods
- **Subscriptions** - Track recurring subscriptions

### User & Account
- **User Info** - Get user account information
- **Tags** - Retrieve available tags, with lead counts per tag
- **Sources** - Create, list, update and delete traffic sources (addressed by tag, not by ID), with name and tag filters on Get Many
- **Stages** - Get lead stages, with Stage From/To Date filters to count the leads that entered each stage inside a period
- **Domains** - Retrieve verified domains
- **Request Status** - Poll whether an asynchronous write is PENDING, PROCESSED or FAILED, using the request_id every write returns (statuses retained 2 hours)

### Tracking
- **Tracking Script** - Get tracking scripts for your domains
- **URL Rules** - Create, list, update and delete the rules that tag tracked traffic by URL (action, source, sale, subscription and lead-stage flavors)
- **Clicks** - Track click events, and retrieve the clicks of one or many leads (by Lead ID, Lead IDs or Emails)
- **Carts** - Create, update and list cart events, filterable to abandoned carts
- **Keywords** - Retrieve keyword data
- **Custom Costs** - Create, list, update and delete custom cost data

### Webhooks
- **Webhook Subscriptions** - Create, list, and delete webhook subscriptions for all 11 event types, including `sale.attributed`, `sale.refunded`, `lead.opted.in`, `lead.stage.changed`, `lead.tag.added`, `lead.tag.removed`, `subscription.created`, and `subscription.status.changed`. Requires an API key with the webhook role enabled in the Hyros admin panel (without it the API returns 401). The Create response includes a one-time `secretKey` for validating the HMAC signature of deliveries.

### Agency Access

Agencies can act on a connected client account: set the optional **Accessible Account ID** on the credential and every request runs against that client account instead of your own (sent as the `Accessible-Account-Id` header, API v1.40). Unauthorized targets are rejected by the API with 403.

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
| Resources | ✅ All 22 resources |
| Operations | ✅ All 57 operations |
| Parameters | ✅ Complete support |
| Error Handling | ✅ Complete |
| Pagination | ✅ Full support |
| Type Safety | ✅ TypeScript |
| Testing | ✅ Dual QA audits against the v1.40 spec, plus live verification |

### Testing & Documentation

Every release is audited line by line against the current OpenAPI reference (v1.41 for 3.0.0), and additions are verified against a live Hyros account whenever an endpoint is testable. Historical milestones:
- ✅ **v2.3.x:** exhaustive 4-phase live validation (GET/POST/PUT/DELETE) of the original 33-endpoint surface, 4 bugs found and fixed
- ✅ **v2.8-2.9:** every v1.38/v1.39 addition verified against a live account before shipping
- ✅ **v2.10.0:** dual independent QA passes reviewing all 22 resources and 56 operations parameter by parameter against the v1.40 spec

### Known Limitations

⚠️ **Strict API validation (since Hyros API v1.38, July 2026):** unknown query parameters and body fields are rejected with a 400 error instead of being silently ignored. This node only sends documented parameters, but if you see `Unknown parameter`/`Unknown field` errors after a Hyros API change, update this package.

Historical issues now fixed server-side: Lead Update without a `tags` field (HPC-10694) and ignored GET /leads email/id filters both work correctly as of API v1.38 (verified live, July 2026).

Other documented limitations:
- **Marginal CAC Curve:** documented in API spec v1.40 but the live endpoint returns 404 as of 2026-08-19 (not yet deployed by Hyros). The operation is implemented and will start working as soon as Hyros ships it.
- **Role-gated endpoints:** URL Rules, Request Status and ROAS require their API key roles ("Get/Create/Update/Delete URL Rules", "Get Request Status", "Get ROAS") enabled in the Hyros admin panel; without them the API returns 403.
- **Keyword Get All:** Requires Google V2 account integration
- **Tag Delete:** Endpoint not available in current API version
- **Eventual Consistency:** Writes are queued - created leads appear in GET requests after roughly 20 seconds, tag updates can take a few minutes (measured July 2026)
- **Bundled blueprint:** The repo file `hyros.apib` documents API v1.36 and predates the v1.38 additions (tags filter, removeTags, webhook subscriptions). The current reference is https://api-docs.hyros.com/ai-context/rest-api.txt

### Supported Platforms
- ✅ Facebook Ads
- ✅ Google Ads (including Google v2)
- ✅ TikTok Ads
- ✅ Snapchat Ads
- ✅ LinkedIn Ads
- ✅ Twitter Ads
- ✅ Pinterest Ads
- ✅ Bing Ads
- ✅ Reddit Ads
- ✅ AppLovin
- ✅ Whop Ads

## Version History

### 3.0.0 (Current)
- **Matches Hyros API v1.41.** Major version because the API removed two resources this node shipped in 2.10.0.
- **Removed: Conversion Definitions and Custom Conversions.** The Hyros API removed the `/conversion-definition` and `/custom-conversion` endpoints entirely; both resources are gone from the node. Workflows still using them must be migrated (URL Rules cover the tagging use cases).
- **New resource: URL Rules.** Create, Get, Get Many, Update and Delete for `/url-rules`, the rules that tag tracked traffic by URL. All five flavors are supported: action (`!`), source (`@`), sale (`$`), subscription (`#`) and lead-stage (prefix-less tag with Create Lead Stage enabled). Includes words to match and not to match, previous/referrer URL selection, base-domain matching, disregard source, dynamic or manual traffic source and source category, and keyword score groups. Note that Update is a full replacement: omitted optional fields are cleared, and omitting Is Enabled re-enables the rule.
- **New resource: Request Status.** `GET /requests/{request_id}` reports whether an asynchronous write is PENDING, PROCESSED or FAILED (statuses retained 2 hours). Once PROCESSED it also returns a snapshot of the resource the write produced, so a workflow can poll instead of retrying the write and creating duplicates.
- **Order Create/Update: Hard Cost.** Attach payment-processor fees (e.g. Stripe) to an order. The cost is distributed evenly across line items and lowers net profit without inflating revenue. On Update, omitting it keeps the stored value and sending 0 clears it; negative values are rejected.
- **Lead Get Many: Tag From/To Date filters.** Retrieve the leads that had a tag applied inside a period, combined with the Tags filter or on their own.
- **Lead Update: Remove Lead Stages.** Remove stage names from a lead. Unknown names reject the request with a 400; stages the lead does not hold are ignored.
- **Stages: Stage From/To Date filters.** Count the leads that entered each stage inside a period ("how many leads entered this stage this week") instead of the default current-stage count.
- **Source Get Many: Name and Tag filters.** Look up a source by exact name or tag, ignoring case. (The existing Tag field on Source Update, which renames the tag, is unchanged.)
- **Click Get: Lead IDs and Emails.** Retrieve the clicks of many leads in one call (max 50 each); the single Lead ID parameter keeps working, and exactly one of the three must be provided.

### 2.10.0
- **Matches Hyros API v1.40.** Every gap between the API reference and this node was closed, several latent bugs were fixed, and the whole surface (22 resources, 56 operations) went through two independent QA audits, parameter by parameter, before release. Read the details below, and visit [carlosaragon.online](https://carlosaragon.online/) for more automation tooling like this.
- **Domains path verified live** - the v1.40 spec claims `/domains` moved to `/api/v1/`, but the live API still serves it at `/api/v1.0/domains` and 404s the spec path (verified 2026-08-19). The node keeps calling the path that actually answers.
- **Fixed: Source Create offered integration types the API rejects** - creation only accepts FACEBOOK, GOOGLE, LINKEDIN, SNAPCHAT and TIKTOK; BING, PINTEREST and TWITTER were removed from the Create dropdown (they remain valid as Get Many filters).
- **Fixed: Product Get Many filters returned 400** - the node sent `ids` and `tags` filters that API v1.40's strict validation rejects with `Unknown parameter`. It now sends the documented filters (`name`, `tag`, `category`, `isRecurringSale`); stored `ids`/`tags` values from old workflows are ignored instead of erroring. A new **Recurring** filter (RECURRING / NON_RECURRING / ALL) was added.
- **Fixed: Product Update sent field names the API rejects** - the API expects `customCost` and `isRecurringSale`, not `costOfGoods` and `recurring`. The UI field names are unchanged (saved workflows keep working); the node now remaps them before sending. Also new on update: `tag`, `callProduct`, `packages` (send `[]` to clear), and `updateHistoricalSales` to propagate a cost change to existing sales.
- **New resource: Conversion Definitions** - Create, Get Many, Update and Delete for `/conversion-definition`. Definitions declare the fields a custom conversion captures (at least 3, typed STRING/NUMBER/BOOLEAN/DATE); name and tag are immutable after creation.
- **New resource: Custom Conversions** - record conversion events (demo booked, application submitted, call qualified) attributed to a lead by email or phone. Custom fields are sent as typed top-level properties; if no definition exists for the tag, Hyros creates one automatically.
- **Attribution: Get ROAS** - cash collected vs ad spend for a single ad, ad set, campaign or account, always under last click. Choose the `basis`: click date (credits clicks in range) or sale date (revenue collected in range).
- **Attribution: Get Marginal CAC Curve** - what acquiring the next customer costs at every observed daily spend level, and the saturation point past which the next dollar is wasted. Supports LTV-window or caller-provided CAC ceilings and first/last click models.
- **Attribution Ads Report: Lead Stage filter** - filter the report to sources with leads in given account stages (sent as the API's `lead_stage` parameter).
- **Order: Update** - replace an order's items and update order-level fields (stage, taxes, shipping, discount, currency). With `integrationType`, the order can be resolved by an item's external ID. Order items (create and update) also gain `SKU` and `Is Rebill`.
- **Lead Create/Update: Tags Date** - backdate the assignment date of the tags being applied, for imports, migrations and CRM syncs. Generated sales and source attributions are backdated too.
- **Tracking Script: 4 new options** - SPA tracking, Ignore Previous URL, Embed on Iframes, and Delete Tracking Script Params (hides tracking parameters from the URL after use).
- **Webhook Subscriptions: 3 new event types** - `lead.stage.changed`, `lead.tag.added`, `lead.tag.removed` (11 total).
- **Agency access** - new optional **Accessible Account ID** credential field sends the `Accessible-Account-Id` header on every request, letting agencies act on a connected client account.
- **Source Update: reassign the tag** - new optional Tag field to rename a source's `@tag`.
- **Newer ad platforms selectable** - the Source and Ad integration type filters now include Google V2, Reddit, AppLovin and Whop Ads; Click Create adds Google V2.
- **Cart items: Is Rebill** - mark a cart item as recurring even when it is the first sale, matching the Order items.
- **Keyword Get: Ad Group ID now optional** - leave it empty to list all keywords, per the spec.
- **Pagination everywhere** - Return All / Limit added to Ad Accounts, Keywords, Calls, Subscriptions and Clicks, which previously returned only the first page silently.
- **Subscription Update: price now optional** - the API only requires `ids`; leave Price at 0 to update status or dates without touching the price.

### 2.9.1
- **Fixes the n8n community scanner check** — the Lead operation list was not alphabetized, which the scanner's `@n8n/community-nodes` ruleset rejects. 2.9.0 published with this error; 2.9.1 clears it. Operation `value`s are unchanged, so saved workflows are unaffected.
- **Closes the gap that let it through** — `npm run scan` can only scan a *published* package, so it cannot catch this before release. The rule is now enabled in `.eslintrc.js`, making `npm run lint` fail on it pre-release.

### 2.9.0
- **Matches Hyros API v1.39**, published 2026-08-04. Every addition below was verified against a live account before shipping.
- **Fixed: Ad Account attribution report grouping never worked** — the node sent `dateTimeGroupingOption`, the name the Hyros spec documents. The API silently ignores it and returns a single aggregate row, so any workflow grouping by day, week, month or year has been getting one row instead. It now sends `adLevelDateGroupingOption`, which the API honors (a 30-day window returns 30 rows summing exactly to the aggregate). The UI field keeps its name, so saved workflows need no change.
- **New resource: Ad Accounts** — Get Many lists every connected ad account with its ID, name and platform. Use it to discover the IDs the attribution reports require.
- **Lead: Delete** — permanently erases a lead and its personal data, for GDPR and CCPA requests
- **Lead Get Many: three new filters** — `Phones` (matched on trailing digits, so formatting and country codes are tolerated), `Stage`, and `Updated From/To Date`. The updated-date pair is what makes incremental sync possible: From/To Date filter on the join date and miss leads that were later re-tagged or re-staged.
- **Lead Get Journey: accepts emails** — pass Emails instead of Lead IDs and skip the lookup call. Lead IDs is no longer required; provide either. New Include Events toggle returns the chronological event list.
- **Products: Get Many, Update, Delete** — list the catalog, correct a price or cost of goods, remove a product created by mistake
- **Custom Costs: Get Many, Update, Delete** — audit costs in a date window and close open-ended recurring costs that skew profit and ROAS. Update replaces the whole record, so send every field.
- **Sources: Update, Delete** — rename or reclassify a source, toggle its organic and disregarded flags, or remove it. Sources are addressed by tag (e.g. `@california`), not by ID.
- **Carts: Get Many** — filter by purchase status, lead or date. Set Purchased to false to find abandoned carts.
- **Tags: Get Many With Counts** — tags with the number of leads carrying each, paginated. Note the name filter is an exact match including the prefix: `@california` finds the tag, `california` returns nothing. The original Get Many is deprecated by Hyros but still works.

### 2.8.2
- **Passes the new provenance source scan** - @n8n/scan-community-package now lints the GitHub source of provenance-signed packages with the strict @n8n/community-nodes ruleset; this release conforms: credential icon, `usableAsTool`, `NodeConnectionTypes` inputs/outputs, `NodeOperationError`/`NodeApiError` everywhere, singular resource labels, and alphabetized option lists (order-only; all stored `value`s unchanged, saved workflows unaffected)

### 2.8.1
- **Clean errors for unresolved expressions** - when an ID expression (e.g. `{{ $json.id }}`) resolves to undefined at runtime, Sales Delete, Order Refund, Call Delete, Webhook Subscription Delete, Lead Get Journey, and Subscription Update now fail fast with a clear node error ("Sale ID is required") instead of crashing with a TypeError. Found during live end-to-end testing in n8n.

### 2.8.0
- **New resource: Webhook Subscriptions** — Create, Get Many, and Delete operations for `/webhook-subscriptions`, covering all 8 event types including the new `sale.refunded`, `subscription.created`, and `subscription.status.changed`
- **Lead Get Many: filter by tags** — new `Tags` filter using the API's new `tags` query parameter
- **Lead Update: Remove Tags** — new field using the API's new `removeTags` body field for bidirectional tag management
- **Lead Update: Stage compatibility fix** — the POST-only `stage` field is now mapped to `leadStage` on update; the API's new strict validation rejects unknown body fields, so workflows saved with the old Stage field keep working
- Matches Hyros API spec v1.38 (strict request validation)
- **Verifier fixes** - passes @n8n/scan-community-package 0.27.1: stopped shipping TypeScript declaration files in dist (filename-convention rule) and relaxed `peerDependencies.n8n-workflow` to `"*"` as the scanner now requires
- **Strict-validation hardening** - removed the Phone Numbers filter from Call Get (GET /calls never supported it; the API now rejects it with 400, verified live) and the Page Size/Page ID options from the Ad Account attribution report (that endpoint has no pagination); blank values in Lead list fields (tags, phone numbers, IPs) no longer reach the API
- **Safer deletes** - resource IDs are URL-encoded in DELETE paths, and empty IDs fail fast with a clear node error instead of hitting the API

### 2.7.2
- Switched to `httpRequestWithAuthentication` in `GenericFunctions.ts` and the tracking script call to comply with the n8n community-package verifier
- Removed manual `API-Key` header injection (now handled by the credential's `authenticate` block)
- No behavioral change for end users — same endpoints, same auth, same payloads

### 2.7.1
- First release published from CI with npm provenance
- Added GitHub Actions release workflow (`.github/workflows/release.yml`)
- Added on-demand scan workflow (`.github/workflows/scan.yml`) that runs `@n8n/scan-community-package`
- Added `release:check` script and tightened `peerDependencies.n8n-workflow` to `^1.0.0`
- Added `engines.node: ">=20.15"` and `publishConfig.provenance: true`
- Added `@types/node` (fixes build for native `fetch` workaround in `GenericFunctions.ts`)
- Fixed README LICENSE link to point at this repo

### 2.7.0
- Re-enabled leadIds filter for Sales, Calls, and Subscriptions after Hyros platform fix confirmed
- Added missing Attribution API parameters (status, timeGroupingOption, pageSize, pageId)
- Added optional name field for Custom Cost creation
- Updated API blueprint to v1.36 with rate limiting documentation

### 2.6.0
- Full audit against API blueprint v1.36
- Fixed Custom Cost frequency values and parameter corrections
- Updated Subscription cancelAtDate field descriptions
- Multiple parameter alignment fixes

### 2.3.6
- Removed non-functional leadIds parameter (re-enabled in v2.7.0)
- Documented Lead Update API bug and known limitations

### 2.3.5
- **PRODUCTION READY**: Exhaustive testing of all 37+ endpoints completed
- Fixed Custom Cost Create: endDate now optional, frequency values uppercase (DAILY, ONE_TIME)
- Removed invalid frequency options (weekly, monthly not in API spec)
- Complete testing documentation available in repository

### 2.3.4
- Fixed Lead Get Journey: Removed incorrect quote wrapping from IDs parameter
- Query format corrected: `ids=id1,id2` instead of `ids="id1","id2"`

### 2.3.3
- Added validation for Sales Update: IDs parameter now required check

### 2.3.2
- Fixed Call Update: Changed ids/externalIds from both required to either/or validation
- Improved error messages for parameter validation

### 2.3.1
- Fixed DELETE operations to return complete API responses (3 final bugs)
- All 33 endpoints now 100% match blueprint specification

### 2.3.0
- **FINAL RELEASE**: 100% Blueprint Compliance - All 33 endpoints verified
- Fixed all POST/PUT response handling (13 bugs)
- Fixed all DELETE operations to return complete responses (3 bugs)
- Fixed Tracking Script to handle text/plain response correctly
- Ultra-detailed line-by-line analysis completed (3,316 lines of blueprint)
- Absolute confidence: NO bugs remaining, ALL endpoints match specification

### 2.2.0
- **CRITICAL FIX**: Fixed all GET endpoint response handling (15 bugs)
- Fixed pagination to use pageId cursor instead of page numbers
- Fixed User Info endpoint URL from /user to /user-info
- All GET operations now properly extract .result field from API responses
- Fixed Tracking Script to wrap plain text response
- Fixed Domains to convert string array to objects
- Verified all 34 endpoints work correctly with Hyros API

### 2.1.4
- Fix Tag Get All operation to handle API response structure correctly

### 2.1.3
- Clean repository structure (moved internal docs to Docs/ folder)

### 2.1.2
- Sync README version history

### 2.1.1
- Updated README version history

### 2.1.0
- Complete API implementation with all endpoints fixed and tested
- Fixed 21 critical endpoint issues identified in full audit
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
- Added complete field support for all resources

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

[MIT](./LICENSE.md)

Copyright © 2024 [Carlos Aragon](https://carlosaragon.online/)

## ⚠️ Disclaimer

This is a **community-maintained node** developed independently by Carlos Aragon and is not officially supported by Hyros. For official Hyros support, please contact Hyros directly.

## 🙏 Acknowledgments

- Thanks to the n8n community for the excellent workflow automation platform
- Thanks to Hyros for providing a complete API
- Thanks to all contributors and users of this node

---

<div align="center">

**Made with ❤️ by [Carlos Aragon](https://carlosaragon.online/)**

⭐ Star this repo if you find it useful!

</div>
