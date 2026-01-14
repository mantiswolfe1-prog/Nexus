## Latest Fix: External Browser Button

When sites like Google refuse to load in iframe (due to X-Frame-Options security headers), users now see an "Open Externally ↗" button in the top-right corner.

### What Changed:
- Browser iframe shows an "Open Externally" button after 2 seconds
- This button opens the site in a new browser tab
- Sites that do support iframe embedding will load normally
- Sites that block embedding can be opened externally

### To Deploy:

```bash
cd /workspaces/Nexus-Community-Project
git add -A
git commit -m "improve: add external browser button for blocked sites"
git push origin main
```

### After Deploy:
1. Hard refresh (Ctrl+Shift+R)
2. Try loading google.com - will show "Open Externally" button
3. Try loading wikipedia.org - should load normally in iframe

This gives users control: sites that block embedding can still be accessed via external link.
