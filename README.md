# 🛡️ Code Review Agent
> **Autonomous Multi-Agent Code Review & Quality Guard powered by IBM Bob 2.0**

An enterprise-grade, autonomous multi-agent pipeline designed to inspect code repositories against strict engineering standards, detect vulnerabilities and rule violations, auto-refactor code for 100% compliance, and synthesize full unit test suites with zero manual intervention.

---

## 📋 Table of Contents
- [Architecture Overview](#-architecture-overview)
- [Review Standards (rules.md)](#-review-standards-rulesmd)
- [Audit & Remediation Summary](#-audit--remediation-summary)
- [File Structure](#-file-structure)
- [Getting Started](#-getting-started)
- [CLI Commands](#-cli-commands)
- [Test Verification](#-test-verification)
- [License](#-license)

---

## 🏛️ Architecture Overview

The system operates via a collaborative swarm of specialized agents:

```
                     ┌────────────────────────┐
                     │ Target Codebase/PR     │
                     │ (e.g. app.js)          │
                     └───────────┬────────────┘
                                 │
                                 ▼
                     ┌────────────────────────┐
                     │ Agent 1: Standards     │◄─── Engineering Rules
                     │ Compliance Auditor     │     (rules.md)
                     └───────────┬────────────┘
                                 │
         ┌───────────────────────┼───────────────────────┐
         │                       │                       │
         ▼                       ▼                       ▼
┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐
│ Agent 2: Auto-   │    │ Agent 3: Unit    │    │ Agent 4: Audit   │
│ Refactoring Spec │    │ Test Synthesizer │    │ Report Generator │
└────────┬─────────┘    └────────┬─────────┘    └────────┬─────────┘
         │                       │                       │
         ▼                       ▼                       ▼
    app.fixed.js            app.test.js           REVIEW_REPORT.md
  (100% Compliant)      (8/8 Tests Passing)      (Full Audit Diff)
```

---

## 📜 Review Standards (`rules.md`)

Every file analyzed by the Code Review Agent is benchmarked against four foundational engineering standards:

1. **Error Handling (Rule 1)**: Every asynchronous function or database operation must be wrapped in a proper `try-catch` block.
2. **Logging Hygiene (Rule 2)**: Never leave raw `console.log` statements in production code. Use structured logging or remove them.
3. **Input Validation (Rule 3)**: Never trust user input. Parameters must be checked before processing.
4. **Unit Tests (Rule 4)**: Every exported function must have an accompanying test file.

---

## 📊 Audit & Remediation Summary

| Metric | Original (`app.js`) | Refactored (`app.fixed.js`) | Status |
| :--- | :---: | :---: | :---: |
| **Compliance Score** | **25%** | **100%** | 🟢 **100% Remediated** |
| **Input Validation** | ❌ None | ✅ Strict Non-Empty String & Positive Amount | Remediated |
| **Logging Hygiene** | ❌ Raw `console.log` | ✅ Structured JSON Logger (`logger.js`) | Remediated |
| **Error Handling** | ❌ Unhandled Async | ✅ Safe `try-catch` with Domain Exceptions | Remediated |
| **Unit Test Coverage**| ❌ Missing | ✅ 8 Automated Unit Tests (100% Pass) | Remediated |

---

## 📂 File Structure

```
code-review-agent/
├── app.js               # Original target file (with violations for demonstration)
├── app.fixed.js         # Production-ready, 100% compliant refactored module
├── app.test.js          # Automated unit test suite (built with node:test & node:assert)
├── logger.js            # Enterprise structured JSON logger (PII sanitization)
├── review-agent.js      # Core autonomous multi-agent review engine & CLI
├── rules.md             # Engineering code review standards specification
├── REVIEW_REPORT.md     # Detailed markdown report with full diffs & metrics
├── package.json         # Project configuration & npm scripts
└── README.md            # Comprehensive documentation
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18.0.0 (Node.js 24 recommended)
- Git

### Installation
Clone the repository and inspect the project:
```bash
git clone https://github.com/rajat414-codex/code-review-agent.git
cd code-review-agent
```

---

## 💻 CLI Commands

### 1. Run Autonomous Code Review
Scans `app.js` and `app.fixed.js` against `rules.md` and regenerates `REVIEW_REPORT.md`:
```bash
npm run review
# or
node review-agent.js
```

### 2. Run Test Suite
Executes the comprehensive automated unit test suite:
```bash
npm test
# or
node --test app.test.js
```

---

## 🧪 Test Verification

```
▶ Payment Module - Unit Tests (rules.md Compliance)
  ▶ Input Validation (Rule 3)
    ✔ should throw error when userId is missing or undefined (5ms)
    ✔ should throw error when userId is an empty or whitespace string (1ms)
    ✔ should throw error when userId is not a string type (0.4ms)
    ✔ should throw error when amount is zero (0.3ms)
    ✔ should throw error when amount is negative (0.4ms)
    ✔ should throw error when amount is not a number (0.5ms)
  ✔ Input Validation (Rule 3) (10ms)
  ▶ Successful Payment Processing
    ✔ should successfully process payment for valid inputs and return transaction ID (0.9ms)
  ✔ Successful Payment Processing (1.2ms)
  ▶ Error Handling & Resilience (Rule 1)
    ✔ should handle bank API failures and throw formatted domain error (0.4ms)
  ✔ Error Handling & Resilience (Rule 1) (0.7ms)
✔ Payment Module - Unit Tests (rules.md Compliance) (13ms)
ℹ tests 8
ℹ suites 4
ℹ pass 8
ℹ fail 0
```

---

## ⚖️ License
MIT License • Created by [Rajat Kamal](https://github.com/rajat414-codex)
