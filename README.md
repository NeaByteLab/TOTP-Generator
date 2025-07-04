# 🔐 TOTP Generator

This project provides a complete Node.js implementation of Time-Based One-Time Password (TOTP) compatible with Google Authenticator. It generates a Base32-encoded secret, produces an OTP Auth URL, displays a QR code in the terminal, and verifies OTP codes entered by users with configurable retry limits.

---

## ✨ Features
- 🔑 Generate secure Base32-encoded TOTP secret key
- 🔗 Create OTP Auth URL for Google Authenticator
- 📟 Display QR code directly in terminal (no browser needed)
- ✅ Validate TOTP codes entered by user with up to 3 retry attempts
- ⚡ No external TOTP libraries (pure Node.js + standard packages)

--- 

## 📦 Installation

### 📥 Clone Repository
```bash
git clone https://github.com/NeaByteLab/TOTP-Generator.git
cd TOTP-Generator
```

### 📌 Install Dependencies
```bash
npm install
```

## ▶️ How to Run
```bash
node index.js
```

---

## 🛠️ How It Works
1. 🔑 The app generates a TOTP secret key.
2. 🔗 It creates an OTP Auth URL and displays the QR code in the terminal.
3. 📲 You scan the QR code using Google Authenticator or compatible app.
4. ⌨️ The app prompts you to enter the 6-digit code.
5. 📝 The app verifies the entered code and informs whether it is valid or invalid.
6. ♻️ You have up to 3 attempts by default.

## 🖥️ Example Output
```bash
Enter OTP: 123456
 -> OTP Invalid
Enter OTP: 654321
 -> OTP Invalid
Enter OTP: 789012
 -> OTP Valid
```
---

## 📚 Dependencies
- `crypto` — For secure random key generation
- `qrcode` — For generating QR code data
- `qrcode-terminal` — To render QR code in terminal
- `readline-sync` — For synchronous terminal input

---

## 📜 License
MIT License © 2025 [NeaByteLab](https://github.com/NeaByteLab)