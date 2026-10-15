# Dependency Exit Capsule: {{REPOSITORY_NAME}}
**Generated Timestamp:** {{TIMESTAMP}}
**Python Runtime Environment:** {{PYTHON_VERSION}}

---

## 1. Maintenance Problem & At-Risk Dependencies [VERIFIED OBSERVATION]
*Data extracted directly from repository manifests and live PyPI API metadata.*

*   **Dependency Name:** `{{PACKAGE_NAME}}`
*   **Current / Latest Version:** `{{VERSION}}`
*   **Last PyPI Release Date:** `{{LAST_RELEASE_DATE}}` (`{{DAYS_STALE}}` days ago)
*   **Observed Risk Indicators:**
    *   {{RISK_INDICATOR_1}}

## 2. Repository Usage Locations [VERIFIED OBSERVATION]
*Static AST analysis of exact import statements and usage footprints across the codebase.*

*   `{{FILE_PATH}}:Line {{LINE_NUMBER}}` — `{{IMPORT_STATEMENT}}`

## 3. Proposed Replacement & Migration Strategy [AI RECOMMENDATION]
*AI-generated analysis based on observed usage patterns.*

*   **Recommended Replacement Package:** `{{NEW_PACKAGE_NAME}}`
*   **Why This Replacement Fits:** {{RATIONALE}}
*   **Step-by-Step Migration Plan:**
    1.  {{STEP_1}}
    2.  {{STEP_2}}
    3.  {{STEP_3}}

## 4. Suggested Verification Tests [AI RECOMMENDATION]
*   {{SUGGESTED_TEST_1}}
*   {{SUGGESTED_TEST_2}}

## 5. Executed Test Results [VERIFIED OBSERVATION]
*Actual terminal execution results comparing the original dependency against the replacement.*

*   **Baseline Test Suite (`pytest` with original dependency):**
    *   **Exit Code:** `{{BASELINE_EXIT_CODE}}`
    *   **Observed Output Summary:** `{{BASELINE_SUMMARY}}`
*   **Migration Test Suite (`pytest` after package swap/refactor):**
    *   **Exit Code:** `{{SWAP_EXIT_CODE}}`
    *   **Observed Output Summary:** `{{SWAP_SUMMARY}}`

## 6. Compatibility Gaps & Unresolved Risks [HYBRID ANALYSIS]
*   **Observed Breaking Changes (from test failure logs):** {{OBSERVED_ERRORS}}
*   **Open Concerns & Limitations:** {{LIMITATIONS}}