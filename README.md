# API Automation Framework - Restful-Booker

Professional API testing framework designed for the **Restful-Booker** platform using **Playwright**, **TypeScript**, and **AJV**.

## 🚀 Tech Stack
- **Engine:** Playwright (APIRequestContext)
- **Language:** TypeScript
- **Data Generation:** Faker JS (Factory Pattern)
- **Validation:** AJV (JSON Schema Validation)
- **CI/CD:** GitHub Actions

## 🏗️ Architecture
The project follows the **API Object Pattern** and **Separation of Concerns**:
- `src/api`: Service classes handling HTTP logic (Maintainability).
- `src/data`: Contracts (Interfaces), Factories, and JSON Schemas (Dynamic Data).
- `src/tests`: Test specifications and assertions (Clean Code).

## 🛠️ Setup & Execution
1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Environment Variables:**
   Create a `.env` file in the root with:
   ```env
   BOOKER_USERNAME=admin
   BOOKER_PASSWORD=password123
   ```
3. **Run Tests:**
   ```bash
   # All tests
   npx playwright test
   # UI Mode (Visual Reporting)
   npx playwright test --ui
   ```

## 📈 CI/CD Pipeline
Automatically triggered on every `push` to `main/master`.
- Runs on **Ubuntu Latest**.
- Performs a **Health Check** before testing.
- Validates **Response Times** and **JSON Schemas**.
- Publishes HTML Reports as **GitHub Artifacts**.