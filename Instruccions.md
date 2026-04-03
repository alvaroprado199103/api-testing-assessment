Tech Assessment: API & CI/CD
1. Objective
To evaluate the candidate's technical proficiency in designing, implementing, and
orchestrating an automated API testing framework, integrating it into a Continuous
Integration (CI/CD) pipeline to ensure autonomous software quality and stability.
2. The Scenario (SUT)
The assessment will be performed on the public API Restful-Booker, a hotel reservation
management platform.
• Documentation: https://restful-booker.herokuapp.com/apidoc/index.html
• Base URL: https://restful-booker.herokuapp.com
3. Tech Stack and Tool Selection
The candidate is free to choose the combination of language and framework, provided it is
a robust, scalable, and market-relevant solution. The architecture and efficiency of the
solution will be heavily weighted.
Suggested Combinations (non-limiting):
• Java: Rest-Assured with TestNG or JUnit 5.
• JavaScript / TypeScript: Playwright (APIRequestContext), Axios + Mocha/Jest, or
Supertest.GitHub
• Python: Pytest + Requests.
• C#: RestSharp with NUnit or xUnit.
Note on Cypress: While its versatility is recognized, for this pure API Testing exercise,
lightweight headless tools that do not strictly depend on a browser environment are
preferred to favor speed and efficiency within the CI/CD pipeline.
4. Technical Requirements (API)
Develop a framework covering the following critical flow (including Happy Path and
Negative Testing):
• Authentication: Implement dynamic token generation for protected operations
(PUT, PATCH, DELETE).
• Booking Management (CRUD):
1. Create a booking (POST /booking) using dynamic data.
2. Validate that the booking exists and data matches expectations (GET
/booking/{id}).
3. Partially Update the booking (PATCH /booking/{id}) using the security token.
4. Delete the booking (DELETE /booking/{id}) and confirm its removal.
• Expected Validations:
o JSON Schema Validation for all main responses.
o Validation of HTTP status codes and response times.
o Use of Environment Variables for sensitive data (credentials) and
environment configurations.
5. CI/CD Requirements
The code must be hosted in a GitHub repository and include a workflow file that performs
the following:
• Trigger: Automatic execution on every push or pull request to the main branch.
• Environment: Environment setup and dependency installation on an Ubuntu
runner.
• Reporting: The pipeline must generate and publish a test report (Allure, HTML, etc.)
as a downloadable Artifact within GitHub.
6. Bonus Points
Extra points will be awarded if the candidate implements any of the following:
• Containerization: Include a Dockerfile to run tests in an isolated environment.
• Parallelization: Configure the framework or pipeline to execute tests in parallel.
• Advanced Reporting: Integration of reports with GitHub Pages for direct URL
visualization.
• Health Check: Implement a pre-check of the API status before starting the test
suite.
7. Evaluation Criteria
1. Architecture: Use of design patterns (Singleton, Factory, Builder, etc.).
2. Maintainability: Clear separation between business logic, test data, and
configuration.
3. Clean Code: Code readability, naming conventions, and proper exception handling.
4. Documentation: A professional README.md with clear installation instructions,
local execution steps, and a brief explanation of technical decisions.
8. Deliverables
• Link to the public repository (GitHub/GitLab).
• Evidence of successful executions in the "Actions/Pipelines" tab.