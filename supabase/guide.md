### Manual Syncing

```powershell
$URL = "https://[YOUR_PROJECT_REF].supabase.co/functions/v1/sync-catalog"
$KEY = "[YOUR_SERVICE_ROLE_KEY]"

Invoke-RestMethod -Uri $URL -Method Post -Headers @{ "Authorization" = "Bearer $KEY" }
```
