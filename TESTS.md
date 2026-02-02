# Hyros API n8n Node - Exhaustive Testing Documentation

**Test Date**: February 2, 2026
**Version**: 2.3.3
**API Base URL**: https://api.hyros.com/v1/api/v1.0
**API Key**: API_38275e9c58520372a49404f696cab8261e3100e893db50af98854194372c975f

---

## Testing Strategy

1. **Create Operations First**: Test POST operations to create resources
2. **Get Operations**: Use IDs from created resources to test retrieval
3. **Update Operations**: Modify existing resources
4. **Delete Operations**: Clean up test resources last
5. **Read-Only Operations**: Test at any time

---

## Test Results

### 1. User Info - Get ✅

**Endpoint**: GET /api/v1.0/user-info
**Purpose**: Retrieve current user information
**Parameters**: None required

**Test Command**:
```bash
curl -X GET "https://api.hyros.com/v1/api/v1.0/user-info" \
  -H "API-Key: API_38275e9c58520372a49404f696cab8261e3100e893db50af98854194372c975f"
```

**Result**:
```json
{
  "result": {
    "userProfile": {
      "email": "carlos.aragon@hyros.com",
      "firstName": "Carlos",
      "lastName": "Aragon",
      "companyName": "Hyros",
      "timezone": "-05:00"
    },
    "allowedAccounts": [...],
    "trueTrackingData": {...}
  },
  "request_id": "a6e96d74979a4f4eb22a4682c0000f89"
}
```

**Status**: ✅ **PASS** - Returns complete user profile and configuration

---

## Testing Progress

| # | Resource | Operation | Status | Notes |
|---|----------|-----------|--------|-------|
| 1 | User Info | Get | ✅ PASS | Returns user profile |
| 2 | Lead | Create | ✅ PASS | Creates lead successfully |
| 3 | Lead | Get Many | ✅ PASS | Returns leads with pagination |
| 4 | Lead | Get Journey | ❌ FAIL | 400 Bad Request - IDs format issue |
| 5 | Lead | Update | ⚠️ API BUG | Hyros API returns 400 error |
| 6 | Sales | Create | ⏳ PENDING | |
| 7 | Sales | Get All | ⏳ PENDING | |
| 8 | Sales | Update | ⏳ PENDING | |
| 9 | Sales | Delete | ⏳ PENDING | |
| 10 | Order | Create | ⏳ PENDING | |
| 11 | Order | Update | ⏳ PENDING | |
| 12 | Order | Delete | ⏳ PENDING | |
| 13 | Call | Create | ⏳ PENDING | |
| 14 | Call | Get | ⏳ PENDING | |
| 15 | Call | Update | ⏳ PENDING | |
| 16 | Call | Delete | ⏳ PENDING | |
| 17 | Cart | Create | ⏳ PENDING | |
| 18 | Cart | Update | ⏳ PENDING | |
| 19 | Click | Create | ⏳ PENDING | |
| 20 | Click | Get | ⏳ PENDING | |
| 21 | Subscription | Create | ⏳ PENDING | |
| 22 | Subscription | Get | ⏳ PENDING | |
| 23 | Subscription | Update | ⏳ PENDING | |
| 24 | Product | Get All | ⏳ PENDING | |
| 25 | Product | Create | ⏳ PENDING | |
| 26 | Tag | Get All | ⏳ PENDING | |
| 27 | Tag | Create | ⏳ PENDING | |
| 28 | Tag | Delete | ⏳ PENDING | |
| 29 | Source | Get All | ⏳ PENDING | |
| 30 | Ad | Get All | ⏳ PENDING | |
| 31 | Stages | Get All | ⏳ PENDING | |
| 32 | Custom Cost | Create | ⏳ PENDING | |
| 33 | Keyword | Get All | ⏳ PENDING | |
| 34 | Domains | Get | ⏳ PENDING | |
| 35 | Tracking Script | Get | ⏳ PENDING | |
| 36 | Attribution | Get Ads Report | ⏳ PENDING | |
| 37 | Attribution | Get Ad Account Report | ⏳ PENDING | |

---

## Known Issues

### Lead Update - API Bug ⚠️
**Status**: Confirmed Hyros API bug
**Evidence**: See ticket created for Hyros support team
**Impact**: Cannot update leads via API
**Workaround**: None available

---

*Testing in progress...*
