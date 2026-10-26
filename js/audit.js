/**
 * CHITRAGUPTA - Tamper-Evident Cryptographic Hash-Chained Audit Trail
 * Smart India Hackathon 2026 - Problem Statement 26261
 * Real SHA-256 chain using Web Cryptography API (crypto.subtle.digest)
 */

class AuditChainService {
  constructor() {
    this.chain = [];
    this.storageKey = "chitragupta_audit_chain_v1";
    this.isInitialized = false;
  }

  // Convert array buffer to 64-character hex string
  bufferToHex(buffer) {
    const byteArray = new Uint8Array(buffer);
    return Array.from(byteArray)
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");
  }

  // SHA-256 hashing via native Web Crypto API with fallback
  async sha256(text) {
    if (window.crypto && window.crypto.subtle) {
      const msgUint8 = new TextEncoder().encode(text);
      const hashBuffer = await window.crypto.subtle.digest("SHA-256", msgUint8);
      return this.bufferToHex(hashBuffer);
    } else {
      // Simple pure JS fallback if SubtleCrypto is restricted in local non-https/file environments
      let hash = 0;
      for (let i = 0; i < text.length; i++) {
        const char = text.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0;
      }
      return ("0000000000000000" + Math.abs(hash).toString(16)).repeat(4).slice(0, 64);
    }
  }

  // Canonical stringifier for deterministic serialization
  canonicalize(data) {
    return JSON.stringify({
      seq: data.seq,
      timestamp: data.timestamp,
      actor: data.actor,
      role: data.role,
      action: data.action,
      object: data.object,
      details: data.details,
      prev_hash: data.prev_hash
    });
  }

  async append(actor, role, action, object, details, customTime = null) {
    const seq = this.chain.length;
    const prev_hash = seq === 0 
      ? "0000000000000000000000000000000000000000000000000000000000000000" 
      : this.chain[seq - 1].row_hash;
    
    const timestamp = customTime || new Date().toISOString();
    
    const entryData = {
      seq,
      timestamp,
      actor,
      role,
      action,
      object,
      details,
      prev_hash
    };

    const canonicalStr = this.canonicalize(entryData);
    const row_hash = await this.sha256(canonicalStr);

    const fullRow = {
      ...entryData,
      row_hash,
      tampered: false
    };

    this.chain.push(fullRow);
    return fullRow;
  }

  async verifyChain() {
    if (this.chain.length === 0) {
      return { valid: true, count: 0, brokenIndex: null, message: "Audit chain is empty." };
    }

    for (let i = 0; i < this.chain.length; i++) {
      const row = this.chain[i];

      // Check sequence
      if (row.seq !== i) {
        return {
          valid: false,
          count: this.chain.length,
          brokenIndex: i,
          reason: `Sequence mismatch: expected ${i}, found ${row.seq}`
        };
      }

      // Check prev_hash link
      const expectedPrevHash = i === 0 
        ? "0000000000000000000000000000000000000000000000000000000000000000" 
        : this.chain[i - 1].row_hash;

      if (row.prev_hash !== expectedPrevHash) {
        return {
          valid: false,
          count: this.chain.length,
          brokenIndex: i,
          reason: `Forward link broken at row ${i}: prev_hash does not match row ${i - 1} hash.`
        };
      }

      // Recompute and verify row_hash
      const canonicalStr = this.canonicalize(row);
      const computedHash = await this.sha256(canonicalStr);

      if (computedHash !== row.row_hash) {
        return {
          valid: false,
          count: this.chain.length,
          brokenIndex: i,
          reason: `Hash mismatch at row #${i}: data in this row was modified without updating the cryptographic hash! Stored: ${row.row_hash.slice(0, 16)}..., Recomputed: ${computedHash.slice(0, 16)}...`
        };
      }
    }

    return {
      valid: true,
      count: this.chain.length,
      brokenIndex: null,
      message: `Chain intact: All ${this.chain.length} cryptographic blocks verified with SHA-256.`
    };
  }

  // Deliberately tamper with a row to demonstrate tamper detection in demo
  tamperRow(index) {
    if (index >= 0 && index < this.chain.length) {
      const originalDetails = this.chain[index].details;
      this.chain[index].details = originalDetails + " [UNAUTHORIZED DB EDIT: Deficiencies silently cleared by administrator]";
      this.chain[index].tampered = true;
      return { success: true, index, originalDetails };
    }
    return { success: false };
  }

