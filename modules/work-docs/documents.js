// Representative documents for the "client work you can see" module.
// Every value, party and project here is fictional. No client, project or Nation is named.
// Each document is drawn on a fixed 640 x 495 design canvas (US Letter, landscape) and
// scaled to fit by work-docs.js. Portrait documents are shown as two fanned pages.

const NEOS = '<span class="wd-brand">Neos Advisors</span>';
const hd = (left, right) => `<div class="wd-hd"><span>${left}</span><span>${right}</span></div>`;
const foot = (left, right) => `<div class="wd-foot"><span>${left}</span><span>${right}</span></div>`;
const ok = '<i class="wd-st wd-st-met" aria-hidden="true"></i>';
const part = '<i class="wd-st wd-st-part" aria-hidden="true"></i>';
const miss = '<i class="wd-st wd-st-miss" aria-hidden="true"></i>';
const box = '<i class="wd-box" aria-hidden="true"></i>';
const leader = (label, page, cls = '') => `<div class="wd-toc ${cls}"><span>${label}</span><i></i><span>${page}</span></div>`;

/* 01 Estimating: preliminary estimate workbook */
const estimating = `
<div class="wd-under"></div>
<div class="wd-page wd-land ff-s">
  ${hd(NEOS, 'EST-WP3 &nbsp;·&nbsp; Rev C &nbsp;·&nbsp; 2026-03-14')}
  <div class="wd-kicker">Preliminary estimate workbook</div>
  <div class="wd-title">Clearing and Access, Work Package 3</div>
  <div class="wd-meta wd-meta-4">
    <div><b>Client</b>Contractor A</div><div><b>Estimate class</b>Class 4</div>
    <div><b>Basis date</b>2026-03-14</div><div><b>Currency</b>CAD, excl. GST</div>
  </div>
  <div class="wd-tablecap"><span><b>Sheet 3</b> &nbsp;Direct cost detail</span><span>Quantities per alignment sheets, Rev B</span></div>
  <table class="wd-t wd-t-est">
    <colgroup><col style="width:44px"><col><col style="width:44px"><col style="width:30px"><col style="width:36px"><col style="width:44px"><col style="width:66px"><col style="width:78px"></colgroup>
    <thead><tr><th>WBS</th><th>Activity</th><th class="n">Qty</th><th>Unit</th><th>Crew</th><th class="n">Hours</th><th class="n">Unit rate</th><th class="n">Extension</th></tr></thead>
    <tbody>
      <tr class="sec"><td>3.1</td><td colspan="7">Mobilization</td></tr>
      <tr><td>3.1.1</td><td>Mobilize equipment and crews</td><td class="n">1</td><td>LS</td><td>C-01</td><td class="n">320</td><td class="n">48,600.00</td><td class="n">48,600.00</td></tr>
      <tr><td>3.1.2</td><td>Camp set-up, 60 person</td><td class="n">1</td><td>LS</td><td>C-02</td><td class="n">180</td><td class="n">31,250.00</td><td class="n">31,250.00</td></tr>
      <tr class="sub"><td></td><td>Subtotal 3.1</td><td></td><td></td><td></td><td class="n">500</td><td></td><td class="n">79,850.00</td></tr>
      <tr class="sec"><td>3.2</td><td colspan="7">Clearing</td></tr>
      <tr><td>3.2.1</td><td>Merchantable timber, fell and deck</td><td class="n">42.5</td><td>ha</td><td>C-03</td><td class="n">1,360</td><td class="n">5,860.00</td><td class="n">249,050.00</td></tr>
      <tr><td>3.2.2</td><td>Mulching, non-merchantable</td><td class="n">68.0</td><td>ha</td><td>C-04</td><td class="n">1,632</td><td class="n">3,420.00</td><td class="n">232,560.00</td></tr>
      <tr><td>3.2.3</td><td>Hand clearing, watercourse setbacks</td><td class="n">3.2</td><td>ha</td><td>C-05</td><td class="n">512</td><td class="n">11,900.00</td><td class="n">38,080.00</td></tr>
      <tr class="sub"><td></td><td>Subtotal 3.2</td><td></td><td></td><td></td><td class="n">3,504</td><td></td><td class="n">519,690.00</td></tr>
      <tr class="sec"><td>3.3</td><td colspan="7">Temporary access</td></tr>
      <tr><td>3.3.1</td><td>Access road, 5 m top width</td><td class="n">6.4</td><td>km</td><td>C-06</td><td class="n">1,152</td><td class="n">38,500.00</td><td class="n">246,400.00</td></tr>
      <tr><td>3.3.2</td><td>Culverts, 600 mm CSP</td><td class="n">14</td><td>ea</td><td>C-07</td><td class="n">168</td><td class="n">2,950.00</td><td class="n">41,300.00</td></tr>
      <tr><td>3.3.3</td><td>Rig matting, wet areas</td><td class="n">1,850</td><td>m²</td><td>C-08</td><td class="n">296</td><td class="n">68.00</td><td class="n">125,800.00</td></tr>
      <tr class="sub"><td></td><td>Subtotal 3.3</td><td></td><td></td><td></td><td class="n">1,616</td><td></td><td class="n">413,500.00</td></tr>
    </tbody>
  </table>
  <div class="wd-est-foot">
    <div class="wd-notes"><b>Notes</b>
      <div>1. Production rates per crew sheets C-01 to C-08.</div>
      <div>2. Excludes merchantable timber credit.</div>
      <div>3. Frozen-ground access assumed from week 3.</div>
    </div>
    <table class="wd-t wd-t-sum">
      <tr><td>Direct cost</td><td class="n">5,620 h</td><td class="n">1,013,040.00</td></tr>
      <tr><td>Indirects</td><td class="n">18.0%</td><td class="n">182,347.20</td></tr>
      <tr><td>Contingency</td><td class="n">10.0%</td><td class="n">119,538.72</td></tr>
      <tr class="tot"><td>Estimate total</td><td></td><td class="n">1,314,925.92</td></tr>
    </table>
  </div>
  ${foot('Preliminary. For estimating and execution review.', 'Page 3 of 9')}
</div>`;

