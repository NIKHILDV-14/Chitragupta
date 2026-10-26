# CHITRAGUPTA (AICTE-Verify)
### AI-Powered Application Validation, Document Authentication & Regulatory Compliance Verification
**Smart India Hackathon 2026 — Problem Statement 26261**  
*Organization:* All India Council for Technical Education (AICTE), Ministry of Education, Govt. of India  
*Theme:* Smart Automation / Software (Regulation Bureau)

---

## 1. Quick Start & Execution

This is a **zero-dependency, client-side demo application** built using plain HTML5, CSS3, and vanilla JavaScript (ES6+). It requires **no backend, no build steps, no npm, and no external API keys**.

### How to Run:
- **Directly in Browser:** Double-click [`index.html`](file:///C:/Users/nikhi/.gemini/antigravity-ide/scratch/chitragupta-aicte-portal/index.html) or open it in Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari.
- **Via Local HTTP Server (Optional):**
  ```bash
  cd C:\Users\nikhi\.gemini\antigravity-ide\scratch\chitragupta-aicte-portal
  python -m http.server 8080
  # Open http://localhost:8080 in your browser
  ```

---

## 2. File Structure

```
chitragupta-aicte-portal/
├── index.html                 # Portal shell, navigation, modals, and chatbot
├── css/
│   ├── portal.css             # Faithful visual clone of AICTE Partner Portal
│   └── chitragupta.css        # Chitragupta module styles, theme & dark mode
├── js/
│   ├── data.js                # All synthetic data, rule packs, checklist, handbook Q&A
│   ├── audit.js               # Genuine SHA-256 hash-chained audit ledger (WebCrypto)
│   ├── portal.js              # AICTE clone logic, circular tiles, chatbot logic
│   ├── chitragupta.js         # Upload, 12-step AI pipeline simulation, results tabs
│   ├── design.js              # 14 presentation-quality interactive SVG diagrams
│   └── app.js                 # Hash router, role switcher (RBAC), toast notifications
└── README.md                  # Demo walkthrough and system documentation
```

---

## 3. The 5 to 7 Minute Hackathon Demo Script

Follow this exact walkthrough during judging demonstrations:

1. **AICTE Portal Home Clone:**
   - Open `#/home`. Point out the faithful AICTE visual layout: medium-blue top bar (`#2f8fd0`), Devanagari Council title (*अखिल भारतीय तकनीकी शिक्षा परिषद*), and circular gradient tiles.
   - Show tile #9 (**Approval Process**) with its authentic orange gradient, and tile #11 (**Chitragupta**) with its saffron/gold gradient, eye-in-scroll motif, pulsing ring, and "AI Validation & Verification" badge.
   - Point out the top bar navigation item with the red **"NEW"** badge.

2. **Upload & AI Review Simulation:**
   - Click the **Chitragupta** tile or top nav link (`#/chitragupta/review`).
   - Notice the prominent advisory banner: *"AI output is decision support only. Scrutiny, inspection and final decisions rest with competent AICTE authorities."*
   - In the drop zone, click **"Load sample college folder (synthetic)"**.
   - Observe the 14 realistic documents populated in the staged tree with detected document type chips, confidence scores, and MIME icons.
   - Click the primary button **"Run AI Review"**.
   - Watch the full-width **12-step pipeline animation** progress with step spinners converting to green checkmarks, module tags (**M1 to M7**), and scrolling monospace logs with millisecond timestamps.

3. **Checklist & Completeness Tab:**
   - Upon completion, the summary card displays: *"Deficiencies found — Officer review required"*, an overall readiness meter of **68%**, and a processing duration of **2 min 14 s** (vs ~45 min manual).
   - In **Tab 1 (Checklist & Completeness)**, point out:
     - **2 Missing Documents:** *Structural Stability Certificate* (mandatory because building age is 33 years > 30-year threshold under APH Cl. 2.3.4) and *NOC from affiliating university*.
     - **1 Expired Document:** *Fire Safety Certificate* (expired 80 days before submission).
     - **1 Incomplete Document:** *Affidavit 2* (e-stamp denomination ₹50 detected on page 2, below Karnataka statutory ₹100 threshold).

4. **Extracted Data & Anomaly Indicators:**
   - In **Tab 2 (Extracted Data & Consistency)**, show cross-document entity mismatches: Trust title divergence between Affidavit and Audited Accounts, survey number differences, and applied intake (480) vs approved AICTE records (420).
   - In **Tab 3 (Anomaly & Forgery Indicators)**, view the synthetic Affidavit document viewer on the left.
   - Click the layer toggles (**Original**, **ELA Heatmap**, **Copy-Move Overlay**).
   - Click **`FLAG-01 (IMG-ELA)`** or **`FLAG-02 (SEAL-REUSED)`** on the right: notice how the bounding box focuses and pulses on the document viewer!
   - Highlight the non-negotiable fixed label on every flag: *"Preliminary indicator — requires human verification. Not proof of forgery or misconduct."*

5. **Verification Board (6 States & Trust Channels):**
   - In **Tab 4 (Verification Board)**, show all 6 distinct states:
     - `VERIFIED` (NAAC & NBA via sandbox API / digital signature).
     - `MISMATCH_DETECTED` (Occupancy Certificate area differs: 9,800 m² submitted vs 8,650 m² returned).
     - `EXPIRED` (Fire Safety NOC).
     - `VERIFICATION_PENDING` (Land Lease Deed with live SLA countdown timer; click **"Re-verify"** to simulate a live connector ping).
     - `SOURCE_UNAVAILABLE` $\rightarrow$ automatically transitions to `MANUAL_REVIEW_REQUIRED` (State DTE NOC; click **"Draft Letter"** to open the prefilled confirmation letter).

6. **Compliance Assistant:**
   - In **Tab 5 (Compliance Assistant)**, review deterministic rule calculations:
     - **Faculty:Student Ratio (1:20 UG):** 720 students $\rightarrow$ 36 required vs 29 declared (shortfall 7; cadre check shows 3 Professors deficit).
     - **Instructional Computers (1:10 UG):** 72 required vs 60 declared (shortfall 12).
     - **Bandwidth:** 300 Mbps required vs 100 Mbps declared (shortfall 200 Mbps).
     - **Built-up Area:** 9,800 m² required vs 8,650 m² extracted (gap 1,150 m²; view the comparison bar chart).
     - **Computer Vision Photo Review:** YOLOv8 detected 38 dual-benches vs 60 declared; ramp not visible at entrance $\rightarrow$ recommendation: *"Request additional evidence"*.

7. **Regulatory Handbook Assistant (Chatbot):**
   - Click either the floating black robot button on the bottom right or open the assistant.
   - Click a quick chip like **"3-Year EoA Eligibility?"** or type *"Can we edit after submit?"*.
   - Watch the streaming typewriter animation answer with exact citations: *"APH 2024-27, Chapter I, Clause 1.8, p. 14"*.
   - Ask an unknown query to verify it never hallucinates and politely routes to a human officer.

8. **Role Switching & SLM Control:**
   - Click the top right avatar and switch role to **"Institution user"**:
     - Notice how internal forensic/forgery flags are immediately hidden (institution sees only neutral checklist deficiency notices).
     - Notice the Rectification panel appears with re-upload buttons and the p. 14 one-time reopening notice.
   - Switch role to **"System administrator"**:
     - Notice the **Admin / SLM Control** sidebar item unlocks.
     - Open `#/chitragupta/admin`. Click **"Stop"** on the 3B SLM engine.
     - A persistent chip appears: **"Rules-only mode"**. Rerun review or ask the assistant: notice how the system gracefully falls back to deterministic rule templates.
     - Click **"Start Engine"** to restore SLM mode.

9. **Tamper-Evident SHA-256 Audit Trail:**
   - Navigate to `#/chitragupta/audit`.
   - Click **"Verify Chain Integrity"**: green banner verifies all blocks are cryptographically intact.
   - Click **"Tamper With a Row (Demo)"**: modifies row #3 details in memory without updating the hash.
   - Click **"Verify Chain Integrity"**: immediate red alert displaying exact row where the cryptographic forward-link broke!
   - Click **"Restore & Re-hash Chain"** to return the chain to a valid state.

10. **System Design & About Pages:**
    - Open `#/chitragupta/design`: scroll through the 14 visual interactive SVG diagrams (Layered architecture, LangGraph RAG, 6-state machine, ERD, RBAC, evaluation targets, and clickable traceability matrix).
    - Click **"Play Data Flow"** to animate the pipeline packet dot.

---

## 4. How to Customize or Change Synthetic Data

All synthetic data resides in [`js/data.js`](file:///C:/Users/nikhi/.gemini/antigravity-ide/scratch/chitragupta-aicte-portal/js/data.js):
- **Change College Details:** Edit `window.CHITRAGUPTA_DATA.institution` (Name, ID, Building Age, State).
- **Edit Checklist Items:** Modify `window.CHITRAGUPTA_DATA.checklist` (Mandatory/Conditional, rule references).
- **Edit Forensic Flags:** Adjust `window.CHITRAGUPTA_DATA.forensicFlags` (bounding box coordinates, detectors, confidence).
- **Add Handbook Q&As:** Append new entries to `window.CHITRAGUPTA_DATA.handbookQA` with keywords and APH page citations.
- **Update Rule Pack:** Modify `window.CHITRAGUPTA_DATA.rulePack.activeRulesYaml`.

---

## 5. Non-Negotiable Regulatory Safeguards Built-in

1. **Wording Standard:** Always uses *"indicator"*, *"advisory"*, *"requires human verification"*; never *"forged"* or *"fraud"*.
2. **Adverse Action Lock:** The final approval/rejection node has a physical padlock; adverse decisions can only be executed by a human officer with a signed digital decision.
3. **Privacy First:** 100% client-side simulation. No student or institutional data is sent outside the browser.
4. **Offline Resilient:** If external CDNs are unavailable, the application gracefully degrades to native system fonts and pure CSS indicators.