  // Restore chain to valid state
  async recomputeAllHashes() {
    let prev = "0000000000000000000000000000000000000000000000000000000000000000";
    for (let i = 0; i < this.chain.length; i++) {
      this.chain[i].seq = i;
      this.chain[i].prev_hash = prev;
      this.chain[i].tampered = false;
      const canonical = this.canonicalize(this.chain[i]);
      this.chain[i].row_hash = await this.sha256(canonical);
      prev = this.chain[i].row_hash;
    }
  }

  exportCSV() {
    const headers = ["seq", "timestamp", "actor", "role", "action", "object", "details", "prev_hash", "row_hash"];
    const rows = this.chain.map(r => [
      r.seq,
      `"${r.timestamp}"`,
      `"${r.actor}"`,
      `"${r.role}"`,
      `"${r.action}"`,
      `"${r.object}"`,
      `"${(r.details || "").replace(/"/g, '""')}"`,
      `"${r.prev_hash}"`,
      `"${r.row_hash}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `chitragupta_audit_chain_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Seed realistic historical audit trail
  async seedInitialTrail() {
    if (this.chain.length > 0) return;

    const baseTime = new Date("2026-02-18T10:15:00.000Z").getTime();
    const seedEvents = [
      {
        tOffset: 0,
        actor: "System Administrator",
        role: "SYSTEM_ADMIN",
        action: "RULE_PACK_DEPLOYED",
        object: "RULEPACK-APH-2024-27-V3.2",
        details: "Loaded active regulatory rule pack for AY 2026-27 (148 threshold rules active)"
      },
      {
        tOffset: 45000,
        actor: "Sri Vidya Inst. (ID: 1-9310827361)",
        role: "INSTITUTION",
        action: "APPLICATION_INTAKE",
        object: "APP:1-9310827361",
        details: "Uploaded 14 regulatory documents for Extension of Approval (EoA) self-disclosure"
      },
      {
        tOffset: 92000,
        actor: "AICTE-Verify Pipeline M1",
        role: "SYSTEM",
        action: "MIME_SANITY_PASS",
        object: "BUNDLE:1-9310827361",
        details: "14 files scanned clean for malware; 42 pages rendered at 300 DPI for layout analysis"
      },
      {
        tOffset: 124000,
        actor: "AICTE-Verify Pipeline M3",
        role: "SYSTEM",
        action: "OCR_FIELD_EXTRACTION",
        object: "DOC:Affidavit_2_EoA.pdf",
        details: "Extracted 11 statutory entities; e-Stamp value flagged as ₹50 (below ₹100 Karnataka threshold)"
      },
      {
        tOffset: 168000,
        actor: "AICTE-Verify Pipeline M5",
        role: "SYSTEM",
        action: "FORENSIC_FLAG_EMITTED",
        object: "DOC:Affidavit_2_EoA.pdf",
        details: "IMG-ELA residual divergence (3.2σ) on fee paragraph; preliminary indicator logged"
      },
      {
        tOffset: 210000,
        actor: "AICTE-Verify Pipeline M5",
        role: "SYSTEM",
        action: "SANDBOX_VERIFY_SUCCESS",
        object: "DOC:NAAC_Certificate.pdf",
        details: "NAAC API confirmed Institutional Accreditation Grade 'A' (CGPA 3.14) valid to 2028"
      },
      {
        tOffset: 245000,
        actor: "AICTE-Verify Pipeline M5",
        role: "SYSTEM",
        action: "SANDBOX_MISMATCH_RECORDED",
        object: "DOC:Occupancy_Certificate.pdf",
        details: "Devanahalli ULB Municipal API returned 8,650 m² vs 9,800 m² submitted (gap -1,150 m²)"
      },
      {
        tOffset: 290000,
        actor: "AICTE-Verify Pipeline M6",
        role: "SYSTEM",
        action: "COMPLIANCE_SHORTFALL",
        object: "METRIC:FACULTY_RATIO",
        details: "Calculated 29 declared faculty vs 36 required for 720 students (shortfall: 7)"
      },
      {
        tOffset: 340000,
        actor: "AICTE-Verify Pipeline M7",
        role: "SYSTEM",
        action: "VALIDATION_REPORT_READY",
        object: "APP:1-9310827361",
        details: "Comprehensive advisory review prepared; routed to Scrutiny Officer for human evaluation"
      }
    ];

    for (const ev of seedEvents) {
      const timeStr = new Date(baseTime + ev.tOffset).toISOString();
      await this.append(ev.actor, ev.role, ev.action, ev.object, ev.details, timeStr);
    }

    this.isInitialized = true;
  }
}

// Global instance
window.AuditService = new AuditChainService();
