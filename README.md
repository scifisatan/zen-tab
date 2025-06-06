<div align="center">
  <img src="public/icon-128.png" alt="Zen Tab logo" width="128" height="128" />
</div>

# 🧘‍♂️ Zen Tab – Your Peaceful Productivity Dashboard

![Screenshot](public/screenshot.png)

> **Zen Tab** is a custom Chrome and Firefox extension that transforms your new tab into a serene and productive workspace. Instantly view your assigned Jira issues and access your most-used work tools and personal links—all from a beautifully minimal dashboard.

## ✨ Features

- 🧩 **Jira Integration**  
  Automatically fetch and display issues assigned to you via the Jira API.

- 🚀 **Quick Access Shortcuts**  
  Organize your essential links under **Work**, **Social**, and **Tools** categories for easy access.

- 🌙 **Minimalist Dark UI**  
  A clean, distraction-free interface to keep your focus where it matters.

- 🔄 **Real-Time Task Updates**  
  Keep your task list up-to-date with a single click using the "Refresh" button.

- 💻 **Built for Developers**  
  Zen Tab is designed for engineers and professionals who want their tools and tasks in one place.

## 🛠️ Getting Started (Local Dev)

### 1. Clone the Repository

```bash
git clone https://github.com/scifisatan/zen-tab.git
cd zen-tab
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Build the Extension

```bash
npm run build
```

### 4. Load the Extension in Chrome

- Go to `chrome://extensions/`
- Enable **Developer Mode**
- Click **Load unpacked**
- Select the `dist/` folder

### 5. Load in Firefox (Optional)

- Go to `about:debugging`
- Choose **Load Temporary Add-on**
- Select `manifest.json` from the `dist/` folder

## 📦 Production Builds via GitHub Actions

This project uses GitHub Actions to:

- 🔧 **Build the extension on tag push**
- 🗜️ **Package for Chrome (`.crx`)**
- 🔐 **Sign for Firefox (`.xpi`)**
- 🚀 **Auto-generate changelogs and publish a GitHub Release**

### 🔐 Secrets Used in CI

To protect sensitive data, the build pipeline uses these GitHub Secrets:

| Secret Name          | Purpose                               |
| -------------------- | ------------------------------------- |
| `FIREFOX_API_KEY`    | Sign the extension with Mozilla's API |
| `FIREFOX_API_SECRET` | Authentication for Firefox signing    |
| `CHROME_KEY_B64`     | Base64-encoded private key for `.crx` |
| `ADDON_SLUG`         | Slug for firefox store                |

> ⚠️ `key.pem` is **never stored in the repo** — it's injected at runtime via GitHub Secrets.

You can view build artifacts on each [GitHub Release](https://github.com/scifisatan/zen-tab/releases) after pushing a tag like `v1.0.0`. .crx is the Chrome extension and .xpi is the firefox extension.

## 🧑‍🎓 Ideal For

- Developers who use Jira regularly
- Productivity nerds who love clean dashboards
- Anyone who wants a better, quieter new tab experience

## 🧠 Contributing & Feedback

Issues and PRs are welcome! If you'd like to contribute or suggest improvements, feel free to open an [Issue](https://github.com/scifisatan/zen-tab/issues).
