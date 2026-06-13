# IIT KGP ERP Autofill Extension

A lightweight Chrome Extension that automates the IIT Kharagpur ERP login process by securely storing your login details locally and automatically filling the login form.

## Features

* Auto-fills ERP Roll Number / Login ID
* Auto-fills ERP Password
* Supports all 3 ERP Security Questions
* Automatically detects the randomly selected security question
* Fills the correct answer
* Automatically clicks **Send OTP**
* Focuses the OTP field for quick login
* Credentials stored locally in Chrome
* Show/Hide sensitive information in extension popup
* Button only appears on the ERP login page
* No external servers, APIs, or tracking

---

## How It Works

1. Open the extension popup.
2. Enter:

   * Roll Number / Login ID
   * Password
   * Security Question 1 + Answer
   * Security Question 2 + Answer
   * Security Question 3 + Answer
3. Click **Save**.
4. Visit the IIT KGP ERP login page.
5. Click **Auto Fill ERP**.
6. The extension:

   * Fills your Roll Number
   * Fills your Password
   * Detects the displayed security question
   * Fills the matching answer
   * Clicks **Send OTP**
   * Focuses the OTP input field
7. Enter the OTP and sign in.

---

## Installation

### Method 1: Load Unpacked Extension

1. Download or clone this repository.
2. Open Chrome.
3. Navigate to:

```text
chrome://extensions
```

4. Enable **Developer Mode**.
5. Click **Load unpacked**.
6. Select the extension folder.

The extension is now installed.

---

## Project Structure

```text
iitkgp-erp-autofill/
├── manifest.json
├── popup.html
├── popup.js
├── content.js
├── background.js
├── icon.png
└── README.md
```

---

## Permissions

The extension uses only the following permissions:

### storage

Used to save your credentials locally inside Chrome.

### activeTab

Used to interact with the ERP login page currently open in your browser.

### host_permissions

```text
https://erp.iitkgp.ac.in/*
```

Allows the extension to run only on IIT KGP ERP pages.

---

## Privacy & Security

### Data Storage

All credentials are stored using:

```javascript
chrome.storage.local
```

This means:

* Data remains on your device.
* Data is not transmitted anywhere.
* Data is not shared with the repository.
* Data is not embedded in the source code.

### No External Communication

The extension does not:

* Send data to any server
* Use analytics
* Track users
* Collect browsing history
* Access cookies
* Access files on your computer

### Important Note

Credentials are stored locally in plain text within Chrome's extension storage.

Do not use this extension on shared or untrusted computers.

---

## Sharing With Friends

You can safely share the project folder or GitHub repository.

User credentials are not stored in the source code and are not included when sharing the project.

Each user must enter and save their own ERP credentials after installing the extension.

---

## Disclaimer

This project is an unofficial utility created for convenience and is not affiliated with IIT Kharagpur.

Use at your own discretion.