/* 02 Rate development: labour rate schedule */
const rateRows = [
  ['L-01', 'General labourer', '36.50', 'H', '47.56', '71.34', '+3.0%'],
  ['L-02', 'Chainsaw faller, certified', '44.25', 'H', '57.66', '86.49', '+2.8%'],
  ['E-01', 'Equipment operator, Class 1', '47.80', 'H', '62.28', '93.43', '+3.2%'],
  ['E-02', 'Equipment operator, Class 2', '45.10', 'H', '58.77', '88.15', '+3.2%'],
  ['D-01', 'Truck driver, Class 1 licence', '41.60', 'H', '54.20', '81.31', '+2.5%'],
  ['F-01', 'Foreman', '55.20', 'H', '71.93', '107.89', '+3.0%'],
];
const staffRows = [
  ['S-01', 'Superintendent', '68.00', 'S', '83.23', 'n/a', '+2.0%'],
  ['S-02', 'Safety advisor', '54.00', 'S', '66.10', 'n/a', '+2.5%'],
  ['S-03', 'Medic, EMR', '42.00', 'S', '51.41', 'n/a', '+3.0%'],
];
const rateTr = r => `<tr><td>${r[0]}</td><td>${r[1]}</td><td class="n">${r[2]}</td><td class="n">${r[3] === 'H' ? '30.30%' : '22.40%'}</td><td class="n b">${r[4]}</td><td class="n">${r[5]}</td><td class="n">${r[6]}</td></tr>`;
const rates = `
<div class="wd-under"></div>
<div class="wd-page wd-land ff-s">
  ${hd(NEOS, 'RATE-SCH-C2 &nbsp;·&nbsp; Rev 1 &nbsp;·&nbsp; 2026-02-20')}
  <div class="wd-kicker">Schedule C-2</div>
  <div class="wd-title">Labour Rate Schedule</div>
  <div class="wd-sub">Hourly labour and staff. Effective 2026-04-01 to 2027-03-31. CAD per hour, excl. GST.</div>
  <div class="wd-rate-grid">
    <table class="wd-t">
      <colgroup><col style="width:32px"><col><col style="width:46px"><col style="width:44px"><col style="width:48px"><col style="width:48px"><col style="width:44px"></colgroup>
      <thead><tr><th>Code</th><th>Classification</th><th class="n">Base rate</th><th class="n">Burden</th><th class="n">All-in ST</th><th class="n">All-in OT</th><th class="n">vs 2025</th></tr></thead>
      <tbody>
        <tr class="sec"><td colspan="7">Hourly labour, burden set H</td></tr>
        ${rateRows.map(rateTr).join('')}
        <tr class="sec"><td colspan="7">Staff, burden set S</td></tr>
        ${staffRows.map(rateTr).join('')}
      </tbody>
    </table>
    <div class="wd-burden">
      <div class="wd-burden-h">Burden build-up</div>
      <table class="wd-t wd-t-tight">
        <colgroup><col><col style="width:32px"><col style="width:32px"></colgroup>
        <thead><tr><th>Component</th><th class="n">H</th><th class="n">S</th></tr></thead>
        <tbody>
          <tr><td>Vacation pay</td><td class="n">6.00</td><td class="n">n/a</td></tr>
          <tr><td>Statutory holidays</td><td class="n">3.60</td><td class="n">n/a</td></tr>
          <tr><td>CPP, employer</td><td class="n">5.95</td><td class="n">5.95</td></tr>
          <tr><td>EI, employer</td><td class="n">2.30</td><td class="n">2.30</td></tr>
          <tr><td>WCB, industry</td><td class="n">2.85</td><td class="n">2.85</td></tr>
          <tr><td>Benefits, pension</td><td class="n">8.50</td><td class="n">9.80</td></tr>
          <tr><td>Training, tickets</td><td class="n">1.10</td><td class="n">1.50</td></tr>
          <tr class="tot"><td>Total, %</td><td class="n">30.30</td><td class="n">22.40</td></tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="wd-notes wd-notes-row"><b>Notes</b>
    <div>1. All-in ST = base rate × (1 + burden). All-in OT = base rate × 1.5 × (1 + burden).</div>
    <div>2. Overtime per the applicable collective agreement. Staff rates are not eligible for overtime.</div>
    <div>3. Subsistence of $185.00 per day where camp is not provided. Rates exclude equipment and small tools.</div>
  </div>
  <div class="wd-signoff"><div><b>Prepared</b>Neos Advisors<span>2026-02-20</span></div><div><b>Reviewed</b>Estimating manager<span>2026-02-24</span></div><div><b>Approved for submission</b><span class="wd-sigline"></span></div></div>
  ${foot('Rates for pricing discussion. Confirm before submission.', 'Page 1 of 2')}
</div>`;

/* 03 Safety: health and safety manual, contents and revision history */
const safety = `
<div class="wd-page wd-port wd-back ff-s">
  <div class="wd-hd wd-hd-plain"><span>Health and Safety Manual</span><span>HS-M-001 · Rev 2</span></div>
  <div class="wd-man-h">2.0 &nbsp;Roles, Responsibilities and Accountability</div>
  <div class="wd-man-sh">2.1 &nbsp;Senior management</div>
  <div class="wd-para">Senior management is accountable for the health and safety program and provides the people, time and money needed to maintain it. Senior management will:</div>
  <div class="wd-list">
    <div><span>(a)</span>approve the Health and Safety Policy and review it each year;</div>
    <div><span>(b)</span>set annual health and safety objectives and track progress;</div>
    <div><span>(c)</span>take part in site inspections at least once per quarter;</div>
    <div><span>(d)</span>review incident trends and corrective actions monthly.</div>
  </div>
  <div class="wd-man-sh">2.2 &nbsp;Supervisors</div>
  <div class="wd-para">Supervisors are responsible for the health and safety of workers under their direction, as required by the Alberta Occupational Health and Safety Act, Regulation and Code. Supervisors will:</div>
  <div class="wd-list">
    <div><span>(a)</span>complete a hazard assessment before work starts and when conditions change;</div>
    <div><span>(b)</span>confirm that workers are trained and competent for the task;</div>
    <div><span>(c)</span>hold a documented tailgate meeting at the start of each shift;</div>
    <div><span>(d)</span>report and investigate incidents as set out in Section 9.</div>
  </div>
  <div class="wd-man-sh">2.3 &nbsp;Workers</div>
  <div class="wd-para">Workers will follow safe work practices, use the required PPE and report hazards, incidents and near misses to their supervisor without delay.</div>
  ${foot('Uncontrolled when printed.', 'Page 3')}
</div>
<div class="wd-page wd-port wd-front ff-s">
  <div class="wd-hd wd-hd-plain"><span>Health and Safety Manual</span><span>HS-M-001 · Rev 2 · Page ii</span></div>
  <div class="wd-title wd-title-sm">Contents</div>
  <div class="wd-tocs">
    ${leader('1.0 &nbsp;Health and Safety Policy', '1')}
    ${leader('2.0 &nbsp;Roles, Responsibilities and Accountability', '3')}
    ${leader('2.1 &nbsp;Senior management', '3', 'l2')}
    ${leader('2.2 &nbsp;Supervisors', '4', 'l2')}
    ${leader('2.3 &nbsp;Workers', '5', 'l2')}
    ${leader('2.4 &nbsp;Contractors and visitors', '6', 'l2')}
    ${leader('3.0 &nbsp;Hazard Assessment and Control', '7')}
    ${leader('4.0 &nbsp;Safe Work Practices and Procedures', '11')}
    ${leader('5.0 &nbsp;Personal Protective Equipment', '15')}
    ${leader('6.0 &nbsp;Training and Competency', '17')}
    ${leader('7.0 &nbsp;Contractor Management', '20')}
    ${leader('8.0 &nbsp;Inspections', '24')}
    ${leader('9.0 &nbsp;Incident Reporting and Investigation', '26')}
    ${leader('10.0 Emergency Response', '30')}
    ${leader('11.0 Document Control and Records', '33')}
    ${leader('12.0 Program Review', '36')}
    ${leader('Appendix A &nbsp;Forms Register', '38')}
  </div>
  <div class="wd-tablecap wd-tablecap-sm"><span><b>Revision history</b></span></div>
  <table class="wd-t wd-t-tight">
    <colgroup><col style="width:24px"><col style="width:54px"><col><col style="width:46px"></colgroup>
    <thead><tr><th>Rev</th><th>Date</th><th>Description</th><th>Approved</th></tr></thead>
    <tbody>
      <tr><td>0</td><td>2023-11-06</td><td>Issued for use</td><td>President</td></tr>
      <tr><td>1</td><td>2025-01-15</td><td>Hazard assessment forms updated (s. 3)</td><td>President</td></tr>
      <tr class="cur"><td>2</td><td>2026-03-09</td><td>Reorganized. Accountabilities clarified (s. 2, 7, 11)</td><td>President</td></tr>
    </tbody>
  </table>
  <div class="wd-signoff wd-signoff-2"><div><b>Approved by</b><span class="wd-sigline"></span>President</div><div><b>Next scheduled review</b>2027-03</div></div>
  ${foot('Uncontrolled when printed.', 'Company A')}
</div>`;

