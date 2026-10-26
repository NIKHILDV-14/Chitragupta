/**
 * CHITRAGUPTA (AICTE-Verify) - Synthetic Data & Knowledge Base
 * Smart India Hackathon 2026 - Problem Statement 26261
 * All data in this file is completely synthetic and generated for demonstration purposes.
 */

window.CHITRAGUPTA_DATA = {
  // Institutional Details (Sample College)
  institution: {
    id: "1-9310827361",
    permanentId: "1-43289012",
    name: "Sri Vidya Institute of Technology",
    state: "Karnataka",
    district: "Bengaluru Rural",
    region: "South-Western",
    address: "Survey No. 142/1, Devanahalli Main Road, Bengaluru Rural - 562110",
    establishmentYear: 1993,
    buildingAgeYears: 33, // > 30 years -> triggers conditional Structural Stability Certificate requirement
    trustName: "Sri Vidya Educational and Charitable Trust",
    academicYear: "2026-2027",
    category: "Extension of Approval (EoA) based on Self-Disclosure",
    detectedCategory: "EoA based on Self-Disclosure (Annexure-2)",
    programs: ["Engineering and Technology (UG & PG)", "Master in Computer Applications (MCA)"],
    intakeDeclared: 480,
    intakeApprovedLastYear: 420, // mismatch!
    processingFeeReceipt: "SBIN-2026-02-1849102",
    totalStudents: 720,
    facultyDeclared: 29,
    facultyRequired: 36, // 1:20 UG ratio
    computersDeclared: 60,
    computersRequired: 72, // 1:10 UG ratio
    bandwidthDeclaredMbps: 100,
    bandwidthRequiredMbps: 300,
    builtUpAreaDeclaredSqM: 8650,
    builtUpAreaRequiredSqM: 9800,
    landAreaAcres: 5.25,
    leaseExpiryDate: "2059-05-31", // > course duration -> pass
    submissionDate: "2026-02-18 11:24:00"
  },

  // 14 Sample College Files (synthetic simulation)
  // Structural Stability Certificate & Affiliating University NOC deliberately omitted
  sampleFiles: [
    {
      name: "Affidavit_2_EoA.pdf",
      size: "1,428 KB",
      rawBytes: 1462272,
      type: "application/pdf",
      detectedType: "Affidavit 2 (EoA Declaration)",
      confidence: 98,
      status: "Incomplete",
      category: "Legal & Statutory",
      flagged: true,
      notes: "e-Stamp value ₹50 detected on Page 2 (APH min ₹100); ELA compression anomaly on paragraph 4"
    },
    {
      name: "Pay_Receipt_TER_2026-27.pdf",
      size: "418 KB",
      rawBytes: 428032,
      type: "application/pdf",
      detectedType: "TER Processing Fee Payment Receipt",
      confidence: 99,
      status: "Discrepancy",
      category: "Finance",
      flagged: false,
      notes: "Amount ₹60,000 does not match expected tariff ₹1,20,000 for EoA with expansion"
    },
    {
      name: "Occupancy_Certificate.pdf",
      size: "2,145 KB",
      rawBytes: 2196480,
      type: "application/pdf",
      detectedType: "Building Occupancy / Completion Certificate",
      confidence: 96,
      status: "Mismatch",
      category: "Infrastructure",
      flagged: false,
      notes: "Area in municipal record (8,650 m²) differs from submitted plan (9,800 m²)"
    },
    {
      name: "Fire_Safety_Certificate.pdf",
      size: "892 KB",
      rawBytes: 913408,
      type: "application/pdf",
      detectedType: "Fire & Life Safety NOC",
      confidence: 97,
      status: "Expired",
      category: "Safety & Stat",
      flagged: false,
      notes: "Expired on 30-Nov-2025 (3 months prior to application submission)"
    },
    {
      name: "Satellite_Map_Main_Gate.png",
      size: "3,410 KB",
      rawBytes: 3491840,
      type: "image/png",
      detectedType: "Geotagged Site Plan & Satellite Imagery",
      confidence: 94,
      status: "Verified",
      category: "GIS & Location",
      flagged: false,
      notes: "Coordinates 13.1284° N, 77.5833° E match land revenue records within 12m precision"
    },
    {
      name: "Audited_Accounts_2024-25.pdf",
      size: "4,820 KB",
      rawBytes: 4935680,
      type: "application/pdf",
      detectedType: "Annual Audited Financial Statements & Balance Sheet",
      confidence: 98,
      status: "Discrepancy",
      category: "Finance",
      flagged: false,
      notes: "Trust title listed as 'Sri Vidya Technical Education Society' vs 'Trust' in Affidavit"
    },
    {
      name: "Land_Lease_Deed.pdf",
      size: "5,640 KB",
      rawBytes: 5775360,
      type: "application/pdf",
      detectedType: "Registered Land Title / Perpetual Lease Deed",
      confidence: 97,
      status: "Pending",
      category: "Land & Legal",
      flagged: false,
      notes: "50-year lease from 2009; Kaveri 2.0 registry verification query in-flight"
    },
    {
      name: "NAAC_Certificate.pdf",
      size: "1,210 KB",
      rawBytes: 1239040,
      type: "application/pdf",
      detectedType: "NAAC Institutional Accreditation Certificate",
      confidence: 99,
      status: "Verified",
      category: "Accreditation",
      flagged: false,
      notes: "Grade 'A' (CGPA 3.14) verified directly against NAAC Sandbox API"
    },
    {
      name: "NBA_Accreditation.pdf",
      size: "1,540 KB",
      rawBytes: 1576960,
      type: "application/pdf",
      detectedType: "NBA Program Accreditation Letter",
      confidence: 99,
      status: "Verified",
      category: "Accreditation",
      flagged: false,
      notes: "3 UG programs valid through 30-06-2027 confirmed via NBA live register"
    },
    {
      name: "Building_Plan_Architect.pdf",
      size: "8,190 KB",
      rawBytes: 8386560,
      type: "application/pdf",
      detectedType: "Sanctioned Master Building Plan & Area Schedule",
      confidence: 95,
      status: "Verified",
      category: "Infrastructure",
      flagged: false,
      notes: "Signed by Council of Architecture registered architect CA/2004/3149"
    },
    {
      name: "Faculty_List.xlsx",
      size: "640 KB",
      rawBytes: 655360,
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      detectedType: "Faculty Cadre Roster & Qualification Matrix",
      confidence: 93,
      status: "Shortfall",
      category: "Academics",
      flagged: false,
      notes: "29 active full-time faculty detected against 36 required (shortfall: 7)"
    },
    {
      name: "Classroom_Photo_01.jpg",
      size: "2,840 KB",
      rawBytes: 2908160,
      type: "image/jpeg",
      detectedType: "Instructional Area Geo-tagged Photo (Room C-104)",
      confidence: 92,
      status: "Advisory",
      category: "Infrastructure Photos",
      flagged: false,
      notes: "YOLO detection: 38 dual benches detected vs 60 declared; ramp not visible"
    },
    {
      name: "Lab_Photo_CS.jpg",
      size: "3,120 KB",
      rawBytes: 3194880,
      type: "image/jpeg",
      detectedType: "Laboratory Geo-tagged Photo (Computer Lab 2)",
      confidence: 94,
      status: "Verified",
      category: "Infrastructure Photos",
      flagged: false,
      notes: "32 workstations, structured cabling, UPS visible. Metadata integrity intact"
    },
    {
      name: "Trust_Resolution.pdf",
      size: "950 KB",
      rawBytes: 972800,
      type: "application/pdf",
      detectedType: "Governing Board Resolution for EoA 2026-27",
      confidence: 96,
      status: "Verified",
      category: "Governance",
      flagged: false,
      notes: "Resolution dated 2026-01-10 approving fee remittance and compliance submission"
    }
  ],

  // 12-Step AI Pipeline Definition with module badges
  pipelineSteps: [
    {
      id: 1,
      module: "M1",
      title: "Intake Sanitation & Quality Gate",
      detail: "Scanning 14 files for malware, MIME validation, page extraction, skew/blur & 300 DPI resolution checks",
      durationMs: 700
    },
    {
      id: 2,
      module: "M2",
      title: "Category Identification & Checklist Selection",
      detail: "Matching self-disclosure attributes with APH 2024-27 Annexure-2; binding 16 statutory document requirements",
      durationMs: 650
    },
    {
      id: 3,
      module: "M3",
      title: "OCR, Layout Analysis & Field Extraction",
      detail: "Multilingual PaddleOCR + LayoutLMv3 running on 42 pages; bounding box extraction with confidence calibration",
      durationMs: 1100
    },
    {
      id: 4,
      module: "M4",
      title: "AICTE Master Record Snapshot",
      detail: "Pulling immutable read-only snapshot from AICTE central repository (Intake 2025, past EoA, deficiency ledger)",
      durationMs: 600
    },
    {
      id: 5,
      module: "M4",
      title: "Rule-Pack Validation & Completeness Engine",
      detail: "Deterministic rules evaluation (APH Chapter II): presence, validity periods, mandatory stamp duty levels",
      durationMs: 800
    },
    {
      id: 6,
      module: "M4",
      title: "Cross-Document & Cross-Record Consistency",
      detail: "Graph entity resolution: correlating Trust Title, Survey Nos, Land Area and Student Capacity across 8 sources",
      durationMs: 950
    },
    {
      id: 7,
      module: "M5",
      title: "Document Forensics & Tampering Ensemble",
      detail: "ELA residual analysis, copy-move clone detection, font descriptor audit, perceptual seal pHash & PDF metadata diff",
      durationMs: 1200
    },
    {
      id: 8,
      module: "M5",
      title: "Issuing-Authority Verification (Sandbox)",
      detail: "Connecting to DigiLocker, NAAC API, NBA Register, ULB Municipal Registry, and State Revenue Kaveri 2.0",
      durationMs: 1000
    },
    {
      id: 9,
      module: "M6",
      title: "Regulatory Compliance Arithmetic",
      detail: "Exact formula computation: Built-up Area, Faculty 1:20 UG, Computers 1:10, Bandwidth norms, TER processing fee",
      durationMs: 750
    },
    {
      id: 10,
      module: "M6",
      title: "Computer Vision Infrastructure Audit",
      detail: "Ultralytics YOLOv8 object detection on classroom/lab photos (seat counts, ramp presence, duplicate stock check)",
      durationMs: 850
    },
    {
      id: 11,
      module: "M7",
      title: "Agentic RAG Explanation & Citation Verifier",
      detail: "Synthesizing plain-language advisory observations with exact handbook page citations; 2-pass citation checker",
      durationMs: 1100
    },
    {
      id: 12,
      module: "M7",
      title: "Report Synthesis & Hash-Chained Audit Commit",
      detail: "Generating cryptographic findings ledger, queuing real-time notifications, writing SHA-256 genesis audit block",
      durationMs: 600
    }
  ],

  // Checklist & Completeness Data (APH 2024-27, Annexure-2)
  checklist: [
    {
      id: "CHK-01",
      docName: "Affidavit 2 (EoA Declaration)",
      type: "Mandatory",
      ruleRef: "APH Ch. I, p. 14",
      status: "Incomplete",
      validity: "Submitted (Feb 2026)",
      evidenceFile: "Affidavit_2_EoA.pdf",
      notes: "e-Stamp denomination ₹50 detected on Page 2. Mandatory minimum stamp value under Karnataka Stamp Act is ₹100.",
      canRectify: true
    },
    {
      id: "CHK-02",
      docName: "Fire and Life Safety Certificate / NOC",
      type: "Mandatory",
      ruleRef: "APH Ch. II, Cl. 2.3.2, p. 25",
      status: "Expired",
      validity: "Expired on 30-Nov-2025",
      evidenceFile: "Fire_Safety_Certificate.pdf",
      notes: "Certificate expired 3 months prior to submission date. Valid renewal or provisional NOC required.",
      canRectify: true
    },
    {
      id: "CHK-03",
      docName: "Structural Stability Certificate",
      type: "Conditional",
      ruleRef: "APH Ch. II, Cl. 2.3.4, p. 26",
      status: "Missing",
      validity: "Not Provided",
      evidenceFile: "—",
      notes: "Mandatory for institution buildings older than thirty (30) years. Establishment year 1993 indicates age 33 years.",
      canRectify: true
    },
    {
      id: "CHK-04",
      docName: "NOC from Affiliating University",
      type: "Mandatory",
      ruleRef: "APH Ch. II, Cl. 2.1, p. 17",
      status: "Missing",
      validity: "Not Provided",
      evidenceFile: "—",
      notes: "Annual continuation of affiliation endorsement from Visvesvaraya Technological University (VTU) is missing.",
      canRectify: true
    },
    {
      id: "CHK-05",
      docName: "Building Occupancy / Completion Certificate",
      type: "Mandatory",
      ruleRef: "APH App. 4, Cl. 4.2, p. 104",
      status: "Present",
      validity: "Perpetual (Issued 2012)",
      evidenceFile: "Occupancy_Certificate.pdf",
      notes: "Document present. BUA mismatch detected against municipal API.",
      canRectify: false
    },
    {
      id: "CHK-06",
      docName: "TER Processing Fee Payment Receipt",
      type: "Mandatory",
      ruleRef: "APH Ch. II, Table 2.1, p. 19",
      status: "Present",
      validity: "Current AY 2026-27",
      evidenceFile: "Pay_Receipt_TER_2026-27.pdf",
      notes: "Present. Remitted amount ₹60,000 indicates ₹60,000 tariff deficit.",
      canRectify: true
    },
    {
      id: "CHK-07",
      docName: "Audited Financial Statements (Last FY)",
      type: "Mandatory",
      ruleRef: "APH Ch. II, Cl. 2.3.6, p. 27",
      status: "Present",
      validity: "FY 2024-2025",
      evidenceFile: "Audited_Accounts_2024-25.pdf",
      notes: "Present with UDIN verification from ICAI registered Chartered Accountant.",
      canRectify: false
    },
    {
      id: "CHK-08",
      docName: "Registered Land Title / Lease Deed",
      type: "Mandatory",
      ruleRef: "APH App. 4, Cl. 4.1, p. 102",
      status: "Present",
      validity: "Valid till 31-May-2059",
      evidenceFile: "Land_Lease_Deed.pdf",
      notes: "Present. 50-year lease with 33 years remaining (exceeds course tenure).",
      canRectify: false
    },
    {
      id: "CHK-09",
      docName: "NAAC Accreditation Certificate",
      type: "Optional / Incentive",
      ruleRef: "APH Ch. II, Cl. 2.4, p. 22",
      status: "Present",
      validity: "Valid till 14-Oct-2028",
      evidenceFile: "NAAC_Certificate.pdf",
      notes: "Present and verified. Grade 'A' (CGPA 3.14).",
      canRectify: false
    },
    {
      id: "CHK-10",
      docName: "NBA Accreditation Letters",
      type: "Optional / Incentive",
      ruleRef: "APH Ch. II, Cl. 2.4, p. 22",
      status: "Present",
      validity: "Valid till 30-Jun-2027",
      evidenceFile: "NBA_Accreditation.pdf",
      notes: "Present and verified. 3 accredited programs in Computer Science, ECE & Mechanical.",
      canRectify: false
    },
    {
      id: "CHK-11",
      docName: "Approved Master Building Plan",
      type: "Mandatory",
      ruleRef: "APH App. 4, Cl. 4.3, p. 105",
      status: "Present",
      validity: "Sanctioned Plan",
      evidenceFile: "Building_Plan_Architect.pdf",
      notes: "Present. Room schedule extracted for area compliance.",
      canRectify: false
    },
    {
      id: "CHK-12",
      docName: "Faculty Roster & Cadre Allocation",
      type: "Mandatory",
      ruleRef: "APH App. 7, p. 112",
      status: "Present",
      validity: "AY 2025-2026 (Live)",
      evidenceFile: "Faculty_List.xlsx",
      notes: "Present. Cadre deficit detected (shortfall 7 faculty).",
      canRectify: true
    }
  ],

  // Extracted Fields with confidence and page references
  extractedFields: [
    { field: "Permanent Institute ID", value: "1-43289012", confidence: 99.4, doc: "Affidavit 2, p.1", match: "Matches AICTE Record" },
    { field: "Current Application ID", value: "1-9310827361", confidence: 99.1, doc: "Affidavit 2, p.1", match: "Matches AICTE Record" },
    { field: "Trust Legal Name", value: "Sri Vidya Educational and Charitable Trust", confidence: 97.8, doc: "Affidavit 2, p.1", match: "Discrepancy with Audited Accounts" },
    { field: "e-Stamp Certificate No.", value: "IN-KA91028471928374U", confidence: 98.2, doc: "Affidavit 2, p.2", match: "SHCIL e-Stamp verified" },
    { field: "e-Stamp Purchase Value", value: "₹ 50.00", confidence: 96.5, doc: "Affidavit 2, p.2", match: "Deficit: Req ₹ 100.00" },
    { field: "Survey / Khasra Numbers", value: "Survey No. 142/1 & 142/2", confidence: 95.8, doc: "Land Lease, p.3", match: "Discrepancy with Occupancy Cert" },
    { field: "Total Land Extent", value: "5.25 Acres (21,246 m²)", confidence: 96.3, doc: "Land Lease, p.4", match: "Exceeds Rural Norm 5.0 Acres" },
    { field: "Fire NOC Registration", value: "CFO/BF/NOC/2022/491", confidence: 97.4, doc: "Fire Safety, p.1", match: "Expired 30-Nov-2025" },
    { field: "TER Remittance Amount", value: "₹ 60,000.00", confidence: 99.0, doc: "Payment Receipt, p.1", match: "Deficit: Expected ₹ 1,20,000" },
    { field: "Sanctioned Built-up Area", value: "8,650 m²", confidence: 94.6, doc: "Occupancy Cert, p.2", match: "Shortfall: Req 9,800 m²" },
    { field: "NAAC CGPA & Grade", value: "Grade 'A' (CGPA 3.14)", confidence: 99.8, doc: "NAAC Cert, p.1", match: "Verified via Sandbox" }
  ],

  // Cross-Document Consistency Table
  crossDocMismatches: [
    {
      id: "MIS-01",
      code: "XDOC-MISMATCH",
      entity: "Trust Legal Name",
      docA: "Affidavit 2 (Page 1): 'Sri Vidya Educational and Charitable Trust'",
      docB: "Audited Accounts 2024-25 (Page 1): 'Sri Vidya Technical Education Society'",
      recordId: "REC-FIN-2025-0812",
      fetchTimestamp: "2026-02-18 11:24:42",
      severity: "High",
      impact: "Entity ambiguity under Section 2(h) of AICTE Act. Clarification or registered deed of change required."
    },
    {
      id: "MIS-02",
      code: "XDOC-MISMATCH",
      entity: "Land Survey Numbers",
      docA: "Registered Lease Deed (Page 3): 'Survey Nos. 142/1 and 142/2'",
      docB: "Building Occupancy Certificate (Page 1): 'Survey No. 142/1 only'",
      recordId: "REC-LND-2018-9941",
      fetchTimestamp: "2026-02-18 11:24:45",
      severity: "Medium",
      impact: "Occupancy certificate does not clearly endorse structures built on portion 142/2."
    },
    {
      id: "MIS-03",
      code: "RECORD-MISMATCH",
      entity: "UG Approved Intake Capacity",
      docA: "Application Self-Disclosure: '480 Seats' (Declared for AY 2026-27)",
      docB: "AICTE Master Database Snapshot: '420 Seats' (Approved for AY 2025-26)",
      recordId: "AICTE-DB-SY25-KAR-042",
      fetchTimestamp: "2026-02-18 11:24:12",
      severity: "High",
      impact: "Unsanctioned 60-seat expansion without separate AICTE New Division approval order."
    },
    {
      id: "MIS-04",
      code: "DOC-EXPIRED",
      entity: "Fire & Life Safety Validity",
      docA: "Fire NOC: Valid until 30-Nov-2025",
      docB: "AICTE Scrutiny Date: 18-Feb-2026 (Expired 80 days elapsed)",
      recordId: "REC-FIR-KAR-2022-441",
      fetchTimestamp: "2026-02-18 11:24:50",
      severity: "Critical",
      impact: "Mandatory statutory safety clearance lapsed. Operational safety risk."
    },
    {
      id: "MIS-05",
      code: "FIELD-INADEQUATE",
      entity: "e-Stamp Paper Value",
      docA: "Submitted Affidavit 2: ₹ 50 e-Stamp (IN-KA91028471928374U)",
      docB: "Statutory Mandate: Minimum ₹ 100 non-judicial stamp paper (APH p. 14)",
      recordId: "SHCIL-VAL-2026-881",
      fetchTimestamp: "2026-02-18 11:24:40",
      severity: "Medium",
      impact: "Affidavit is under-stamped under Karnataka Stamp Act 1957. Rectification required."
    }
  ],

  // Document Forensics & Tampering Flags (Strictly labeled as "Preliminary indicator")
  forensicDocument: {
    title: "AFFIDAVIT 2 — EXTENSION OF APPROVAL DECLARATION",
    subtitle: "Executed on Non-Judicial e-Stamp Paper, Government of Karnataka",
    stampNo: "IN-KA91028471928374U",
    stampAmount: "₹ 50.00",
    date: "14th January 2026",
    notary: "R. K. Sharma, Advocate & Notary Public, Bengaluru Rural",
    deponent: "Dr. K. S. Rajasekharan, Chairman, Sri Vidya Educational Trust"
  },
  forensicFlags: [
    {
      id: "FLAG-01",
      code: "IMG-ELA",
      detector: "ELA Ensemble v2.4 (OpenCV + Error Level Residuals)",
      severity: "Medium",
      confidence: 88.4,
      box: { x: 38, y: 52, w: 26, h: 14 }, // % coordinates in viewer
      title: "Compression Disparity in Declared Fee & Seat Count",
      reason: "Localized high-frequency compression gradient anomaly detected in Clause 3 (Approved Seats: 480). Error-level residuals diverge 3.2σ from background scan baseline, indicating potential digital text insertion.",
      disclaimer: "Preliminary indicator — requires human verification. Not proof of forgery or misconduct."
    },
    {
      id: "FLAG-02",
      code: "SEAL-REUSED",
      detector: "PerceptualHash-SealMatch v1.9 (pHash + ORB Descriptor)",
      severity: "Medium",
      confidence: 84.1,
      box: { x: 68, y: 74, w: 22, h: 18 },
      title: "Notary Seal Template Duplication",
      reason: "Notarial seal pattern has 96.2% perceptual hash match with an affidavit submitted by a different institution (ID: 1-7291048821, AY 2024-25). Seal boundary displays hard-clipping mask artifacts.",
      disclaimer: "Preliminary indicator — requires human verification. Not proof of forgery or misconduct."
    },
    {
      id: "FLAG-03",
      code: "DATE-IRREGULAR",
      detector: "PDFMetadataParser v3.1 (pikepdf stream analyzer)",
      severity: "Low",
      confidence: 91.0,
      box: { x: 12, y: 82, w: 40, h: 10 },
      title: "PDF Creation Metadata Timestamp Divergence",
      reason: "Document metadata CreationDate (2026-01-20T18:32:11Z) post-dates the notarized physical execution date on document body (14-Jan-2026) by 6 days. Producer: 'PDFium / Modified'.",
      disclaimer: "Preliminary indicator — requires human verification. Not proof of forgery or misconduct."
    },
    {
      id: "FLAG-04",
      code: "TXT-FONTMIX",
      detector: "FontDescriptorAudit v1.2 (PyMuPDF font table extract)",
      severity: "Low",
      confidence: 79.5,
      box: { x: 12, y: 35, w: 76, h: 12 },
      title: "Embedded Font Stream Discontinuity",
      reason: "Primary body font 'TimesNewRomanPSMT' (Type 1 embedded) interrupted by unhinted 'Arial-BoldMT' subset in sub-clause 2(b) declaring Trust registration number.",
      disclaimer: "Preliminary indicator — requires human verification. Not proof of forgery or misconduct."
    }
  ],

  // Verification Board Records (Exactly one of the 6 states)
  verificationRecords: [
    {
      id: "VR-01",
      document: "NAAC Institutional Accreditation",
      authority: "National Assessment and Accreditation Council (NAAC)",
      channel: "REST API (Sandbox Connector)",
      status: "VERIFIED",
      statusClass: "status-verified",
      icon: "fa-check-circle",
      timestamp: "2026-02-18 11:24:32",
      submitted: "Grade 'A', CGPA 3.14 (Cycle 2, valid to 14-Oct-2028)",
      returned: "Grade 'A', CGPA 3.14 (Cycle 2, valid to 14-Oct-2028)",
      mismatch: false,
      action: "Direct confirmation received from NAAC central data warehouse.",
      draftLetter: null
    },
    {
      id: "VR-02",
      document: "NBA Program Accreditation",
      authority: "National Board of Accreditation (NBA)",
      channel: "Digital Signature & Registry API",
      status: "VERIFIED",
      statusClass: "status-verified",
      icon: "fa-check-circle",
      timestamp: "2026-02-18 11:24:34",
      submitted: "UG CSE, ECE & Mech accredited through 30-06-2027",
      returned: "UG CSE, ECE & Mech accredited through 30-06-2027",
      mismatch: false,
      action: "Cryptographic signature validated against National Accreditation Register.",
      draftLetter: null
    },
    {
      id: "VR-03",
      document: "Building Occupancy Certificate",
      authority: "Devanahalli Town Municipal Council (ULB)",
      channel: "Urban Local Body Sandbox API",
      status: "MISMATCH_DETECTED",
      statusClass: "status-mismatch",
      icon: "fa-exclamation-triangle",
      timestamp: "2026-02-18 11:24:38",
      submitted: "Sanctioned Built-up Area: 9,800 m²",
      returned: "Municipal Endorsed Area: 8,650 m² (Discrepancy: -1,150 m²)",
      mismatch: true,
      action: "Discrepancy flagged. Municipal sanction record reports 8,650 m² only.",
      draftLetter: null
    },
    {
      id: "VR-04",
      document: "Fire and Life Safety Certificate",
      authority: "Karnataka Fire and Emergency Services Dept",
      channel: "State Fire Licensing Registry API",
      status: "EXPIRED",
      statusClass: "status-expired",
      icon: "fa-clock",
      timestamp: "2026-02-18 11:24:41",
      submitted: "NOC No. CFO/BF/NOC/2022/491 (Valid to 30-Nov-2025)",
      returned: "NOC Status: LAPSED / NOT RENEWED (Expired 80 days ago)",
      mismatch: true,
      action: "Safety clearance expired before scrutiny. Institution must submit current renewal.",
      draftLetter: null
    },
    {
      id: "VR-05",
      document: "Registered Land Lease Deed",
      authority: "Kaveri 2.0 (Karnataka Land Revenue Registry)",
      channel: "State Land Registry API",
      status: "VERIFICATION_PENDING",
      statusClass: "status-pending",
      icon: "fa-spinner fa-spin",
      timestamp: "2026-02-18 11:24:45 (In-flight)",
      submitted: "Reg Deed No. BNG-DEV-2009-4819, Extent: 5.25 Acres",
      returned: "Awaiting response from Kaveri 2.0 gateway (SLA timeout in 03:42)",
      mismatch: false,
      action: "Queue position #3. Automated polling active. Officer can trigger manual re-verify.",
      draftLetter: null
    },
    {
      id: "VR-06",
      document: "State Directorate of Technical Education NOC",
      authority: "Directorate of Technical Education (DTE), Karnataka",
      channel: "State Department Portal (HTTP Connector)",
      status: "MANUAL_REVIEW_REQUIRED",
      statusClass: "status-manual",
      icon: "fa-user-clock",
      timestamp: "2026-02-18 11:24:52",
      submitted: "DTE NOC Reference DTE/EST/2026/KA-918",
      returned: "SOURCE_UNAVAILABLE (HTTP 503 Service Unavailable / Gateway Timeout)",
      mismatch: false,
      action: "Automatically routed from SOURCE_UNAVAILABLE to MANUAL_REVIEW_REQUIRED. Prefilled letter generated.",
      draftLetter: {
        to: "The Director, Directorate of Technical Education, Govt. of Karnataka, Palace Road, Bengaluru",
        subject: "Verification of State NOC for Extension of Approval (EoA) 2026-27 - Sri Vidya Institute of Technology (AICTE ID: 1-9310827361)",
        body: "Respected Sir/Madam,\n\nIn accordance with AICTE Approval Process Handbook 2024-27 (Chapter II, Clause 2.1), the institution Sri Vidya Institute of Technology (Permanent ID: 1-43289012, Application ID: 1-9310827361) has submitted Reference No. DTE/EST/2026/KA-918 dated 12-Jan-2026 as State Government NOC.\n\nDue to temporary digital gateway unavailability, automated confirmation could not be completed. We kindly request your office to confirm the authenticity and validity of the aforementioned endorsement within 7 working days to enable timely completion of the regulatory scrutiny.\n\nSincerely,\nScrutiny Officer, AICTE South-Western Regional Office"
      }
    }
  ],

  // Compliance Assistant Norms & Calculations
  compliance: {
    faculty: {
      title: "Faculty to Student Ratio (1:20 UG)",
      clause: "APH 2024-27, Appendix 7, p. 112",
      students: 720,
      normRatio: "1:20",
      requiredFaculty: 36,
      declaredFaculty: 29,
      shortfall: 7,
      status: "Deficit",
      cadre: {
        norm: "Professor : Associate Prof : Assistant Prof = 1 : 2 : 6",
        declared: "1 Professor : 4 Associate Prof : 24 Assistant Prof",
        analysis: "Cadre imbalance: Minimum 4 Professors required for 36 faculty; only 1 Professor declared (deficit of 3 Professors)."
      },
      recommendation: "Request additional evidence: Submit appointment letters and latest 3 months Form 16 / PF records for newly recruited faculty."
    },
    computers: {
      title: "Instructional Computer Ratio (1:10 UG, Minimum 20)",
      clause: "APH 2024-27, Appendix 5, p. 124",
      students: 720,
      normRatio: "1:10",
      requiredComputers: 72,
      declaredComputers: 60,
      shortfall: 12,
      status: "Deficit",
      recommendation: "Request rectification: Purchase invoice and installation log for additional 12 core workstations required prior to scrutiny completion."
    },
    bandwidth: {
      title: "Dedicated Internet Bandwidth",
      clause: "APH 2024-27, Appendix 5, Table 5.2, p. 126",
      intakeBracket: "301 to 600 Approved Intake",
      requiredMbps: 300,
      declaredMbps: 100,
      shortfall: 200,
      status: "Deficit",
      recommendation: "Request rectification: Upgrade lease line agreement and submit live ISP speed test certificate."
    },
    builtUpArea: {
      title: "Built-up Area Infrastructure Norm",
      clause: "APH 2024-27, Appendix 4, p. 138",
      requiredSqM: 9800,
      extractedSqM: 8650,
      gapSqM: 1150,
      status: "Shortfall",
      breakdown: [
        { space: "Instructional Area (Classrooms, Labs)", req: 4800, declared: 4350, diff: -450 },
        { space: "Administrative Area", req: 1200, declared: 1100, diff: -100 },
        { space: "Amenities & Support", req: 1000, declared: 850, diff: -150 },
        { space: "Circulation & Common Core", req: 2800, declared: 2350, diff: -450 }
      ],
      recommendation: "Recommend physical or online EVC inspection to verify actual instructional floor utilization."
    },
    terFee: {
      title: "TER Processing Fee Arithmetic",
      clause: "APH 2024-27, Chapter II, Table 2.1, p. 19",
      expectedFee: 120000,
      remittedFee: 60000,
      shortfall: 60000,
      reasonCode: "FEE-MISMATCH",
      status: "Deficit",
      notes: "Base EoA fee ₹60,000 paid; additional ₹60,000 tariff applicable for 60-seat expansion proposal.",
      recommendation: "Request rectification: Pay ₹60,000 tariff balance through AICTE payment gateway."
    },
    landLease: {
      title: "Land Title & Lease Longevity",
      clause: "APH 2024-27, Appendix 4, Clause 4.1, p. 102",
      leaseStart: "2009-06-01",
      leaseEnd: "2059-05-31",
      tenureTotalYears: 50,
      remainingYears: 33,
      longestCourseDurationYears: 4,
      status: "Compliant",
      recommendation: "Accept as declared: 33 years remaining lease period securely exceeds 4-year course cycle."
    },
    computerVision: {
      title: "Infrastructure Geo-Photo & Space Review (YOLOv8)",
      clause: "APH 2024-27, Appendix 4, Clause 4.6 (Barrier-Free Access), p. 108",
      classroomSample: {
        photo: "Classroom_Photo_01.jpg",
        declaredCapacity: 60,
        detectedBenches: 38,
        estimatedSeats: 38,
        discrepancy: "Detected 38 student workstations vs 60 declared capacity",
        barrierFree: "Ramp / tactile paving NOT detected at classroom threshold",
        stockPhotoCheck: "0% duplicate across AICTE nationwide photo database",
        geotagVerification: "Lat 13.1284° N, Long 77.5833° E (Matches campus perimeter)"
      },
      recommendation: "Request additional evidence: Submit 360-degree video walkthrough of Block C classrooms and ground-floor accessibility ramp."
    }
  },

  // Handbook Q&A Knowledge Base (12 canned queries with clause & page citations)
  handbookQA: [
    {
      q: "What is the eligibility criteria for a 3-year extension of approval (EoA)?",
      keywords: ["3-year", "eoa", "eligibility", "3 year approval", "three years"],
      citation: "APH 2024-27, Chapter II, Clause 2.4, p. 22",
      answer: "Institutions qualify for a 3-Year Extension of Approval (EoA) provided they fulfill the following conditions: (1) Valid NAAC accreditation with CGPA ≥ 3.01 on a 4-point scale OR at least 50% of eligible courses accredited by NBA for a minimum of 3 years; (2) Zero major deficiencies recorded in the past two academic years; (3) Clean regulatory track record with no punitive action under Chapter VIII; and (4) Timely submission of mandatory online self-disclosures."
    },
    {
      q: "What is the required processing (TER) fee for EoA and expansion?",
      keywords: ["ter", "fee", "processing fee", "tariff", "cost", "eoa fee"],
      citation: "APH 2024-27, Chapter II, Clause 2.15, Table 2.1, p. 19",
      answer: "Under Table 2.1 of APH 2024-27, the standard Technical Education Regulatory (TER) fee for regular Extension of Approval is ₹60,000 for private self-financing institutions. If the application concurrently seeks an increase in intake or introduction of a new division, an additional processing fee of ₹60,000 per division applies, bringing the expected total remittance to ₹1,20,000."
    },
    {
      q: "Can an institution edit documents after final submission? Is reopening allowed?",
      keywords: ["reopening", "edit", "locked", "resubmit", "modify", "submission"],
      citation: "APH 2024-27, Chapter I, Clause 1.8, p. 14",
      answer: "Upon clicking 'Final Submit' on the AICTE Partner Portal, all fields and uploaded documents are permanently locked. However, as per Clause 1.8, a one-time reopening is permitted prior to the declared cutoff date upon payment of the designated reopening administrative charge, or when specifically unlocked by the Scrutiny Committee for deficiency rectification."
    },
    {
      q: "What is the mandatory faculty-to-student ratio for UG Engineering?",
      keywords: ["faculty", "ratio", "teacher", "cadre", "ug engineering", "student ratio"],
      citation: "APH 2024-27, Appendix 7, Norms for Faculty Requirements, p. 112",
      answer: "For Under-Graduate (UG) Engineering and Technology programs, the mandatory Faculty-to-Student Ratio is 1:20 based on sanctioned student intake. Furthermore, institutions must maintain the prescribed cadre ratio of Professor : Associate Professor : Assistant Professor = 1 : 2 : 6, with minimum one Professor in each accredited engineering department."
    },
    {
      q: "What are the computer and software norms for technical institutions?",
      keywords: ["computer", "computers", "software", "terminal", "pc", "it norms"],
      citation: "APH 2024-27, Appendix 5, Norms for Computers & Software, p. 124",
      answer: "For UG Engineering, the computer-to-student ratio is 1:10 of sanctioned intake, with an absolute minimum of 20 terminals for newly established departments. Minimum 80% must be dual-core or higher architecture connected through gigabit LAN, with legal licenses for system software (min 3) and application software suites (min 20)."
    },
    {
      q: "What are the norms for land and registered lease duration?",
      keywords: ["land", "lease", "deed", "acres", "duration", "tenure"],
      citation: "APH 2024-27, Appendix 4, Clause 4.1, p. 102",
      answer: "The minimum land requirement for Mega/Metro cities is 1.5 to 2.5 Acres, Urban areas 2.5 Acres, and Rural areas 5.0 Acres (contiguous). In case of leasehold land, the registered lease deed must be executed for a minimum duration of 30 years from the date of initial approval, and remaining lease duration must strictly exceed the tenure of all ongoing programs."
    },
    {
      q: "What happens if a fire safety certificate is found expired during scrutiny?",
      keywords: ["fire", "fire safety", "expired", "noc", "validity"],
      citation: "APH 2024-27, Chapter II, Clause 2.3.2, p. 25",
      answer: "A valid Fire & Life Safety Certificate from the competent State Fire Services Authority is a non-negotiable statutory requirement. If expired, the application is marked 'Deficient'; approval cannot be granted until an official certificate of renewal or provisional valid endorsement is uploaded within the stipulated rectification window."
    },
    {
      q: "What are the penal actions for submitting fraudulent or tampered documents?",
      keywords: ["penal", "penalty", "fraud", "tampered", "forged", "misconduct", "punishment"],
      citation: "APH 2024-27, Chapter VIII, Clause 8.2, p. 146",
      answer: "Where an institution is found by competent human authorities to have submitted intentionally tampered, fabricated or misrepresented certificates, AICTE initiates action under Chapter VIII: (1) Withdrawal of approval or reduction in intake; (2) Forfeiture of security deposit; (3) Debarment of trust trustees from establishing new technical campuses; and (4) Lodging of First Information Report (FIR) under applicable statutory laws."
    },
    {
      q: "How are anonymous complaints dealt with regarding an institution's approval?",
      keywords: ["anonymous", "complaint", "whistleblower", "grievance"],
      citation: "APH 2024-27, Chapter VIII, Clause 8.5, p. 149",
      answer: "Under AICTE regulations, anonymous or pseudonymous complaints without verifiable complainant identity, postal address, and supporting documentary evidence are not entertained. Verified complaints are forwarded to the Standing Grievance Committee for show-cause proceedings, followed by physical inspection if prima facie merit exists."
    },
    {
      q: "What is the requirement for barrier-free environment and disabled access?",
      keywords: ["barrier-free", "disabled", "divyangjan", "ramp", "lift", "wheelchair"],
      citation: "APH 2024-27, Appendix 4, Clause 4.6, p. 108",
      answer: "All institutional buildings must ensure Divyangjan-friendly barrier-free access in compliance with the Rights of Persons with Disabilities Act 2016: ramps with handrails (slope 1:12), tactile paths to main administrative zones, lifts with braille call-buttons in multi-story structures, and at least one dedicated unisex disabled-friendly washroom per block."
    },
    {
      q: "What is the minimum bandwidth requirement for an intake of 500 students?",
      keywords: ["bandwidth", "internet", "mbps", "lease line", "isp"],
      citation: "APH 2024-27, Appendix 5, Table 5.2, p. 126",
      answer: "For an approved student intake between 301 and 600 students, the institution must maintain a dedicated unshared Internet Leased Line (1:1 contention) of minimum 300 Mbps bandwidth from a DOT licensed Internet Service Provider, with active Wi-Fi coverage across all instructional and hostel zones."
    },
    {
      q: "When is a Structural Stability Certificate mandatory for existing buildings?",
      keywords: ["structural", "stability", "building age", "30 years", "engineer"],
      citation: "APH 2024-27, Chapter II, Clause 2.3.4, p. 26",
      answer: "A Structural Stability Certificate issued by an empanelled government structural engineer or registered civil engineering professor is mandatory whenever the building structure exceeds thirty (30) years of age from the date of original occupancy, or following any seismic disturbance or major retrofitting."
    }
  ],

  // 12 Realistic Applications in Dashboard Queue
  queueApplications: [
    {
      id: "1-9310827361",
      institution: "Sri Vidya Institute of Technology",
      state: "Karnataka",
      category: "EoA Self-Disclosure",
      academicYear: "2026-2027",
      status: "Deficiencies",
      statusClass: "badge-amber",
      findingsCount: 5,
      processedTime: "2m 14s",
      lastUpdated: "2 mins ago"
    },
    {
      id: "1-8420194822",
      institution: "Modern College of Engineering",
      state: "Maharashtra",
      category: "New Technical Campus",
      academicYear: "2026-2027",
      status: "Verification Pending",
      statusClass: "badge-blue",
      findingsCount: 2,
      processedTime: "3m 05s",
      lastUpdated: "14 mins ago"
    },
    {
      id: "1-7391024881",
      institution: "Apex Polytechnic Institute",
      state: "Tamil Nadu",
      category: "EoA Self-Disclosure",
      academicYear: "2026-2027",
      status: "Compliant",
      statusClass: "badge-green",
      findingsCount: 0,
      processedTime: "1m 48s",
      lastUpdated: "35 mins ago"
    },
    {
      id: "1-9120481723",
      institution: "Saraswati Institute of Pharmacy",
      state: "Uttar Pradesh",
      category: "Course Addition",
      academicYear: "2026-2027",
      status: "Anomaly Flagged",
      statusClass: "badge-red",
      findingsCount: 4,
      processedTime: "2m 42s",
      lastUpdated: "1 hour ago"
    },
    {
      id: "1-6281093845",
      institution: "Royal Institute of Management",
      state: "Delhi NCR",
      category: "EoA Self-Disclosure",
      academicYear: "2026-2027",
      status: "Manual Review",
      statusClass: "badge-purple",
      findingsCount: 3,
      processedTime: "2m 18s",
      lastUpdated: "2 hours ago"
    },
    {
      id: "1-7891049281",
      institution: "St. Xavier's Technical Campus",
      state: "Kerala",
      category: "Increase in Intake",
      academicYear: "2026-2027",
      status: "Inspection Rec.",
      statusClass: "badge-orange",
      findingsCount: 6,
      processedTime: "3m 40s",
      lastUpdated: "3 hours ago"
    },
    {
      id: "1-8930129481",
      institution: "Netaji Subhas Institute of Tech",
      state: "West Bengal",
      category: "EoA Self-Disclosure",
      academicYear: "2026-2027",
      status: "Compliant",
      statusClass: "badge-green",
      findingsCount: 0,
      processedTime: "1m 52s",
      lastUpdated: "4 hours ago"
    },
    {
      id: "1-6471029381",
      institution: "Rajiv Gandhi College of Engg",
      state: "Andhra Pradesh",
      category: "Change of Site",
      academicYear: "2026-2027",
      status: "Deficiencies",
      statusClass: "badge-amber",
      findingsCount: 4,
      processedTime: "3m 12s",
      lastUpdated: "5 hours ago"
    },
    {
      id: "1-9012481724",
      institution: "National Inst of Design & Tech",
      state: "Gujarat",
      category: "EoA Self-Disclosure",
      academicYear: "2026-2027",
      status: "Verification Pending",
      statusClass: "badge-blue",
      findingsCount: 1,
      processedTime: "2m 02s",
      lastUpdated: "6 hours ago"
    },
    {
      id: "1-7182940192",
      institution: "City Institute of Architecture",
      state: "Telangana",
      category: "Closure of Program",
      academicYear: "2026-2027",
      status: "Compliant",
      statusClass: "badge-green",
      findingsCount: 0,
      processedTime: "1m 30s",
      lastUpdated: "8 hours ago"
    },
    {
      id: "1-8192049182",
      institution: "Heritage College of Engineering",
      state: "Rajasthan",
      category: "EoA Self-Disclosure",
      academicYear: "2026-2027",
      status: "Manual Review",
      statusClass: "badge-purple",
      findingsCount: 3,
      processedTime: "2m 55s",
      lastUpdated: "10 hours ago"
    },
    {
      id: "1-9481029384",
      institution: "Malwa Institute of Science",
      state: "Punjab",
      category: "Increase in Intake",
      academicYear: "2026-2027",
      status: "Anomaly Flagged",
      statusClass: "badge-red",
      findingsCount: 5,
      processedTime: "3m 22s",
      lastUpdated: "12 hours ago"
    }
  ],

  // Rule Pack Schema for Rule Administrator
  rulePack: {
    id: "RULEPACK-APH-2024-27-V3.2",
    title: "AICTE Approval Process Handbook (2024-2027) Master Rule Pack",
    version: "3.2.0-PROD",
    effectiveDate: "2024-04-01",
    expiryDate: "2027-03-31",
    author: "AICTE Regulatory Reform Committee (Policy Bureau)",
    rulesCount: 148,
    activeRulesYaml: `# AICTE Rule Pack v3.2.0 (YAML Schema)
version: "3.2.0"
handbook: "APH 2024-27"
effective_from: "2024-04-01"

thresholds:
  faculty_ug_ratio: 20.0
  faculty_cadre_ratio: [1, 2, 6]
  computer_ug_ratio: 10.0
  computer_min_floor: 20
  building_stability_age_threshold_years: 30
  minimum_affidavit_stamp_duty_inr: 100.00
  ter_fee_base_eoa_inr: 60000.00
  ter_fee_per_increase_division_inr: 60000.00

channels_trust_hierarchy:
  - id: 1
    type: "API_SANDBOX_DIRECT"
    trust_weight: 1.00
  - id: 2
    type: "DIGITAL_SIGNATURE_PKI"
    trust_weight: 0.95
  - id: 3
    type: "PORTAL_QR_HASH"
    trust_weight: 0.85
  - id: 4
    type: "REFERENCE_SERIAL_LOOKUP"
    trust_weight: 0.70
  - id: 5
    type: "MANUAL_OFFICER_CORRESPONDENCE"
    trust_weight: 0.60
`
  },

  // Traceability Matrix (PS 26261 Requirements to Module and Screen)
  traceabilityMatrix: [
    {
      id: "REQ-01",
      objective: "O1: Automated Application Intake & Sanitation",
      psRequirement: "Parse multi-document PDF/image bundles, sanitize formats, split pages, and flag degraded scans.",
      module: "M1: Intake & Quality Gate",
      screen: "#/chitragupta/review",
      screenTitle: "Upload & AI Review Pipeline",
      testStatus: "PASS (Step 1)"
    },
    {
      id: "REQ-02",
      objective: "O2: Dynamic Category Checklist Generation",
      psRequirement: "Identify application type (EoA, New Institute, Intake Increase) and apply corresponding mandatory document checklists.",
      module: "M2: Category Classifier",
      screen: "#/chitragupta/review",
      screenTitle: "Results: Checklist & Completeness Tab",
      testStatus: "PASS (Tab 1)"
    },
    {
      id: "REQ-03",
      objective: "O3: Multi-Document Information Extraction & OCR",
      psRequirement: "Extract legal, land, faculty, and financial fields with confidence scores; flag empty or low-confidence extractions.",
      module: "M3: OCR & Layout Parser",
      screen: "#/chitragupta/review",
      screenTitle: "Results: Extracted Data & Consistency Tab",
      testStatus: "PASS (Tab 2)"
    },
    {
      id: "REQ-04",
      objective: "O4: Cross-Document Consistency & Entity Resolution",
      psRequirement: "Correlate Trust name, land survey numbers, built-up area and intake across separate deeds and central records.",
      module: "M4: Cross-Doc Validator",
      screen: "#/chitragupta/review",
      screenTitle: "Results: Extracted Data & Consistency Tab",
      testStatus: "PASS (Tab 2)"
    },
    {
      id: "REQ-05",
      objective: "O5: Document Forensics & Tampering Indicators",
      psRequirement: "Screen for digital manipulations (ELA, copy-move, font inconsistency, seal reuse, metadata discrepancy) as preliminary indicators.",
      module: "M5: Forensic Ensemble",
      screen: "#/chitragupta/review",
      screenTitle: "Results: Anomaly & Forgery Indicators Tab",
      testStatus: "PASS (Tab 3)"
    },
    {
      id: "REQ-06",
      objective: "O6: Issuing Authority Verification Board",
      psRequirement: "Six distinct document states (VERIFIED, MISMATCH, EXPIRED, PENDING, UNAVAILABLE, MANUAL REVIEW) with SLA countdowns and prefilled letters.",
      module: "M5: Verification Adapter",
      screen: "#/chitragupta/verification",
      screenTitle: "Verification Board",
      testStatus: "PASS (Tab 4)"
    },
    {
      id: "REQ-07",
      objective: "O7: Compliance Arithmetic & Infrastructure CV",
      psRequirement: "Deterministic calculation of faculty ratio, computer ratio, bandwidth, built-up area and computer vision inspection of classroom photos.",
      module: "M6: Compliance Engine",
      screen: "#/chitragupta/compliance",
      screenTitle: "Compliance Assistant",
      testStatus: "PASS (Tab 5)"
    },
    {
      id: "REQ-08",
      objective: "O8: Evidence Graph & Agentic Explanations",
      psRequirement: "Construct interactive evidence graphs linking findings to handbook clauses; dual-pass citation verification.",
      module: "M7: LangGraph Explainer",
      screen: "#/chitragupta/review",
      screenTitle: "Results: Evidence Graph Tab",
      testStatus: "PASS (Tab 6)"
    },
    {
      id: "REQ-09",
      objective: "O9: Human-in-the-Loop Officer Gate",
      psRequirement: "Strict officer actions (Confirm, Dismiss, Clarification, Rectification, Inspection); padlock-protected adverse decision state.",
      module: "M7: Human Workflow Gate",
      screen: "#/chitragupta/review",
      screenTitle: "Results: Officer Actions Tab",
      testStatus: "PASS (Tab 7)"
    },
    {
      id: "REQ-10",
      objective: "O10: Cryptographic Hash-Chained Audit Trail",
      psRequirement: "SHA-256 forward-linked immutable audit ledger; real-time chain verification and tamper-detection simulation.",
      module: "Core Security Subsystem",
      screen: "#/chitragupta/audit",
      screenTitle: "Audit Trail",
      testStatus: "PASS (Real SHA-256)"
    }
  ]
};
