# 🚀 Restful-Booker API Automation Framework

A robust, scalable, and professional API testing ecosystem designed for the **Restful-Booker** platform. Built with **Playwright**, **TypeScript**, and **AJV**, this framework implements industry-standard design patterns to ensure high maintainability and reliable CI/CD integration.

---

## 🏗️ Architectural Overview

This framework is structured using a layered architecture to ensure a strict **Separation of Concerns (SoC)**:

### 📂 Project Structure
```text
├── .github/workflows/    # CI/CD Pipeline definitions (GitHub Actions)
├── src/
│   ├── api/              # API Client Layer (Encapsulates HTTP logic)
│   │   ├── AuthClient.ts
│   │   └── BookingClient.ts
│   ├── data/             # Data Layer
│   │   ├── schemas/      # JSON Schemas for Contract Testing
│   │   ├── factory/      # Data Generation (Factory Pattern)
│   │   └── interfaces/   # TypeScript Type Definitions
│   └── tests/            # Test Suite (Business Logic & Assertions)
├── playwright.config.ts  # Framework Engine Configuration
└── tsconfig.json         # TypeScript Compiler Settings
```

### 💎 Design Patterns
1.  **API Object Pattern (AOP):** Centralizes endpoint logic into service classes. If an API contract changes, updates are made in a single file, keeping tests clean and readable.
2.  **Factory Pattern:** Orchestrates dynamic data generation via **Faker JS**. Every test execution uses unique, isolated data sets to prevent state pollution.
3.  **Contract Testing:** Utilizes **AJV** to validate JSON responses against strict schemas, ensuring data integrity beyond simple status code checks.

---

## 🛠️ Validation Strategy

The framework validates three critical dimensions of API quality:
-   **Functional:** Full CRUD lifecycle (POST, GET, PATCH, DELETE) and negative scenarios.
-   **Performance:** Explicit assertions on response times (e.g., `< 1000ms`) to ensure SLA compliance.
-   **Integrity:** Deep schema validation (Types, required fields, and formats) using **AJV**.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v20 or higher)
- npm

### Installation
1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Configure Environment:**
   Create a `.env` file in the root directory:
   ```env
   BOOKER_USERNAME=admin
   BOOKER_PASSWORD=password123
   ```

### Execution
```bash
# Run all tests in headless mode
npm test

# Open Playwright UI for debugging
npx playwright test --ui
```

---

## 📈 CI/CD Pipeline

Leverages **GitHub Actions** for continuous validation:
-   **Environment:** Runs on `ubuntu-latest` with **Node.js 24**.
-   **Parallelization:** Tests are executed concurrently to minimize feedback loops.
-   **Health Check:** Pre-execution check on the target environment's status.
-   **Reporting:** Automatically uploads **HTML Playwright Reports** as downloadable artifacts upon completion.

---
*Developed as part of the API Testing Technical Assessment.*