/* 04 Procurement: request for quotation */
const rfqRow = (i, d, q, u, up = '', t = '') => `<tr><td>${i}</td><td>${d}</td><td class="n">${q}</td><td>${u}</td><td class="n ${up ? '' : 'fill'}">${up}</td><td class="n ${t ? '' : 'fill'}">${t}</td></tr>`;
const rfq = `
<div class="wd-page wd-port wd-back ff-s">
  <div class="wd-hd wd-hd-plain"><span>RFQ-026 · Appendix A</span><span>Page 6 of 8</span></div>
  <div class="wd-man-h">Appendix A &nbsp;Drawings and Owner-Supplied Items</div>
  <table class="wd-t wd-t-tight">
    <colgroup><col style="width:40px"><col><col style="width:26px"></colgroup>
    <thead><tr><th>Drawing</th><th>Title</th><th>Rev</th></tr></thead>
    <tbody>
      <tr><td>C-101</td><td>Site plan and removals</td><td>B</td></tr>
      <tr><td>C-102</td><td>Grading plan</td><td>B</td></tr>
      <tr><td>C-103</td><td>Site servicing plan</td><td>B</td></tr>
      <tr><td>C-104</td><td>Storm service profile</td><td>B</td></tr>
      <tr><td>C-105</td><td>Paving and curb layout</td><td>B</td></tr>
      <tr><td>C-106</td><td>Typical sections</td><td>B</td></tr>
      <tr><td>C-107</td><td>Details, sheet 1</td><td>B</td></tr>
      <tr><td>C-108</td><td>Details, sheet 2</td><td>B</td></tr>
    </tbody>
  </table>
  <div class="wd-man-sh">A.2 &nbsp;Supplied by the Owner</div>
  <div class="wd-list">
    <div><span>1.</span>Survey control and initial layout.</div>
    <div><span>2.</span>Geotechnical testing, carried as a provisional sum.</div>
    <div><span>3.</span>Building pad elevations, confirmed before excavation.</div>
  </div>
  <div class="wd-man-sh">A.3 &nbsp;Interfaces</div>
  <div class="wd-para">The building trade starts on the pad once granular fill is tested and accepted. Storm service ends 1 m outside the building face.</div>
  ${foot('Owner A', 'RFQ-026')}
</div>
<div class="wd-page wd-port wd-front ff-s">
  <div class="wd-hd wd-hd-plain"><span>Request for Quotation</span><span>RFQ-026 · Issued 2026-04-22</span></div>
  <div class="wd-title wd-title-sm">Site Works Trade Package</div>
  <div class="wd-sub">Owner A · Building project, Phase 2</div>
  <div class="wd-closing"><div><b>Quotations close</b>2026-05-14, 14:00 MT</div><div><b>Site visit</b>2026-04-30, 10:00</div><div><b>Questions by</b>2026-05-07</div></div>
  <div class="wd-man-sh">1. &nbsp;Scope summary</div>
  <div class="wd-para">Supply all labour, equipment and materials for the site works on drawings <span class="nw">C-101 to C-108</span>, Rev B: topsoil stripping, pad excavation and fill, storm service, asphalt paving and concrete curbs.</div>
  <div class="wd-man-sh">2. &nbsp;Pricing schedule</div>
  <table class="wd-t wd-t-tight wd-t-rfq">
    <colgroup><col style="width:16px"><col><col style="width:32px"><col style="width:20px"><col style="width:46px"><col style="width:50px"></colgroup>
    <thead><tr><th>Item</th><th>Description</th><th class="n">Qty</th><th>Unit</th><th class="n">Unit price</th><th class="n">Total</th></tr></thead>
    <tbody>
      ${rfqRow(1, 'Mobilization and demobilization', '1', 'LS')}
      ${rfqRow(2, 'Strip and stockpile topsoil, 150 mm', '4,200', 'm²')}
      ${rfqRow(3, 'Common excavation', '2,850', 'm³')}
      ${rfqRow(4, 'Granular base, 20 mm crushed', '2,300', 't')}
      ${rfqRow(5, 'Storm service, 300 mm PVC', '86', 'm')}
      ${rfqRow(6, 'Asphalt paving, 75 mm', '3,100', 'm²')}
      ${rfqRow(7, 'Concrete curb and gutter', '410', 'm')}
      ${rfqRow(8, 'Provisional sum, testing', '1', 'PS', '15,000.00', '15,000.00')}
      <tr class="tot"><td></td><td colspan="4">Total, excl. GST</td><td class="n fill"></td></tr>
    </tbody>
  </table>
  <div class="wd-man-sh">3. &nbsp;Submission requirements</div>
  <div class="wd-list wd-list-tight">
    <div><span>3.1</span>Completed and signed pricing schedule.</div>
    <div><span>3.2</span>Proposed schedule, crew size and equipment list.</div>
    <div><span>3.3</span>WCB clearance letter, COR and proof of insurance (CGL $5,000,000).</div>
    <div><span>3.4</span>List of exclusions and clarifications.</div>
  </div>
  <div class="wd-man-sh">4. &nbsp;Evaluation</div>
  <div class="wd-para">Evaluated on price, schedule, safety performance and completeness. The Owner is not bound to accept the lowest or any quotation.</div>
  ${foot('Quotations are valid for 60 days.', 'Page 1 of 8')}
</div>`;

