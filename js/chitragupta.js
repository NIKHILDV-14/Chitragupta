/**
 * CHITRAGUPTA (AICTE-Verify) - Main Module Controller
 * Smart India Hackathon 2026 - Problem Statement 26261
 */

window.ChitraguptaController = {
  loadedFiles: [],
  isSlmOnline: true,
  isReviewCompleted: false,
  activeTab: "tab-checklist",
  activeDocMode: "normal", // "normal", "ela", "copymove"
  slaTimerSeconds: 222, // 03:42
  slaInterval: null,
  chartsInitialized: false,

  init() {
    this.setupEvents();
    this.startSlaTimer();
    this.checkAutoLoadSample();
  },

  // Setup UI listeners
  setupEvents() {
    // Dropzone events
    const dropZone = document.getElementById("cg-drop-zone");
    const fileInput = document.getElementById("cg-file-input");
    const folderInput = document.getElementById("cg-folder-input");
    const btnLoadSample = document.getElementById("btn-load-sample");
    const btnRunReview = document.getElementById("btn-run-review");

    if (dropZone) {
      dropZone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropZone.classList.add("dragover");
      });
      dropZone.addEventListener("dragleave", () => {
        dropZone.classList.remove("dragover");
      });
      dropZone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropZone.classList.remove("dragover");
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
          this.handleUploadedFileList(e.dataTransfer.files);
        }
      });
    }

    if (fileInput) {
      fileInput.addEventListener("change", (e) => {
        if (e.target.files && e.target.files.length > 0) {
          this.handleUploadedFileList(e.target.files);
        }
      });
    }

    if (folderInput) {
      folderInput.addEventListener("change", (e) => {
        if (e.target.files && e.target.files.length > 0) {
          this.handleUploadedFileList(e.target.files);
        }
      });
    }

    if (btnLoadSample) {
      btnLoadSample.addEventListener("click", () => {
        this.loadSampleCollegeFolder();
      });
    }

    if (btnRunReview) {
      btnRunReview.addEventListener("click", () => {
        this.runAiReviewSimulation();
      });
    }

    // Results Tab Switching
    document.querySelectorAll(".results-tab-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const tabTarget = btn.getAttribute("data-tab");
        this.switchResultsTab(tabTarget);
      });
    });

    // Dark Mode Toggle
    const themeBtn = document.getElementById("cg-theme-toggle");
    if (themeBtn) {
      themeBtn.addEventListener("click", () => {
        this.toggleTheme();
      });
    }

    // Alert simulation button
    const btnSimAlert = document.getElementById("btn-simulate-alert");
    if (btnSimAlert) {
      btnSimAlert.addEventListener("click", () => {
        this.triggerSimulatedAlert();
      });
    }
  },

  // Auto-populate sample files for smooth first impression
  checkAutoLoadSample() {
    if (this.loadedFiles.length === 0) {
      this.loadSampleCollegeFolder(false); // silent load
    }
  },

  // Load the 14 realistic synthetic files
  loadSampleCollegeFolder(showToast = true) {
    const data = window.CHITRAGUPTA_DATA;
    this.loadedFiles = JSON.parse(JSON.stringify(data.sampleFiles));
    
    // Fill Form Strip
    const inst = data.institution;
    document.getElementById("form-inst-name").value = inst.name;
    document.getElementById("form-inst-id").value = inst.id;
    document.getElementById("form-academic-year").value = inst.academicYear;
    document.getElementById("form-category").value = inst.category;

    // Enable Run Review Button
    const btnRunReview = document.getElementById("btn-run-review");
    if (btnRunReview) {
      btnRunReview.removeAttribute("disabled");
    }

    this.renderLoadedFilesList();

    if (showToast && window.App) {
      window.App.showToast("Loaded sample college folder: 14 documents staged (2 statutory certificates omitted)", "info");
    }
  },

  // Handle genuine user files (dragged or chosen via folder/file input)
  handleUploadedFileList(fileList) {
    const syntheticTemplates = window.CHITRAGUPTA_DATA.sampleFiles;
    const newFiles = [];

    for (let i = 0; i < fileList.length; i++) {
      const f = fileList[i];
      const name = f.name;
      const sizeKB = (f.size / 1024).toFixed(0) + " KB";
      const nameLower = name.toLowerCase();

      // Keyword based classification simulation
      let detectedType = "Unclassified — manual review";
      let confidence = 50 + Math.floor(Math.random() * 20);
      let category = "General";
      let flagged = false;

      if (nameLower.includes("affidavit") || nameLower.includes("declaration")) {
        detectedType = "Affidavit 2 (EoA Declaration)";
        confidence = 97;
        category = "Legal & Statutory";
      } else if (nameLower.includes("fee") || nameLower.includes("receipt") || nameLower.includes("ter")) {
        detectedType = "TER Processing Fee Payment Receipt";
        confidence = 98;
        category = "Finance";
      } else if (nameLower.includes("fire") || nameLower.includes("safety")) {
        detectedType = "Fire & Life Safety NOC";
        confidence = 96;
        category = "Safety & Stat";
      } else if (nameLower.includes("occupancy") || nameLower.includes("building") || nameLower.includes("plan")) {
        detectedType = "Building Occupancy / Completion Certificate";
        confidence = 95;
        category = "Infrastructure";
      } else if (nameLower.includes("land") || nameLower.includes("lease") || nameLower.includes("deed")) {
        detectedType = "Registered Land Title / Lease Deed";
        confidence = 96;
        category = "Land & Legal";
      } else if (nameLower.includes("naac") || nameLower.includes("nba")) {
        detectedType = "Accreditation Certificate (NAAC/NBA)";
        confidence = 99;
        category = "Accreditation";
      } else if (nameLower.includes("faculty") || nameLower.includes("staff")) {
        detectedType = "Faculty Cadre & Roster Matrix";
        confidence = 94;
        category = "Academics";
      } else if (f.type.startsWith("image/")) {
        detectedType = "Infrastructure Geo-Photo";
        confidence = 91;
        category = "Infrastructure Photos";
      }

      newFiles.push({
        name,
        size: sizeKB,
        type: f.type || "application/octet-stream",
        detectedType,
        confidence,
        status: confidence > 85 ? "Staged" : "Unclassified",
        category,
        flagged
      });
    }

    this.loadedFiles = newFiles;
    this.renderLoadedFilesList();

    const btnRunReview = document.getElementById("btn-run-review");
    if (btnRunReview) {
      btnRunReview.removeAttribute("disabled");
    }

    if (window.App) {
      window.App.showToast(`Processed ${newFiles.length} file(s) for classification`, "success");
    }
  },

  // Render the staged folder files tree
  renderLoadedFilesList() {
    const container = document.getElementById("loaded-files-grid");
    const countLabel = document.getElementById("loaded-files-count-badge");
    if (!container) return;

    if (countLabel) {
      countLabel.textContent = `${this.loadedFiles.length} documents staged`;
    }

    container.innerHTML = this.loadedFiles.map(file => {
      let iconClass = "fa-file pdf";
      if (file.name.endsWith(".png") || file.name.endsWith(".jpg") || file.name.endsWith(".jpeg")) {
        iconClass = "fa-file-image img";
      } else if (file.name.endsWith(".xlsx") || file.name.endsWith(".csv")) {
        iconClass = "fa-file-excel sheet";
      }

      return `
        <div class="file-tree-item">
          <i class="fas ${iconClass} file-type-icon"></i>
          <div class="file-meta-col">
            <div class="file-name-txt" title="${file.name}">${file.name}</div>
            <div style="font-size: 10px; color: var(--cg-text-muted);">
              ${file.size} • <span class="file-detected-chip ${file.flagged ? 'flagged' : ''}">
                <i class="fas fa-magic"></i> ${file.detectedType} (${file.confidence}%)
              </span>
            </div>
          </div>
        </div>
      `;
    }).join("");
  },

  // 12-Step AI Pipeline Simulation
  async runAiReviewSimulation() {
    const modal = document.getElementById("pipeline-modal");
    const stepsContainer = document.getElementById("pipeline-steps-list");
    const logBox = document.getElementById("pipeline-log-panel");
    const progressBar = document.getElementById("pipeline-progress-bar-fill");
    const btnSkip = document.getElementById("btn-skip-pipeline");

    if (!modal) return;
    modal.classList.remove("hidden");
    stepsContainer.innerHTML = "";
    logBox.innerHTML = "";

    const steps = window.CHITRAGUPTA_DATA.pipelineSteps;
    const totalSteps = steps.length;
    let isSkipped = false;

    if (btnSkip) {
      btnSkip.onclick = () => { isSkipped = true; };
    }

    // Append all steps in pending state
    steps.forEach((step, idx) => {
      const stepEl = document.createElement("div");
      stepEl.className = "pipeline-step-item pending";
      stepEl.id = `pipe-step-${idx + 1}`;
      stepEl.innerHTML = `
        <div class="step-indicator" id="pipe-ind-${idx + 1}">${idx + 1}</div>
        <div style="flex: 1;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <strong style="color: var(--cg-text-main); font-size: 12px;">${step.title}</strong>
            <span class="step-module-tag">${step.module}</span>
          </div>
          <div style="font-size: 11px; color: var(--cg-text-muted); margin-top: 2px;">
            ${!this.isSlmOnline && step.id === 11 ? "Rules-only mode: template explanations used" : step.detail}
          </div>
        </div>
      `;
      stepsContainer.appendChild(stepEl);
    });

    // Execute step by step
    for (let i = 0; i < totalSteps; i++) {
      const step = steps[i];
      const stepEl = document.getElementById(`pipe-step-${i + 1}`);
      const stepInd = document.getElementById(`pipe-ind-${i + 1}`);

      stepEl.className = "pipeline-step-item active";
      stepInd.innerHTML = `<i class="fas fa-spinner fa-spin"></i>`;
      stepEl.scrollIntoView({ behavior: "smooth", block: "nearest" });

      // Append Log Entry
      const now = new Date();
      const timeStr = now.toTimeString().split(" ")[0] + "." + String(now.getMilliseconds()).padStart(3, "0");
      const logLine = document.createElement("div");
      logLine.className = "log-entry";
      logLine.innerHTML = `<span class="log-time">[${timeStr}]</span> <span class="log-m">[${step.module}]</span> ${step.detail}`;
      logBox.appendChild(logLine);
      logBox.scrollTop = logBox.scrollHeight;

      // Update progress bar
      const pct = Math.round(((i + 1) / totalSteps) * 100);
      progressBar.style.width = pct + "%";

      // Simulated wait (fast if skipped)
      const delay = isSkipped ? 60 : Math.min(step.durationMs, 750);
      await new Promise(r => setTimeout(r, delay));

      // Mark step completed
      stepEl.className = "pipeline-step-item completed";
      stepInd.innerHTML = `<i class="fas fa-check"></i>`;
    }

    // Final log entry
    const endLog = document.createElement("div");
    endLog.className = "log-entry";
    endLog.innerHTML = `<span class="log-time">[${new Date().toTimeString().split(" ")[0]}]</span> <span style="color: #10b981; font-weight: 700;">>>> Pipeline execution completed. Validation summary synthesized.</span>`;
    logBox.appendChild(endLog);
    logBox.scrollTop = logBox.scrollHeight;

    // Log to audit chain
    if (window.AuditService) {
      await window.AuditService.append(
        "AICTE-Verify Automated Pipeline",
        "SYSTEM",
        "AI_REVIEW_PIPELINE_COMPLETE",
        "APP:1-9310827361",
        "Executed 12 verification steps across M1-M7; 5 statutory discrepancies detected"
      );
    }

    await new Promise(r => setTimeout(r, 600));
    modal.classList.add("hidden");
    this.isReviewCompleted = true;

    // Switch to Results
    this.renderResults();
    this.showSection("review");
    document.getElementById("results-container").classList.remove("hidden");
    document.getElementById("results-container").scrollIntoView({ behavior: "smooth" });

    if (window.App) {
      window.App.showToast("AI Review completed in 2m 14s. Deficiencies identified for officer review.", "warning");
    }
  },

  // Render complete Results page with all 7 tabs
  renderResults() {
    this.renderChecklistTab();
    this.renderExtractedDataTab();
    this.renderAnomalyTab();
    this.renderVerificationBoardTab();
    this.renderComplianceTab();
    this.renderEvidenceGraphTab();
    this.renderOfficerActionsTab();
  },

  switchResultsTab(tabId) {
    this.activeTab = tabId;
    document.querySelectorAll(".results-tab-btn").forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-tab") === tabId);
    });
    document.querySelectorAll(".tab-content-panel").forEach(panel => {
      panel.classList.toggle("active", panel.id === tabId);
    });

    if (tabId === "tab-compliance") {
      this.initComplianceChart();
    }
  },

  // ================= TAB 1: CHECKLIST & COMPLETENESS =================
  renderChecklistTab() {
    const container = document.getElementById("checklist-tbody");
    if (!container) return;

    const items = window.CHITRAGUPTA_DATA.checklist;
    const isInstitution = window.App ? window.App.currentRole === "Institution user" : false;

    container.innerHTML = items.map(item => {
      let statusClass = "present";
      let statusIcon = "fa-check-circle";
      if (item.status === "Missing") {
        statusClass = "missing";
        statusIcon = "fa-times-circle";
      } else if (item.status === "Expired") {
        statusClass = "expired";
        statusIcon = "fa-clock";
      } else if (item.status === "Incomplete") {
        statusClass = "incomplete";
        statusIcon = "fa-exclamation-triangle";
      }

      return `
        <tr>
          <td>
            <strong>${item.docName}</strong>
            <div style="font-size: 11px; color: var(--cg-text-muted);">${item.notes}</div>
          </td>
          <td><span class="reason-code-tag">${item.type}</span></td>
          <td>
            <span class="status-pill ${statusClass}">
              <i class="fas ${statusIcon}"></i> ${item.status}
            </span>
          </td>
          <td style="font-size: 11.5px;">${item.validity}</td>
          <td><span class="chat-citation-chip" style="margin: 0;">${item.ruleRef}</span></td>
          <td>
            ${item.evidenceFile !== "—" 
              ? `<span style="font-family: monospace; font-size: 11px; color: #2563eb;">${item.evidenceFile}</span>` 
              : `<span style="color: #94a3b8;">Not Attached</span>`}
          </td>
        </tr>
      `;
    }).join("");

    // Show Rectification Panel only for Institution User
    const rectPanel = document.getElementById("rectification-panel");
    if (rectPanel) {
      rectPanel.style.display = isInstitution ? "flex" : "none";
    }
  },

  // ================= TAB 2: EXTRACTED DATA & CONSISTENCY =================
  renderExtractedDataTab() {
    const fieldsContainer = document.getElementById("extracted-fields-tbody");
    const mismatchContainer = document.getElementById("cross-doc-tbody");
    const data = window.CHITRAGUPTA_DATA;

    if (fieldsContainer) {
      fieldsContainer.innerHTML = data.extractedFields.map(f => `
        <tr>
          <td><strong>${f.field}</strong></td>
          <td style="font-family: monospace; font-weight: 600;">${f.value}</td>
          <td>
            <div class="confidence-bar-wrap">
              <div class="confidence-bar-fill" style="width: ${f.confidence}%;"></div>
            </div>
            <span style="font-size: 11px; font-weight: 700;">${f.confidence}%</span>
          </td>
          <td style="font-size: 11.5px; color: var(--cg-text-muted);">${f.doc}</td>
          <td><span style="font-size: 11.5px; color: ${f.match.includes('Deficit') || f.match.includes('Discrepancy') ? '#b91c1c' : '#15803d'}; font-weight: 600;">${f.match}</span></td>
        </tr>
      `).join("");
    }

    if (mismatchContainer) {
      mismatchContainer.innerHTML = data.crossDocMismatches.map(m => `
        <tr>
          <td><span class="reason-code-tag" style="background: #fee2e2; color: #b91c1c;">${m.code}</span></td>
          <td><strong>${m.entity}</strong></td>
          <td style="font-size: 11.5px;">
            <div style="color: #1e3a8a; margin-bottom: 3px;"><strong>Doc A:</strong> ${m.docA}</div>
            <div style="color: #b91c1c;"><strong>Doc B:</strong> ${m.docB}</div>
          </td>
          <td style="font-size: 11px; font-family: monospace;">
            <div>${m.recordId}</div>
            <div style="color: var(--cg-text-muted);">${m.fetchTimestamp}</div>
          </td>
          <td style="font-size: 11.5px; color: #7f1d1d;">${m.impact}</td>
        </tr>
      `).join("");
    }
  },

  // ================= TAB 3: ANOMALY & FORGERY INDICATORS =================
  renderAnomalyTab() {
    const flagsList = document.getElementById("anomaly-flags-list");
    const data = window.CHITRAGUPTA_DATA;
    if (!flagsList) return;

    // Filter out forgery flags if role is Institution user (Section 4.7 safeguard)
    const isInstitution = window.App ? window.App.currentRole === "Institution user" : false;

    if (isInstitution) {
      flagsList.innerHTML = `
        <div style="padding: 24px; text-align: center; background: #f8fafc; border-radius: 8px; border: 1px dashed #cbd5e1;">
          <i class="fas fa-user-lock" style="font-size: 32px; color: #64748b; margin-bottom: 10px;"></i>
          <h4 style="font-size: 14px; font-weight: 700; color: #334155;">Internal Scrutiny Indicators Hidden</h4>
          <p style="font-size: 12px; color: #64748b; margin-top: 4px;">
            In accordance with AICTE Scrutiny Guidelines, forensic indicators are reserved for authorized Scrutiny Officers and Committee Members. The institution has been provided with neutral deficiency notices under the Checklist tab.
          </p>
        </div>
      `;
      return;
    }

    flagsList.innerHTML = data.forensicFlags.map((flag, idx) => `
      <div class="anomaly-flag-card ${idx === 0 ? 'selected' : ''}" id="flag-card-${flag.id}" onclick="window.ChitraguptaController.focusAnomalyBox('${flag.id}')">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
          <span class="reason-code-tag" style="background: #fee2e2; color: #b91c1c;">${flag.code}</span>
          <span style="font-size: 11px; font-weight: 700; color: #b45309;">
            Confidence: ${flag.confidence}%
          </span>
        </div>
        <div style="font-size: 12.5px; font-weight: 700; color: var(--cg-text-main); margin-bottom: 4px;">
          ${flag.title}
        </div>
        <div style="font-size: 11.5px; color: var(--cg-text-muted); line-height: 1.4;">
          ${flag.reason}
        </div>
        <div style="font-size: 10px; color: #64748b; margin-top: 6px;">
          <i class="fas fa-microchip"></i> Detector: ${flag.detector}
        </div>
        <div class="flag-mandatory-disclaimer">
          <i class="fas fa-shield-alt"></i> ${flag.disclaimer}
        </div>
      </div>
    `).join("");

    this.renderDocViewerSvg();
  },

  // Render Synthetic Document Viewer SVG with interactive bounding boxes
  renderDocViewerSvg() {
    const viewer = document.getElementById("svg-document-viewer");
    if (!viewer) return;

    const data = window.CHITRAGUPTA_DATA;
    const doc = data.forensicDocument;

    viewer.innerHTML = `
      <div style="padding: 24px 28px; font-family: 'Times New Roman', serif; color: #1e293b; position: relative; height: 100%; min-height: 520px;">
        <!-- Top e-Stamp Header Simulation -->
        <div style="border: 2px solid #78350f; background: #fffbeb; padding: 10px 14px; text-align: center; border-radius: 4px; margin-bottom: 18px;">
          <div style="font-size: 11px; font-weight: 700; letter-spacing: 1px; color: #78350f;">GOVERNMENT OF KARNATAKA — NON-JUDICIAL e-STAMP</div>
          <div style="display: flex; justify-content: space-between; font-size: 10px; margin-top: 4px; color: #92400e;">
            <span>Cert No: <strong>${doc.stampNo}</strong></span>
            <span>Denomination: <strong style="color: #b91c1c;">${doc.stampAmount}</strong> (Deficit)</span>
            <span>Date: ${doc.date}</span>
          </div>
        </div>

        <h3 style="text-align: center; font-size: 14px; font-weight: 800; letter-spacing: 0.5px; margin-bottom: 4px;">
          ${doc.title}
        </h3>
        <p style="text-align: center; font-size: 10px; color: #64748b; margin-bottom: 16px;">
          ${doc.subtitle}
        </p>

        <p style="font-size: 11.5px; line-height: 1.5; text-align: justify; margin-bottom: 12px;">
          I, <strong>${doc.deponent}</strong>, aged about 58 years, residing at Bengaluru, do hereby solemnly affirm and declare on oath as under:
        </p>

        <p style="font-size: 11.5px; line-height: 1.5; text-align: justify; margin-bottom: 10px;">
          1. That the Trust titled <em>Sri Vidya Educational and Charitable Trust</em> is managing Sri Vidya Institute of Technology under AICTE Permanent ID: 1-43289012.
        </p>

        <p style="font-size: 11.5px; line-height: 1.5; text-align: justify; margin-bottom: 10px;">
          2. That the institution has remitted the statutory Extension of Approval processing fees under UTR SBIN-2026-02-1849102.
        </p>

        <p style="font-size: 11.5px; line-height: 1.5; text-align: justify; margin-bottom: 14px;">
          3. That the total sanctioned student intake capacity declared for the Academic Year 2026-27 is <strong>480 seats</strong> across approved Under-Graduate engineering programs.
        </p>

        <div style="display: flex; justify-content: space-between; margin-top: 40px; align-items: flex-end;">
          <div>
            <div style="font-size: 10px; color: #64748b;">Notary Seal & Register:</div>
            <div style="border: 2px dashed #b45309; width: 100px; height: 60px; display: flex; align-items: center; justify-content: center; font-size: 9px; color: #b45309; text-align: center; border-radius: 50%;">
              ADVOCATE & NOTARY<br/>GOVT OF KARNATAKA<br/>REG NO: 4819
            </div>
          </div>

          <div style="text-align: right;">
            <div style="font-size: 11px; font-weight: 700;">DEPONENT</div>
            <div style="font-size: 10px; color: #64748b; margin-top: 4px;">Dr. K. S. Rajasekharan</div>
            <div style="font-size: 9px; color: #94a3b8;">Digitally Stamped / Verified</div>
          </div>
        </div>

        <!-- Interactive Bounding Boxes Overlay -->
        ${data.forensicFlags.map(flag => `
          <div 
            class="bounding-box-overlay ${flag.id === 'FLAG-01' ? 'focused' : ''}" 
            id="bbox-${flag.id}"
            style="left: ${flag.box.x}%; top: ${flag.box.y}%; width: ${flag.box.w}%; height: ${flag.box.h}%;"
            title="${flag.title} (${flag.code})"
            onclick="window.ChitraguptaController.focusAnomalyBox('${flag.id}')"
          >
            <span style="position: absolute; top: -16px; left: 0; background: #ef4444; color: #fff; font-size: 9px; font-weight: 700; padding: 1px 4px; border-radius: 2px;">
              ${flag.code}
            </span>
          </div>
        `).join("")}
      </div>
    `;
  },

  focusAnomalyBox(flagId) {
    document.querySelectorAll(".bounding-box-overlay").forEach(b => b.classList.remove("focused"));
    document.querySelectorAll(".anomaly-flag-card").forEach(c => c.classList.remove("selected"));

    const targetBox = document.getElementById(`bbox-${flagId}`);
    const targetCard = document.getElementById(`flag-card-${flagId}`);

    if (targetBox) targetBox.classList.add("focused");
    if (targetCard) {
      targetCard.classList.add("selected");
      targetCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  },

  setDocViewerMode(mode) {
    this.activeDocMode = mode;
    const container = document.getElementById("svg-document-viewer");
    if (!container) return;

    container.classList.remove("mode-ela", "mode-copymove");
    if (mode === "ela") {
      container.classList.add("mode-ela");
    } else if (mode === "copymove") {
      container.classList.add("mode-copymove");
    }

    document.querySelectorAll(".layer-toggle-btn").forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-mode") === mode);
    });
  },

  // ================= TAB 4: VERIFICATION BOARD =================
  renderVerificationBoardTab() {
    const tbody = document.getElementById("verification-board-tbody");
    const standaloneTbody = document.getElementById("standalone-verification-tbody");
    const data = window.CHITRAGUPTA_DATA;
    if (!tbody && !standaloneTbody) return;

    const html = data.verificationRecords.map(r => `
      <tr>
        <td>
          <strong>${r.document}</strong>
          <div style="font-size: 11px; color: var(--cg-text-muted);">${r.authority}</div>
        </td>
        <td><span class="reason-code-tag">${r.channel}</span></td>
        <td>
          <span class="badge-state ${r.statusClass}">
            <i class="fas ${r.icon}"></i> ${r.status}
          </span>
        </td>
        <td style="font-size: 11.5px;">
          <div><strong>Submitted:</strong> ${r.submitted}</div>
          <div style="margin-top: 3px; color: ${r.mismatch ? '#b91c1c' : '#15803d'};">
            <strong>Returned:</strong> ${r.mismatch ? `<span class="diff-highlight">${r.returned}</span>` : r.returned}
          </div>
        </td>
        <td style="font-size: 11px; color: var(--cg-text-muted);">${r.timestamp}</td>
        <td>
          ${r.status === 'VERIFICATION_PENDING' 
            ? `<button class="btn-cg-secondary" style="padding: 4px 8px; font-size: 11px;" onclick="window.ChitraguptaController.reverifyDocument('${r.id}')">
                <i class="fas fa-sync-alt"></i> Re-verify
              </button>`
            : r.status === 'MANUAL_REVIEW_REQUIRED'
            ? `<button class="btn-cg-secondary" style="padding: 4px 8px; font-size: 11px; color: #6d28d9;" onclick="window.ChitraguptaController.showDraftLetterModal()">
                <i class="fas fa-envelope-open-text"></i> Draft Letter
              </button>`
            : `<span style="font-size: 11px; color: #10b981;"><i class="fas fa-check"></i> Complete</span>`
          }
        </td>
      </tr>
    `).join("");

    if (tbody) tbody.innerHTML = html;
    if (standaloneTbody) standaloneTbody.innerHTML = html;
  },

  // Simulate Re-verifying a pending document call
  async reverifyDocument(recordId) {
    if (window.App) {
      window.App.showToast("Initiating direct API ping to Kaveri 2.0 Land Registry Gateway...", "info");
    }

    const rec = window.CHITRAGUPTA_DATA.verificationRecords.find(r => r.id === recordId);
    if (!rec) return;

    rec.icon = "fa-spinner fa-spin";
    this.renderVerificationBoardTab();

    await new Promise(r => setTimeout(r, 1400));

    rec.status = "VERIFIED";
    rec.statusClass = "status-verified";
    rec.icon = "fa-check-circle";
    rec.returned = "Title registered in Volume 4182, Page 92; 5.25 Acres unencumbered.";
    rec.timestamp = new Date().toISOString().replace("T", " ").slice(0, 19);

    if (window.AuditService) {
      await window.AuditService.append(
        "Kaveri 2.0 Registry Sandbox Connector",
        "SYSTEM",
        "CONNECTOR_RESOLVED_SUCCESS",
        "DOC:Land_Lease_Deed.pdf",
        "Land deed registration confirmed directly via state land revenue registry API"
      );
    }

    this.renderVerificationBoardTab();

    if (window.App) {
      window.App.showToast("Kaveri 2.0 returned VERIFIED: Land deed verified unencumbered.", "success");
    }
  },

  // Open modal showing prefilled draft letter for SOURCE_UNAVAILABLE
  showDraftLetterModal() {
    const modal = document.getElementById("draft-letter-modal");
    if (!modal) return;

    const letter = window.CHITRAGUPTA_DATA.verificationRecords[5].draftLetter;
    document.getElementById("draft-letter-to").textContent = letter.to;
    document.getElementById("draft-letter-subject").textContent = letter.subject;
    document.getElementById("draft-letter-body").value = letter.body;

    modal.classList.remove("hidden");
  },

  closeDraftLetterModal() {
    const modal = document.getElementById("draft-letter-modal");
    if (modal) modal.classList.add("hidden");
  },

  copyDraftLetter() {
    const body = document.getElementById("draft-letter-body").value;
    navigator.clipboard.writeText(body);
    if (window.App) {
      window.App.showToast("Draft confirmation letter copied to clipboard!", "success");
    }
  },

  // SLA countdown timer
  startSlaTimer() {
    if (this.slaInterval) clearInterval(this.slaInterval);
    this.slaInterval = setInterval(() => {
      if (this.slaTimerSeconds > 0) {
        this.slaTimerSeconds--;
        const mins = Math.floor(this.slaTimerSeconds / 60);
        const secs = this.slaTimerSeconds % 60;
        const formatted = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
        const timerEl = document.getElementById("sla-countdown-timer");
        if (timerEl) {
          timerEl.textContent = formatted;
        }
      }
    }, 1000);
  },

  // ================= TAB 5: COMPLIANCE ASSISTANT =================
  renderComplianceTab() {
    const data = window.CHITRAGUPTA_DATA.compliance;
    
    // Faculty
    document.getElementById("comp-faculty-req").textContent = data.faculty.requiredFaculty;
    document.getElementById("comp-faculty-decl").textContent = data.faculty.declaredFaculty;
    document.getElementById("comp-faculty-diff").textContent = `-${data.faculty.shortfall}`;

    // Computers
    document.getElementById("comp-pc-req").textContent = data.computers.requiredComputers;
    document.getElementById("comp-pc-decl").textContent = data.computers.declaredComputers;
    document.getElementById("comp-pc-diff").textContent = `-${data.computers.shortfall}`;

    // Bandwidth
    document.getElementById("comp-bw-req").textContent = `${data.bandwidth.requiredMbps} Mbps`;
    document.getElementById("comp-bw-decl").textContent = `${data.bandwidth.declaredMbps} Mbps`;
    document.getElementById("comp-bw-diff").textContent = `-${data.bandwidth.shortfall} Mbps`;

    // Built-up Area
    document.getElementById("comp-bua-req").textContent = `${data.builtUpArea.requiredSqM} m²`;
    document.getElementById("comp-bua-decl").textContent = `${data.builtUpArea.extractedSqM} m²`;
    document.getElementById("comp-bua-diff").textContent = `-${data.builtUpArea.gapSqM} m²`;

    this.initComplianceChart();
  },

  initComplianceChart() {
    const canvas = document.getElementById("chart-bua-breakdown");
    if (!canvas || !window.Chart) return;

    if (canvas._chartInstance) {
      canvas._chartInstance.destroy();
    }

    const b = window.CHITRAGUPTA_DATA.compliance.builtUpArea.breakdown;
    const labels = b.map(x => x.space);
    const reqData = b.map(x => x.req);
    const declData = b.map(x => x.declared);

    canvas._chartInstance = new Chart(canvas, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Required Area (m²)",
            data: reqData,
            backgroundColor: "#2563eb"
          },
          {
            label: "Extracted Plan Area (m²)",
            data: declData,
            backgroundColor: "#f59e0b"
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  },

  // ================= TAB 6: EVIDENCE GRAPH =================
  renderEvidenceGraphTab() {
    const wrap = document.getElementById("evidence-graph-container");
    if (!wrap) return;

    // Render interactive SVG node graph linking Finding -> Document -> Snapshot -> Source -> Rule
    wrap.innerHTML = `
      <svg class="graph-svg" viewBox="0 0 920 380">
        <defs>
          <linearGradient id="grad-rule" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#3b82f6" />
            <stop offset="100%" stop-color="#1d4ed8" />
          </linearGradient>
          <linearGradient id="grad-finding" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ef4444" />
            <stop offset="100%" stop-color="#b91c1c" />
          </linearGradient>
          <linearGradient id="grad-doc" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#f59e0b" />
            <stop offset="100%" stop-color="#d97706" />
          </linearGradient>
          <linearGradient id="grad-source" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#10b981" />
            <stop offset="100%" stop-color="#047857" />
          </linearGradient>
          <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
          </marker>
        </defs>

        <!-- Connecting lines -->
        <line x1="170" y1="120" x2="350" y2="120" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)" />
        <line x1="470" y1="120" x2="650" y2="80" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)" />
        <line x1="470" y1="120" x2="650" y2="200" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)" />
        <line x1="470" y1="260" x2="650" y2="200" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)" />
        <line x1="170" y1="260" x2="350" y2="260" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)" />

        <!-- Nodes -->
        <!-- Rule Pack Node -->
        <g class="node-box" onclick="window.ChitraguptaController.showNodeDetails('rule')">
          <rect x="30" y="85" width="140" height="70" rx="8" fill="url(#grad-rule)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.3))" />
          <text x="100" y="115" fill="#fff" font-size="12" font-weight="700" text-anchor="middle">APH 2024-27</text>
          <text x="100" y="135" fill="#bfdbfe" font-size="10" text-anchor="middle">Appendix 7 (1:20 UG)</text>
        </g>

        <!-- Finding Node (Faculty) -->
        <g class="node-box" onclick="window.ChitraguptaController.showNodeDetails('finding-fac')">
          <rect x="350" y="85" width="120" height="70" rx="8" fill="url(#grad-finding)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.3))" />
          <text x="410" y="115" fill="#fff" font-size="12" font-weight="700" text-anchor="middle">Faculty Shortfall</text>
          <text x="410" y="135" fill="#fecaca" font-size="10" text-anchor="middle">Deficit: 7 Faculty</text>
        </g>

        <!-- Document Region (Roster) -->
        <g class="node-box" onclick="window.ChitraguptaController.showNodeDetails('doc-fac')">
          <rect x="650" y="45" width="150" height="70" rx="8" fill="url(#grad-doc)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.3))" />
          <text x="725" y="75" fill="#fff" font-size="12" font-weight="700" text-anchor="middle">Faculty_List.xlsx</text>
          <text x="725" y="95" fill="#fef3c7" font-size="10" text-anchor="middle">29 Counted vs 36 Req</text>
        </g>

        <!-- Rule Node (Area) -->
        <g class="node-box" onclick="window.ChitraguptaController.showNodeDetails('rule-area')">
          <rect x="30" y="225" width="140" height="70" rx="8" fill="url(#grad-rule)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.3))" />
          <text x="100" y="255" fill="#fff" font-size="12" font-weight="700" text-anchor="middle">APH Appendix 4</text>
          <text x="100" y="275" fill="#bfdbfe" font-size="10" text-anchor="middle">BUA Norm (9,800 m²)</text>
        </g>

        <!-- Finding Node (Area) -->
        <g class="node-box" onclick="window.ChitraguptaController.showNodeDetails('finding-area')">
          <rect x="350" y="225" width="120" height="70" rx="8" fill="url(#grad-finding)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.3))" />
          <text x="410" y="255" fill="#fff" font-size="12" font-weight="700" text-anchor="middle">Area Gap</text>
          <text x="410" y="275" fill="#fecaca" font-size="10" text-anchor="middle">Gap: 1,150 m²</text>
        </g>

        <!-- Source Node (Municipal API) -->
        <g class="node-box" onclick="window.ChitraguptaController.showNodeDetails('source-ulb')">
          <rect x="650" y="165" width="150" height="70" rx="8" fill="url(#grad-source)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.3))" />
          <text x="725" y="195" fill="#fff" font-size="12" font-weight="700" text-anchor="middle">ULB Municipal API</text>
          <text x="725" y="215" fill="#d1fae5" font-size="10" text-anchor="middle">Sanctioned: 8,650 m²</text>
        </g>
      </svg>
      <div id="evidence-graph-detail-panel" style="margin-top: 14px; padding: 12px 16px; background: rgba(255,255,255,0.06); border-radius: 8px; font-size: 12px; color: #cbd5e1;">
        <i class="fas fa-info-circle" style="color: var(--cg-saffron);"></i> 
        <strong>Click any node above</strong> to trace the exact lineage: Finding &rarr; Document Region &rarr; Snapshot Record &rarr; Verified Source &rarr; Handbook Clause.
      </div>
    `;
  },

  showNodeDetails(nodeType) {
    const detailPanel = document.getElementById("evidence-graph-detail-panel");
    if (!detailPanel) return;

    const descriptions = {
      "rule": "<strong>Rule Node [APH 2024-27, App. 7, p. 112]:</strong> Prescribes 1:20 UG Engineering teacher:student ratio, with 1:2:6 cadre structure. Hard requirement under Clause 7.1.",
      "finding-fac": "<strong>Finding Node [FAC-SHORTFALL]:</strong> Deterministic rule engine calculated 29 declared full-time faculty vs 36 required for 720 students. Shortfall = 7. Severity = Warning.",
      "doc-fac": "<strong>Document Evidence [Faculty_List.xlsx]:</strong> Extracted 29 rows matching qualification norms. Bounding box coordinates: Sheet1!A4:G33.",
      "rule-area": "<strong>Rule Node [APH 2024-27, App. 4, p. 138]:</strong> Master infrastructure requirement mandates 9,800 m² built-up area for 480 intake capacity.",
      "finding-area": "<strong>Finding Node [BUA-GAP]:</strong> Extracted 8,650 m² from Municipal record vs 9,800 m² required. Shortfall = 1,150 m². Advisory: Physical verification recommended.",
      "source-ulb": "<strong>Source Verification [ULB API]:</strong> Direct sandbox query to Devanahalli Municipal Council returned endorsement reference MC/DEV/2012/819 with 8,650 m²."
    };

    detailPanel.innerHTML = descriptions[nodeType] || "Node selected.";
  },

  // ================= TAB 7: OFFICER ACTIONS (HUMAN GATE) =================
  renderOfficerActionsTab() {
    const actionForm = document.getElementById("officer-action-form");
    if (!actionForm) return;

    // Check if Auditor role (Read-only)
    const isAuditor = window.App ? window.App.currentRole === "Auditor (read-only)" : false;

    if (isAuditor) {
      actionForm.innerHTML = `
        <div style="padding: 20px; background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 8px; text-align: center;">
          <i class="fas fa-lock" style="font-size: 28px; color: #64748b; margin-bottom: 8px;"></i>
          <h4 style="font-size: 13.5px; font-weight: 700;">Auditor Access: Read-Only Mode</h4>
          <p style="font-size: 12px; color: #64748b;">
            Auditor roles have cryptographic read-only verification rights across the entire ledger. Decision actions can only be committed by authenticated Scrutiny Officers.
          </p>
        </div>
      `;
      return;
    }

    actionForm.innerHTML = `
      <div style="font-size: 13px; font-weight: 700; color: var(--cg-text-main); margin-bottom: 12px;">
        Select Scrutiny Action for Application ID: 1-9310827361
      </div>

      <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 18px;">
        <label style="display: flex; align-items: center; gap: 10px; font-size: 12.5px; cursor: pointer;">
          <input type="radio" name="officer-decision" value="REQUEST_RECTIFICATION" checked />
          <span><strong>Request Rectification</strong> (Issue deficiency memorandum allowing institution 10 days to submit valid Fire NOC & updated Affidavit)</span>
        </label>
        <label style="display: flex; align-items: center; gap: 10px; font-size: 12.5px; cursor: pointer;">
          <input type="radio" name="officer-decision" value="RECOMMEND_INSPECTION" />
          <span><strong>Recommend Expert Visit Committee (EVC) Inspection</strong> (Physical on-site audit of built-up area and classroom infrastructure)</span>
        </label>
        <label style="display: flex; align-items: center; gap: 10px; font-size: 12.5px; cursor: pointer;">
          <input type="radio" name="officer-decision" value="REQUEST_CLARIFICATION" />
          <span><strong>Request Clarification</strong> (Clarify Trust Title ambiguity between Affidavit and Audited Accounts)</span>
        </label>
        <label style="display: flex; align-items: center; gap: 10px; font-size: 12.5px; cursor: pointer;">
          <input type="radio" name="officer-decision" value="CONFIRM_DEFICIENCIES" />
          <span><strong>Confirm Deficiencies</strong> (Forward verified findings to Scrutiny Committee for hearing)</span>
        </label>
      </div>

      <div style="margin-bottom: 16px;">
        <label style="display: block; font-size: 11.5px; font-weight: 700; color: var(--cg-text-muted); margin-bottom: 6px;">
          Officer Scrutiny Notes & Justification (Will be permanently committed to SHA-256 Audit Trail):
        </label>
        <textarea id="officer-scrutiny-notes" style="width: 100%; height: 80px; padding: 10px; border: 1px solid var(--cg-border); border-radius: 6px; font-size: 12px; background: var(--cg-card-bg); color: var(--cg-text-main);">Verified that Fire Safety NOC lapsed on 30-Nov-2025. Recommended 10-day rectification window as per APH Clause 1.8 before forwarding to Scrutiny Committee.</textarea>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center;">
        <button class="btn-cg-primary" onclick="window.ChitraguptaController.commitOfficerAction()">
          <i class="fas fa-lock"></i> Commit Action to Hash-Chained Audit Trail
        </button>
        <span style="font-size: 11px; color: var(--cg-text-muted);">
          Signed by: <strong>Scrutiny Officer (ID: SO-SWRO-481)</strong>
        </span>
      </div>
    `;
  },

  async commitOfficerAction() {
    const selected = document.querySelector('input[name="officer-decision"]:checked')?.value || "REQUEST_RECTIFICATION";
    const notes = document.getElementById("officer-scrutiny-notes")?.value || "Officer action executed.";

    if (window.AuditService) {
      await window.AuditService.append(
        "Officer Dr. S. Rao (Scrutiny)",
        "SCRUTINY_OFFICER",
        `OFFICER_${selected}`,
        "APP:1-9310827361",
        notes
      );
    }

    if (window.App) {
      window.App.showToast(`Officer decision "${selected}" cryptographically committed to audit log.`, "success");
    }

    // Refresh audit trail if currently in audit view
    this.renderAuditTrail();
  },

  // ================= 4.4 DASHBOARD RENDERING =================
  renderDashboard() {
    const appQueueBody = document.getElementById("dashboard-queue-tbody");
    const data = window.CHITRAGUPTA_DATA;
    if (!appQueueBody) return;

    appQueueBody.innerHTML = data.queueApplications.map(app => `
      <tr>
        <td><strong>${app.id}</strong></td>
        <td>
          <div style="font-weight: 600;">${app.institution}</div>
          <div style="font-size: 11px; color: var(--cg-text-muted);">${app.state}</div>
        </td>
        <td style="font-size: 12px;">${app.category}</td>
        <td>
          <span class="status-pill ${app.statusClass}">
            ${app.status}
          </span>
        </td>
        <td style="font-weight: 700; text-align: center;">${app.findingsCount}</td>
        <td style="font-size: 11px; color: var(--cg-text-muted);">${app.processedTime}</td>
        <td>
          <a href="#/chitragupta/review" class="btn-open-chitragupta" style="padding: 3px 8px; font-size: 10.5px;">
            <i class="fas fa-search"></i> Inspect
          </a>
        </td>
      </tr>
    `).join("");

    this.initDashboardCharts();
  },

  initDashboardCharts() {
    if (this.chartsInitialized || !window.Chart) return;
    this.chartsInitialized = true;

    // Chart 1: Findings by Reason Code (Doughnut)
    const ctx1 = document.getElementById("chart-findings-reason");
    if (ctx1) {
      new Chart(ctx1, {
        type: "doughnut",
        data: {
          labels: ["DOC-EXPIRED", "XDOC-MISMATCH", "IMG-ELA", "SEAL-REUSED", "BUA-GAP", "FAC-SHORTFALL"],
          datasets: [{
            data: [14, 22, 9, 7, 18, 30],
            backgroundColor: ["#f59e0b", "#3b82f6", "#ef4444", "#8b5cf6", "#ec4899", "#10b981"]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: "right" } }
        }
      });
    }

    // Chart 2: Verification States Distribution (Bar)
    const ctx2 = document.getElementById("chart-states-dist");
    if (ctx2) {
      new Chart(ctx2, {
        type: "bar",
        data: {
          labels: ["VERIFIED", "MISMATCH", "EXPIRED", "PENDING", "UNAVAILABLE", "MANUAL"],
          datasets: [{
            label: "Documents Count",
            data: [68, 12, 8, 5, 3, 9],
            backgroundColor: ["#10b981", "#ef4444", "#f59e0b", "#3b82f6", "#64748b", "#8b5cf6"]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: { y: { beginAtZero: true } }
        }
      });
    }
  },

  // ================= 4.5 AUDIT TRAIL RENDERING =================
  async renderAuditTrail() {
    const tbody = document.getElementById("audit-trail-tbody");
    const countBadge = document.getElementById("audit-blocks-count");
    if (!tbody || !window.AuditService) return;

    if (!window.AuditService.isInitialized) {
      await window.AuditService.seedInitialTrail();
    }

    const rows = window.AuditService.chain;
    if (countBadge) {
      countBadge.textContent = `${rows.length} verified blocks`;
    }

    tbody.innerHTML = rows.map((r, i) => `
      <tr style="${r.tampered ? 'background: #fef2f2;' : ''}">
        <td><strong>#${r.seq}</strong></td>
        <td style="font-size: 11px; color: var(--cg-text-muted);">${r.timestamp.replace("T", " ").slice(0, 19)}</td>
        <td style="font-size: 11.5px;"><strong>${r.actor}</strong></td>
        <td><span class="reason-code-tag">${r.role}</span></td>
        <td><span style="font-family: monospace; font-size: 11px; font-weight: 700; color: #1e3a8a;">${r.action}</span></td>
        <td style="font-size: 11.5px; font-family: monospace;">${r.object}</td>
        <td style="font-size: 11.5px;">
          ${r.details}
          ${r.tampered ? `<span style="color: #b91c1c; font-weight: 700;"> [TAMPERED]</span>` : ''}
        </td>
        <td>
          <span class="hash-cell" title="${r.prev_hash}">${r.prev_hash.slice(0, 10)}...</span>
        </td>
        <td>
          <span class="hash-cell" style="color: #2563eb;" title="${r.row_hash}">${r.row_hash.slice(0, 10)}...</span>
        </td>
      </tr>
    `).join("");
  },

  async verifyAuditChainUI() {
    if (!window.AuditService) return;
    const banner = document.getElementById("audit-verification-banner");
    const result = await window.AuditService.verifyChain();

    if (banner) {
      if (result.valid) {
        banner.className = "audit-status-banner intact";
        banner.innerHTML = `<i class="fas fa-check-double"></i> <span><strong>CHAIN INTACT:</strong> ${result.message}</span>`;
      } else {
        banner.className = "audit-status-banner broken";
        banner.innerHTML = `<i class="fas fa-exclamation-triangle"></i> <span><strong>CHAIN BROKEN:</strong> ${result.reason}</span>`;
      }
    }

    if (window.App) {
      window.App.showToast(result.valid ? "Audit chain verified intact (All SHA-256 blocks match)" : "ALERT: Cryptographic chain mismatch detected!", result.valid ? "success" : "error");
    }
  },

  tamperAuditChainDemo() {
    if (!window.AuditService) return;
    // Tamper row 3 (OCR field extraction)
    const res = window.AuditService.tamperRow(3);
    if (res.success) {
      this.renderAuditTrail();
      if (window.App) {
        window.App.showToast("Demo tamper injected: Row #3 details modified without re-hashing. Click 'Verify Chain' to see cryptographic detection!", "warning");
      }
    }
  },

  async restoreAuditChainDemo() {
    if (!window.AuditService) return;
    await window.AuditService.recomputeAllHashes();
    this.renderAuditTrail();
    this.verifyAuditChainUI();
    if (window.App) {
      window.App.showToast("Chain restored & re-hashed cryptographically.", "success");
    }
  },

  // ================= 4.7 ADMIN & SLM CONTROL =================
  toggleSlmState(state) {
    this.isSlmOnline = state;
    const statusLight = document.getElementById("slm-status-light");
    const statusText = document.getElementById("slm-status-text");
    const sidebarDot = document.getElementById("sidebar-slm-dot");
    const rulesChip = document.getElementById("sidebar-rules-chip");

    if (this.isSlmOnline) {
      if (statusLight) statusLight.className = "status-dot online";
      if (statusText) statusText.textContent = "SLM Online (Fine-tuned 3B GGUF, local)";
      if (sidebarDot) sidebarDot.className = "status-dot online";
      if (rulesChip) rulesChip.style.display = "none";
      if (window.App) window.App.showToast("Local SLM engine started.", "success");
    } else {
      if (statusLight) statusLight.className = "status-dot offline";
      if (statusText) statusText.textContent = "Offline (Rules-Only Mode)";
      if (sidebarDot) sidebarDot.className = "status-dot offline";
      if (rulesChip) rulesChip.style.display = "inline-block";
      if (window.App) window.App.showToast("SLM engine stopped. Chitragupta is operating in deterministic Rules-Only Mode.", "warning");
    }
  },

  async publishRulePack() {
    const yamlText = document.getElementById("rulepack-editor-textarea")?.value || "";
    if (window.AuditService) {
      await window.AuditService.append(
        "Rule Administrator",
        "RULE_ADMIN",
        "RULEPACK_PUBLISHED",
        "RULEPACK-APH-2024-27-V3.2.1",
        "Updated active regulatory thresholds and trust channel weights"
      );
    }
    if (window.App) {
      window.App.showToast("Rule Pack v3.2.1 published and committed to audit trail.", "success");
    }
  },

  // ================= DOWNLOAD REPORT & PRINT =================
  downloadReportJson() {
    const reportData = {
      product: "Chitragupta (AICTE-Verify)",
      sih_problem_statement: "PS 26261",
      institution: window.CHITRAGUPTA_DATA.institution,
      evaluation_summary: {
        readiness_score: "68%",
        status: "Deficiencies found — Officer review required",
        findings: window.CHITRAGUPTA_DATA.crossDocMismatches,
        verification_states: window.CHITRAGUPTA_DATA.verificationRecords,
        compliance_shortfalls: window.CHITRAGUPTA_DATA.compliance
      },
      audit_chain_block_count: window.AuditService ? window.AuditService.chain.length : 0,
      generated_at: new Date().toISOString()
    };

    const str = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(reportData, null, 2));
    const dl = document.createElement("a");
    dl.setAttribute("href", str);
    dl.setAttribute("download", `chitragupta_report_1-9310827361_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(dl);
    dl.click();
    document.body.removeChild(dl);
  },

  printReportPdf() {
    window.print();
  },

  // Trigger simulated alert
  triggerSimulatedAlert() {
    if (window.App) {
      window.App.showToast("New Alert: Land Lease verification SLA approaching timeout (01:15 remaining). Automated SMS sent.", "warning");
    }
  },

  // Theme toggle
  toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme") || "light";
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    const themeBtn = document.getElementById("cg-theme-toggle");
    if (themeBtn) {
      themeBtn.innerHTML = next === "dark" 
        ? `<i class="fas fa-sun"></i> Light Mode` 
        : `<i class="fas fa-moon"></i> Dark Mode`;
    }
  },

  // Show Section
  showSection(sectionId) {
    document.querySelectorAll(".cg-view-section").forEach(sec => {
      sec.classList.remove("active");
    });
    const target = document.getElementById(`cg-section-${sectionId}`);
    if (target) {
      target.classList.add("active");
    }

    document.querySelectorAll(".cg-nav-item").forEach(item => {
      item.classList.toggle("active", item.getAttribute("data-section") === sectionId);
    });

    if (sectionId === "dashboard") {
      this.renderDashboard();
    } else if (sectionId === "audit") {
      this.renderAuditTrail();
    } else if (sectionId === "verification") {
      this.renderVerificationBoardTab();
    } else if (sectionId === "compliance") {
      this.renderComplianceTab();
    }
  }
};
