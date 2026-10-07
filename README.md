<h1 align="center">Restful-Booker REST API Playwright Automation</h1>

<p align="center">
  <strong>REST API automation using Playwright, TypeScript, and the Page Object Model</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge" alt="Playwright">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge" alt="TypeScript">
  <img src="https://img.shields.io/badge/UI%20%7C%20E2E-6B7280?style=for-the-badge" alt="REST API">
  <img src="https://img.shields.io/badge/Page%20Object%20Model-8B5CF6?style=for-the-badge" alt="Page Object Model">
</p>

<p align="center">
  A QA automation project testing CRUD operations for restful-booker, a REST API built for QA automation practice.
</p>

<br>

---

<br>

<h2 align="center">📌 Overview</h2>

<br>

<p align="center">
This project is an automated <strong>REST API test suite</strong> for Restful-Booker (https://restful-booker.herokuapp.com/apidoc/index.html), built with <strong>Playwright</strong> and <strong>TypeScript</strong>.
The suite covers happy paths as well as negative path, edge cases, and abnormal behavior findings using <strong>Page Object Model</strong> and dynamic test data.
</p>

<br>
<br>
---
<br>
<h2 align="center">📖 Findings</h2>

1. The cookie header is the only way authentication works. The API's own docs present an alternative, which is an Authorization: Basic header, but that returns 403 instead of succeeding.

2. A successful DELETE returns 201 Created, not 200 OK or 204 No Content.

3. PATCH or DELETE on a nonexistent booking ID returns 405 Method Not Allowed, not 404 Not Found. Confirmed consistent across both methods.

4. Creating a booking with a required field missing (Ex: missing lastname) returns 500 Internal Server Error. This means the API is crashing on invalid input rather than rejecting it with a 400.

5. totalprice sent as a numeric-looking string ("112") is coerced to the number 112. No error, no rejection. the type conversion happens automatically.

6. totalprice sent as a non-numeric string ("abc") is coerced to null, still with a 200 response. Unlike the numeric-string case, this results in a booking with effectively invalid price data and no indication anything went wrong.
 