/* 05 Prequalification: proposal review matrix */
const pr = (ref, req, rfpRef, st, stLabel, comment, pri) => `<tr><td class="b">${ref}</td><td>${req}</td><td>${rfpRef}</td><td class="wd-stc">${st}<span>${stLabel}</span></td><td>${comment}</td><td class="${pri === 'High' ? 'wd-pri-h' : ''}">${pri}</td></tr>`;
const proposal = `
<div class="wd-under"></div>
<div class="wd-page wd-land ff-b">
  ${hd(NEOS, 'Prequalification review &nbsp;·&nbsp; Draft 2 &nbsp;·&nbsp; 2026-06-03')}
  <div class="wd-kicker">Proposal evaluation</div>
  <div class="wd-title">Proposal Review Matrix</div>
  <div class="wd-sub">Work Package 4 prequalification. Contractor A draft submission, checked against the owner's mandatory and rated requirements.</div>
  <div class="wd-chips"><div><b>Mandatory</b>2 of 3 met</div><div><b>Rated</b>2 of 5 complete</div><div><b>Revisions</b>4 items, 3 high priority</div><div><b>Closing</b>2026-06-19, 14:00 MT</div></div>
  <table class="wd-t wd-t-pq">
    <colgroup><col style="width:30px"><col style="width:132px"><col style="width:58px"><col style="width:52px"><col><col style="width:40px"></colgroup>
    <thead><tr><th>Ref</th><th>Requirement</th><th>RFP ref</th><th>Status</th><th>Comment</th><th>Priority</th></tr></thead>
    <tbody>
      ${pr('M-01', 'Valid COR or equivalent', '4.2.1', ok, 'Met', 'Certificate current to 2027-01.', 'None')}
      ${pr('M-02', 'Insurance, CGL $5M', '4.2.3', ok, 'Met', 'Certificate in Appendix C.', 'None')}
      ${pr('M-03', 'WCB clearance letter', '4.2.4', part, 'Partial', 'Letter is more than 30 days old. Request a new one.', 'High')}
      ${pr('R-01', 'Similar projects, 3 in 5 years', '5.1 · 20 pts', part, 'Partial', 'Two of three meet the value threshold. Replace project 3.', 'High')}
      ${pr('R-02', 'Key personnel and resumes', '5.2 · 15 pts', ok, 'Met', 'Resumes match the organization chart.', 'Low')}
      ${pr('R-03', 'Indigenous participation plan', '5.3 · 15 pts', miss, 'Missing', 'Commitments stated but no plan attached.', 'High')}
      ${pr('R-04', 'Execution approach and schedule', '5.4 · 25 pts', part, 'Partial', 'Schedule has no winter access assumptions.', 'Med')}
      ${pr('R-05', 'Quality management', '5.5 · 10 pts', ok, 'Met', 'Plan and sample inspection test plan attached.', 'Low')}
    </tbody>
  </table>
  <div class="wd-legend">${ok}Met &nbsp;&nbsp; ${part}Partial &nbsp;&nbsp; ${miss}Missing &nbsp;&nbsp;&nbsp; Rated items carry the points shown in the RFP.</div>
  <div class="wd-pq-foot">
    <div>
      <div class="wd-tablecap"><span><b>Prioritized revisions</b></span><span>Due before internal sign-off</span></div>
      <table class="wd-t wd-t-tight">
        <colgroup><col style="width:14px"><col><col style="width:78px"><col style="width:40px"></colgroup>
        <thead><tr><th>#</th><th>Revision</th><th>Owner</th><th>Due</th></tr></thead>
        <tbody>
          <tr><td>1</td><td>Attach the Indigenous participation plan (R-03)</td><td>BD lead</td><td>Jun 10</td></tr>
          <tr><td>2</td><td>Replace project 3 with a qualifying project (R-01)</td><td>Proposal manager</td><td>Jun 11</td></tr>
          <tr><td>3</td><td>Obtain a current WCB clearance letter (M-03)</td><td>Administration</td><td>Jun 12</td></tr>
          <tr><td>4</td><td>Add winter access assumptions to the schedule (R-04)</td><td>Operations</td><td>Jun 13</td></tr>
        </tbody>
      </table>
    </div>
    <div class="wd-score"><b>Rated score outlook</b><div class="wd-score-row"><span>As drafted</span><i><em style="width:68%"></em></i><strong>58 / 85</strong></div><div class="wd-score-row"><span>With revisions</span><i><em class="up" style="width:85%"></em></i><strong>72 / 85</strong></div><small>Estimate only. Scoring is at the owner's discretion.</small></div>
  </div>
  ${foot('Prepared for the submission team.', 'Page 2 of 5')}
</div>`;

/* 06 Execution planning: work fronts and gantt */
const weeks = Array.from({ length: 14 }, (_, i) => i + 1);
const gRow = (wf, name, crews, peak, from, to, crit = false) => `<tr><td class="b">${wf}</td><td>${name}</td><td class="n">${crews}</td><td class="n">${peak}</td>${weeks.map(w => {
  const on = w >= from && w <= to;
  const cls = on ? `on${w === from ? ' s' : ''}${w === to ? ' e' : ''}${crit ? ' crit' : ''}` : '';
  return `<td class="wd-g ${cls}"><i></i></td>`;
}).join('')}</tr>`;
const head = [24, 42, 54, 54, 54, 78, 78, 74, 74, 38, 38, 38, 26, 12];
const execution = `
<div class="wd-under"></div>
<div class="wd-page wd-land ff-b">
  ${hd(NEOS, 'Execution plan &nbsp;·&nbsp; Preliminary &nbsp;·&nbsp; Rev A &nbsp;·&nbsp; 2026-07-18')}
  <div class="wd-kicker">Section 4</div>
  <div class="wd-title">Preliminary Execution Plan</div>
  <div class="wd-sub">Work fronts, crews and sequence. Winter works over 14 weeks from 2026-11-02.</div>
  <table class="wd-t wd-t-gantt">
    <colgroup><col style="width:36px"><col style="width:124px"><col style="width:30px"><col style="width:28px">${weeks.map(() => '<col>').join('')}</colgroup>
    <thead>
      <tr class="mo"><th></th><th></th><th></th><th></th><th colspan="4">Nov</th><th colspan="5">Dec</th><th colspan="4">Jan</th><th colspan="1">Feb</th></tr>
      <tr><th>WF</th><th>Work front</th><th class="n">Crews</th><th class="n">Peak</th>${weeks.map(w => `<th class="wk">${w}</th>`).join('')}</tr>
    </thead>
    <tbody>
      ${gRow('WF-0', 'Mobilization and camp', 1, 24, 1, 2)}
      ${gRow('WF-1', 'Access roads and crossings', 2, 18, 2, 7, true)}
      ${gRow('WF-2', 'Clearing, km 0 to 18', 3, 36, 3, 9, true)}
      ${gRow('WF-3', 'Clearing, km 18 to 31', 2, 24, 6, 12, true)}
      ${gRow('WF-4', 'Mulching and cleanup', 2, 14, 8, 13)}
      ${gRow('WF-5', 'Demobilization', 1, 12, 13, 14)}
      <tr class="ms"><td></td><td>Milestones</td><td></td><td></td>${weeks.map(w => `<td class="wd-g">${[2, 7, 13].includes(w) ? '<b></b>' : ''}</td>`).join('')}</tr>
      <tr class="hist"><td></td><td>Field headcount</td><td></td><td class="n">78</td>${head.map(h => `<td class="wd-g"><span style="height:${Math.round(h / 78 * 26)}px"></span></td>`).join('')}</tr>
    </tbody>
  </table>
  <div class="wd-exec-foot">
    <div>
      <div class="wd-tablecap"><span><b>Crew make-up</b></span></div>
      <table class="wd-t wd-t-tight">
        <colgroup><col style="width:46px"><col><col style="width:118px"></colgroup>
        <thead><tr><th>Crew</th><th>Personnel</th><th>Equipment</th></tr></thead>
        <tbody>
          <tr><td>Clearing</td><td>Foreman, 4 fallers, 2 operators, 2 labourers</td><td>Feller buncher, skidder, processor</td></tr>
          <tr><td>Access</td><td>Foreman, 3 operators, 2 labourers</td><td>30 t excavator, D6 dozer, rock truck</td></tr>
          <tr><td>Mulching</td><td>Foreman, 2 operators, 1 labourer</td><td>2 mulchers, service truck</td></tr>
        </tbody>
      </table>
    </div>
    <div class="wd-notes"><b>Key constraints</b>
      <div>1. Access needs frozen ground, assumed from week 3.</div>
      <div>2. Clearing must finish before the migratory bird restricted period.</div>
      <div>3. Camp capacity is 60 beds. Peak field headcount is 78 in weeks 6 and 7.</div>
    </div>
  </div>
  <div class="wd-legend wd-legend-exec"><i class="wd-lg crit"></i>Critical path &nbsp;&nbsp; <i class="wd-lg"></i>Planned work &nbsp;&nbsp; <i class="wd-lg ms"></i>Milestones: camp ready, access complete, clearing complete</div>
  ${foot('Preliminary. For internal review and further development.', 'Page 9 of 22')}
</div>`;

