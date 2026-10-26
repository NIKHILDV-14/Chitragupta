/**
 * CHITRAGUPTA & AICTE PORTAL - Master Application Controller
 * Handles Hash Routing, Role-Based Access Control (RBAC), and Toast System
 */

window.App = {
  currentRole: "Scrutiny officer",
  rolesList: [
    { id: "inst", name: "Institution user", badge: "Self-Disclosure" },
    { id: "scrutiny", name: "Scrutiny officer", badge: "Evaluation" },
    { id: "committee", name: "Senior officer / committee member", badge: "Decision" },
    { id: "rules", name: "Rule administrator", badge: "Policy" },
    { id: "sysadmin", name: "System administrator", badge: "Superuser" },
    { id: "auditor", name: "Auditor (read-only)", badge: "Audit" }
  ],

  init() {
    this.setupRouter();
    this.setupRoleSwitcher();
    this.setupTopbarNavigation();
    
    // Initialize child modules
    if (window.PortalController) window.PortalController.init();
    if (window.ChitraguptaController) window.ChitraguptaController.init();
    if (window.SystemDesignEngine) window.SystemDesignEngine.init();
    if (window.AuditService) window.AuditService.seedInitialTrail();

    // Trigger initial route
    this.handleRoute();
  },

  // Setup Hash Router
  setupRouter() {
    window.addEventListener("hashchange", () => {
      this.handleRoute();
    });
  },

  handleRoute() {
    const rawHash = window.location.hash || "#/home";
    const hash = rawHash.toLowerCase();

    const portalHomeView = document.getElementById("portal-home-view");
    const portalSubpageView = document.getElementById("portal-subpage-view");
    const chitraguptaView = document.getElementById("chitragupta-app-view");

    // Hide all root views first
    if (portalHomeView) portalHomeView.style.display = "none";
    if (portalSubpageView) portalSubpageView.style.display = "none";
    if (chitraguptaView) chitraguptaView.style.display = "none";

    // Update Topbar Active States
    document.querySelectorAll(".topbar-nav-link").forEach(link => {
      const href = link.getAttribute("href")?.toLowerCase();
      link.classList.toggle("active", href === hash || (hash.startsWith("#/chitragupta") && href === "#/chitragupta/review"));
    });

    if (hash === "#/home" || hash === "#/" || hash === "") {
      // AICTE Portal Home View
      if (portalHomeView) portalHomeView.style.display = "block";
      document.title = "AICTE Partner Portal - Home";
    } else if (hash.startsWith("#/portal/")) {
      // AICTE Portal Subpages (Clone)
      const pageId = hash.replace("#/portal/", "");
      if (portalSubpageView) {
        portalSubpageView.style.display = "block";
        if (window.PortalController) {
          window.PortalController.renderSubpage(pageId);
        }
      }
      document.title = `AICTE Partner Portal - ${pageId.replace("-", " ").toUpperCase()}`;
    } else if (hash.startsWith("#/chitragupta")) {
      // Chitragupta Module View
      if (chitraguptaView) {
        chitraguptaView.style.display = "flex";
      }

      const parts = hash.split("/");
      const section = parts[2] || "review";

      // Enforce admin visibility check
      if (section === "admin" && this.currentRole !== "System administrator") {
        this.showToast("Admin / SLM Control is restricted to System Administrators.", "warning");
        window.location.hash = "#/chitragupta/review";
        return;
      }

      if (window.ChitraguptaController) {
        window.ChitraguptaController.showSection(section);
      }
      document.title = `Chitragupta (AICTE-Verify) - ${section.toUpperCase()}`;
    } else {
      // Fallback
      if (portalHomeView) portalHomeView.style.display = "block";
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  },

  // Setup Role Switcher Dropdown
  setupRoleSwitcher() {
    const avatarBtn = document.getElementById("portal-avatar-btn");
    const menu = document.getElementById("role-dropdown-menu");
    const currentNameEl = document.getElementById("current-role-name");
    const currentRoleBadge = document.getElementById("current-role-badge");

    if (avatarBtn && menu) {
      avatarBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        menu.classList.toggle("show");
      });

      document.addEventListener("click", () => {
        menu.classList.remove("show");
      });
    }

    // Populate role items
    if (menu) {
      const itemsContainer = document.getElementById("role-dropdown-items");
      if (itemsContainer) {
        itemsContainer.innerHTML = this.rolesList.map(r => `
          <div class="role-dropdown-item ${r.name === this.currentRole ? 'active' : ''}" onclick="window.App.switchRole('${r.name}')">
            <span>${r.name}</span>
            <span class="role-badge">${r.badge}</span>
          </div>
        `).join("");
      }
    }

    this.updateRoleUi();
  },

  switchRole(newRole) {
    this.currentRole = newRole;
    this.updateRoleUi();

    const menu = document.getElementById("role-dropdown-menu");
    if (menu) menu.classList.remove("show");

    // Re-render role options active class
    const items = document.querySelectorAll(".role-dropdown-item");
    items.forEach(el => {
      const text = el.querySelector("span")?.textContent;
      el.classList.toggle("active", text === newRole);
    });

    // Notify user
    this.showToast(`Switched role to: ${newRole}`, "info");

    // Apply role safeguards & visibility across views
    this.applyRoleSafeguards();

    // Log role switch to audit trail
    if (window.AuditService) {
      window.AuditService.append(
        newRole,
        newRole.toUpperCase().replace(/\s+/g, "_"),
        "ROLE_SESSION_SWITCHED",
        "SESSION:CURRENT",
        `User switched operational viewpoint to ${newRole}`
      );
    }
  },

  updateRoleUi() {
    const currentNameEl = document.getElementById("current-role-name");
    const avatarRoleLabel = document.getElementById("avatar-role-label");
    if (currentNameEl) currentNameEl.textContent = this.currentRole;
    if (avatarRoleLabel) avatarRoleLabel.textContent = this.currentRole;

    const roleObj = this.rolesList.find(r => r.name === this.currentRole);
    const badgeEl = document.getElementById("current-role-badge");
    if (badgeEl && roleObj) badgeEl.textContent = roleObj.badge;
  },

  // Enforce role-based UI rules
  applyRoleSafeguards() {
    const isSysAdmin = this.currentRole === "System administrator";
    const isInstitution = this.currentRole === "Institution user";
    const isAuditor = this.currentRole === "Auditor (read-only)";

    // Admin Sidebar Nav Item
    const adminNavItem = document.getElementById("nav-item-admin");
    if (adminNavItem) {
      adminNavItem.style.display = isSysAdmin ? "block" : "none";
    }

    // Refresh active results tab if results are currently visible
    if (window.ChitraguptaController && window.ChitraguptaController.isReviewCompleted) {
      window.ChitraguptaController.renderResults();
    }
  },

  setupTopbarNavigation() {
    // Chevron scroll buttons
    const btnUp = document.getElementById("tile-chevron-up");
    const btnDown = document.getElementById("tile-chevron-down");

    if (btnUp && window.PortalController) {
      btnUp.addEventListener("click", () => window.PortalController.scrollTiles("up"));
    }
    if (btnDown && window.PortalController) {
      btnDown.addEventListener("click", () => window.PortalController.scrollTiles("down"));
    }
  },

  // Toast Notification System
  showToast(message, type = "info") {
    let container = document.getElementById("toast-notifications-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-notifications-container";
      container.style.position = "fixed";
      container.style.bottom = "24px";
      container.style.left = "24px";
      container.style.display = "flex";
      container.style.flexDirection = "column";
      container.style.gap = "8px";
      container.style.zIndex = "9999";
      container.style.pointerEvents = "none";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `cg-toast-item ${type}`;
    toast.style.pointerEvents = "auto";
    toast.style.padding = "10px 16px";
    toast.style.borderRadius = "8px";
    toast.style.fontSize = "12.5px";
    toast.style.fontWeight = "600";
    toast.style.boxShadow = "0 8px 24px rgba(0,0,0,0.25)";
    toast.style.display = "flex";
    toast.style.alignItems = "center";
    toast.style.gap = "10px";
    toast.style.transition = "all 0.3s ease";
    toast.style.maxWidth = "420px";
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";

    let bg = "#1e293b";
    let color = "#ffffff";
    let icon = "fa-info-circle";

    if (type === "success") {
      bg = "#065f46";
      icon = "fa-check-circle";
    } else if (type === "warning") {
      bg = "#92400e";
      icon = "fa-exclamation-triangle";
    } else if (type === "error") {
      bg = "#991b1b";
      icon = "fa-times-circle";
    }

    toast.style.background = bg;
    toast.style.color = color;
    toast.innerHTML = `<i class="fas ${icon}"></i> <span>${message}</span>`;

    container.appendChild(toast);

    // Fade In
    requestAnimationFrame(() => {
      toast.style.opacity = "1";
      toast.style.transform = "translateY(0)";
    });

    // Auto Remove
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(-10px)";
      setTimeout(() => {
        if (toast.parentElement) toast.parentElement.removeChild(toast);
      }, 300);
    }, 4200);
  }
};

// Global DOM Ready Bootstrapper
document.addEventListener("DOMContentLoaded", () => {
  window.App.init();
});
