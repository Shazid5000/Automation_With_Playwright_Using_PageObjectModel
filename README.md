# Playwright Automation Framework — Demo Web Shop

This project implements an Object-Oriented Page Object Model (POM) testing framework using **JavaScript ES6 Modules**, **Inheritance**, **Classes**, and **Allure Reporting** with Playwright.

---

## 🏗️ Architecture & OOP Concepts Used

- **Inheritance:** `HomePage` and `LoginPage` extend `BasePage` to reuse common Playwright methods like navigation and visibility checks.
- **Imports & Exports:** Clean ES6 module syntax (`import`/`export`) across page objects, specs, and configurations.
- **Class Objects:** Page classes instantiated within `test.beforeEach()` to provide full test isolation.

---

## 🛠 Prerequisites

- [Node.js](https://nodejs.org/) (v16+)
- [npm](https://www.npmjs.com/)
- [Java Development Kit (JDK)](https://www.oracle.com/java/technologies/downloads/) (Required for Allure Report execution)

---

## 🚀 Setup & Installation

1. **Install dependencies:**
   ```bash
   npm install