/* 07 Contract development: construction trade contract */
const contracts = `
<div class="wd-page wd-port wd-back ff-l">
  <div class="wd-legal-top"><span>Contract No. CTC-2026-014</span></div>
  <div class="wd-art">ARTICLE 4 &nbsp;INSURANCE</div>
  <div class="wd-cl"><span>4.1</span>The Contractor shall maintain the insurance described in Schedule C, including commercial general liability insurance of not less than $5,000,000 per occurrence.</div>
  <div class="wd-cl"><span>4.2</span>The Contractor shall deliver certificates of insurance to the Owner before starting the Work and on each renewal.</div>
  <div class="wd-art">ARTICLE 5 &nbsp;HEALTH AND SAFETY</div>
  <div class="wd-cl"><span>5.1</span>The Contractor shall comply with the <i>Occupational Health and Safety Act</i> (Alberta) and with Schedule D.</div>
  <div class="wd-cl"><span>5.2</span>The Contractor shall attend the Owner's site orientation and coordinate its work with other contractors on the site.</div>
  <div class="wd-art">ARTICLE 6 &nbsp;CHANGES IN THE WORK</div>
  <div class="wd-cl"><span>6.1</span>The Owner may direct changes in the Work by written change order. The Contract Price and Contract Time shall be adjusted as set out in Schedule B.</div>
  <div class="wd-cl"><span>6.2</span>The Contractor shall not proceed with a change without written direction, except in an emergency.</div>
  <div class="wd-art">ARTICLE 7 &nbsp;DEFAULT AND TERMINATION</div>
  <div class="wd-cl"><span>7.1</span>If the Contractor fails to correct a default within 5 Working Days of written notice, the Owner may correct the default and deduct the cost from amounts owing.</div>
  <div class="wd-initials"><span>Owner ______</span><span>Contractor ______</span><span>Page 2 of 14</span></div>
</div>
<div class="wd-page wd-port wd-front ff-l">
  <div class="wd-legal-top"><span class="wd-stamp">Draft for review</span><span>Contract No. CTC-2026-014</span></div>
  <div class="wd-legal-title">CONSTRUCTION TRADE CONTRACT</div>
  <div class="wd-legal-subt">(Stipulated Price)</div>
  <div class="wd-cl wd-cl-full">THIS CONTRACT is made as of the ____ day of ______________, 2026.</div>
  <div class="wd-parties"><div><b>BETWEEN:</b><span>OWNER A (the “Owner”)</span></div><div><b>AND:</b><span>TRADE CONTRACTOR B (the “Contractor”)</span></div></div>
  <div class="wd-cl wd-cl-full">The Owner and the Contractor agree as follows:</div>
  <div class="wd-art">ARTICLE 1 &nbsp;THE WORK</div>
  <div class="wd-cl"><span>1.1</span>The Contractor shall perform the Work described in Schedule A, Scope of Work, in accordance with the Contract Documents.</div>
  <div class="wd-cl"><span>1.2</span>The Contractor shall start the Work by the date in Schedule B and achieve Substantial Performance by the date stated there.</div>
  <div class="wd-art">ARTICLE 2 &nbsp;CONTRACT PRICE AND PAYMENT</div>
  <div class="wd-cl"><span>2.1</span>The Contract Price is $______________, excluding GST, subject to adjustment under Article 6.</div>
  <div class="wd-cl"><span>2.2</span>The Owner shall retain a holdback of 10% of each payment in accordance with the <i>Prompt Payment and Construction Lien Act</i> (Alberta).</div>
  <div class="wd-cl"><span>2.3</span>The Contractor shall submit a proper invoice monthly. The Owner shall pay within 28 days of receipt.</div>
  <div class="wd-art">ARTICLE 3 &nbsp;CONTRACT DOCUMENTS</div>
  <div class="wd-cl"><span>3.1</span>The following Schedules form part of this Contract:</div>
  <div class="wd-sched">
    <div><b>Schedule A</b>Scope of Work</div><div><b>Schedule B</b>Contract Price, Schedule and Payment</div>
    <div><b>Schedule C</b>Insurance Requirements</div><div><b>Schedule D</b>Health, Safety and Environment</div>
    <div><b>Schedule E</b>Drawings and Specifications</div><div><b>Schedule F</b>Coordination and Interfaces</div>
  </div>
  <div class="wd-cl"><span>3.2</span>If there is a conflict within the Contract Documents, this Agreement governs, then the Schedules in the order listed, then the Drawings and Specifications.</div>
  <div class="wd-initials"><span>Owner ______</span><span>Contractor ______</span><span>Page 1 of 14</span></div>
</div>`;

/* 08 Contract evaluation: tracked review and decision list */
const review = `
<div class="wd-under"></div>
<div class="wd-page wd-land ff-b">
  ${hd(NEOS, 'Commercial review &nbsp;·&nbsp; Services agreement &nbsp;·&nbsp; Rev 0 &nbsp;·&nbsp; 2026-05-11')}
  <div class="wd-kicker">Contract review</div>
  <div class="wd-title">Proposed Revisions and Decision List</div>
  <div class="wd-rev-grid">
    <div class="wd-markup ff-l">
      <div class="wd-art">7. &nbsp;PAYMENT</div>
      <div class="wd-cl"><span>7.1</span>The Consultant shall invoice monthly. The Client shall pay each undisputed invoice within <del>60</del> <ins>30</ins> days of receipt.<sup>NA1</sup></div>
      <div class="wd-cl"><span>7.2</span><del>The Client may withhold payment at its sole discretion.</del> <ins>The Client may withhold only the disputed portion of an invoice and shall give written reasons within 10 days.</ins><sup>NA2</sup></div>
      <div class="wd-art">8. &nbsp;LIMITATION OF LIABILITY</div>
      <div class="wd-cl"><span>8.1</span>The Consultant's total liability under this Agreement shall not exceed <del>$10,000,000</del> <ins>the fees paid under this Agreement</ins>.<sup>NA3</sup></div>
      <div class="wd-art">9. &nbsp;TERMINATION</div>
      <div class="wd-cl"><span>9.2</span>The Client may terminate for convenience on <del>5</del> <ins>15</ins> days' written notice and shall pay for services performed to the termination date<ins> and reasonable demobilization costs</ins>.<sup>NA4</sup></div>
    </div>
    <div class="wd-balloons">
      <div><b>NA1</b>Schedule B says 45 days. Align the payment terms.</div>
      <div><b>NA2</b>Open-ended withholding right. Limit it to the disputed amount.</div>
      <div><b>NA3</b>Cap is out of proportion to the fee. Confirm with counsel.</div>
      <div><b>NA4</b>Notice is too short to stand down field crews. Add demobilization.</div>
    </div>
  </div>
  <div class="wd-tablecap"><span><b>Decision list</b></span><span>For client decision before return to the other party</span></div>
  <table class="wd-t wd-t-tight wd-t-dec">
    <colgroup><col style="width:14px"><col style="width:120px"><col style="width:54px"><col><col style="width:40px"><col style="width:40px"><col style="width:40px"></colgroup>
    <thead><tr><th>#</th><th>Issue</th><th>Clause</th><th>Recommended position</th><th class="c">Accept</th><th class="c">Reject</th><th class="c">Discuss</th></tr></thead>
    <tbody>
      <tr><td>1</td><td>Payment term conflict</td><td>7.1, Sch. B</td><td>Pay within 30 days. Amend Schedule B to match.</td><td class="c">${box}</td><td class="c">${box}</td><td class="c">${box}</td></tr>
      <tr><td>2</td><td>Withholding right</td><td>7.2</td><td>Disputed portion only, with reasons in 10 days.</td><td class="c">${box}</td><td class="c">${box}</td><td class="c">${box}</td></tr>
      <tr><td>3</td><td>Liability cap</td><td>8.1</td><td>Cap at fees paid. Counsel to confirm.</td><td class="c">${box}</td><td class="c">${box}</td><td class="c">${box}</td></tr>
      <tr><td>4</td><td>Termination for convenience</td><td>9.2</td><td>15 days' notice plus demobilization costs.</td><td class="c">${box}</td><td class="c">${box}</td><td class="c">${box}</td></tr>
    </tbody>
  </table>
  <div class="wd-check"><b>Completeness and consistency check</b>
    <div>${miss}Schedule B payment terms match clause 7.1</div><div>${ok}Insurance limits stated in Schedule C</div>
    <div>${part}Defined terms used consistently</div><div>${miss}Schedule D referenced in the body</div>
  </div>
  ${foot('Commercial comments only. Not legal advice.', 'Page 4 of 11')}
</div>`;

