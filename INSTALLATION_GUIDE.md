# n8n-nodes-hyros - Installation & Setup Guide

## 📋 Prerequisites

Before installing the n8n-nodes-hyros package, ensure you have:

- ✅ n8n installed (version 0.220.0 or higher)
- ✅ Node.js (version 16.x or higher)
- ✅ npm (version 7.x or higher)
- ✅ A Hyros account with API access
- ✅ Your Hyros API key

---

## 🚀 Installation Methods

### Method 1: Install via n8n Community Nodes (Recommended)

This is the easiest method for end users.

1. **Open n8n**
   - Navigate to your n8n instance
   - Log in if required

2. **Access Community Nodes**
   - Click on **Settings** (gear icon)
   - Select **Community Nodes**

3. **Install the Package**
   - Click **Install**
   - Enter: `n8n-nodes-hyros`
   - Click **Agree and Install**
   - Wait for installation to complete

4. **Restart n8n** (if required)
   ```bash
   n8n restart
   ```

5. **Verify Installation**
   - Create a new workflow
   - Add a new node
   - Search for "Hyros"
   - You should see the Hyros node available

---

### Method 2: Manual npm Installation

For self-hosted n8n instances or development environments.

1. **Navigate to n8n Directory**
   ```bash
   cd ~/.n8n/custom  # or your custom n8n directory
   ```

2. **Install the Package**
   ```bash
   npm install n8n-nodes-hyros
   ```

3. **Restart n8n**
   ```bash
   n8n restart
   ```

---

### Method 3: Install from Source (Development)

For developers who want to modify or contribute to the node.

1. **Clone or Download the Repository**
   ```bash
   git clone https://github.com/yourusername/n8n-nodes-hyros.git
   cd n8n-nodes-hyros
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Build the Package**
   ```bash
   npm run build
   ```

4. **Link to n8n**
   ```bash
   npm link

   cd ~/.n8n/custom
   npm link n8n-nodes-hyros
   ```

5. **Restart n8n**
   ```bash
   n8n restart
   ```

---

## 🔐 Configure Hyros API Credentials

After installation, you need to set up your Hyros API credentials.

### Step 1: Get Your API Key from Hyros

1. Log in to your [Hyros account](https://app.hyros.com/)
2. Navigate to **Settings** → **API**
3. Copy your **API Key**
4. Note the **API Base URL** (typically `https://api.hyros.com/v1`)

### Step 2: Add Credentials in n8n

1. **Open n8n**
   - Go to your n8n instance

2. **Navigate to Credentials**
   - Click **Credentials** in the left sidebar
   - Or access via: Settings → Credentials

3. **Create New Credential**
   - Click **Add Credential**
   - Search for "Hyros API"
   - Click on "Hyros API"

4. **Enter Your Credentials**
   - **Name:** Give it a descriptive name (e.g., "My Hyros Account")
   - **API Key:** Paste your Hyros API key
   - **Base URL:** Enter `https://api.hyros.com/v1` (or your custom URL)

5. **Test the Connection**
   - Click **Test** button
   - Wait for the test to complete
   - You should see: ✅ "Connection test successful"

6. **Save the Credential**
   - Click **Save**

---

## ✅ Verify Installation

### Quick Test Workflow

1. **Create a New Workflow**
   - Click **+ New Workflow**

2. **Add Manual Trigger**
   - Click **+** to add a node
   - Search for "Manual"
   - Add "Manual Trigger" node

3. **Add Hyros Node**
   - Click **+** to add another node
   - Search for "Hyros"
   - Add the "Hyros" node

4. **Configure the Node**
   - Select **Credentials:** Your saved Hyros credential
   - Select **Resource:** User Info
   - Select **Operation:** Get

5. **Execute the Workflow**
   - Click **Execute Workflow**
   - You should see your user account information returned

6. **Success!**
   - If you see data, the installation is working correctly

---

## 🎯 First Workflow Example

Here's a simple workflow to create a lead in Hyros:

### Workflow: Create Lead from Form Submission

1. **Add Manual Trigger Node**

2. **Add Hyros Node**
   - **Credentials:** Select your Hyros credential
   - **Resource:** Lead
   - **Operation:** Create
   - **Email:** `test@example.com`
   - **Additional Fields:**
     - **First Name:** `John`
     - **Last Name:** `Doe`
     - **Tags:** `newsletter,webinar`
     - **Source:** `website`

3. **Execute the Workflow**
   - Click **Execute Workflow**
   - Check the output to confirm the lead was created

