/**
 * AICTE PARTNER PORTAL CLONE CONTROLLER
 * Handles portal navigation, circular tiles grid, clone subpages, and floating chatbot
 */

window.PortalController = {
  // Tile metadata for AICTE Partner Portal
  tiles: [
    { id: "my-institute", title: "My Institute Application", icon: "fa-building", route: "#/portal/my-institute" },
    { id: "institute-accounts", title: "Institute Accounts / JFDR", icon: "fa-file-invoice-dollar", route: "#/portal/accounts" },
    { id: "pmkvy", title: "PMKVY", icon: "fa-user-graduate", route: "#/portal/pmkvy" },
    { id: "pg-scholarship", title: "PG Scholarship", icon: "fa-award", route: "#/portal/pg-scholarship" },
    { id: "block-unblock", title: "Block/Unblock Student", icon: "fa-user-shield", route: "#/portal/block-student" },
    { id: "cii-questionnaire", title: "CII Questionnaire", icon: "fa-clipboard-check", route: "#/portal/cii-questionnaire" },
    { id: "aqis", title: "AQIS Application", icon: "fa-landmark", route: "#/portal/aqis" },
    { id: "nsqf", title: "NSQF", icon: "fa-tools", route: "#/portal/nsqf" },
    { id: "approval-process", title: "Approval Process", icon: "fa-stamp", route: "#/portal/approval-process", isApproval: true },
    { id: "pgdm-details", title: "PGDM Student Details", icon: "fa-users-cog", route: "#/portal/pgdm-details" },
    { 
      id: "chitragupta", 
      title: "Chitragupta", 
      subtitle: "AI Validation & Verification", 
      icon: "fa-scroll", 
      route: "#/chitragupta/review", 
      isChitragupta: true 
    }
  ],

  // Sample applications listed under "Approval Process"
  approvalApplications: [
    {
      id: "1-9310827361",
      institution: "Sri Vidya Institute of Technology",
      category: "Extension of Approval (EoA) based on Self-Disclosure",
      ay: "2026-2027",
      status: "AI Scrutiny In-Progress",
      statusColor: "#d97706",
      actionLink: "#/chitragupta/review"
    },
    {
      id: "1-4328901201",
      institution: "Sri Vidya Institute of Technology",
      category: "Extension of Approval (EoA)",
      ay: "2025-2026",
      status: "Approved (Letter Issued)",
      statusColor: "#15803d",
      actionLink: "#/chitragupta/dashboard"
    },
    {
      id: "1-4328901198",
      institution: "Sri Vidya Institute of Technology",
      category: "Extension of Approval (EoA)",
      ay: "2024-2025",
      status: "Approved (Letter Issued)",
      statusColor: "#15803d",
      actionLink: "#/chitragupta/dashboard"
    },
    {
      id: "1-4328900982",
      institution: "Sri Vidya Institute of Technology",
      category: "Increase in Intake (CSE / AI)",
      ay: "2023-2024",
      status: "Approved (Letter Issued)",
      statusColor: "#15803d",
      actionLink: "#/chitragupta/dashboard"
    }
  ],

  init() {
    this.renderTiles();
    this.initChatbot();
  },

  // Render the 11 circular tiles on Portal Home
  renderTiles() {
    const grid = document.getElementById("portal-tiles-grid");
    if (!grid) return;

    grid.innerHTML = this.tiles.map(tile => {
      if (tile.isChitragupta) {
        return `
          <a href="${tile.route}" class="portal-tile-item tile-chitragupta" id="tile-${tile.id}" title="Launch Chitragupta AI-Powered Verification Module">
            <div class="portal-tile-circle">
              <span class="chitragupta-pulse-ring"></span>
              <i class="fas ${tile.icon} portal-tile-icon"></i>
            </div>
            <span class="portal-tile-label">${tile.title}</span>
            <span class="chitragupta-tile-subtitle">${tile.subtitle}</span>
          </a>
        `;
      } else if (tile.isApproval) {
        return `
          <a href="${tile.route}" class="portal-tile-item tile-approval" id="tile-${tile.id}">
            <div class="portal-tile-circle">
              <i class="fas ${tile.icon} portal-tile-icon"></i>
            </div>
            <span class="portal-tile-label">${tile.title}</span>
          </a>
        `;
      } else {
        return `
          <a href="${tile.route}" class="portal-tile-item" id="tile-${tile.id}">
            <div class="portal-tile-circle">
              <i class="fas ${tile.icon} portal-tile-icon"></i>
            </div>
            <span class="portal-tile-label">${tile.title}</span>
          </a>
        `;
      }
    }).join("");
  },

  // Scroll tiles grid up or down
  scrollTiles(direction) {
    const grid = document.getElementById("portal-tiles-grid");
    if (!grid) return;
    const amount = direction === "up" ? -180 : 180;
    grid.scrollBy({ top: amount, behavior: "smooth" });
  },

  // Render generic or Approval Process clone subpage
  renderSubpage(pageId) {
    const container = document.getElementById("portal-subpage-view");
    if (!container) return;

    const currentTile = this.tiles.find(t => t.id === pageId || t.route.includes(pageId)) || {
      title: "AICTE Portal Service",
      icon: "fa-folder-open"
    };

    if (pageId === "approval-process" || pageId === "approval") {
      container.innerHTML = `
        <div class="portal-breadcrumb">
          <a href="#/home"><i class="fas fa-home"></i> Home</a> &gt; 
          <span>Approval Process</span>
        </div>
        <div class="subpage-card">
          <div class="subpage-header">
            <div class="subpage-title">
              <i class="fas fa-stamp" style="color: var(--portal-orange);"></i>
              Approval Process & Applications Ledger
            </div>
            <span class="portal-session-pill">AY 2026-27 Active Cycle</span>
          </div>

          <div class="portal-demo-notice">
            <i class="fas fa-info-circle"></i>
            <span><strong>Notice:</strong> This screen reflects AICTE Partner Portal records for <strong>Sri Vidya Institute of Technology</strong> (Permanent ID: 1-43289012). Click <strong>"Open in Chitragupta"</strong> to review the active application with AI validation.</span>
          </div>

          <table class="portal-table">
            <thead>
              <tr>
                <th>Application ID</th>
                <th>Category</th>
                <th>Academic Year</th>
                <th>Submission Status</th>
                <th>AICTE-Verify Action</th>
              </tr>
            </thead>
            <tbody>
              ${this.approvalApplications.map(app => `
                <tr>
                  <td><strong>${app.id}</strong></td>
                  <td>${app.category}</td>
                  <td>${app.ay}</td>
                  <td>
                    <span style="display: inline-flex; align-items: center; gap: 5px; font-weight: 600; color: ${app.statusColor};">
                      <i class="fas fa-circle" style="font-size: 8px;"></i> ${app.status}
                    </span>
                  </td>
                  <td>
                    <a href="${app.actionLink}" class="btn-open-chitragupta">
                      <i class="fas fa-sparkles"></i> Open in Chitragupta
                    </a>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      `;
    } else {
      // Believable generic dummy subpage for other portal tiles
      container.innerHTML = `
        <div class="portal-breadcrumb">
          <a href="#/home"><i class="fas fa-home"></i> Home</a> &gt; 
          <span>${currentTile.title}</span>
        </div>
        <div class="subpage-card">
          <div class="subpage-header">
            <div class="subpage-title">
              <i class="fas ${currentTile.icon}" style="color: var(--portal-blue);"></i>
              ${currentTile.title}
            </div>
            <span class="portal-session-pill">Portal Status: Operational</span>
          </div>

          <div class="portal-demo-notice">
            <i class="fas fa-info-circle"></i>
            <span><strong>Demo screen:</strong> This module is part of the AICTE Partner Portal clone. The AI validation engine is hosted under the <strong>Chitragupta</strong> module.</span>
          </div>

          <table class="portal-table">
            <thead>
              <tr>
                <th>Record Reference</th>
                <th>Description / Scheme</th>
                <th>Submission Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>REF-2026-0091</td>
                <td>Annual Data Submission for ${currentTile.title}</td>
                <td>12-Jan-2026</td>
                <td><span style="color: #15803d; font-weight: 600;"><i class="fas fa-check-circle"></i> Submitted</span></td>
                <td><a href="#/home" style="color: var(--portal-blue); font-weight: 600; text-decoration: none;">View Receipt</a></td>
              </tr>
              <tr>
                <td>REF-2025-4128</td>
                <td>Statutory Verification Compliance - Round 2</td>
                <td>28-Oct-2025</td>
                <td><span style="color: #15803d; font-weight: 600;"><i class="fas fa-check-circle"></i> Verified</span></td>
                <td><a href="#/home" style="color: var(--portal-blue); font-weight: 600; text-decoration: none;">Download Acknowledgment</a></td>
              </tr>
              <tr>
                <td>REF-2024-8190</td>
                <td>Scheme Disclosures & Institutional Compliance</td>
                <td>14-Nov-2024</td>
                <td><span style="color: #475569; font-weight: 600;"><i class="fas fa-archive"></i> Archived</span></td>
                <td><a href="#/home" style="color: var(--portal-blue); font-weight: 600; text-decoration: none;">Audit Copy</a></td>
              </tr>
              <tr>
                <td>REF-2024-1142</td>
                <td>Mandatory Committee Review & Roster Endorsement</td>
                <td>03-Jun-2024</td>
                <td><span style="color: #15803d; font-weight: 600;"><i class="fas fa-check-circle"></i> Closed</span></td>
                <td><a href="#/home" style="color: var(--portal-blue); font-weight: 600; text-decoration: none;">View</a></td>
              </tr>
            </tbody>
          </table>

          <div style="margin-top: 24px; text-align: right;">
            <a href="#/chitragupta/review" class="btn-open-chitragupta">
              <i class="fas fa-arrow-right"></i> Switch to Chitragupta AI-Verify
            </a>
          </div>
        </div>
      `;
    }
  },

  // Setup Chatbot Floating Panel
  initChatbot() {
    const floatingBtn = document.getElementById("portal-chatbot-btn");
    const popupPanel = document.getElementById("chatbot-popup-panel");
    const closeBtn = document.getElementById("chatbot-close-btn");
    const sendBtn = document.getElementById("chatbot-send-btn");
    const inputField = document.getElementById("chatbot-input");
    const quickButtons = document.querySelectorAll(".quick-q-btn");

    if (floatingBtn && popupPanel) {
      floatingBtn.addEventListener("click", () => {
        popupPanel.classList.toggle("hidden");
        if (!popupPanel.classList.contains("hidden")) {
          inputField?.focus();
        }
      });
    }

    if (closeBtn && popupPanel) {
      closeBtn.addEventListener("click", () => {
        popupPanel.classList.add("hidden");
      });
    }

    if (sendBtn && inputField) {
      sendBtn.addEventListener("click", () => {
        this.handleUserQuestion(inputField.value);
        inputField.value = "";
      });

      inputField.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          this.handleUserQuestion(inputField.value);
          inputField.value = "";
        }
      });
    }

    // Quick questions pills
    quickButtons.forEach(btn => {
      btn.addEventListener("click", (e) => {
        const text = e.target.textContent || "";
        this.handleUserQuestion(text);
      });
    });
  },

  // Handle assistant Q&A with streaming typed animation and clause citation
  handleUserQuestion(questionText) {
    const q = (questionText || "").trim();
    if (!q) return;

    const messagesBox = document.getElementById("chatbot-messages-container");
    if (!messagesBox) return;

    // Append User Bubble
    const userBubble = document.createElement("div");
    userBubble.className = "chat-bubble user";
    userBubble.textContent = q;
    messagesBox.appendChild(userBubble);
    messagesBox.scrollTop = messagesBox.scrollHeight;

    // Check knowledge base
    const qaList = window.CHITRAGUPTA_DATA ? window.CHITRAGUPTA_DATA.handbookQA : [];
    const qLower = q.toLowerCase();

    const match = qaList.find(item => {
      return item.keywords.some(kw => qLower.includes(kw.toLowerCase())) || 
             qLower.includes(item.q.toLowerCase().slice(0, 20));
    });

    // Check if SLM is online
    const isSlmOnline = window.ChitraguptaController ? window.ChitraguptaController.isSlmOnline : true;

    // Create Bot Bubble with streaming effect
    const botBubble = document.createElement("div");
    botBubble.className = "chat-bubble bot";
    messagesBox.appendChild(botBubble);
    messagesBox.scrollTop = messagesBox.scrollHeight;

    if (!match) {
      // Unknown question fallback
      const fallbackText = "I could not find this in the indexed AICTE Approval Process Handbook (2024-27). This query has been noted and routed to a human scrutiny officer for formal clarification.";
      this.streamText(botBubble, fallbackText, null, messagesBox);
      return;
    }

    let finalAnswer = match.answer;
    let citation = match.citation;

    if (!isSlmOnline) {
      finalAnswer = `[Rules-Only Mode: SLM Offline] Retrieved Handbook Clause Text: ${match.answer}`;
    }

    this.streamText(botBubble, finalAnswer, citation, messagesBox);
  },

  // Typed streaming effect
  streamText(element, text, citation, scrollBox) {
    let index = 0;
    const speed = 12; // ms per char

    const timer = setInterval(() => {
      element.textContent = text.slice(0, index);
      index += 2;
      scrollBox.scrollTop = scrollBox.scrollHeight;

      if (index > text.length) {
        clearInterval(timer);
        element.textContent = text;
        if (citation) {
          const chip = document.createElement("div");
          chip.className = "chat-citation-chip";
          chip.innerHTML = `<i class="fas fa-bookmark"></i> ${citation}`;
          element.appendChild(chip);
          scrollBox.scrollTop = scrollBox.scrollHeight;
        }
      }
    }, speed);
  }
};