/* 09 Indigenous engagement: regional engagement plan (a relationship map, not a territorial map) */
const map = `
<svg class="wd-map" viewBox="0 0 250 300" aria-hidden="true">
  <rect x="0.5" y="0.5" width="249" height="299" fill="#fbfbfa" stroke="#c9cdd3"/>
  <g stroke-width="1.2" fill="none">
    <line x1="125" y1="150" x2="58" y2="56" stroke="#82672d" stroke-width="1.5" stroke-dasharray="4 3"/>
    <line x1="125" y1="150" x2="192" y2="56" stroke="#1d2430"/>
    <line x1="125" y1="150" x2="198" y2="212" stroke="#1d2430"/>
    <line x1="125" y1="150" x2="125" y2="250" stroke="#1d2430"/>
    <line x1="125" y1="150" x2="52" y2="212" stroke="#82672d" stroke-width="1.5" stroke-dasharray="4 3"/>
  </g>
  <rect x="80" y="133" width="90" height="34" rx="2" fill="#1d2430"/>
  <g font-family="DM Sans, Arial, sans-serif" text-anchor="middle">
    <text x="125" y="148" font-size="8" font-weight="700" fill="#fff">Contractor A</text>
    <text x="125" y="159" font-size="6.4" fill="#d5d9de">project team</text>
  </g>
  <g font-family="DM Sans, Arial, sans-serif" font-size="8.5" font-weight="700" text-anchor="middle">
    <circle cx="58" cy="56" r="8" fill="#fff" stroke="#1d2430" stroke-width="1.2"/><text x="58" y="59" fill="#1d2430">1</text>
    <circle cx="192" cy="56" r="8" fill="#fff" stroke="#1d2430" stroke-width="1.2"/><text x="192" y="59" fill="#1d2430">2</text>
    <circle cx="198" cy="212" r="8" fill="#fff" stroke="#1d2430" stroke-width="1.2"/><text x="198" y="215" fill="#1d2430">3</text>
    <circle cx="125" cy="250" r="8" fill="#fff" stroke="#1d2430" stroke-width="1.2"/><text x="125" y="253" fill="#1d2430">4</text>
    <circle cx="52" cy="212" r="8" fill="#fff" stroke="#1d2430" stroke-width="1.2"/><text x="52" y="215" fill="#1d2430">5</text>
  </g>
  <g font-family="DM Sans, Arial, sans-serif" font-size="6.3" fill="#4b5360" text-anchor="middle">
    <text x="58" y="30">Nation A</text><text x="58" y="38">development corporation</text>
    <text x="192" y="30">Nation B economic</text><text x="192" y="38">development office</text>
    <text x="198" y="232">Nation C-owned</text><text x="198" y="240">contractor</text>
    <text x="125" y="270">Regional Indigenous</text><text x="125" y="278">business association</text>
    <text x="52" y="232">Nation D lands and</text><text x="52" y="240">resources office</text>
  </g>
</svg>`;
const engagement = `
<div class="wd-under"></div>
<div class="wd-page wd-land ff-b">
  ${hd(NEOS, 'Engagement plan &nbsp;·&nbsp; Planning draft &nbsp;·&nbsp; 2026-08-04')}
  <div class="wd-kicker">Indigenous engagement</div>
  <div class="wd-title">Regional Engagement Plan</div>
  <div class="wd-sub">Organizations, opportunities and relationship priorities. For planning only. No endorsement is implied.</div>
  <div class="wd-eng-grid">
    <div class="wd-mapbox">${map}<div class="wd-mapkey"><i class="k-line"></i>Contact in place &nbsp; <i class="k-dash"></i>Contact to confirm</div></div>
    <div>
      <div class="wd-tablecap wd-tablecap-sm"><span><b>Engagement priorities</b></span><span>Q4 2026</span></div>
      <table class="wd-t wd-t-tight wd-t-eng">
        <colgroup><col style="width:16px"><col style="width:104px"><col style="width:84px"><col></colgroup>
        <thead><tr><th>#</th><th>Organization</th><th>Opportunity</th><th>Next step</th></tr></thead>
        <tbody>
          <tr><td class="b">1</td><td>Nation A development corporation</td><td>Clearing and access subcontract</td><td>Introductory meeting through the lands office</td></tr>
          <tr><td class="b">2</td><td>Nation B economic development office</td><td>Camp services and catering</td><td>Share the work package list</td></tr>
          <tr><td class="b">3</td><td>Nation C-owned contractor</td><td>Equipment and operators</td><td>Capacity discussion, site visit</td></tr>
          <tr><td class="b">4</td><td>Regional Indigenous business association</td><td>Supplier registration</td><td>Present at the member session</td></tr>
          <tr><td class="b">5</td><td>Nation D lands and resources office</td><td>Environmental monitoring roles</td><td>Ask how the Nation prefers to be engaged</td></tr>
        </tbody>
      </table>
      <div class="wd-notes wd-notes-box"><b>Principles</b>
        <div>1. Follow each Nation's decision-making process and timelines.</div>
        <div>2. Confirm the right contact before any outreach.</div>
        <div>3. Record commitments and follow-up in the engagement log.</div>
        <div>4. Share information early and in plain language.</div>
      </div>
      <div class="wd-seq"><div><b>Oct</b>Confirm contacts and protocols</div><div><b>Nov</b>Introductory meetings</div><div><b>Dec</b>Opportunity sessions</div><div><b>Ongoing</b>Follow-up and log</div></div>
    </div>
  </div>
  ${foot('Planning material. Not for distribution.', 'Page 5 of 16')}
</div>`;