4. **Verify in Hyros**
   - Log in to Hyros
   - Check your leads list
   - You should see the new lead

---

## 🔧 Troubleshooting

### Issue: Node Not Appearing

**Problem:** After installation, the Hyros node doesn't appear in the node list.

**Solution:**
1. Restart n8n completely
   ```bash
   n8n stop
   n8n start
   ```
2. Clear browser cache and refresh
3. Check installation:
   ```bash
   npm list n8n-nodes-hyros
   ```

### Issue: Credential Test Fails

**Problem:** When testing credentials, you get an error.

**Solutions:**
1. **Verify API Key**
   - Ensure you copied the entire API key
   - Check for extra spaces or characters

2. **Check Base URL**
   - Default: `https://api.hyros.com/v1`
   - Ensure no trailing slash
   - Verify it matches your Hyros instance

3. **Network Issues**
   - Check your firewall settings
   - Verify n8n can access external APIs
   - Try accessing the URL in a browser

4. **API Key Permissions**
   - Ensure your API key has proper permissions
   - Contact Hyros support if needed

### Issue: 401 Unauthorized Error

**Problem:** Operations fail with "401 Unauthorized"

**Solution:**
1. Regenerate your API key in Hyros
2. Update the credential in n8n
3. Test the connection again

### Issue: Missing Operations

**Problem:** Some operations are not visible

**Solution:**
1. Ensure you're using the latest version:
   ```bash
   npm update n8n-nodes-hyros
   ```
2. Rebuild the package if installed from source:
   ```bash
   npm run build
   ```

---

## 📚 Available Resources

After successful installation, you'll have access to:

### 15 Resources with 29 Operations

1. **Lead** - Create, Get, Get Journey
2. **Sales** - Get Many, Update, Delete
3. **Order** - Create, Refund
4. **Call** - Create, Get, Update, Delete
5. **Attribution** - Get Ads Report, Get Ad Account Report
6. **Product** - Create
7. **Tag** - Get Many
8. **Source** - Get Many, Create
9. **Ad** - Get Many
10. **Custom Cost** - Create
11. **Click** - Create, Get
12. **Cart** - Create, Update
13. **User Info** - Get
14. **Keyword** - Get
15. **Subscription** - Get, Create, Update

---

## 🔄 Updating the Node

### Update via n8n Interface

1. Go to **Settings** → **Community Nodes**
2. Find **n8n-nodes-hyros**
3. Click **Update** if available
4. Restart n8n

### Update via npm

```bash
cd ~/.n8n/custom
npm update n8n-nodes-hyros
n8n restart
```

---

## 🗑️ Uninstalling

### Via n8n Interface

1. Go to **Settings** → **Community Nodes**
2. Find **n8n-nodes-hyros**
3. Click **Uninstall**
4. Restart n8n

### Via npm

```bash
cd ~/.n8n/custom
npm uninstall n8n-nodes-hyros
n8n restart
```

---

## 📖 Next Steps

Now that you have the node installed:

1. **Read the Documentation**
   - Check [N8N_README.md](N8N_README.md) for detailed usage examples

2. **Explore the Resources**
   - Try different operations
   - Test with your Hyros data

3. **Build Workflows**
   - Integrate with other n8n nodes
   - Automate your marketing workflows

4. **Get Support**
   - Review the [API documentation](API_ENDPOINTS_DOCUMENTATION.md)
   - Check the [implementation checklist](IMPLEMENTATION_CHECKLIST.md)

---

## 🆘 Getting Help

If you encounter issues:

1. **Check Documentation**
   - [N8N_README.md](N8N_README.md) - Usage guide
   - [API_ENDPOINTS_DOCUMENTATION.md](API_ENDPOINTS_DOCUMENTATION.md) - API reference

2. **Community Support**
   - n8n Community Forum
   - GitHub Issues (if available)

3. **Hyros Support**
   - For API-specific questions
   - Contact Hyros support team

---

## ✅ Installation Checklist

Use this checklist to ensure everything is set up correctly:

- [ ] n8n is installed and running (v0.220.0+)
- [ ] Node.js and npm are installed
- [ ] n8n-nodes-hyros package is installed
- [ ] n8n has been restarted
- [ ] Hyros node appears in the node list
- [ ] Hyros API credentials are created in n8n
- [ ] Credential test passes successfully
- [ ] Test workflow executes without errors
- [ ] User Info operation returns data
- [ ] Ready to build workflows!

---

**Congratulations! You're all set to use the Hyros node in your n8n workflows!** 🎉

---

*For more information, see [N8N_README.md](N8N_README.md)*
