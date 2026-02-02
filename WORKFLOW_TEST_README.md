# HYROS - All Endpoints Test Workflow v2.3.5

Este workflow de n8n contiene ejemplos de TODOS los endpoints del nodo Hyros con los parámetros correctos según las correcciones de las versiones 2.3.2 a 2.3.5.

## Cambios Importantes en v2.3.5

### ✅ Call Update (v2.3.2)
**Antes:** Ambos `ids` y `externalIds` eran requeridos (causaba error)
**Ahora:** Solo uno es requerido (either/or validation)

```json
{
  "resource": "call",
  "operation": "update",
  "externalIds": "test-call-ext-001",  // ← Puede usar ids O externalIds
  "name": "Test Call Updated"
}
```

### ✅ Sales Update (v2.3.3)
**Antes:** No validaba que `ids` fuera proporcionado
**Ahora:** `ids` es requerido en updateFields

```json
{
  "resource": "sales",
  "operation": "update",
  "updateFields": {
    "ids": "sale-id-placeholder",  // ← REQUERIDO
    "totalPrice": 149.99
  }
}
```

### ✅ Lead Get Journey (v2.3.4)
**Antes:** Envolvía IDs con comillas dobles (`ids="id1","id2"`)
**Ahora:** IDs en formato plano (`ids=id1,id2`)

```json
{
  "resource": "lead",
  "operation": "getJourney",
  "ids": "lead-id-placeholder"  // ← Sin comillas en el valor
}
```

### ✅ Custom Cost Create (v2.3.5)
**Antes:**
- `endDate` era requerido
- `frequency` valores en minúsculas (`daily`, `one_time`, `weekly`, `monthly`)

**Ahora:**
- `endDate` es OPCIONAL
- `frequency` solo acepta `DAILY` o `ONE_TIME` (uppercase)
- Requiere `tags`, `startDate`, `cost`

```json
{
  "resource": "customCost",
  "operation": "create",
  "startDate": "2026-02-01T00:00:00.000Z",  // ← REQUERIDO
  "frequency": "ONE_TIME",                   // ← UPPERCASE (DAILY o ONE_TIME)
  "cost": 100,                               // ← REQUERIDO
  "tags": ["test-cost"]                      // ← REQUERIDO
  // endDate es OPCIONAL
}
```

## Cómo Importar el Workflow

1. Abre n8n
2. Click en el menú (tres líneas) → **Import from File**
3. Selecciona `hyros-all-endpoints-test.json`
4. Configura tus credenciales de Hyros API
5. Actualiza los placeholders con IDs reales de tu cuenta:
   - `lead-id-placeholder` → ID real de lead
   - `sale-id-placeholder` → ID real de sale
   - `test-call-ext-001` → External ID real de call

## Nodos Actualizados en Este Workflow

| Nodo | Cambio | Versión Fix |
|------|--------|-------------|
| Call - Create | Agregado `externalId` para testing | v2.3.2 |
| Call - Update | Usa `externalIds` (either/or) | v2.3.2 |
| Sales - Update | Agregado `ids` requerido en updateFields | v2.3.3 |
| Lead - Get Journey | IDs sin comillas | v2.3.4 |
| Custom Cost - Create | Parámetros correctos (startDate, frequency uppercase, tags) | v2.3.5 |

## Testing Recomendado

### Fase 1: GET (Read-Only) - Seguro de ejecutar
✅ Tracking Script - Get
✅ User Info - Get
✅ Domains - Get All
✅ Tag - Get All
✅ Stages - Get All
✅ Lead - Get All
✅ Sales - Get All
✅ Call - Get All

### Fase 2: POST (Create) - Crea recursos de prueba
⚠️ Lead - Create
⚠️ Call - Create
⚠️ Order - Create
⚠️ Custom Cost - Create

### Fase 3: PUT (Update) - Actualiza recursos existentes
⚠️ Lead - Update
⚠️ Sales - Update (requiere IDs reales)
⚠️ Call - Update (usa externalIds)
⚠️ Order - Update

### Fase 4: DELETE - Elimina recursos de prueba
❌ Call - Delete
❌ Order - Delete
❌ Custom Cost - Delete

## Notas Importantes

1. **Credenciales**: Actualiza el `id` de las credenciales en todos los nodos a tus propias credenciales de Hyros
2. **Placeholders**: Reemplaza todos los valores placeholder con datos reales de tu cuenta
3. **Testing Secuencial**: Ejecuta CREATE antes de UPDATE/DELETE
4. **Limitaciones Conocidas**:
   - Lead Update: Bug conocido en API de Hyros (retorna 400)
   - Product Get All: Endpoint no existe (404)
   - Keyword Get All: Requiere Google V2 integración
   - Tag Delete: Endpoint no existe

## Documentación Completa

Ver [TESTING_SUMMARY.md](TESTING_SUMMARY.md) para resultados completos de testing exhaustivo.

## Versión del Nodo

Este workflow está diseñado para **n8n-nodes-hyros v2.3.5**

Para instalar:
```bash
npm install n8n-nodes-hyros@2.3.5
```

O desde n8n Community Nodes:
1. Settings → Community Nodes
2. Install: `n8n-nodes-hyros`