/* 10 Partnership development: partnership options, revenue share first, joint venture for comparison */
const partnerships = `
<div class="wd-under"></div>
<div class="wd-page wd-land ff-b">
  ${hd(NEOS, 'Partnership discussion &nbsp;·&nbsp; Draft 2 &nbsp;·&nbsp; 2026-08-21')}
  <div class="wd-kicker">Partnership development</div>
  <div class="wd-title">Partnership Options</div>
  <div class="wd-sub">Company A, a contractor, and Company B, a Nation-owned business. For discussion. Final arrangements require the parties' agreement.</div>
  <div class="wd-po-grid">
    <div class="wd-po wd-po-main">
      <div class="wd-po-head"><span>Option A</span><b>Revenue share agreement</b><em>Preferred</em></div>
      <svg class="wd-po-svg" viewBox="0 0 330 150" aria-hidden="true">
        <g fill="none" stroke="#1d2430" stroke-width="1">
          <path d="M165 30 V42 H62 V55"/>
          <path d="M118 70 H209"/><path d="M212 90 H121"/>
        </g>
        <path d="M58 49 L62 56 L66 49 Z" fill="#1d2430"/>
        <path d="M205 66.5 L212 70 L205 73.5 Z" fill="#82672d"/><path d="M125 86.5 L118 90 L125 93.5 Z" fill="#1d2430"/>
        <g font-family="DM Sans, Arial, sans-serif">
          <rect x="112" y="4" width="106" height="26" fill="#f3f4f6" stroke="#1d2430"/>
          <text x="165" y="15" text-anchor="middle" font-size="8" font-weight="700" fill="#1d2430">Project owner</text>
          <text x="165" y="25" text-anchor="middle" font-size="6.4" fill="#4b5360">Awards the contract</text>
          <rect x="6" y="56" width="112" height="46" fill="#fff" stroke="#1d2430"/>
          <text x="62" y="73" text-anchor="middle" font-size="9.5" font-weight="700" fill="#1d2430">Company A</text>
          <text x="62" y="84" text-anchor="middle" font-size="7" fill="#4b5360">Contractor</text>
          <text x="62" y="94" text-anchor="middle" font-size="6.2" fill="#6a717c">Delivers the work</text>
          <rect x="212" y="56" width="112" height="46" fill="#fbf8f1" stroke="#82672d" stroke-width="1.6"/>
          <text x="268" y="73" text-anchor="middle" font-size="9.5" font-weight="700" fill="#1d2430">Company B</text>
          <text x="268" y="84" text-anchor="middle" font-size="7" fill="#4b5360">Nation-owned business</text>
          <text x="268" y="94" text-anchor="middle" font-size="6.2" fill="#6a717c">No capital at risk</text>
          <text x="165" y="64" text-anchor="middle" font-size="6.6" font-weight="700" fill="#82672d">Share of contract revenue</text>
          <text x="165" y="100" text-anchor="middle" font-size="6.4" fill="#4b5360">Workforce, supply, support</text>
          <text x="165" y="126" text-anchor="middle" font-size="7" fill="#1d2430">Company A carries the risk, bonding and working capital.</text>
          <text x="165" y="138" text-anchor="middle" font-size="7" fill="#1d2430">Company B is paid quarterly, with hiring and subcontract targets.</text>
        </g>
      </svg>
    </div>
    <div class="wd-po">
      <div class="wd-po-head"><span>Option B</span><b>Joint venture</b></div>
      <svg class="wd-po-svg" viewBox="0 0 250 150" aria-hidden="true">
        <g fill="none" stroke="#1d2430" stroke-width="1"><path d="M60 48 V62 H190 V48"/><path d="M125 62 V75"/></g>
        <path d="M121 69 L125 76 L129 69 Z" fill="#1d2430"/>
        <g font-family="DM Sans, Arial, sans-serif">
          <rect x="4" y="8" width="112" height="40" fill="#fbf8f1" stroke="#82672d" stroke-width="1.2"/>
          <text x="60" y="25" text-anchor="middle" font-size="9" font-weight="700" fill="#1d2430">Company B</text>
          <text x="60" y="37" text-anchor="middle" font-size="7" fill="#4b5360">51% of units</text>
          <rect x="134" y="8" width="112" height="40" fill="#fff" stroke="#1d2430"/>
          <text x="190" y="25" text-anchor="middle" font-size="9" font-weight="700" fill="#1d2430">Company A</text>
          <text x="190" y="37" text-anchor="middle" font-size="7" fill="#4b5360">49% of units</text>
          <rect x="60" y="76" width="130" height="40" fill="#fff" stroke="#1d2430" stroke-width="1.4"/>
          <text x="125" y="93" text-anchor="middle" font-size="9" font-weight="700" fill="#1d2430">Company C</text>
          <text x="125" y="105" text-anchor="middle" font-size="7" fill="#4b5360">Joint venture, limited partnership</text>
          <text x="125" y="130" text-anchor="middle" font-size="7" fill="#1d2430">Profit, risk and capital shared by units.</text>
          <text x="125" y="142" text-anchor="middle" font-size="7" fill="#1d2430">Management committee, two seats each.</text>
        </g>
      </svg>
    </div>
  </div>
  <table class="wd-t wd-t-po">
    <colgroup><col style="width:128px"><col><col></colgroup>
    <thead><tr><th>For Company B</th><th>Option A &nbsp;Revenue share</th><th>Option B &nbsp;Joint venture</th></tr></thead>
    <tbody>
      <tr><td>Capital and bonding</td><td class="po-a">None</td><td>Shared, in proportion to units</td></tr>
      <tr><td>Construction risk</td><td class="po-a">Carried by Company A</td><td>Shared by the partners</td></tr>
      <tr><td>Return</td><td class="po-a">Agreed share of revenue, paid quarterly</td><td>Share of profit, when the work is profitable</td></tr>
      <tr><td>Oversight</td><td class="po-a">Quarterly reports and audit rights</td><td>Seats on the management committee</td></tr>
      <tr><td>Local benefits</td><td class="po-a">Hiring, training and subcontract targets</td><td>Hands-on role in delivering the work</td></tr>
      <tr><td>Set-up</td><td class="po-a">One agreement between two parties</td><td>New entity, partnership agreement and governance</td></tr>
    </tbody>
  </table>
  <div class="wd-po-notes">
    <div class="wd-notes"><b>Discussion record</b>
      <div>Session 1 &nbsp;Objectives <span class="wd-muted">2026-07-15</span></div>
      <div>Session 2 &nbsp;Options, this draft <span class="wd-muted">2026-08-21</span></div>
      <div>Session 3 &nbsp;Term sheet <span class="wd-muted">To be set</span></div>
    </div>
    <div class="wd-notes"><b>Next steps</b>
      <div>Confirm Option A with Company B's board.</div>
      <div>Draft the revenue share term sheet by 2026-09-30.</div>
      <div>Keep Option B open for later work packages.</div>
    </div>
  </div>
  ${foot('Discussion material. Not an offer or agreement.', 'Page 3 of 8')}
</div>`;

/* 11 Capacity building: capacity assessment */
const cap = [
  ['Clearing crews', 4, 1, 5], ['Mulchers', 3, 1, 4], ['Excavators, 30 t', 6, 2, 5], ['Dozers, D6 class', 4, 1, 3],
  ['Equipment operators', 22, 6, 24], ['Labourers', 30, 8, 20], ['Supervisors', 4, 2, 4],
];
const capRows = cap.map(([n, a, c, p]) => {
  const f = a - c, g = f - p;
  return `<tr><td>${n}</td><td class="n">${a}</td><td class="n">${c}</td><td class="n">${f}</td><td class="n">${p}</td><td class="n b">${g > 0 ? '+' + g : g < 0 ? '−' + Math.abs(g) : '0'}</td></tr>`;
}).join('');
const capBars = cap.map(([n, a, c, p]) => {
  const pct = Math.round((a - c) / p * 100);
  return `<div class="wd-bar"><span>${n}</span><div><i style="width:${Math.min(pct, 120) / 120 * 100}%"></i></div><em>${pct}%</em></div>`;
}).join('');
const capacity = `
<div class="wd-under"></div>
<div class="wd-page wd-land ff-b">
  ${hd(NEOS, 'Capacity assessment &nbsp;·&nbsp; Rev 1 &nbsp;·&nbsp; 2026-09-02')}
  <div class="wd-kicker">Capacity building</div>
  <div class="wd-title">Partner Capacity Assessment</div>
  <div class="wd-sub">Crews and equipment against the peak requirement for Work Package 2.</div>
  <div class="wd-cap-grid">
    <div>
      <div class="wd-tablecap wd-tablecap-sm"><span><b>Resource matrix</b></span><span>Units at peak</span></div>
      <table class="wd-t wd-t-tight wd-t-cap">
        <colgroup><col><col style="width:40px"><col style="width:44px"><col style="width:30px"><col style="width:40px"><col style="width:30px"></colgroup>
        <thead><tr><th>Resource</th><th class="n">Available</th><th class="n">Committed</th><th class="n">Free</th><th class="n">Peak need</th><th class="n">Gap</th></tr></thead>
        <tbody>${capRows}</tbody>
      </table>
    </div>
    <div>
      <div class="wd-tablecap wd-tablecap-sm"><span><b>Free capacity as % of peak need</b></span></div>
      <div class="wd-bars">${capBars}<div class="wd-bars-line"><span>100%</span></div></div>
    </div>
  </div>
  <div class="wd-cap-foot">
    <div>
      <div class="wd-tablecap"><span><b>Clearing crews by month</b></span><span class="wd-cols-key"><i class="av"></i>Available <i class="rq"></i>Required</span></div>
      <div class="wd-cols">${[['Nov', 3, 3], ['Dec', 3, 5], ['Jan', 3, 5], ['Feb', 4, 4], ['Mar', 4, 2]].map(([m, a, r]) => `<div><span><i class="av" style="height:${a * 9}px"></i><i class="rq" style="height:${r * 9}px"></i></span><b>${m}</b></div>`).join('')}</div>
    </div>
    <div class="wd-notes"><b>Scale-up priorities</b>
      <div>1. Subcontract two clearing crews through Nation-owned businesses before week 6.</div>
      <div>2. Rent two mulchers for the peak, weeks 6 to 11. Review purchase after the season.</div>
      <div>3. Recruit and ticket 8 equipment operators by 2026-11-01.</div>
      <div>4. Add 2 supervisors from the foreman pool, with mentoring.</div>
    </div>
  </div>
  ${foot('Assessment tool. Figures confirmed with each partner.', 'Page 2 of 6')}
</div>`;

/* 12 Mutual benefit agreements: framework and term sheet */
const benefits = `
<div class="wd-page wd-port wd-back ff-l">
  <div class="wd-legal-top"><span>MBA-TS · Draft 3</span><span>Schedule 1</span></div>
  <div class="wd-art">SCHEDULE 1 &nbsp;REPORTING MEASURES</div>
  <table class="wd-t wd-t-tight ff-b">
    <colgroup><col><col style="width:62px"><col style="width:50px"></colgroup>
    <thead><tr><th>Measure</th><th>Target</th><th>Reported</th></tr></thead>
    <tbody>
      <tr><td>Hours worked by Nation members</td><td>Set yearly</td><td>Quarterly</td></tr>
      <tr><td>Apprentices and trainees placed</td><td>Set yearly</td><td>Quarterly</td></tr>
      <tr><td>Contract value to Nation-owned businesses</td><td>Set yearly</td><td>Quarterly</td></tr>
      <tr><td>Work packages offered first</td><td>All listed</td><td>Quarterly</td></tr>
      <tr><td>Invoices paid within 30 days</td><td>95%</td><td>Quarterly</td></tr>
      <tr><td>Committee meetings held</td><td>4 per year</td><td>Yearly</td></tr>
    </tbody>
  </table>
  <div class="wd-cl"><span>S1.2</span>Measures are reported to the implementation committee. The committee may adjust targets once a year by agreement.</div>
  <div class="wd-cl"><span>S1.3</span>Personal information is reported in summary form only.</div>
  <div class="wd-initials"><span>Page 6 of 6</span></div>
</div>
<div class="wd-page wd-port wd-front ff-l">
  <div class="wd-legal-top"><span class="wd-stamp">Without prejudice · Draft for discussion</span><span>MBA-TS · Draft 3 · 2026-09-10</span></div>
  <div class="wd-legal-title">MUTUAL BENEFIT AGREEMENT</div>
  <div class="wd-legal-subt">Framework and Term Sheet</div>
  <div class="wd-cl wd-cl-full wd-center">Between Nation A, together with its development corporation, and Company B</div>
  <table class="wd-t wd-t-terms">
    <colgroup><col style="width:120px"><col></colgroup>
    <tbody>
      <tr><td><b>1.</b> Purpose</td><td>Set out how the parties share the opportunities and benefits of the project.</td></tr>
      <tr><td><b>2.</b> Participation</td><td>Nation A development corporation receives the first opportunity to price listed work packages, and a right to partner on others.</td></tr>
      <tr><td><b>3.</b> Employment and training</td><td>Hiring targets for Nation members, reported quarterly. Training pathways for equipment operators and trades.</td></tr>
      <tr><td><b>4.</b> Contracting</td><td>Work packages set aside for Nation-owned businesses. Payment within 30 days. Support with bonding and prequalification.</td></tr>
      <tr><td><b>5.</b> Administration</td><td>Implementation committee of two members from each party, meeting quarterly. Annual report to Chief and Council and to company leadership.</td></tr>
      <tr><td><b>6.</b> Term and review</td><td>Five years, with a joint review after year two.</td></tr>
      <tr><td><b>7.</b> Disputes</td><td>Committee first, then senior leaders, then mediation.</td></tr>
      <tr><td><b>8.</b> Confidentiality</td><td>Terms stay confidential until both parties agree to share them with members and staff.</td></tr>
    </tbody>
  </table>
  <div class="wd-signoff wd-signoff-2"><div><b>Reviewed for discussion</b><span class="wd-sigline"></span>Nation A</div><div><b>Reviewed for discussion</b><span class="wd-sigline"></span>Company B</div></div>
  <div class="wd-initials"><span>Subject to the parties' agreement and legal review.</span><span>Page 1 of 6</span></div>
</div>`;

export const DOCS = [
  { id: 'estimating', label: 'Preliminary estimate workbook', html: estimating },
  { id: 'rate-development', label: 'Labour rate schedule', html: rates },
  { id: 'safety', label: 'Health and safety manual, contents page', html: safety, spread: true },
  { id: 'rfq', label: 'Request for quotation', html: rfq, spread: true },
  { id: 'proposal', label: 'Proposal review matrix', html: proposal },
  { id: 'execution', label: 'Preliminary execution plan', html: execution },
  { id: 'contracts', label: 'Construction trade contract', html: contracts, spread: true },
  { id: 'review', label: 'Contract review with proposed revisions', html: review },
  { id: 'engagement', label: 'Regional engagement plan', html: engagement },
  { id: 'partnerships', label: 'Partnership options: revenue share and joint venture', html: partnerships },
  { id: 'capacity', label: 'Partner capacity assessment', html: capacity },
  { id: 'benefits', label: 'Mutual benefit agreement term sheet', html: benefits, spread: true },
];
