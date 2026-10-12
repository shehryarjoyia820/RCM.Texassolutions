/**
 * Blog batch 3 (keyword plan 2026-10-13): dental crossover, code updates, denials, careers.
 * Rules: docs/CONTENT-GUIDE.md. Internal links must use slugs from src/content/slugs.ts.
 */
import type { SeedPost } from './seed';

const S = {
  adaCdt: { label: 'ADA: CDT Code on Dental Procedures and Nomenclature', url: 'https://www.ada.org/publications/cdt' },
  adaCmc: { label: 'ADA: Code Maintenance Committee', url: 'https://www.ada.org/publications/cdt/code-maintenance-committee' },
  adaClaimForm: { label: 'ADA: ADA Dental Claim Form', url: 'https://www.ada.org/publications/cdt/ada-dental-claim-form' },
  adaInsurance: { label: 'ADA: Dental Insurance resources', url: 'https://www.ada.org/resources/practice/dental-insurance' },
  adaNewsCdt2026: { label: 'ADA News: 60 changes coming to CDT Code in 2026', url: 'https://adanews.ada.org/ada-news/2025/june/60-changes-coming-to-cdt-code-in-2026-1/' },
  adaNewsCdt2027: { label: 'ADA News: 67 changes coming to CDT 2027', url: 'https://adanews.ada.org/ada-news/2026/april/67-changes-coming-to-cdt-2027/' },
  amaCpt2026: { label: 'AMA: AMA releases CPT 2026 code set', url: 'https://www.ama-assn.org/press-center/ama-press-releases/ama-releases-cpt-2026-code-set' },
  amaCpt2027: { label: 'AMA: AMA releases CPT 2027 code set', url: 'https://www.ama-assn.org/press-center/ama-press-releases/ama-releases-cpt-2027-code-set' },
  amaCpt: { label: 'AMA: CPT (Current Procedural Terminology)', url: 'https://www.ama-assn.org/practice-management/cpt' },
  cmsIcd10: { label: 'CMS: ICD-10 Codes (annual ICD-10-CM and ICD-10-PCS files)', url: 'https://www.cms.gov/medicare/coding-billing/icd-10-codes' },
  cdcIcd10: { label: 'CDC/NCHS: ICD-10-CM', url: 'https://www.cdc.gov/nchs/icd/icd-10-cm/index.html' },
  cmsHcpcs: { label: 'CMS: Healthcare Common Procedure Coding System (HCPCS)', url: 'https://www.cms.gov/medicare/coding-billing/healthcare-common-procedure-system' },
  cmsDental: { label: 'CMS: Medicare Dental Coverage', url: 'https://www.cms.gov/medicare/coverage/dental' },
  cmsLcdOat: { label: 'CMS Medicare Coverage Database: LCD L33611, Oral Appliances for Obstructive Sleep Apnea', url: 'https://www.cms.gov/medicare-coverage-database/view/lcd.aspx?lcdid=33611' },
  cmsDmeposFees: { label: 'CMS: DMEPOS Fee Schedule', url: 'https://www.cms.gov/medicare/payment/fee-schedules/dmepos' },
  cmsEnrollment: { label: 'CMS: Medicare enrollment for providers and suppliers', url: 'https://www.cms.gov/medicare/enrollment-renewal/providers-suppliers' },
  cmsPecos: { label: 'CMS: PECOS (Provider Enrollment, Chain and Ownership System)', url: 'https://www.cms.gov/medicare/enrollment-renewal/providers-suppliers/chain-ownership-system-pecos' },
  cmsCob: { label: 'CMS: Coordination of Benefits and Recovery Overview', url: 'https://www.cms.gov/medicare/coordination-benefits-recovery/overview' },
  cmsAdminSimp: { label: 'CMS: Administrative Simplification', url: 'https://www.cms.gov/medicare/regulations-guidance/administrative-simplification' },
  nucc1500: { label: 'NUCC: 1500 Health Insurance Claim Form', url: 'https://www.nucc.org/index.php/1500-claim-form-mainmenu-35' },
  medicaidDental: { label: 'Medicaid.gov: Dental Care', url: 'https://www.medicaid.gov/medicaid/benefits/dental-care' },
  medicaidEpsdt: { label: 'Medicaid.gov: Early and Periodic Screening, Diagnostic, and Treatment', url: 'https://www.medicaid.gov/medicaid/benefits/early-and-periodic-screening-diagnostic-and-treatment' },
  insureKidsDental: { label: 'InsureKidsNow.gov: Dental coverage for children', url: 'https://www.insurekidsnow.gov/coverage/dental' },
  x12Carc: { label: 'X12: Claim Adjustment Reason Codes', url: 'https://x12.org/codes/claim-adjustment-reason-codes' },
  x12Rarc: { label: 'X12: Remittance Advice Remark Codes', url: 'https://x12.org/codes/remittance-advice-remark-codes' },
  hhsBa: { label: 'HHS: Business Associates (HIPAA guidance)', url: 'https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/business-associates/index.html' },
  hhsBaa: { label: 'HHS: Sample Business Associate Agreement Provisions', url: 'https://www.hhs.gov/hipaa/for-professionals/covered-entities/sample-business-associate-agreement-provisions/index.html' },
  aapcCpc: { label: 'AAPC: Certified Professional Coder (CPC)', url: 'https://www.aapc.com/certifications/cpc' },
  aapcCpb: { label: 'AAPC: Certified Professional Biller (CPB)', url: 'https://www.aapc.com/certifications/cpb' },
  ahimaCca: { label: 'AHIMA: Certified Coding Associate (CCA)', url: 'https://www.ahima.org/certification-careers/certifications-overview/cca/' },
  ahimaCcs: { label: 'AHIMA: Certified Coding Specialist (CCS)', url: 'https://www.ahima.org/certification-careers/certifications-overview/ccs/' },
  nhaCbcs: { label: 'NHA: Certified Billing and Coding Specialist (CBCS)', url: 'https://www.nhanow.com/certification/nha-certifications/medical-billing-and-coding-specialist-(cbcs)' },
  hfmaCrcr: { label: 'HFMA: Certified Revenue Cycle Representative (CRCR)', url: 'https://www.hfma.org/certification/crcr/' },
};

export const seedPosts3: SeedPost[] = [
  // 1 ------------------------------------------------------------------
  {
    slug: 'medical-billing-for-dental-sleep-apnea',
    title: 'Medical Billing for Dental Sleep Apnea: How Oral Appliance Therapy Gets Paid',
    seoTitle: 'Medical Billing for Dental Sleep Apnea: A Practical Guide',
    metaDescription:
      'How medical billing for dental sleep apnea works: sleep study diagnosis, medical plan rules, Medicare DME supplier enrollment, prior authorization and records.',
    excerpt:
      'Oral appliance therapy for obstructive sleep apnea is usually billed to medical insurance, not the dental plan. Here is what the diagnosis, enrollment, authorization and documentation steps look like.',
    category: 'Dental Billing',
    tags: ['dental sleep medicine', 'oral appliance therapy', 'medical billing', 'cross coding', 'Medicare DME'],
    readingMinutes: 8,
    publishedAt: '2026-10-11',
    html: `
<p><strong>Medical billing for dental sleep apnea means submitting oral appliance therapy to the patient's medical plan, because obstructive sleep apnea is a medical diagnosis.</strong> The claim needs a sleep study and diagnosis from a physician or other qualified practitioner, a written order, proof of medical necessity, and often prior authorization. For Medicare, the dentist must also be enrolled as a durable medical equipment (DME) supplier.</p>

<p>Many dental offices that start offering sleep appliances are surprised by how different this work feels from routine dental billing. Dental plans rarely cover the device for sleep apnea, so the revenue depends on getting medical claims right. This guide walks through each step and the details that most often cause delays.</p>

<h2>Why does oral appliance therapy go to medical insurance?</h2>
<p>Obstructive sleep apnea (OSA) is a breathing disorder, not a dental disease. Medical plans treat a custom oral appliance as one way of treating that disorder, alongside positive airway pressure (PAP) devices and surgery. That means the medical plan expects the same things it expects for any medical service: a diagnosis made by a qualified practitioner, codes that describe the condition and the device, and records that show why the treatment is necessary.</p>
<p>The dental plan may still matter. Some dental plans cover related services such as exams or adjustments, and a few patients have no medical coverage for the device at all. Verifying both plans before the impression appointment avoids the most frustrating surprises. Our <a href="/services/dental-insurance-verification/">dental insurance verification</a> process is built around checking dental and medical benefits together for crossover cases like this.</p>

<h2>What has to happen before the dentist can bill?</h2>
<p>The order of events matters, because payers look at dates. A common sequence looks like this:</p>
<ol>
<li><strong>Clinical evaluation by a treating practitioner.</strong> A physician or other qualified medical practitioner evaluates the patient for suspected sleep apnea.</li>
<li><strong>Sleep test.</strong> An in-lab polysomnogram or a home sleep apnea test, interpreted by a qualified provider, confirms the diagnosis and its severity.</li>
<li><strong>Diagnosis and order.</strong> The practitioner reviews the results, documents the diagnosis and writes an order or prescription for an oral appliance.</li>
<li><strong>Dental evaluation.</strong> The dentist confirms the patient is a suitable candidate: enough healthy teeth to retain the device, a healthy periodontium and no temporomandibular joint problems that would rule it out.</li>
<li><strong>Benefits check and authorization.</strong> The office verifies coverage and requests prior authorization if the plan requires it.</li>
<li><strong>Fabrication, delivery and follow-up.</strong> The appliance is delivered, titrated and followed, often with a later sleep test to confirm effectiveness.</li>
</ol>
<p>A dentist cannot diagnose sleep apnea for billing purposes. Screening questionnaires used in the dental chair are useful for referral, but the medical claim rests on the physician's diagnosis and the sleep study report.</p>

<h2>How does Medicare treat oral appliances?</h2>
<p>Medicare covers custom oral appliances for OSA as durable medical equipment under a local coverage determination (LCD) that the DME Medicare Administrative Contractors publish, titled Oral Appliances for Obstructive Sleep Apnea (L33611). In plain terms, the policy expects:</p>
<ul>
<li>An in-person clinical evaluation by the treating practitioner before the sleep test.</li>
<li>A Medicare-covered sleep test that meets the policy's severity thresholds, with extra requirements at some severity levels (for example, for severe OSA the policy looks for PAP intolerance or a practitioner's finding that PAP is not appropriate).</li>
<li>An order from the treating practitioner written after reviewing the sleep test.</li>
<li>A device provided and billed by a licensed dentist.</li>
</ul>
<p>The custom device is typically reported with HCPCS Level II code E0486, and the product itself generally needs to appear on the coding verification list for that code. Prefabricated appliances are treated differently under the policy. Because LCDs are revised from time to time, read the current version in the CMS Medicare Coverage Database before you build your workflow.</p>

<h3>Do dentists need to enroll as a DME supplier?</h3>
<p>Yes, if they want to bill Medicare for the appliance. Medicare pays DME claims through the DME MACs, not through the Part B contractor that handles physician services, and the supplier must be enrolled for that purpose. Dental practices typically enroll as a DMEPOS supplier through the CMS-855S application, and they must meet supplier standards that apply to their situation. Enrollment as an ordering and referring provider alone does not let a dentist bill for the device. Some dentists choose to opt out of Medicare, which has different consequences, so this is a decision to make deliberately rather than by default.</p>
<p>Enrollment takes time and paperwork. Our <a href="/services/provider-enrollment/">provider enrollment</a> team can help organize applications and follow them through, but the practice decides how it wants to participate.</p>

<h2>What codes go on the medical claim?</h2>
<p>Medical claims for oral appliance therapy are filed on the CMS-1500 form or its electronic equivalent, the 837P transaction, or with the DME MAC for Medicare. The claim generally includes:</p>
<ul>
<li><strong>An ICD-10-CM diagnosis code</strong> for the type of sleep apnea documented by the physician, such as the code for obstructive sleep apnea in the G47.3 category.</li>
<li><strong>A HCPCS or CPT code for the device or service.</strong> E0486 is the common HCPCS code for a custom device. Commercial plans may also accept CPT codes for evaluation and follow-up visits, depending on the contract.</li>
<li><strong>The referring or ordering provider's name and NPI.</strong></li>
<li><strong>Modifiers</strong> the payer requires, for example to indicate that documentation requirements are met.</li>
</ul>
<p>Commercial medical plans vary a great deal. Some follow Medicare's criteria closely, while others set their own rules on sleep test severity, PAP trials or which provider types they credential. Cross coding from dental CDT codes to medical codes is a skill on its own, which is why many offices treat it as a separate workflow. Our page on <a href="/services/dental-medical-cross-coding/">dental medical cross coding</a> describes how we approach it.</p>

<h2>Does oral appliance therapy need prior authorization?</h2>
<p>Often, yes, for commercial medical plans. Many plans require prior authorization or a predetermination before the device is made, and some require documentation that the patient tried or could not tolerate PAP. Medicare's requirements for this device should be confirmed with the DME MAC and the current coverage policy, since prior authorization lists change.</p>
<p>A strong authorization request usually includes the sleep study report, the physician's diagnosis and order, the dental evaluation, any record of PAP use or intolerance, and the planned device. Requests that leave out the sleep study or send an order dated before the test are among the most common reasons for delay. Our <a href="/services/prior-authorization/">prior authorization</a> support follows these requests from submission to decision.</p>

<h2>What documentation should the dental office keep?</h2>
<p>Medical payers audit DME claims, and oral appliances are no exception. Keep a complete file for every patient:</p>
<ul>
<li>The sleep study report and interpretation, with dates.</li>
<li>The treating practitioner's evaluation notes and the signed order.</li>
<li>The dental examination, including candidacy for the device.</li>
<li>Records of PAP intolerance, if relevant to the payer's policy.</li>
<li>Device information, including manufacturer and model.</li>
<li>Proof of delivery signed by the patient.</li>
<li>Follow-up and titration notes, and any follow-up sleep testing.</li>
</ul>
<p>If a claim is denied, this file is what you will draw on for the appeal. Missing proof of delivery or an order that predates the diagnosis is hard to fix after the fact.</p>

<h2>What usually goes wrong with dental sleep apnea claims?</h2>
<ul>
<li><strong>Sending the claim to the dental plan</strong> when the medical plan is the right payer, or vice versa.</li>
<li><strong>Billing Medicare without supplier enrollment</strong> or before enrollment is approved.</li>
<li><strong>Incomplete diagnostic support</strong>, such as a screening questionnaire in place of a sleep test.</li>
<li><strong>Date problems</strong>, such as an order written before the sleep test was read.</li>
<li><strong>Out-of-network surprises</strong>, when the dentist is not credentialed with the patient's medical plan and the patient was not told what that means.</li>
<li><strong>No follow-up on denials</strong> because the team that handles dental claims is not used to medical appeal processes.</li>
</ul>

<h2>How should a dental office set up this workflow?</h2>
<p>Treat sleep apnea billing as its own line of work. Assign one person, or one outside partner, to own it from referral to payment. Build a checklist for each payer type, track authorizations separately, and review denials by reason each month. Keep good relationships with referring sleep physicians so orders and reports arrive complete. Our <a href="/services/dental-billing/">dental billing</a> team works inside your existing practice software and clearinghouse, so medical crossover claims sit next to your dental claims rather than in a separate system.</p>

<h2>Thinking about adding oral appliance therapy?</h2><p>If your office is starting sleep appliance therapy or already offers it and is struggling with medical claims, <a href="/consultation/">schedule a free consultation</a>. We can walk through your referral flow, supplier enrollment status and recent claims with you and point out where the paperwork tends to break down.</p>
`,
    faqs: [
      {
        q: 'Can a dentist bill medical insurance for a sleep apnea oral appliance?',
        a: 'Yes, in many cases. Oral appliance therapy for obstructive sleep apnea is usually billed to the medical plan when a physician or other qualified practitioner has diagnosed OSA through a sleep test and ordered the device, and the plan covers it.',
      },
      {
        q: 'What HCPCS code is used for a custom sleep apnea oral appliance?',
        a: 'Custom oral appliances for obstructive sleep apnea are commonly reported with HCPCS Level II code E0486. Payers set their own rules, so confirm the code and any required modifiers with each plan.',
      },
      {
        q: 'Does a dentist need to enroll with Medicare to bill for an oral appliance?',
        a: 'Yes. To bill Medicare for the device, the dentist generally needs to enroll as a DMEPOS supplier and meet the applicable supplier standards. Enrolling only as an ordering and referring provider does not allow billing for the appliance.',
      },
      {
        q: 'Can a dentist diagnose sleep apnea for insurance purposes?',
        a: 'No. Medical plans expect a diagnosis from a physician or other qualified medical practitioner based on a sleep test. Dentists can screen and refer, then provide the appliance after the diagnosis and order.',
      },
    ],
    sources: [S.cmsLcdOat, S.cmsHcpcs, S.cmsDmeposFees, S.cmsEnrollment, S.nucc1500, S.cmsIcd10],
  },

  // 2 ------------------------------------------------------------------
  {
    slug: 'billing-medical-insurance-for-dental-procedures',
    title: 'How to Bill Medical Insurance for Dental Procedures',
    seoTitle: 'How to Bill Medical Insurance for Dental Procedures',
    metaDescription:
      'How to bill medical insurance for dental procedures: when medical plans pay, implant and TMJ medical billing, trauma, CMS-1500, ICD-10 and medical necessity.',
    excerpt:
      'Some dental procedures are covered by the patient\'s medical plan. This guide explains when that happens, how the medical claim differs from a dental claim, and how to coordinate with the dental plan.',
    category: 'Dental Billing',
    tags: ['cross coding', 'medical billing for dentists', 'dental implant medical billing', 'TMJ medical billing', 'CMS-1500'],
    readingMinutes: 8,
    publishedAt: '2026-10-11',
    html: `
<p><strong>To bill medical insurance for dental procedures, you submit a medical claim on the CMS-1500 form (or the electronic 837P) using ICD-10-CM diagnosis codes, CPT or HCPCS procedure codes, and records that show medical necessity.</strong> It works when the procedure treats a medical condition, such as an injury, infection, tumor or jaw disorder, and the patient's medical plan covers that service.</p>

<p>Dental offices often leave this money on the table because medical billing feels unfamiliar. Others try it for every procedure and end up with a stack of denials. The goal is to recognize the cases where a medical plan is the right payer, then build a claim that a medical reviewer will understand.</p>

<h2>When will a medical plan pay for a dental procedure?</h2>
<p>A medical plan generally pays when the procedure treats a medical problem rather than routine dental disease. The specifics depend on the plan, but common categories include:</p>
<ul>
<li><strong>Accidental injury.</strong> Fractured teeth, avulsions and jaw fractures caused by an accident, often with time limits on when treatment must start.</li>
<li><strong>Oral surgery tied to medical conditions.</strong> Biopsies, removal of cysts or lesions, treatment of serious infections, and some extractions related to medical treatment.</li>
<li><strong>Temporomandibular joint disorders.</strong> Evaluation, splints and other therapy for TMJ disorders, when the plan does not exclude them.</li>
<li><strong>Congenital conditions and reconstruction.</strong> Care related to cleft palate, missing teeth from congenital conditions, or reconstruction after tumor removal.</li>
<li><strong>Sleep apnea appliances.</strong> Covered as a treatment for a medical diagnosis, which we explain in our guide to <a href="/blog/medical-billing-for-dental-sleep-apnea/">medical billing for dental sleep apnea</a>.</li>
<li><strong>Diagnostic imaging and consults</strong> related to a medical complaint, such as cone beam imaging for a suspected pathology.</li>
</ul>
<p>Routine fillings, cleanings and crowns for decay are rarely covered by medical plans. Many medical policies also contain a dental exclusion that removes most services performed on the teeth, so read the policy language before you promise a patient anything.</p>

<h2>How is a medical claim different from a dental claim?</h2>
<table>
<thead><tr><th>Element</th><th>Dental claim</th><th>Medical claim</th></tr></thead>
<tbody>
<tr><td>Form</td><td>ADA Dental Claim Form or 837D</td><td>CMS-1500 or 837P</td></tr>
<tr><td>Procedure codes</td><td>CDT</td><td>CPT and HCPCS Level II</td></tr>
<tr><td>Diagnosis codes</td><td>Often optional</td><td>ICD-10-CM required, and must support the procedure</td></tr>
<tr><td>Supporting records</td><td>Radiographs, charting, narratives</td><td>Clinical notes showing history, findings, medical necessity and plan</td></tr>
<tr><td>Provider enrollment</td><td>Dental network</td><td>Medical network, which may require separate credentialing</td></tr>
</tbody>
</table>
<p>The diagnosis is the part dental teams most often underestimate. On a medical claim, the ICD-10-CM codes tell the reviewer why the service was necessary. A procedure code without a diagnosis that supports it will usually be denied.</p>

<h2>How does dental implant medical billing work?</h2>
<p>Dental implant medical billing succeeds only in a narrow set of cases. Most medical plans exclude implants, but some will consider implant-related surgery or bone grafting when tooth loss resulted from an accident, from tumor removal, or from a congenital condition, or when a medical condition makes a conventional prosthesis unworkable.</p>
<p>For these cases, the claim should tell a clear story: the cause of tooth loss, the date and nature of any injury, the medical history, why other options are not suitable, and the treatment plan. Imaging, operative notes and a letter of medical necessity are commonly requested. Predetermination is strongly recommended before surgery so the patient understands what the medical plan will and will not pay. The prosthetic crown on the implant is more often a dental plan question, so expect to coordinate between the two plans.</p>

<h2>How does TMJ medical billing work?</h2>
<p>TMJ medical billing depends heavily on the plan. Some medical plans cover the evaluation and treatment of temporomandibular joint disorders, some cover only surgical care, and some exclude TMJ treatment entirely. Where coverage exists, the plan typically wants:</p>
<ul>
<li>A documented history of symptoms, such as pain, clicking, limited opening or headaches.</li>
<li>Examination findings and any imaging.</li>
<li>Specific ICD-10-CM codes that match the documented disorder.</li>
<li>A treatment plan that explains the appliance or therapy and expected duration.</li>
<li>Records of earlier conservative treatment, when the plan expects it.</li>
</ul>
<p>Oral appliances for TMJ disorders may be billed with CPT or HCPCS codes the plan recognizes, and some plans require authorization first. Because policies differ, check coverage for the specific diagnosis and service before you start treatment.</p>

<h2>How should you bill dental trauma to medical insurance?</h2>
<p>Trauma is one of the most common reasons to bill a medical plan from a dental office. The key details are:</p>
<ul>
<li><strong>Accident information.</strong> Date, location and cause of the injury. Claims ask whether the condition relates to an accident, employment or another party.</li>
<li><strong>Other liable payers.</strong> If the injury happened at work or in a car accident, workers' compensation or auto insurance may be primary. If another person caused the injury, a liability carrier may be involved.</li>
<li><strong>External cause codes.</strong> Many medical plans want ICD-10-CM external cause codes that describe how the injury happened, in addition to the injury codes themselves.</li>
<li><strong>Timely treatment.</strong> Some plans only cover accidental dental injuries if treatment begins within a set period after the accident.</li>
</ul>

<h2>How do the medical and dental plans coordinate?</h2>
<p>When a procedure qualifies under both plans, the medical plan is typically billed first for medical services, and the dental plan then considers the remainder according to its coordination of benefits rules. Send the medical explanation of benefits with the dental claim so the dental plan can see what was paid or denied. Some dental plans require proof of a medical denial before they will pay for a service that could be medical.</p>
<p>Keep the patient informed. Tell them in writing which plan you will bill first and what you expect each to do. A short conversation before treatment prevents most billing complaints later.</p>

<h2>What does a medical necessity narrative need?</h2>
<p>A medical necessity narrative is a short clinical summary that answers the reviewer's questions before they ask. It should state the diagnosis, the symptoms or findings, relevant medical history, what has been tried, why this procedure is needed now, and what is likely to happen without it. Keep it factual and specific to the patient. Template letters that read the same for every patient tend to be less persuasive.</p>

<h2>What does a dental office need before it starts billing medical plans?</h2>
<ul>
<li>A Type 1 NPI for each billing provider and, for a group, a Type 2 NPI.</li>
<li>Enrollment or credentialing with the medical plans you intend to bill, or a plan for out-of-network billing.</li>
<li>Access to current ICD-10-CM, CPT and HCPCS code sets.</li>
<li>Practice management software or a clearinghouse that can produce 837P claims.</li>
<li>A team member or partner trained in medical documentation and appeals.</li>
</ul>
<p>Credentialing is often the longest step. Our <a href="/services/dental-credentialing/">dental credentialing</a> service can help organize applications with the medical plans you choose.</p>

<h2>Should you handle cross coding in house?</h2>
<p>It depends on volume. An oral surgery practice that bills medical plans every day often benefits from a trained in-house specialist. A general practice with a handful of medical claims a month may find it easier to send those claims to a partner who works with medical plans regularly. Either way, the process should be documented so it does not depend on one person's memory. You can read more about our <a href="/services/dental-medical-cross-coding/">dental medical cross coding</a> support and how it fits alongside <a href="/specialties/oral-surgery/">oral surgery billing</a>.</p>

<h2>Wondering which of your procedures could be billed to medical plans?</h2><p>If you suspect some of your trauma, TMJ or surgical cases should be going to medical insurance, <a href="/consultation/">book a free consultation</a>. We will review a sample of recent cases with you and talk through which ones fit a medical claim and what records each one would need.</p>
`,
    faqs: [
      {
        q: 'Can dental procedures be billed to medical insurance?',
        a: 'Yes, when the procedure treats a medical condition and the medical plan covers it. Common examples include accidental injuries, biopsies and other oral surgery tied to medical conditions, TMJ treatment and sleep apnea appliances.',
      },
      {
        q: 'What form is used to bill medical insurance from a dental office?',
        a: 'Medical claims use the CMS-1500 form or its electronic equivalent, the 837P transaction. They require ICD-10-CM diagnosis codes and CPT or HCPCS procedure codes rather than CDT codes.',
      },
      {
        q: 'Does medical insurance cover dental implants?',
        a: 'Usually not, but some medical plans consider implant-related surgery when tooth loss resulted from an accident, tumor removal or a congenital condition. Predetermination with the medical plan is recommended before treatment.',
      },
      {
        q: 'Which plan is billed first when both medical and dental may apply?',
        a: 'The medical plan is generally billed first for medical services, and the dental plan considers any remaining amount under its coordination of benefits rules. Include the medical EOB with the dental claim.',
      },
    ],
    sources: [S.nucc1500, S.cmsIcd10, S.cmsHcpcs, S.amaCpt, S.adaClaimForm, S.cmsCob],
  },

  // 3 ------------------------------------------------------------------
  {
    slug: 'medicaid-and-medicare-dental-billing',
    title: 'Medicaid and Medicare Dental Billing: What Dental Offices Need to Know',
    seoTitle: 'Medicaid and Medicare Dental Billing Explained',
    metaDescription:
      'Medicaid dental billing varies by state, with required EPSDT dental care for children. Medicare dental billing is limited to narrow exceptions. How each works.',
    excerpt:
      'Medicaid and Medicare treat dental care very differently. This guide covers state Medicaid dental programs, EPSDT for children, the narrow Medicare dental exceptions, and Medicare Advantage dental benefits.',
    category: 'Medicare and Medicaid Updates',
    tags: ['Medicaid dental billing', 'Medicare dental billing', 'EPSDT', 'Medicare Advantage', 'dental billing'],
    readingMinutes: 8,
    publishedAt: '2026-10-11',
    html: `
<p><strong>Medicaid dental billing is run by each state, which must cover dental care for children through the EPSDT benefit but decides for itself what adult dental care to cover. Medicare dental billing is far narrower: Original Medicare generally excludes dental care, paying only in limited cases tied to covered medical treatment.</strong> Many Medicare Advantage plans add their own dental benefits.</p>

<p>Because the two programs work so differently, dental offices that see Medicaid or Medicare patients need separate rules, separate verification steps and often separate enrollment. This guide explains the basics. Program details change, so confirm current rules with your state Medicaid agency and with CMS at cms.gov before you rely on them.</p>

<h2>How does Medicaid dental billing work?</h2>
<p>Medicaid is jointly funded by the federal government and the states, and each state runs its own program within federal rules. For dental offices, that means the rules you follow depend on where you practice. Key questions to answer for your state:</p>
<ul>
<li><strong>Who administers dental benefits?</strong> Some states pay dental claims directly through the state Medicaid agency or its fiscal agent. Many contract with dental managed care organizations or dental benefit administrators, each with its own enrollment, portal and claim rules.</li>
<li><strong>What is covered for adults?</strong> Adult dental coverage is optional for states. Some cover only emergency care, some cover a limited set of services, and some offer more extensive benefits.</li>
<li><strong>What needs prior authorization?</strong> Many programs require authorization for services such as crowns, dentures, periodontal treatment, orthodontics and treatment under general anesthesia.</li>
<li><strong>What are the frequency limits and fee schedules?</strong> Medicaid fee schedules are set by the state or the plan, and providers generally must accept the Medicaid payment as payment in full for covered services.</li>
</ul>
<p>Providers must enroll with the state Medicaid program, and often separately with each managed care plan, before they can be paid. If you are adding Medicaid plans, our <a href="/services/dental-credentialing/">dental credentialing</a> team can help organize those applications.</p>

<h3>What is EPSDT dental coverage for children?</h3>
<p>The Early and Periodic Screening, Diagnostic, and Treatment (EPSDT) benefit is Medicaid's comprehensive benefit for enrollees under age 21. Under federal rules, Medicaid must cover dental services for children, including at a minimum relief of pain and infections, restoration of teeth and maintenance of dental health. States set periodicity schedules for dental visits, and medically necessary treatment found during a screening must be covered even if it is not otherwise listed in the state plan.</p>
<p>The Children's Health Insurance Program (CHIP) also includes dental coverage. States that run CHIP as part of Medicaid follow EPSDT rules, while separate CHIP programs must still cover dental services that prevent disease, promote oral health, restore oral structures and treat emergencies. For pediatric offices, verifying which program and which plan a child belongs to is the first step on every visit. Our page on <a href="/specialties/pediatric-dentistry/">pediatric dental billing</a> covers more of this workflow.</p>

<h2>What makes Medicaid dental claims get denied?</h2>
<ul>
<li>Eligibility that lapsed or changed plans between the appointment and the date of service.</li>
<li>Missing or expired prior authorization.</li>
<li>Services over the program's frequency limits.</li>
<li>Rendering providers who are not individually enrolled.</li>
<li>Missing attachments such as radiographs or charting.</li>
<li>Claims sent to the state when the patient is in a managed care plan, or the reverse.</li>
</ul>
<p>Checking eligibility on the day of service, not only when the appointment is booked, prevents many of these. Medicaid eligibility can change month to month.</p>

<h2>Does Medicare cover dental care?</h2>
<p>Generally no. The Medicare statute excludes most dental services, such as routine cleanings, fillings, extractions and dentures. CMS does pay for dental services in a limited number of situations where the dental care is inextricably linked to, and clinically necessary for, a Medicare-covered medical service. Examples CMS lists include dental exams and treatment needed before an organ transplant, cardiac valve replacement or valvuloplasty, certain cancer treatments, and dialysis for end-stage renal disease, as well as some services related to jaw fractures and reconstruction after tumor removal.</p>
<p>CMS has added to this list through recent Physician Fee Schedule rules, so it is worth checking the CMS Medicare dental coverage page each year.</p>

<h3>How are Medicare-covered dental services billed?</h3>
<p>When a dental service qualifies, CMS expects the claim to show that link to the covered medical service. As of July 1, 2025, CMS requires the KX modifier on claims for dental services that the clinician believes are inextricably linked to covered medical services, and requires an ICD-10-CM diagnosis code on dental claims (the 837D or the ADA claim form) for these services. The practitioner must be enrolled in Medicare to bill, and documentation should clearly connect the dental work to the medical treatment, often through communication with the treating physician.</p>

<h2>What about Medicare Advantage dental benefits?</h2>
<p>Medicare Advantage (Part C) plans are offered by private insurers and many include supplemental dental benefits that go beyond Original Medicare. These benefits vary widely: some cover only preventive care, others cover basic and major services, and many have annual maximums. The benefit may be administered by a separate dental carrier with its own network, claim address and payer ID.</p>
<p>For billing, treat Medicare Advantage dental benefits like a commercial dental plan whose rules you must verify individually. Confirm the dental administrator, network status, covered services, frequencies and maximum at each visit. Our <a href="/services/dental-insurance-verification/">dental insurance verification</a> service is designed to capture these details before the appointment.</p>

<h2>What about patients who have both Medicare and Medicaid?</h2>
<p>Some patients are dually eligible. Medicaid is generally the payer of last resort, so when Medicare or a Medicare Advantage plan covers a service, it pays first. Some states cover dental services for dually eligible people through Medicaid or through integrated plans. These cases need careful verification of which plan is primary for each service.</p>

<h2>How do government program claims differ from commercial dental claims?</h2>
<p>The claim form is usually the same, but the surrounding rules are stricter. Medicaid programs and their managed care plans often require that every rendering dentist, not only the practice, is enrolled and linked to the billing entity. Many require authorization numbers on the claim itself, and some will not pay for a service at all if the authorization was obtained after treatment began. Filing limits can be shorter than commercial plans, and corrected claims often follow a specific replacement or void process.</p>
<p>Patient financial rules also differ. When a patient has Medicaid and the service is covered, the office generally cannot bill the patient for the difference between its fee and the Medicaid payment. If a service is not covered, many states have rules about informing the patient in advance and documenting their agreement to pay. Medicare dental services that are not inextricably linked to covered care are simply not Medicare benefits, but documenting that clearly for the patient still prevents confusion. Train front desk staff on these differences, because the patient conversation usually happens before the billing team sees the claim.</p>

<h2>How should a dental office organize government program billing?</h2>
<ul>
<li>Keep a short reference sheet for each program and plan you accept: enrollment status, claim address or payer ID, authorization rules and frequency limits.</li>
<li>Verify eligibility at scheduling and again on the day of service.</li>
<li>Track authorizations with their expiration dates.</li>
<li>Review denials by program each month to spot repeated problems.</li>
<li>Watch for program bulletins and fee schedule updates from your state and from CMS.</li>
</ul>
<p>Government program claims tend to have strict filing limits and detailed attachment rules. A consistent <a href="/services/dental-claims-processing/">dental claims processing</a> routine and timely follow-up on <a href="/services/dental-accounts-receivable/">dental accounts receivable</a> help keep them from aging out.</p>

<h2>Want a second look at your Medicaid or Medicare dental claims?</h2><p>If government program claims are a growing share of your dental practice, <a href="/consultation/">set up a free consultation</a>. We can go over your current programs, authorization tracking and recent denials with you and talk about how a steadier verification and follow-up routine could work in your office.</p>
`,
    faqs: [
      {
        q: 'Does Medicaid cover dental care for adults?',
        a: 'It depends on the state. Adult dental coverage is optional under federal Medicaid rules, so some states cover only emergencies, some cover limited services and some offer broader benefits.',
      },
      {
        q: 'Is children\'s dental care covered by Medicaid?',
        a: 'Yes. Medicaid must cover dental services for enrolled children through the EPSDT benefit, including relief of pain and infections, restoration of teeth and maintenance of dental health.',
      },
      {
        q: 'Does Original Medicare pay for dental work?',
        a: 'Generally no. Medicare pays for dental services only in limited situations where the dental care is inextricably linked to a covered medical service, such as certain care before an organ transplant or cardiac valve replacement.',
      },
      {
        q: 'What is the KX modifier for Medicare dental claims?',
        a: 'CMS requires the KX modifier, as of July 1, 2025, on claims for dental services the clinician believes are inextricably linked to covered medical services. A diagnosis code is also required on the dental claim for these services.',
      },
      {
        q: 'Do Medicare Advantage plans cover dental?',
        a: 'Many do, as a supplemental benefit. Coverage, networks and annual maximums vary by plan, and the benefit is often administered by a separate dental carrier, so verify each patient\'s plan.',
      },
    ],
    sources: [S.medicaidDental, S.medicaidEpsdt, S.insureKidsDental, S.cmsDental, S.cmsCob],
  },

  // 4 ------------------------------------------------------------------
  {
    slug: 'ppo-dental-billing-guide',
    title: 'PPO Dental Billing: Fee Schedules, Write-Offs and Downgrades Explained',
    seoTitle: 'PPO Dental Billing Guide: Fees, Write-Offs, Downgrades',
    metaDescription:
      'PPO dental billing explained: in-network fee schedules, write-offs, UCR, leased networks, downgrades, frequency limits and fee schedule negotiation basics.',
    excerpt:
      'A practical guide to billing dental PPO plans: how contracted fees and write-offs work, why claims get downgraded, how leased networks affect you, and what to know before renegotiating fees.',
    category: 'Dental Billing',
    tags: ['PPO dental billing', 'dental fee schedule', 'write-offs', 'downgrades', 'fee negotiation'],
    readingMinutes: 8,
    publishedAt: '2026-10-11',
    html: `
<p><strong>PPO dental billing means submitting your full office fee on each claim, receiving payment based on the plan's contracted fee schedule, and writing off the difference as a contractual adjustment.</strong> The patient pays their share of the contracted fee, not your full fee. Getting PPO billing right depends on loading the correct fee schedules, posting write-offs accurately and watching for downgrades and frequency limits.</p>

<p>Preferred provider organization (PPO) plans are among the most common dental benefits in the United States, and many offices participate in several of them. Each plan has its own fee schedule, rules and quirks, which is why PPO billing is often where dental revenue quietly leaks away. This guide covers the mechanics and the decisions behind them.</p>

<h2>How does a dental PPO contract work?</h2>
<p>When you join a PPO network, you agree to accept the plan's maximum allowable fees for covered services provided to its members. In return, the plan lists you as in network, which can bring patients to your office. The contract also binds you to the plan's processing policies, such as frequency limits, alternate benefit rules and claim submission rules.</p>
<p>The money flows like this for a covered service:</p>
<ol>
<li>You bill your usual office fee.</li>
<li>The plan applies its contracted (allowed) fee.</li>
<li>The plan pays its percentage of the allowed fee, after any deductible.</li>
<li>The patient owes the rest of the allowed fee.</li>
<li>The difference between your office fee and the allowed fee is written off.</li>
</ol>
<p>The write-off is not lost revenue in the accounting sense. It is the discount you agreed to. Lost revenue happens when the write-off is larger than the contract allows, when payments come in below the contracted fee and nobody notices, or when patient portions are calculated wrong.</p>

<h2>Why should you load PPO fee schedules into your software?</h2>
<p>Practice management systems such as Dentrix, Open Dental and Eaglesoft can store a fee schedule for each PPO and apply it to each patient's plan. When fee schedules are loaded correctly, treatment plans show accurate patient portions and expected write-offs before treatment. When they are missing or outdated, three problems appear:</p>
<ul>
<li><strong>Wrong patient estimates</strong>, leading to refunds or surprise balances.</li>
<li><strong>Write-offs posted by whatever the plan paid</strong>, which hides underpayments.</li>
<li><strong>No easy way to compare plans</strong> when deciding whether to stay in network.</li>
</ul>
<p>Ask each plan for its current fee schedule in writing, ideally every year, and update your software when fees change. Our <a href="/tools/fee-schedule-comparison-calculator/">fee schedule comparison calculator</a> can help you compare plans side by side.</p>

<h2>What is UCR, and how is it different from a PPO fee?</h2>
<p>UCR stands for usual, customary and reasonable. It describes the amount a plan considers typical for a service in a geographic area, usually used by indemnity or out-of-network benefits. A PPO fee is a negotiated amount in your contract. For in-network patients, the PPO fee controls. For out-of-network patients, the plan may pay based on its own UCR or maximum plan allowance, and you may be able to bill the patient the balance, depending on state law and your agreements. The terms sound similar, but the billing consequences are very different.</p>

<h2>What are leased networks, and why do they matter?</h2>
<p>Some PPO contracts allow the plan to lease or rent its network to other payers. That means you may find yourself treated as in network, and paid at a discounted fee, by a plan you never signed with directly. Offices often discover this when a payment comes in lower than expected for a plan they thought was out of network.</p>
<p>To manage leased networks:</p>
<ul>
<li>Read the network access or leasing language in each contract.</li>
<li>Keep a list of which plans access which networks, and which fee schedule applies.</li>
<li>Ask whether you can opt out of network leasing; some contracts allow it.</li>
<li>Verify the network a patient's plan uses during verification, not after payment.</li>
</ul>

<h2>Why do dental claims get downgraded?</h2>
<p>A downgrade, sometimes called an alternate benefit, happens when the plan pays for a less costly procedure than the one performed. A common example is a posterior composite paid at the amalgam rate. Other examples include a crown paid as a large filling or an implant-supported restoration paid as a partial denture.</p>
<p>Whether you can bill the patient for the difference between the downgraded allowance and the contracted fee for the procedure performed depends on the contract and on state law. Some contracts limit what you can collect. Check the contract language and tell patients about likely downgrades before treatment. Downgrades are policy decisions, so appeals often succeed only when you can show a clinical reason the alternate service would not have been appropriate.</p>

<h2>How do frequency limits affect PPO claims?</h2>
<p>Most PPO plans limit how often they pay for certain services, such as exams, cleanings, bitewing radiographs, fluoride and periodontal maintenance. Some count by calendar year, some by benefit year, and some by a rolling period such as once every six months. If a claim falls outside the window by even a day, it is denied.</p>
<p>Frequency limits should be captured during insurance verification, along with the patient's history with the plan. A careful <a href="/services/dental-insurance-verification/">dental insurance verification</a> step, using a checklist like our <a href="/tools/dental-insurance-verification-checklist/">dental insurance verification checklist</a>, is the most reliable fix.</p>

<h2>How should PPO payments be posted?</h2>
<ul>
<li>Post the payment and the contractual write-off as separate entries.</li>
<li>Compare the allowed amount on the explanation of benefits with your loaded fee schedule.</li>
<li>Flag any claim paid below the contracted fee for follow-up.</li>
<li>Do not write off denials as contractual adjustments; they are different and need to be worked.</li>
<li>Record downgrades so you can report on them by plan.</li>
</ul>
<p>Over time, these records tell you which plans pay as agreed and which ones need attention.</p>

<h2>Can you negotiate dental PPO fee schedules?</h2>
<p>Often, yes, though results vary by plan, region and practice. Some plans review fee requests on a set schedule, while others rarely change fees. A reasonable approach looks like this:</p>
<ol>
<li><strong>Know your numbers.</strong> Pull production and collections by plan and identify the procedures that make up most of your volume.</li>
<li><strong>Compare fees.</strong> Look at how each plan's fees for those procedures compare with your office fees and with other plans you accept.</li>
<li><strong>Make a specific request.</strong> Ask the provider relations department for a fee review, naming the procedures and the adjustments you are requesting, with a short case for your practice, such as access, hours, services offered or patient demand.</li>
<li><strong>Follow up in writing</strong> and keep a record of every response.</li>
<li><strong>Decide your walk-away point.</strong> If a plan will not adjust, you may decide to stay in network, limit new patients from that plan, or leave the network after reviewing the contract's termination terms.</li>
</ol>
<p>Fee negotiation involves business decisions that only the practice owner can make. A partner can help gather data and manage the correspondence. Our <a href="/services/dental-ppo-negotiation/">dental PPO negotiation</a> service is designed to support that process without promising any particular outcome.</p>

<h2>What should you track for each PPO plan?</h2>
<table>
<thead><tr><th>Item</th><th>Why it matters</th></tr></thead>
<tbody>
<tr><td>Current fee schedule and effective date</td><td>Accurate estimates and write-offs</td></tr>
<tr><td>Network leasing arrangements</td><td>Explains unexpected discounted payments</td></tr>
<tr><td>Alternate benefit and downgrade policies</td><td>Sets patient expectations before treatment</td></tr>
<tr><td>Frequency rules and counting method</td><td>Prevents avoidable denials</td></tr>
<tr><td>Claim filing limit</td><td>Keeps claims from aging out</td></tr>
<tr><td>Contract renewal and termination terms</td><td>Gives you options during fee reviews</td></tr>
</tbody>
</table>
<p>When this information lives in one place, PPO billing stops depending on memory. It also gives you a starting point for comparing plans. If you would rather have someone else keep it current, our <a href="/services/dental-billing/">dental billing</a> team works inside your practice software to do it.</p>

<h2>Curious how your PPO plans are really paying?</h2><p>If you suspect some plans are paying below contract or downgrading more than they should, <a href="/consultation/">ask for a free consultation</a>. We will look at a few recent explanations of benefits with you, compare them with your loaded fee schedules and talk through what the patterns suggest.</p>
`,
    faqs: [
      {
        q: 'What is a write-off in PPO dental billing?',
        a: 'A write-off is the difference between your full office fee and the PPO plan\'s contracted fee for a covered service. You agree to it in the network contract, so it is recorded as a contractual adjustment rather than billed to the patient.',
      },
      {
        q: 'What is a downgrade on a dental claim?',
        a: 'A downgrade, or alternate benefit, is when the plan pays for a less costly procedure than the one performed, such as paying a posterior composite at the amalgam rate. Whether the patient can be billed the difference depends on the contract and state law.',
      },
      {
        q: 'What is a leased dental network?',
        a: 'A leased network is when a PPO plan allows other payers to access its contracted providers and fees. You may be paid at a discounted fee by a plan you did not sign with directly.',
      },
      {
        q: 'Can dentists negotiate PPO fee schedules?',
        a: 'Often, yes. Many plans will review a written fee request, especially when it is supported by practice data, though outcomes vary by plan and region and are never certain.',
      },
    ],
    sources: [S.adaInsurance, S.adaCdt, S.adaClaimForm, S.cmsAdminSimp],
  },

  // 5 ------------------------------------------------------------------
  {
    slug: 'cdt-2026-code-changes',
    title: 'CDT 2026 Code Changes: What Changed and How to Prepare for the Next Update',
    seoTitle: 'CDT Codes 2026: Changes and How to Prepare',
    metaDescription:
      'CDT codes 2026 took effect January 1, 2026 with 60 changes, led by an anesthesia and sedation overhaul. How the ADA updates CDT and how to prepare for 2027.',
    excerpt:
      'The ADA updates the CDT Code every year, effective January 1. Here is what changed in CDT 2026, how the update process works, what is coming in CDT 2027, and how to prepare your office.',
    category: 'Dental Billing',
    tags: ['CDT codes 2026', 'CDT 2027', 'dental coding', 'ADA', 'code updates'],
    readingMinutes: 7,
    publishedAt: '2026-10-11',
    html: `
<p><strong>CDT 2026 took effect on January 1, 2026, with 60 changes to the dental code set: 31 additions, 14 revisions, 6 deletions and 9 editorial changes, according to ADA News.</strong> The biggest area of change was anesthesia and sedation coding. Dental offices should use the official CDT 2026 manual or ADA resources for exact codes and descriptors, and start preparing now for CDT 2027.</p>

<p>The Code on Dental Procedures and Nomenclature, known as the CDT Code, is the HIPAA standard code set for dental procedures. It is owned and maintained by the American Dental Association (ADA) and changes every year. This article explains how the update process works, summarizes what changed for 2026 at a high level, and gives a practical checklist for keeping your office current. We do not reproduce code descriptors here, because the CDT Code is licensed by the ADA.</p>

<h2>How does the ADA update CDT codes each year?</h2>
<p>The ADA's Code Maintenance Committee (CMC) reviews requests to add, revise or delete codes. Anyone can submit a request, including dentists, dental organizations and payers. The committee includes representatives from dental organizations and from the payer community, and it votes on each request at an annual meeting. Approved changes are published in the next CDT manual and take effect on January 1.</p>
<p>A typical cycle looks like this:</p>
<ol>
<li><strong>Request deadline in the fall.</strong> For example, the ADA set November 1, 2026 as the deadline for requests to be considered for CDT 2028.</li>
<li><strong>Committee meeting in early spring.</strong> The CMC met in March 2026 to decide changes for CDT 2027.</li>
<li><strong>Announcement of decisions.</strong> The ADA publishes a summary of accepted changes after the meeting.</li>
<li><strong>Publication of the manual.</strong> The new CDT book and digital products are released in the fall.</li>
<li><strong>Effective date.</strong> The new code set takes effect on January 1.</li>
</ol>
<p>Because the CDT Code is a HIPAA standard, payers are expected to accept the version in effect on the date of service. In practice, some plans take time to update their systems, which is one reason the first weeks of a new year bring more rejections.</p>

<h2>What changed in CDT 2026?</h2>
<p>ADA News reported that CDT 2026 includes 60 changes. At a high level:</p>
<ul>
<li><strong>Anesthesia and sedation overhaul.</strong> This was the largest set of changes, with new and revised codes for sedation and anesthesia and one older non-IV sedation code discontinued. The ADA also published a coding guide focused on nitrous oxide, sedation and general anesthesia to help offices choose among the new options.</li>
<li><strong>New diagnostic codes</strong>, including point-of-care saliva testing and cracked tooth testing.</li>
<li><strong>Occlusal guard care</strong>, with a new code for cleaning and inspecting an occlusal guard.</li>
<li><strong>Revisions to existing restorative and other codes</strong>, which can change when a code applies even if its number stays the same.</li>
</ul>
<p>For the full list, use the CDT 2026 manual, the ADA's CDT app, or the ADA's published summaries. Do not rely on a vendor's list alone, and do not assume a code number means the same thing it did last year. Revised descriptors matter as much as new codes.</p>

<h2>What is coming in CDT 2027?</h2>
<p>The ADA has already announced the changes for CDT 2027, which take effect January 1, 2027. ADA News reported 67 changes: 28 additions, 33 revisions, no deletions and 6 editorial changes. Areas affected include implant services (such as new codes related to healing caps and removing screw-retained restorations), fixed splints, interim fixed dentures, attachments, orthodontic revisions, neuromodulator administration and chemodenervation, and orofacial pain injections. A resin-based composite crown code is also being revised so it is no longer limited to anterior teeth.</p>
<p>Now, in the fall, is the right time to plan for these changes, while the new manual is becoming available and before the January 1 switch.</p>

<h2>How should a dental office prepare for a CDT update?</h2>
<p>Use a simple checklist every year:</p>
<ol>
<li><strong>Buy the new code set.</strong> Get the official CDT manual or app for the coming year. It is the only reliable source for codes and descriptors.</li>
<li><strong>Update your practice management software.</strong> Install the vendor's annual code update and confirm that new codes appear, deleted codes are inactive for future dates, and fees are attached to new codes.</li>
<li><strong>Review your fee schedule.</strong> Set office fees for new codes and check whether PPO fee schedules include them.</li>
<li><strong>Update templates and route slips.</strong> Clinical note templates, treatment plan templates and quick-pick lists often still point to old codes.</li>
<li><strong>Train providers and staff.</strong> Focus on the areas your office uses most. For 2026, that meant sedation for many practices; for 2027, implant and orofacial pain changes may matter more.</li>
<li><strong>Watch for treatment planned under old codes.</strong> Treatment planned in December but delivered in January must be billed with the code valid on the date of service.</li>
<li><strong>Check payer policies.</strong> Some plans publish how they will handle new codes, including whether they will cover them.</li>
<li><strong>Monitor January claims closely.</strong> Look for rejections that mention invalid or deleted codes and fix the cause rather than each claim one by one.</li>
</ol>

<h2>What are common mistakes after a CDT update?</h2>
<ul>
<li>Billing a deleted code for a date of service after January 1.</li>
<li>Using a new code before its effective date.</li>
<li>Leaving new codes without a fee, which can produce zero-dollar claims.</li>
<li>Assuming a revised code still applies in the same situations as before.</li>
<li>Copying code lists from unofficial websites that may be incomplete or wrong.</li>
</ul>
<p>Our guide to <a href="/blog/dental-billing-codes-guide/">dental billing codes</a> explains how the CDT categories are organized, and our overview of the <a href="/blog/dental-insurance-billing-process/">dental insurance billing process</a> shows where coding fits in each claim.</p>

<h2>How do payers handle new CDT codes?</h2>
<p>Payers must accept valid CDT codes for the date of service, but accepting a code is not the same as covering it. When a new code appears, each plan decides whether the service is a covered benefit, what frequency limits apply and how it maps to the plan's fee schedule. Some plans map a new code to an existing benefit category; others treat it as not covered until the employer group's contract is updated. That is why the same new code may be paid by one plan, downgraded by another and denied as not covered by a third.</p>
<p>For in-network practices, check whether your PPO fee schedules list fees for the new codes. If a plan has not published a fee, ask provider relations how it will process the code. Write the answer down with the date and the representative's name, because early-year processing often changes as plans update their systems. Explain to patients in advance when a newer code's coverage is uncertain, and give them an estimate that reflects that uncertainty.</p>

<h2>How can you submit a CDT change request?</h2>
<p>If your office performs a procedure that the code set does not describe well, you can submit a change request to the ADA through its published process. Requests generally need to explain the procedure, why existing codes are not adequate and how the change would be used. The ADA posts the request form, deadlines and past committee decisions on its CDT pages. Many requests come from dental specialty organizations, so working through your specialty society is another route.</p>

<h2>Where can you get the official CDT code list?</h2>
<p>The ADA publishes the CDT Code in its annual manual, in a companion app and through licensed software. The ADA website also posts information about the CDT Code, the Code Maintenance Committee and summaries of each year's changes. Your practice management software vendor typically delivers the annual code update under its own license with the ADA. If you work with a billing partner, ask how they keep their team current each year. Our <a href="/services/dental-billing/">dental billing</a> and <a href="/services/dental-claims-processing/">dental claims processing</a> teams follow the annual updates and work inside your software, so updates apply where your claims are created.</p>

<h2>Getting ready for January 1?</h2><p>If you want a second set of eyes on your code update plan before CDT 2027 takes effect, <a href="/consultation/">book a free consultation</a>. We can go through your fee schedule, templates and the procedures you perform most and flag the spots that usually cause January rejections.</p>
`,
    faqs: [
      {
        q: 'When did CDT 2026 take effect?',
        a: 'CDT 2026 took effect on January 1, 2026. Claims with dates of service on or after that date should use CDT 2026 codes.',
      },
      {
        q: 'How many changes were in CDT 2026?',
        a: 'ADA News reported 60 changes in CDT 2026: 31 additions, 14 revisions, 6 deletions and 9 editorial changes. Anesthesia and sedation saw the largest set of changes.',
      },
      {
        q: 'Who maintains the CDT Code?',
        a: 'The American Dental Association maintains the CDT Code. Its Code Maintenance Committee reviews change requests each year, and approved changes take effect the following January 1.',
      },
      {
        q: 'Where can I get the official list of CDT codes?',
        a: 'Use the ADA\'s CDT manual, the CDT app or licensed practice management software. The CDT Code is licensed by the ADA, so free lists online may be incomplete or out of date.',
      },
    ],
    sources: [S.adaCdt, S.adaCmc, S.adaNewsCdt2026, S.adaNewsCdt2027, S.cmsAdminSimp],
  },

  // 6 ------------------------------------------------------------------
  {
    slug: 'cpt-2026-code-changes',
    title: 'CPT 2026 Code Changes: What Practices Need to Know',
    seoTitle: 'CPT Code Changes 2026: What Practices Need to Know',
    metaDescription:
      'CPT code changes 2026: the AMA added 288 codes, deleted 84 and revised 46, effective January 1, 2026. Key areas, the annual cycle and preparing for 2027.',
    excerpt:
      'The AMA\'s CPT 2026 update brought 418 changes, including new remote monitoring, AI-related and hearing device codes. Here is how the annual cycle works and how practices should prepare.',
    category: 'Medical Coding',
    tags: ['CPT code changes 2026', 'CPT 2027', 'medical coding', 'AMA', 'code updates'],
    readingMinutes: 7,
    publishedAt: '2026-10-12',
    html: `
<p><strong>The CPT 2026 code set took effect on January 1, 2026, with 418 changes: 288 new codes, 84 deletions and 46 revisions, according to the American Medical Association (AMA).</strong> Notable areas included remote monitoring, AI-related services, hearing device services and leg revascularization. Practices should confirm details in the official CPT manual and get ready now for CPT 2027.</p>

<p>Current Procedural Terminology (CPT) is the code set most US practices use to report medical procedures and services. The AMA owns and maintains it, and the code descriptors are copyrighted, so this article summarizes changes in our own words without reproducing descriptors. Use your licensed CPT manual or software for exact language.</p>

<h2>How does the AMA update CPT each year?</h2>
<p>The CPT Editorial Panel, convened by the AMA, reviews applications to add, revise or delete codes. Applications come from medical specialty societies, individual clinicians, manufacturers and others. The panel meets several times a year, and the changes it approves for Category I codes are generally released in the fall and take effect on January 1 of the following year.</p>
<p>CPT has three categories:</p>
<ul>
<li><strong>Category I</strong> codes describe established procedures and services. These are the codes most practices use every day.</li>
<li><strong>Category II</strong> codes are supplemental tracking codes used for performance measurement. They are optional for many payers.</li>
<li><strong>Category III</strong> codes are temporary codes for emerging technologies and services. They are released on a more frequent schedule and may later become Category I codes or be retired.</li>
</ul>
<p>Proprietary laboratory analyses (PLA) codes are also released on a quarterly schedule. That is why code changes can appear outside the January update.</p>

<h2>What changed in CPT 2026?</h2>
<p>The AMA's announcement of the 2026 code set highlighted several areas:</p>
<ul>
<li><strong>Remote monitoring.</strong> New codes for shorter monitoring periods within a 30-day window, and changes to the time threshold for remote monitoring treatment management. Practices that bill remote physiologic or therapeutic monitoring should review their workflows, since shorter periods change what can be reported.</li>
<li><strong>AI-related services.</strong> New codes describe services where software assists analysis, such as certain cardiac imaging and detection tools. The AMA continues to develop guidance for describing AI-enabled work.</li>
<li><strong>Hearing device services.</strong> A new set of codes for hearing aid and related services.</li>
<li><strong>Leg revascularization.</strong> The lower extremity revascularization section was restructured, with older codes deleted and a new code family added.</li>
<li><strong>Proprietary laboratory analyses</strong> made up a large share of the new codes.</li>
<li><strong>Telehealth appendices.</strong> Some existing codes, many related to behavioral health, were added to appendices that list services that may be delivered by audio-video or audio-only technology.</li>
</ul>
<p>Remember that a code being added to CPT does not mean a payer covers it. Coverage and payment are set by Medicare, Medicaid and commercial plans separately. For telehealth reporting rules, see our <a href="/specialties/telehealth/">telehealth billing</a> page.</p>

<h2>What is coming in CPT 2027?</h2>
<p>The AMA has released the CPT 2027 code set, effective January 1, 2027. Coverage of the release reports 453 changes, including 299 new codes, 80 deletions and 74 revisions. Areas mentioned include a new framework for maternity care that replaces the global maternity package, additional AI-related services, ventricular assist device procedures, hernia repair, prostate biopsy, radiology and sleep testing. Maternity care in particular will require changes to how obstetric practices plan, document and bill care across a pregnancy, so OB/GYN offices should start preparing early.</p>
<p>Payment for new codes is set separately. Medicare values new codes through the annual Physician Fee Schedule rule, which is usually finalized in early November.</p>

<h2>How should a practice prepare for CPT changes?</h2>
<ol>
<li><strong>Get the new code set.</strong> Buy the CPT manual or confirm your software license includes the update.</li>
<li><strong>Find your affected codes.</strong> Compare the change list with your top procedures by volume and revenue. Most practices are affected by a small subset of changes.</li>
<li><strong>Update the charge master and fee schedule.</strong> Add new codes, set fees, and inactivate deleted codes for dates of service on or after January 1.</li>
<li><strong>Update templates and superbills.</strong> EHR order sets, charge capture screens and paper superbills often lag behind.</li>
<li><strong>Train providers and coders.</strong> Focus on documentation that the new codes require, such as time thresholds, monitoring days or new components.</li>
<li><strong>Check payer policies.</strong> Look for Medicare and commercial coverage updates, prior authorization changes and any payer-specific instructions for new codes.</li>
<li><strong>Watch early claims.</strong> Review January rejections and denials by code so you can fix systemic problems quickly.</li>
</ol>
<p>Our <a href="/services/medical-coding/">medical coding services</a> team follows the annual updates, and a <a href="/services/coding-audit/">coding audit</a> after the first few months of a new code year can confirm that documentation supports what is being billed.</p>

<h2>What mistakes happen after a CPT update?</h2>
<ul>
<li>Billing deleted codes for services on or after January 1.</li>
<li>Reporting new codes before the effective date.</li>
<li>Forgetting that revised codes may have new documentation requirements.</li>
<li>Assuming new codes are covered or paid at expected rates.</li>
<li>Not updating modifiers and edits, which can trigger National Correct Coding Initiative issues.</li>
</ul>

<h2>How do specialties feel the impact differently?</h2>
<p>The same annual update can be minor for one practice and significant for another. A family medicine office may see only a few changes to codes it uses, while a vascular surgery group dealing with a restructured section may need to relearn an entire code family. A few examples of how impact varies:</p>
<ul>
<li><strong>Practices that bill remote monitoring</strong>, often in primary care, cardiology and chronic care programs, needed to revisit monitoring day counts and time thresholds in 2026. Our <a href="/services/remote-patient-monitoring-billing/">remote patient monitoring billing</a> page explains the general workflow.</li>
<li><strong>Audiology and ENT practices</strong> faced a new set of hearing device service codes.</li>
<li><strong>Laboratories</strong> see frequent changes because of proprietary laboratory analyses codes released throughout the year.</li>
<li><strong>Obstetric practices</strong> face a structural change in 2027 with the move away from the global maternity package.</li>
</ul>
<p>A practical approach is to run a report of your top 50 codes by volume and by revenue, then check each against the change list. That list is your training priority.</p>

<h2>What about payment for new codes?</h2>
<p>CPT assigns codes, not prices. Medicare sets relative value units for new and revised codes through the Physician Fee Schedule rulemaking process, often based on recommendations from the AMA's RVS Update Committee. Commercial plans then decide whether and how to pay, sometimes months later. In the meantime, a new code may be denied, pended or paid at an unexpected rate. Track early payments on new codes separately so you can spot problems and follow up quickly.</p>

<h2>How do CPT updates relate to ICD-10-CM and HCPCS updates?</h2>
<p>They run on different calendars. CPT Category I changes take effect January 1. ICD-10-CM diagnosis code updates take effect October 1 each year, with a possible April 1 update. HCPCS Level II codes, maintained by CMS, are updated quarterly. A practice therefore needs a year-round habit of checking for code changes. Our article on <a href="/blog/icd-10-cm-2026-updates/">ICD-10-CM updates in 2026</a> covers the diagnosis side.</p>

<h2>Where can you find the official CPT changes?</h2>
<p>The AMA publishes the CPT Professional Edition and related resources, including a summary of changes. The AMA also posts press releases and resources about each year's code set on its website. Your EHR or practice management vendor delivers the code data under its license. When claims come back with code-related adjustment reasons, read the reason and remark codes together to see whether the problem is the code itself, a missing modifier or a coverage policy.</p>

<h2>Planning your 2027 code update?</h2><p>If your practice wants to map the CPT 2027 changes against the services you actually bill, <a href="/consultation/">schedule a free consultation</a>. We can go through your top codes, templates and payer mix with you and outline what to update before January 1.</p>
`,
    faqs: [
      {
        q: 'How many CPT codes changed in 2026?',
        a: 'The AMA reported 418 changes in the CPT 2026 code set, including 288 new codes, 84 deletions and 46 revisions, effective January 1, 2026.',
      },
      {
        q: 'When do new CPT codes take effect?',
        a: 'New CPT Category I codes take effect on January 1 each year. Category III and proprietary laboratory analyses codes are released on more frequent schedules.',
      },
      {
        q: 'Does a new CPT code mean insurance will pay for it?',
        a: 'No. CPT describes services; coverage and payment are decided separately by Medicare, Medicaid and each commercial plan. Check payer policies before assuming a new code is payable.',
      },
      {
        q: 'Who maintains CPT codes?',
        a: 'The American Medical Association maintains CPT through its CPT Editorial Panel. CPT code descriptors are copyrighted by the AMA.',
      },
    ],
    sources: [S.amaCpt, S.amaCpt2026, S.amaCpt2027, S.cmsHcpcs, S.cmsIcd10],
  },

  // 7 ------------------------------------------------------------------
  {
    slug: 'icd-10-cm-2026-updates',
    title: 'ICD-10-CM Updates in 2026: FY 2026, the April Update and FY 2027',
    seoTitle: 'ICD-10 Code Updates 2026: What Changed and When',
    metaDescription:
      'ICD-10 code updates 2026: FY 2026 ICD-10-CM took effect October 1, 2025, an April 2026 update followed, and FY 2027 began October 1, 2026.',
    excerpt:
      'ICD-10-CM diagnosis codes change every October 1. Here is what changed in FY 2026, what the April 2026 update did, what FY 2027 brought, and how to keep your practice current.',
    category: 'Medical Coding',
    tags: ['ICD-10 code updates 2026', 'ICD-10-CM', 'FY 2027', 'medical coding', 'diagnosis coding'],
    readingMinutes: 7,
    publishedAt: '2026-10-12',
    html: `
<p><strong>The FY 2026 ICD-10-CM code set took effect on October 1, 2025, adding several hundred new diagnosis codes (widely reported as 487 new codes, 38 revisions and 28 deletions). An April 1, 2026 update followed, and the FY 2027 code set took effect on October 1, 2026.</strong> For claims today, use the code set in effect on the date of service.</p>

<p>ICD-10-CM is the US clinical modification of the World Health Organization's ICD-10 and is the HIPAA standard for reporting diagnoses. The National Center for Health Statistics (NCHS) at the CDC maintains ICD-10-CM, and CMS maintains ICD-10-PCS for inpatient hospital procedures. Unlike CPT and CDT, ICD-10-CM is in the public domain, so the official files can be downloaded free from the CDC and CMS websites.</p>

<h2>When do ICD-10-CM codes change?</h2>
<p>The annual update follows the federal fiscal year. New codes take effect on October 1 and apply through September 30 of the following year. The ICD-10 Coordination and Maintenance Committee, run jointly by CMS and NCHS, holds public meetings where code proposals are discussed, and there is an option for an April 1 update when needed.</p>
<p>The fiscal year naming can be confusing. "FY 2026" codes took effect in October 2025. "FY 2027" codes took effect in October 2026. When someone says "2026 ICD-10 codes," ask which fiscal year they mean.</p>

<h2>What changed in FY 2026 ICD-10-CM?</h2>
<p>The FY 2026 update, effective for dates of service from October 1, 2025, was a large one. Summaries from coding organizations report 487 new codes, 38 revised code titles and 28 deleted codes, and some counts differ depending on whether non-billable header codes are included. Notable areas reported in published summaries include:</p>
<ul>
<li><strong>Inflammatory breast cancer</strong>, with a new subcategory in the breast cancer category (C50) that includes laterality.</li>
<li><strong>Pelvic and perineal pain</strong>, where the R10.2 code was expanded to capture laterality.</li>
<li><strong>Multiple sclerosis</strong> and <strong>non-pressure chronic ulcers</strong>, with expanded specificity.</li>
<li><strong>Social determinants of health</strong>, with additional Z codes, including codes related to financial insecurity.</li>
<li><strong>Infectious and parasitic conditions</strong>, including a new code for Demodex infestation.</li>
</ul>
<p>Because counts and examples vary by source, use the official addenda from CMS or the CDC to confirm the exact codes that affect your specialty.</p>

<h2>What happened on April 1, 2026?</h2>
<p>CMS posted April 1, 2026 ICD-10-CM files for discharges and encounters from April 1, 2026 through September 30, 2026. Published summaries describe this update as making no new diagnosis code additions, with changes focused on tabular instructional notes, including some Excludes1 notes converted to Excludes2 notes. Excludes notes control which codes may be reported together, so coders should review the addenda even when no codes are added. The same date brought new ICD-10-PCS procedure codes for inpatient hospital reporting.</p>

<h2>What changed in FY 2027 ICD-10-CM?</h2>
<p>The FY 2027 code set took effect on October 1, 2026, for discharges and encounters through September 30, 2027. It is smaller than FY 2026. Widely cited summaries report 190 new billable codes, 30 deletions and 4 revisions, with other counts higher when non-billable headers are included. Many of the deletions reflect codes being expanded into more specific subcategories, which means a code your practice used last year may no longer be valid because it now has children.</p>
<p>If your practice bills a high volume of a particular diagnosis family, check the FY 2027 addenda for that family specifically. Our <a href="/tools/icd-10-code-search/">ICD-10 code search</a> tool is a quick way to look up current codes and titles.</p>

<h2>Why do ICD-10-CM updates cause denials?</h2>
<ul>
<li><strong>Invalid codes.</strong> A code that was expanded into subcodes is no longer billable on its own. Claims using it for dates of service after October 1 will be rejected.</li>
<li><strong>Outdated EHR favorites.</strong> Providers often pick diagnoses from personal favorite lists that were not updated.</li>
<li><strong>Coverage policies.</strong> Medicare local and national coverage determinations list covered diagnoses. When codes change, policies are updated, and a mismatch can lead to medical necessity denials.</li>
<li><strong>Specificity gaps.</strong> New codes often require details, such as laterality or severity, that documentation does not yet capture.</li>
</ul>
<p>If you see more diagnosis-related denials after October, our guide on <a href="/blog/how-to-reduce-claim-denials/">how to reduce claim denials</a> walks through root cause analysis.</p>

<h2>How should a practice prepare for each October update?</h2>
<ol>
<li><strong>Download the official files.</strong> Get the addenda and tabular files from the CDC or CMS as soon as they post, usually in the summer.</li>
<li><strong>Filter for your specialty.</strong> Identify new, deleted and revised codes in the chapters you use most.</li>
<li><strong>Update the EHR and practice management system.</strong> Confirm your vendor has loaded the new code set before October 1.</li>
<li><strong>Refresh favorites and templates.</strong> Remove deleted codes and add more specific options.</li>
<li><strong>Brief providers.</strong> Explain any new documentation detail the codes require.</li>
<li><strong>Review the Official Guidelines.</strong> The ICD-10-CM Official Guidelines for Coding and Reporting are updated with the code set and can change how codes are sequenced or combined.</li>
<li><strong>Monitor October claims.</strong> Track rejections for invalid diagnosis codes and fix the underlying setup.</li>
</ol>

<h2>Which code set applies when a visit spans the October 1 change?</h2>
<p>For professional claims, the code set is chosen by the date of service on each line. A visit on September 30 uses the old codes; a visit on October 1 uses the new ones, even if both are billed on the same day in October. Hospital inpatient claims follow the discharge date, so a stay that begins before October 1 and ends after it uses the new code set for the whole claim. Practices that hold claims for a few days, or bill a series of services such as therapy visits, should confirm their software applies the right code set to each date.</p>

<h2>How does documentation need to change with new codes?</h2>
<p>New ICD-10-CM codes usually add specificity: laterality, severity, stage, cause or a related condition. If the provider's note does not include that detail, the coder can only report a less specific code, and some payers deny or question unspecified codes when a more specific option exists. Before each October, look at the new codes in your top diagnosis families and ask what the note must say to support them. Then update templates and prompts so providers capture that detail naturally during the visit, rather than through after-the-fact queries.</p>
<p>Social determinants of health codes are a good example. They describe circumstances such as housing, food or financial insecurity that affect care. They are often captured from intake questionnaires or other staff documentation, and they can support care planning and quality reporting even when they do not change payment.</p>

<h2>Where can you get the official ICD-10-CM files?</h2>
<p>The CDC's National Center for Health Statistics posts the ICD-10-CM code files, addenda and Official Guidelines. CMS posts the same ICD-10-CM files alongside ICD-10-PCS on its ICD-10 page, labeled by fiscal year and with the dates each set applies. Both are free.</p>
<p>Keeping up with three different code calendars (ICD-10-CM in October, CPT in January and HCPCS quarterly) is a lot for a small team. Our <a href="/services/medical-coding/">medical coding services</a> team tracks these updates, and our article on <a href="/blog/cpt-2026-code-changes/">CPT 2026 code changes</a> covers the procedure side. A <a href="/services/coding-audit/">coding audit</a> a few months after an update can confirm that the new codes are being used correctly.</p>

<h2>Want to check your diagnosis coding after the October update?</h2><p>If you are seeing more diagnosis-related rejections since October 1, <a href="/consultation/">request a free consultation</a>. We can review a sample of affected claims with you, compare the codes against the current files and explain where your templates or documentation may need updating.</p>
`,
    faqs: [
      {
        q: 'When did the 2026 ICD-10-CM codes take effect?',
        a: 'The FY 2026 ICD-10-CM codes took effect on October 1, 2025, and applied through September 30, 2026, with an April 1, 2026 update in between. The FY 2027 codes took effect on October 1, 2026.',
      },
      {
        q: 'How many new ICD-10-CM codes were added for FY 2026?',
        a: 'Published summaries widely report 487 new codes, 38 revisions and 28 deletions for FY 2026. Counts differ slightly depending on whether non-billable header codes are included, so check the official addenda.',
      },
      {
        q: 'Who maintains ICD-10-CM?',
        a: 'The CDC\'s National Center for Health Statistics maintains ICD-10-CM, and CMS maintains ICD-10-PCS. Proposals are discussed at the ICD-10 Coordination and Maintenance Committee meetings.',
      },
      {
        q: 'Where can I download the official ICD-10-CM code files?',
        a: 'The official files, addenda and Official Guidelines are free on the CDC/NCHS ICD-10-CM page and on the CMS ICD-10 page, organized by fiscal year.',
      },
    ],
    sources: [S.cdcIcd10, S.cmsIcd10, S.cmsAdminSimp, S.cmsHcpcs],
  },

  // 8 ------------------------------------------------------------------
  {
    slug: 'dental-billing-codes-guide',
    title: 'Dental Billing Codes Guide: How CDT Categories, Tooth Numbers and Surfaces Fit Together',
    seoTitle: 'Dental Billing Codes Cheat Sheet Alternative: CDT Guide',
    metaDescription:
      'A dental billing codes guide in place of a cheat sheet: CDT category ranges, tooth numbers, surfaces and quadrants, and the claim mistakes that cause denials.',
    excerpt:
      'Instead of a one-page cheat sheet, this guide explains how the CDT Code is organized by category, how codes pair with tooth numbers, surfaces and areas of the mouth, and which claim details trip up offices most.',
    category: 'Dental Billing',
    tags: ['dental billing codes', 'CDT categories', 'tooth numbering', 'dental claims', 'dental coding'],
    readingMinutes: 8,
    publishedAt: '2026-10-12',
    html: `
<p><strong>Dental billing codes come from the CDT Code, which the American Dental Association organizes into categories by code range, from diagnostic (D0100 to D0999) through adjunctive general services (D9000 to D9999).</strong> A correct claim pairs each code with the right tooth number, surface, quadrant or arch. Because the CDT Code is licensed by the ADA, the official manual is the only reliable cheat sheet.</p>

<p>Searches for a dental billing codes cheat sheet usually turn up unofficial lists that are incomplete, outdated or copied without permission. A better approach is to understand how the code set is structured, so your team knows where to look and what each claim line needs. This guide covers the structure and the most common claim pitfalls. It does not list individual code descriptors, which you should take from the current CDT manual or your licensed software.</p>

<h2>What are the CDT code categories?</h2>
<p>Every CDT code starts with the letter D followed by four digits. The first digits place the code in a category of service. The categories and their ranges are:</p>
<table>
<thead><tr><th>Code range</th><th>Category</th></tr></thead>
<tbody>
<tr><td>D0100 to D0999</td><td>Diagnostic</td></tr>
<tr><td>D1000 to D1999</td><td>Preventive</td></tr>
<tr><td>D2000 to D2999</td><td>Restorative</td></tr>
<tr><td>D3000 to D3999</td><td>Endodontics</td></tr>
<tr><td>D4000 to D4999</td><td>Periodontics</td></tr>
<tr><td>D5000 to D5899</td><td>Prosthodontics, removable</td></tr>
<tr><td>D5900 to D5999</td><td>Maxillofacial prosthetics</td></tr>
<tr><td>D6000 to D6199</td><td>Implant services</td></tr>
<tr><td>D6200 to D6999</td><td>Prosthodontics, fixed</td></tr>
<tr><td>D7000 to D7999</td><td>Oral and maxillofacial surgery</td></tr>
<tr><td>D8000 to D8999</td><td>Orthodontics</td></tr>
<tr><td>D9000 to D9999</td><td>Adjunctive general services</td></tr>
</tbody>
</table>
<p>Within each category, codes are grouped into subcategories. For example, diagnostic codes include evaluations, imaging and tests; restorative codes are grouped by material and type of restoration. Knowing the category helps your team find the right section of the manual and recognize when a code looks out of place on a claim.</p>

<h2>Why is the CDT Code licensed?</h2>
<p>The ADA owns the copyright to the CDT Code and maintains it through its Code Maintenance Committee. HIPAA names CDT as the standard code set for dental procedures, so payers and providers must use it, but the descriptors and nomenclature remain the ADA's intellectual property. Practice management software vendors include the code set under license. When you see free lists online, they may be unlicensed, out of date, or missing revisions that change how a code is used.</p>
<p>The code set also changes every January 1. Our article on <a href="/blog/cdt-2026-code-changes/">CDT 2026 code changes</a> explains the annual cycle and what is coming in 2027.</p>

<h2>How do CDT codes pair with tooth numbers?</h2>
<p>Many procedures are tooth specific, and the claim must say which tooth. In the United States, dental claims generally use the Universal/National Tooth Designation System:</p>
<ul>
<li><strong>Permanent teeth</strong> are numbered 1 through 32, starting with the upper right third molar and moving across the upper arch to the upper left, then down to the lower left and across to the lower right.</li>
<li><strong>Primary teeth</strong> are lettered A through T, following the same direction.</li>
<li><strong>Supernumerary teeth</strong> have their own designations, which the ADA claim form instructions describe.</li>
</ul>
<p>A mismatch between the tooth number and the procedure is a common reason for denials. A molar-only procedure reported on an anterior tooth, or a primary tooth letter used for an adult, will often be rejected or questioned.</p>

<h2>How are surfaces reported?</h2>
<p>Restorations are often coded by the number of surfaces involved, so the surfaces listed must match the code. Surfaces are reported with single letters:</p>
<ul>
<li><strong>M</strong> for mesial and <strong>D</strong> for distal</li>
<li><strong>O</strong> for occlusal on posterior teeth and <strong>I</strong> for incisal on anterior teeth</li>
<li><strong>B</strong> for buccal and <strong>F</strong> for facial</li>
<li><strong>L</strong> for lingual</li>
</ul>
<p>If the claim lists three surfaces but the code describes a two-surface restoration, expect a denial or a request for clarification. Payers also compare surfaces across claims to spot repeat restorations on the same tooth within their replacement limits.</p>

<h2>What about quadrants, arches and areas of the oral cavity?</h2>
<p>Some procedures apply to a section of the mouth rather than a single tooth. Periodontal scaling and root planing, for example, is reported by quadrant. Dentures and some orthodontic services are reported by arch. The ADA claim form provides a field for the area of the oral cavity, which uses standard two-digit designations for the entire oral cavity, each arch and each quadrant. Common quadrant abbreviations are UR, UL, LR and LL.</p>
<p>When a code requires an area and it is missing, or when the same quadrant is billed twice on one date, the claim is likely to be denied.</p>

<h2>What else does each claim line need?</h2>
<ul>
<li><strong>Date of service</strong> for each procedure, which matters for frequency limits.</li>
<li><strong>Diagnosis codes</strong> when the payer requires them. Dental claims often do not, but some plans and Medicare dental claims linked to medical care do.</li>
<li><strong>Attachments</strong> such as radiographs, periodontal charts, photos and narratives for procedures that need them.</li>
<li><strong>Prosthesis replacement information</strong>, including whether it is an initial placement or replacement and the prior placement date.</li>
<li><strong>Orthodontic details</strong>, such as appliance placement date and months of treatment remaining.</li>
</ul>
<p>The claim itself is submitted on the ADA Dental Claim Form or electronically as an 837D transaction. Our overview of the <a href="/blog/dental-insurance-billing-process/">dental insurance billing process</a> walks through each step.</p>

<h2>What are the most common dental coding pitfalls?</h2>
<ol>
<li><strong>Using deleted or outdated codes</strong> after the January update.</li>
<li><strong>Mismatched tooth, surface and code</strong>, such as the wrong number of surfaces.</li>
<li><strong>Unbundling</strong>, or reporting separately a service that the code set or plan considers part of another procedure.</li>
<li><strong>Missing attachments</strong> for crowns, periodontal treatment, implants and surgical extractions.</li>
<li><strong>Frequency conflicts</strong>, such as billing a service before the plan's waiting window has passed.</li>
<li><strong>Coding to the fee</strong> instead of the documentation. The code must reflect what was done and recorded.</li>
<li><strong>Billing medical-type procedures to the dental plan only</strong>, when a medical plan might be the right payer. See our guide on <a href="/blog/billing-medical-insurance-for-dental-procedures/">billing medical insurance for dental procedures</a>.</li>
</ol>

<h2>How do category rules show up in daily billing?</h2>
<p>Knowing the category of a code helps predict how a plan will treat it. Diagnostic and preventive services are often covered at a higher percentage, with frequency limits. Basic restorative, endodontic and periodontal services often fall into a middle coverage tier, and many plans place crowns, prosthodontics and implant services in a major tier with waiting periods and lower coverage percentages. Orthodontics usually has its own lifetime maximum and age limits. Plans differ, so verification should confirm how each category is covered for each patient, but the pattern explains why the same patient may owe very different amounts for two procedures on the same day.</p>
<p>Categories also guide attachments. Claims in the periodontics, prosthodontics, implant and oral surgery ranges are the most likely to need radiographs, charting or narratives. Building that expectation into your workflow saves a round trip with the payer.</p>

<h2>How can an office keep coding consistent?</h2>
<ul>
<li>Keep the current CDT manual or app available at every billing workstation.</li>
<li>Update practice management software codes and fees every January.</li>
<li>Create internal notes for the procedures your office performs most, written in your own words and pointing to the manual.</li>
<li>Review denied claims monthly and group them by cause.</li>
<li>Have clinical and billing staff agree on documentation for procedures that often need narratives.</li>
</ul>
<p>Specialty offices have their own patterns. For example, <a href="/specialties/periodontics/">periodontal billing</a> relies heavily on charting and quadrant reporting, while orthodontic billing depends on treatment dates and payment schedules. Our <a href="/services/dental-billing/">dental billing</a> team works inside your practice software so coding standards apply where claims are created.</p>

<h2>Want your team's coding habits reviewed?</h2><p>If denials for tooth numbers, surfaces or missing attachments keep coming back, <a href="/consultation/">book a free consultation</a>. We can review a handful of recent claims with you, point out the patterns behind them and suggest simple internal checks your team can use.</p>
`,
    faqs: [
      {
        q: 'Is there an official dental billing codes cheat sheet?',
        a: 'The official reference is the ADA\'s CDT manual or app, which is licensed. Unofficial one-page lists may be incomplete or outdated, so offices should rely on the current CDT Code and their licensed software.',
      },
      {
        q: 'What are the main categories of CDT codes?',
        a: 'CDT codes are grouped into diagnostic, preventive, restorative, endodontics, periodontics, removable prosthodontics, maxillofacial prosthetics, implant services, fixed prosthodontics, oral and maxillofacial surgery, orthodontics and adjunctive general services.',
      },
      {
        q: 'What tooth numbering system is used on US dental claims?',
        a: 'US dental claims generally use the Universal/National Tooth Designation System, with permanent teeth numbered 1 to 32 and primary teeth lettered A to T.',
      },
      {
        q: 'Why do dental claims get denied for coding errors?',
        a: 'Common reasons include outdated codes, a tooth number or surface that does not match the code, missing quadrant or arch information, missing attachments and services billed outside frequency limits.',
      },
    ],
    sources: [S.adaCdt, S.adaClaimForm, S.adaCmc, S.cmsAdminSimp],
  },

  // 9 ------------------------------------------------------------------
  {
    slug: 'how-to-appeal-a-denied-dental-claim',
    title: 'How to Appeal a Denied Dental Claim: A Step-by-Step Guide',
    seoTitle: 'How to Appeal a Denied Dental Claim, Step by Step',
    metaDescription:
      'How to appeal a denied dental claim: read the EOB, choose a corrected claim or an appeal, gather records, write a clear letter, meet deadlines and follow up.',
    excerpt:
      'Not every dental denial is final. This guide explains how to read the denial, when to correct and resubmit instead of appealing, what to include in an appeal, and how to follow up.',
    category: 'Denial Management',
    tags: ['dental claim appeal', 'denial management', 'dental billing', 'EOB', 'narratives'],
    readingMinutes: 8,
    publishedAt: '2026-10-12',
    html: `
<p><strong>To appeal a denied dental claim, read the denial reason on the explanation of benefits, decide whether the claim needs a correction or a formal appeal, gather the clinical records that answer the denial reason, and send a clear written appeal before the plan's deadline.</strong> Then track the appeal until you receive a decision, and escalate if the plan allows a further level of review.</p>

<p>Dental denials are frustrating, but many are not final. Some come from simple errors that a corrected claim can fix. Others reflect plan policies that are hard to overturn. Knowing the difference saves time and helps you put effort where it is most likely to matter.</p>

<h2>Step 1: What does the denial actually say?</h2>
<p>Start with the explanation of benefits (EOB) or electronic remittance. Find the denial or adjustment reason for each line, along with any remark that explains it. Dental denials commonly fall into a few groups:</p>
<ul>
<li><strong>Information missing or incorrect</strong>: no radiographs, wrong tooth number, missing surfaces, missing date of prior placement.</li>
<li><strong>Frequency or limitation</strong>: the service was performed too soon after a previous one.</li>
<li><strong>Not a covered benefit</strong>: the plan excludes the service or the patient was in a waiting period.</li>
<li><strong>Clinical necessity</strong>: the reviewer did not see enough support for the procedure.</li>
<li><strong>Alternate benefit</strong>: the plan paid for a less costly procedure.</li>
<li><strong>Eligibility or coordination of benefits</strong>: coverage ended, or another plan should pay first.</li>
<li><strong>Annual maximum reached</strong>.</li>
</ul>
<p>Write down the exact reason in your own notes. Your response should answer that specific reason, not the general question of whether the treatment was a good idea.</p>

<h2>Step 2: Should you correct the claim or appeal it?</h2>
<p>If the denial is caused by an error on your side, such as a wrong tooth number, a missing attachment or an outdated code, a corrected claim or a resubmission with the missing information is usually faster than an appeal. Check the plan's instructions, because some plans want corrections through a specific process or portal.</p>
<p>A formal appeal fits when the claim was correct and complete but the plan disagreed, for example on clinical necessity, a downgrade you believe is wrong, or a frequency decision you can show does not apply. Some denials, such as an annual maximum that has truly been reached or a clear plan exclusion, are rarely worth appealing. In those cases, the better step is to explain the balance to the patient.</p>

<h2>Step 3: What is the appeal deadline?</h2>
<p>Every plan sets a deadline for appeals, which is usually printed on the EOB or in the plan or provider manual. Employer plans governed by federal law and state-regulated plans each have their own rules, and network contracts can add provider-specific timelines. Calendar the deadline as soon as the denial arrives. An appeal that misses the deadline may not be reviewed at all.</p>

<h2>Step 4: What records should you gather?</h2>
<p>Gather records that directly address the denial reason:</p>
<ul>
<li><strong>Current, diagnostic-quality radiographs</strong>, labeled with the patient name and date.</li>
<li><strong>Intraoral photos</strong> that show fractures, decay, failing restorations or tissue condition.</li>
<li><strong>Periodontal charting</strong> with pocket depths, bleeding and attachment levels, for periodontal procedures.</li>
<li><strong>Clinical notes</strong> from the date of service and any earlier visits that document the problem.</li>
<li><strong>A narrative</strong> from the treating dentist.</li>
<li><strong>Prior placement dates</strong> for replacements, and the reason for replacement.</li>
<li><strong>Coordination of benefits documents</strong>, such as the primary plan's EOB, if the denial relates to another payer.</li>
</ul>

<h2>Step 5: How do you write a dental appeal letter?</h2>
<p>Keep the letter short, specific and easy for a reviewer to follow. A good structure:</p>
<ol>
<li><strong>Identification.</strong> Patient name, subscriber ID, date of birth, claim number, date of service, procedure codes and tooth numbers.</li>
<li><strong>The request.</strong> State plainly that you are requesting reconsideration of the denial and what outcome you are asking for.</li>
<li><strong>The denial reason.</strong> Quote or paraphrase the reason given on the EOB.</li>
<li><strong>Your response.</strong> Explain clinically why the procedure was necessary, linking each point to an attached record. For a frequency denial, show why the earlier service does not apply or why a clinical change justified the treatment.</li>
<li><strong>Attachments list.</strong> Name each enclosed item.</li>
<li><strong>Signature</strong> from the treating dentist or authorized office representative, with contact information.</li>
</ol>
<p>Avoid emotional language and long histories that do not relate to the denial. A reviewer is looking for a clear clinical reason. The dentist's own words carry weight, so a short narrative that the dentist writes or approves is usually more persuasive than a template.</p>

<h2>Step 6: How should you send and track the appeal?</h2>
<p>Use the method the plan specifies, whether that is a portal, fax or mail. Keep proof of submission. Then set a follow-up date and check status if you have not heard back within the plan's stated review time. Log every call with the date, representative name and reference number.</p>
<p>If the appeal is denied, read the decision letter. Many plans offer a second-level review, and some patients have additional rights, such as external review for certain plan types or complaints to the state insurance regulator. Patients can sometimes file appeals on their own behalf, which can carry different rights than a provider appeal, so tell the patient about the decision and their options.</p>

<h2>What does a strong appeal look like for common denial types?</h2>
<table>
<thead><tr><th>Denial type</th><th>What usually helps</th></tr></thead>
<tbody>
<tr><td>Crown denied as not necessary</td><td>Radiographs and photos showing fracture, extensive decay or a failing restoration, plus a narrative on why a filling would not hold</td></tr>
<tr><td>Scaling and root planing denied</td><td>Full periodontal charting with pocket depths and bleeding, radiographs showing bone loss, and the diagnosis</td></tr>
<tr><td>Replacement denied under the replacement rule</td><td>Prior placement date, evidence the earlier restoration failed or was lost, and any qualifying exception in the plan</td></tr>
<tr><td>Frequency denial</td><td>Dates of prior services, proof the earlier service was by another plan or not counted, or a documented clinical change</td></tr>
<tr><td>Downgrade to an alternate benefit</td><td>Clinical reasons the alternate procedure would not have been appropriate for this tooth</td></tr>
</tbody>
</table>
<p>Not every denial type is worth the same effort. Track your results by type and payer over a few months, and focus your time where appeals tend to be decided on the merits.</p>

<h2>How can you reduce the need for dental appeals?</h2>
<ul>
<li>Verify benefits in detail, including frequencies, waiting periods and maximums, before treatment. Our <a href="/services/dental-insurance-verification/">dental insurance verification</a> service is designed around this step.</li>
<li>Send attachments with the first claim for procedures that commonly need them.</li>
<li>Use pre-treatment estimates for major procedures, keeping in mind they are not a guarantee of payment.</li>
<li>Review denials monthly by reason and fix the process that caused them.</li>
<li>Keep narratives specific and documentation complete at the time of service.</li>
</ul>
<p>For a broader framework, our guide on <a href="/blog/how-to-reduce-claim-denials/">how to reduce claim denials</a> applies to dental and medical practices alike, and our <a href="/tools/denial-appeal-checklist/">denial appeal checklist</a> can help your team organize each appeal.</p>

<h2>When does it make sense to get help with dental appeals?</h2>
<p>If appeals pile up, deadlines slip or the same denials keep returning, an outside team can help manage the workload. Our <a href="/services/denial-appeals/">denial appeals</a> and <a href="/services/dental-claims-processing/">dental claims processing</a> services work inside your practice software and clearinghouse, so every action stays visible to your office.</p>

<h2>Have a stack of denied dental claims?</h2><p>If denied claims are waiting on someone to find the time, <a href="/consultation/">set up a free consultation</a>. We can sort a sample of your open denials with you into corrections, appeals and patient balances, and talk through which ones are worth pursuing first.</p>
`,
    faqs: [
      {
        q: 'How long do I have to appeal a denied dental claim?',
        a: 'It depends on the plan. Appeal deadlines are usually printed on the EOB or in the plan or provider manual, and network contracts can add their own timelines, so calendar the deadline as soon as the denial arrives.',
      },
      {
        q: 'Should I resubmit or appeal a denied dental claim?',
        a: 'Resubmit a corrected claim when the denial came from an error such as a wrong tooth number or missing attachment. File an appeal when the claim was correct but the plan disagreed, such as on clinical necessity.',
      },
      {
        q: 'What should a dental appeal letter include?',
        a: 'Include patient and claim identifiers, the denial reason, a clear clinical explanation linked to attached records, a list of enclosures and the dentist\'s signature.',
      },
      {
        q: 'Can a patient appeal a dental claim denial?',
        a: 'Often, yes. Patients usually have their own appeal rights under their plan, which may differ from a provider\'s, so share the decision and their options with them.',
      },
    ],
    sources: [S.adaInsurance, S.adaClaimForm, S.adaCdt, S.x12Carc],
  },

  // 10 -----------------------------------------------------------------
  {
    slug: 'how-to-start-a-medical-billing-company',
    title: 'How to Start a Medical Billing Company: A Practical Overview',
    seoTitle: 'How to Start a Medical Billing Company: Key Steps',
    metaDescription:
      'How to start a medical billing company: skills, business setup, software, HIPAA business associate agreements, compliance basics and finding clients.',
    excerpt:
      'An informational overview of what it takes to start a medical billing company, from skills and legal setup to software, HIPAA obligations and finding your first clients.',
    category: 'Practice Management',
    tags: ['medical billing business', 'starting a billing company', 'HIPAA', 'business associate agreement', 'billing careers'],
    readingMinutes: 8,
    publishedAt: '2026-10-12',
    html: `
<p><strong>To start a medical billing company, you need solid billing and coding knowledge, a legal business entity, billing software and a clearinghouse connection, HIPAA safeguards and business associate agreements, insurance, written processes, and a plan for finding clients.</strong> Most people who succeed have worked in billing first, because clients are trusting you with their revenue and their patients' data.</p>

<p>This overview is informational. It explains the steps and responsibilities involved without making any promises about income, which depends on many factors outside anyone's control. If you are a practice owner, it can also help you understand what to expect from any billing company you consider.</p>

<h2>What skills does a medical billing company owner need?</h2>
<p>A billing company sells expertise, so the owner or lead staff need practical experience with:</p>
<ul>
<li><strong>The full revenue cycle</strong>, from eligibility and charge entry to payment posting, denials and patient balances. Our article on <a href="/blog/how-medical-billing-works/">how medical billing works</a> is a good overview.</li>
<li><strong>Code sets</strong>: ICD-10-CM, CPT and HCPCS, and the rules that connect them.</li>
<li><strong>Payer rules</strong>: Medicare, Medicaid and commercial plans, including timely filing, prior authorization and appeals.</li>
<li><strong>Claims technology</strong>: the 837 claim and 835 remittance transactions, clearinghouses and payer portals.</li>
<li><strong>Reporting</strong>: building monthly reports that show a client how their revenue cycle is performing.</li>
<li><strong>Business skills</strong>: pricing, contracts, client communication and staffing.</li>
</ul>
<p>Many billers build credibility with a professional credential. Our guide to <a href="/blog/medical-billing-and-coding-certifications/">medical billing and coding certifications</a> describes the common options.</p>

<h2>How do you set up the business?</h2>
<ol>
<li><strong>Choose a structure.</strong> Many billing companies form a limited liability company or corporation. A lawyer or accountant can explain the tax and liability differences in your state.</li>
<li><strong>Register the business</strong> with your state and get an employer identification number from the IRS.</li>
<li><strong>Check local licensing.</strong> Requirements vary by state and city. Some states have rules for businesses that handle collections, which can apply if you work patient balances.</li>
<li><strong>Open a business bank account</strong> and set up bookkeeping.</li>
<li><strong>Get insurance.</strong> Professional liability (errors and omissions) and cyber liability coverage are commonly expected by clients.</li>
<li><strong>Prepare client contracts</strong> that define services, responsibilities, fees, data handling, termination and record return. Have them reviewed by a lawyer.</li>
</ol>

<h2>What software and tools do you need?</h2>
<p>Billing companies work in one of two ways: in their own billing platform, or inside each client's practice management and EHR systems. Many do both. You will typically need:</p>
<ul>
<li><strong>Practice management or billing software</strong>, or reliable access to each client's system.</li>
<li><strong>A clearinghouse</strong> for claim submission, eligibility checks and electronic remittances.</li>
<li><strong>Secure communication tools</strong>, such as encrypted email and file transfer.</li>
<li><strong>Secure workstations</strong> with up-to-date operating systems, endpoint protection, encrypted disks and multi-factor authentication.</li>
<li><strong>Code references</strong>: licensed CPT, plus ICD-10-CM and HCPCS references.</li>
<li><strong>Task and reporting tools</strong> to track follow-up work and produce client reports.</li>
</ul>

<h2>What are the compliance basics?</h2>
<p>A medical billing company that handles protected health information on behalf of a provider is generally a business associate under HIPAA. That brings several obligations:</p>
<ul>
<li><strong>Business associate agreements.</strong> Each client, as a covered entity, must have a written business associate agreement with you before you access patient data. HHS publishes sample provisions that describe what these agreements must address. If you use subcontractors, such as a cloud service that stores patient data, you need agreements with them too.</li>
<li><strong>HIPAA Security Rule safeguards.</strong> Business associates are directly responsible for protecting electronic patient data, which includes a documented risk analysis, written policies, workforce training, access controls and breach response procedures.</li>
<li><strong>Minimum necessary access.</strong> Staff should see only the data they need to do their work.</li>
<li><strong>Accurate billing.</strong> Billing companies must not submit claims they know to be false. The HHS Office of Inspector General has published compliance program guidance for third-party billing companies, which is worth reading as a framework.</li>
<li><strong>Payer and state rules</strong>, including any registration or reporting requirements that apply where you and your clients operate.</li>
</ul>
<p>If you work with patient balances, also learn the federal and state rules on debt collection and patient communications.</p>

<h2>How do medical billing companies find clients?</h2>
<p>There is no single path. Common approaches include:</p>
<ul>
<li><strong>Your existing network</strong>: practices you have worked for, colleagues and former coworkers.</li>
<li><strong>A focus on a niche</strong>, such as a specialty or a practice software platform, which makes your expertise easier to explain.</li>
<li><strong>Referrals</strong> from accountants, practice consultants and software vendors who work with small practices.</li>
<li><strong>Educational content</strong> that answers practice owners' real questions.</li>
<li><strong>Local professional associations</strong> and practice manager groups.</li>
</ul>
<p>Be honest in marketing. Avoid claims you cannot support, such as guaranteed collection increases, and do not imply certifications or compliance status you do not have. Practices are increasingly careful about who they trust with their revenue.</p>

<h2>How should you price billing services?</h2>
<p>Billing companies use several pricing models, including a percentage of collections, a per-claim fee, a flat monthly fee, or hourly rates for specific projects. Each has trade-offs for both sides. Whatever model you choose, define exactly what is included, such as patient statements, credentialing or old AR cleanup, so there are no surprises. Our article on <a href="/blog/what-is-ar-in-medical-billing/">accounts receivable in medical billing</a> explains the kind of work that often falls into "extra" categories.</p>

<h2>What does onboarding a new client involve?</h2>
<ol>
<li>Sign the service agreement and business associate agreement.</li>
<li>Get system access with individual user accounts, not shared logins.</li>
<li>Review the practice's payer mix, fee schedule, enrollment status and open AR.</li>
<li>Document the workflow: who does what, and when.</li>
<li>Agree on reporting, such as monthly collections, denial trends and aging.</li>
<li>Set a regular check-in schedule with the practice.</li>
</ol>

<h2>What processes should be written down from day one?</h2>
<p>Written processes protect clients and make it possible to hire. At a minimum, document how you handle:</p>
<ul>
<li><strong>Charge entry and claim submission</strong>, including how you confirm that every visit was billed.</li>
<li><strong>Clearinghouse rejections</strong>, with a daily check so rejected claims do not sit unnoticed.</li>
<li><strong>Payment posting</strong>, including how you flag underpayments and denials.</li>
<li><strong>Denial follow-up and appeals</strong>, with deadlines tracked per payer.</li>
<li><strong>Patient calls and statements</strong>, including identity verification.</li>
<li><strong>Security incidents</strong>, such as a lost laptop or a misdirected fax, and how clients will be notified.</li>
<li><strong>Offboarding</strong>, including how system access is removed and records are returned when a contract ends.</li>
</ul>
<p>These documents also help when a prospective client asks how you work, which most careful practice owners will.</p>

<h2>Is starting a billing company right for you?</h2>
<p>It can be a good fit for experienced billers who enjoy problem solving and are prepared to run a business. It also carries real responsibility: your mistakes affect a practice's cash flow and its patients' privacy. Starting small, with one or two clients you know well, lets you build processes before you grow. If you would rather keep working in billing without running the business side, joining an established team is another path; you can see our <a href="/careers/">careers</a> page for how we describe our own roles.</p>

<h2>Are you a practice owner comparing billing options?</h2><p>If you are reading this because you are weighing an outside billing partner against building your own team, <a href="/consultation/">talk with us in a free consultation</a>. We will explain how we work inside your systems, how we handle business associate agreements, and what questions to ask any billing company before you sign.</p>
`,
    faqs: [
      {
        q: 'Do you need a license to start a medical billing company?',
        a: 'There is no single national license for medical billing companies, but state and local business registration rules apply, and some states regulate collection activities. Check the requirements where you and your clients are located.',
      },
      {
        q: 'Does a medical billing company need a business associate agreement?',
        a: 'Yes, in most cases. A billing company that handles protected health information for a provider is generally a HIPAA business associate and must sign a business associate agreement with each client before accessing patient data.',
      },
      {
        q: 'Do you need a certification to start a medical billing company?',
        a: 'No certification is legally required, but credentials such as those from AAPC, AHIMA, NHA or HFMA can demonstrate knowledge to potential clients.',
      },
      {
        q: 'What software does a medical billing company need?',
        a: 'Most need billing or practice management software, a clearinghouse, secure communication tools and code references. Many also work directly inside each client\'s own EHR and practice management system.',
      },
    ],
    sources: [S.hhsBa, S.hhsBaa, S.cmsAdminSimp, S.nucc1500, S.amaCpt],
  },

  // 11 -----------------------------------------------------------------
  {
    slug: 'medical-billing-and-coding-certifications',
    title: 'Medical Billing and Coding Certifications: Which One Fits Your Career?',
    seoTitle: 'Medical Billing Certification Online: Options Compared',
    metaDescription:
      'Medical billing certification online options compared: AAPC CPC and CPB, AHIMA CCA and CCS, NHA CBCS and HFMA CRCR, who each suits and how to choose.',
    excerpt:
      'A neutral comparison of common medical billing and coding certifications, including who issues each one, what it focuses on, how exams are offered and how to pick the right fit.',
    category: 'Medical Coding',
    tags: ['medical billing certification online', 'CPC', 'CPB', 'CCA', 'CCS', 'CBCS', 'CRCR'],
    readingMinutes: 8,
    publishedAt: '2026-10-12',
    html: `
<p><strong>The most common medical billing and coding certifications are AAPC's CPC and CPB, AHIMA's CCA and CCS, NHA's CBCS and HFMA's CRCR.</strong> Several can be prepared for and, in some cases, taken online with remote proctoring. The right choice depends on whether you want to focus on coding, billing or the broader revenue cycle, and on whether you plan to work in physician offices or hospitals.</p>

<p>This guide compares the options in neutral terms. Requirements, formats and fees change, so always confirm the details on each organization's official website before you register. Nothing here describes the credentials of our own team.</p>

<h2>Why get a medical billing or coding certification?</h2>
<p>A certification is not legally required to work in medical billing, but many employers prefer or require one, especially for coding roles. A credential shows that you passed an exam built around a defined body of knowledge, and most require continuing education to keep it, which signals that you stay current with annual code changes.</p>
<p>Certification also helps you structure your learning. Studying for an exam forces you to work through guidelines and scenarios you might not see in your first job.</p>

<h2>What are the AAPC certifications?</h2>
<p>AAPC is a large professional association focused on the business side of healthcare, with a strong emphasis on physician and outpatient settings.</p>
<ul>
<li><strong>Certified Professional Coder (CPC).</strong> AAPC's best-known coding credential, focused on assigning CPT, HCPCS Level II and ICD-10-CM codes for physician and outpatient services. Newly certified people without enough work experience may hold an apprentice designation until they meet AAPC's experience requirements.</li>
<li><strong>Certified Professional Biller (CPB).</strong> Focused on billing: claim submission, payer rules, payment posting, denials, appeals and collections.</li>
</ul>
<p>AAPC offers its exams at testing centers and online with live remote proctoring, and it publishes the approved code books and exam rules for each credential. AAPC also offers specialty credentials for areas such as risk adjustment, auditing and specific medical specialties.</p>

<h2>What are the AHIMA certifications?</h2>
<p>AHIMA, the American Health Information Management Association, focuses on health information management, and its coding credentials are often associated with hospital settings.</p>
<ul>
<li><strong>Certified Coding Associate (CCA).</strong> An entry-level coding credential that covers classification systems, reimbursement, compliance and related knowledge. AHIMA suggests, but does not strictly require, coding training or experience.</li>
<li><strong>Certified Coding Specialist (CCS).</strong> An advanced credential for experienced coders, with an emphasis on inpatient and outpatient hospital coding, including ICD-10-PCS. AHIMA lists eligibility paths that combine other credentials, education or coding experience.</li>
</ul>
<p>AHIMA also offers a physician-based coding credential and broader health information credentials. Check AHIMA's candidate guide for current eligibility, exam format and code book rules.</p>

<h2>What is the NHA CBCS?</h2>
<p>The National Healthcareer Association (NHA) offers the <strong>Certified Billing and Coding Specialist (CBCS)</strong>. It is designed as an entry-level credential that covers both billing and coding, including the revenue cycle, regulatory compliance, insurance eligibility, coding and reimbursement. NHA lists eligibility through completion of a training program or relevant work experience, and it offers testing at schools, testing centers and through live remote proctoring. The CBCS is common in career training programs.</p>

<h2>What is the HFMA CRCR?</h2>
<p>The Healthcare Financial Management Association (HFMA) offers the <strong>Certified Revenue Cycle Representative (CRCR)</strong>. It takes a broader view than a coding credential, covering the whole revenue cycle, from patient access and financial counseling to claims, collections and compliance. HFMA delivers it as an online, self-paced program with an exam, and it suits people in patient access, billing, customer service and revenue cycle operations roles. HFMA recommends some revenue cycle experience.</p>

<h2>How do these certifications compare?</h2>
<table>
<thead><tr><th>Credential</th><th>Issuing body</th><th>Main focus</th><th>Often suits</th></tr></thead>
<tbody>
<tr><td>CPC</td><td>AAPC</td><td>Professional (physician) coding</td><td>Coders in physician practices and outpatient settings</td></tr>
<tr><td>CPB</td><td>AAPC</td><td>Medical billing and reimbursement</td><td>Billers, AR and denial specialists</td></tr>
<tr><td>CCA</td><td>AHIMA</td><td>Entry-level coding</td><td>New coders, especially those aiming for hospitals</td></tr>
<tr><td>CCS</td><td>AHIMA</td><td>Advanced facility coding</td><td>Experienced hospital coders</td></tr>
<tr><td>CBCS</td><td>NHA</td><td>Entry-level billing and coding</td><td>Graduates of training programs and new staff</td></tr>
<tr><td>CRCR</td><td>HFMA</td><td>Revenue cycle operations</td><td>Patient access, billing and revenue cycle staff</td></tr>
</tbody>
</table>

<h2>Can you get a medical billing certification online?</h2>
<p>In many cases, yes. Training for all of these credentials is widely available online, and several organizations offer remotely proctored exams with strict rules about your testing space, webcam, identification and permitted books. The HFMA CRCR program is delivered online. Before you register:</p>
<ul>
<li>Confirm the exam is offered remotely in your location.</li>
<li>Check the technical requirements and run any system test the organization provides.</li>
<li>Find out which code books, editions and formats are allowed.</li>
<li>Read the rescheduling and retake policies.</li>
</ul>
<p>Be careful with training providers that promise a job or a specific salary after certification. Official sites will tell you what the credential is; no one can promise what an employer will do.</p>

<h2>How do you choose the right certification?</h2>
<ol>
<li><strong>Decide on coding, billing or the broader revenue cycle.</strong> If you want to assign codes, look at coding credentials. If you want to work claims, payments and denials, a billing or revenue cycle credential may fit better.</li>
<li><strong>Consider your setting.</strong> Physician offices often look for professional coding credentials, while hospitals often look for facility coding credentials.</li>
<li><strong>Look at local job postings.</strong> See which credentials employers in your area list.</li>
<li><strong>Check eligibility.</strong> Some credentials suit beginners; others expect experience or another credential first.</li>
<li><strong>Plan for upkeep.</strong> Most credentials require continuing education and renewal fees.</li>
</ol>

<h2>How do you keep a certification active?</h2>
<p>Most of these credentials are not a one-time achievement. AAPC, AHIMA and NHA generally require continuing education units (CEUs) during each renewal cycle, along with a renewal or membership fee. CEUs can come from webinars, conferences, local chapter meetings, courses and approved publications. Because code sets change every year, much of that education naturally focuses on annual updates. Check each organization's current renewal requirements and keep records of your CEUs, since audits do happen.</p>
<p>Some people eventually hold more than one credential, for example a coding credential plus a billing or revenue cycle credential, or a general coding credential plus a specialty credential. That can be useful once you know which direction your career is heading, but it is rarely necessary at the start.</p>

<h2>What does the exam day experience look like?</h2>
<p>Coding exams are typically long, timed tests built around realistic scenarios. You read a short clinical note and choose the correct codes from several options, often with the code books open beside you. Time management matters as much as knowledge. Practice exams under timed conditions, tab and highlight your books if the rules allow it, and learn the guidelines well enough that you can find answers quickly rather than reading every option in full.</p>

<h2>What should you study, whatever certification you choose?</h2>
<ul>
<li>ICD-10-CM conventions and Official Guidelines.</li>
<li>CPT structure, guidelines and modifiers, and HCPCS Level II.</li>
<li>Medical terminology, anatomy and basic pathophysiology.</li>
<li>Payer basics: Medicare, Medicaid, commercial plans and coordination of benefits.</li>
<li>Claim forms and electronic transactions.</li>
<li>Compliance basics, including HIPAA privacy and correct coding edits.</li>
</ul>
<p>Our guides to <a href="/blog/how-medical-billing-works/">how medical billing works</a>, <a href="/blog/cpt-2026-code-changes/">CPT 2026 code changes</a> and <a href="/blog/icd-10-cm-2026-updates/">ICD-10-CM updates</a> are useful background, and our <a href="/tools/medical-billing-glossary/">medical billing glossary</a> explains common terms.</p>

<h2>Thinking about billing for practices rather than studying for an exam?</h2><p>If you are a practice owner researching certifications because you are deciding how to staff billing and coding, <a href="/consultation/">book a free consultation</a>. We can talk through which tasks need dedicated coding skill in your practice and how a remote team working inside your systems could fit alongside your staff.</p>
`,
    faqs: [
      {
        q: 'Can I get a medical billing certification online?',
        a: 'Often, yes. Training is widely available online, and organizations such as AAPC and NHA offer live remotely proctored exams, while HFMA delivers its CRCR program online. Confirm current formats and rules on each official site.',
      },
      {
        q: 'What is the difference between the CPC and the CPB?',
        a: 'Both are AAPC credentials. The CPC focuses on assigning codes for physician and outpatient services, while the CPB focuses on billing tasks such as claims, payer rules, payments, denials and appeals.',
      },
      {
        q: 'Which coding certification is best for hospital work?',
        a: 'AHIMA\'s CCS is often associated with hospital coding because it emphasizes inpatient and outpatient facility coding. AHIMA\'s CCA is an entry-level option for people starting out.',
      },
      {
        q: 'Is a certification required to work in medical billing?',
        a: 'No law requires one, but many employers prefer or require a credential, especially for coding roles. Requirements vary by employer.',
      },
    ],
    sources: [S.aapcCpc, S.aapcCpb, S.ahimaCca, S.ahimaCcs, S.nhaCbcs, S.hfmaCrcr],
  },

  // 12 -----------------------------------------------------------------
  {
    slug: 'dental-billing-training-guide',
    title: 'Dental Billing Training: What to Learn and Where to Start',
    seoTitle: 'Dental Billing Training Course Guide: What to Learn',
    metaDescription:
      'Choosing a dental billing training course? The topics that matter: ADA claim form, CDT codes, insurance types, verification, software skills and appeals.',
    excerpt:
      'A neutral guide to dental billing training: the skills a good course should cover, how to practice them, and reliable resources for learning the ADA claim form, CDT coding and dental insurance.',
    category: 'Dental Billing',
    tags: ['dental billing training course', 'dental billing skills', 'ADA claim form', 'CDT', 'dental office careers'],
    readingMinutes: 8,
    publishedAt: '2026-10-12',
    html: `
<p><strong>A good dental billing training course should teach the ADA Dental Claim Form, CDT coding, the main types of dental insurance, benefit verification, practice management software skills, payment posting, and how to handle denials and appeals.</strong> You can learn through formal courses, on-the-job training and official resources from the American Dental Association, and the best programs mix all three.</p>

<p>We do not sell a training course. This guide is meant to help new team members, office managers and practice owners judge any course against what the job actually requires. It is organized by skill, with ideas for practicing each one.</p>

<h2>What does a dental biller do?</h2>
<p>Dental billers turn treatment into payment. Day to day, that can include verifying insurance, preparing treatment estimates, submitting claims with the right attachments, posting payments and adjustments, following up on unpaid claims, appealing denials and helping patients understand their balances. In small offices, one person may also schedule, check patients in and answer phones. Our overview of the <a href="/blog/dental-insurance-billing-process/">dental insurance billing process</a> shows how these tasks connect.</p>

<h2>What should a dental billing training course cover?</h2>

<h3>1. Dental insurance basics</h3>
<p>Trainees should understand the main plan types and how each pays:</p>
<ul>
<li><strong>PPO plans</strong>, with contracted fee schedules and write-offs. Trainees should be able to explain a write-off to a patient in one or two sentences.</li>
<li><strong>DHMO or capitation plans</strong>, where the office receives a set payment per member and patients pay listed copays.</li>
<li><strong>Indemnity and out-of-network benefits</strong>, often based on usual and customary fees.</li>
<li><strong>Discount plans</strong>, which are not insurance at all.</li>
<li><strong>Government programs</strong>, including Medicaid and CHIP dental and Medicare Advantage dental benefits. Each has its own enrollment, authorization and billing rules, and some vary by state.</li>
</ul>
<p>Key terms include deductible, coinsurance, annual maximum, waiting period, frequency limitation, missing tooth clause, alternate benefit and coordination of benefits.</p>

<h3>2. Insurance verification</h3>
<p>Verification is where many claim problems begin. Training should cover how to confirm eligibility and gather benefit details through payer portals, phone calls and electronic eligibility responses, and how to record them consistently. Practice with a real checklist, such as our <a href="/tools/dental-insurance-verification-checklist/">dental insurance verification checklist</a>.</p>

<h3>3. CDT coding</h3>
<p>Billers need to know how the CDT Code is organized, how to find codes in the official manual, and how to pair codes with tooth numbers, surfaces and quadrants. They should also understand the annual update cycle. A good course uses the current CDT manual or licensed software rather than unofficial code lists. Our <a href="/blog/dental-billing-codes-guide/">dental billing codes guide</a> explains the category structure.</p>

<h3>4. The ADA Dental Claim Form and electronic claims</h3>
<p>The ADA Dental Claim Form is the standard paper form, and its electronic counterpart is the HIPAA 837D transaction. Training should walk through each section of the form, including patient and subscriber details, other coverage, procedure lines, prosthesis and orthodontic fields, and provider identifiers such as the NPI. Trainees should also learn how claims move through a clearinghouse and how to read rejection reports.</p>

<h3>5. Attachments and narratives</h3>
<p>Many procedures need radiographs, periodontal charting, photos or narratives. Trainees should learn which procedures commonly need what, how to attach documents electronically and how to work with the dentist on a clear, accurate narrative.</p>

<h3>6. Payment posting and EOBs</h3>
<p>Reading an explanation of benefits is a core skill. Trainees should practice posting insurance payments, contractual write-offs and patient payments correctly, recognizing underpayments and downgrades, and spotting denials that need action rather than adjustment.</p>

<h3>7. Accounts receivable and denials</h3>
<p>Training should cover insurance aging reports, follow-up schedules, corrected claims and appeals. Trainees should practice deciding whether a denial needs a corrected claim, an appeal or a conversation with the patient.</p>

<h3>8. Patient communication and collections</h3>
<p>Billers explain estimates and balances to patients. Courses should include how to present costs clearly, set payment expectations before treatment and handle billing questions with patience.</p>

<h3>9. Compliance and privacy</h3>
<p>Every trainee needs HIPAA privacy and security basics: protecting patient information, verifying identity on calls, using minimum necessary access and reporting incidents. Billing must also be accurate; codes must reflect what was done and documented.</p>

<h3>10. Medical crossover basics</h3>
<p>Advanced training should introduce the idea that some dental procedures are billed to medical plans, such as trauma, certain oral surgery and sleep apnea appliances. These claims use medical code sets and the CMS-1500 form, so they are usually taught after the dental basics are solid.</p>

<h2>Which software skills matter most?</h2>
<p>Most dental offices use a practice management system such as Dentrix, Open Dental, Eaglesoft or Curve Dental. Skills that transfer between systems include:</p>
<ul>
<li>Entering patient, subscriber and plan information.</li>
<li>Loading and assigning fee schedules.</li>
<li>Creating treatment plans and estimates.</li>
<li>Generating, attaching and sending claims.</li>
<li>Posting payments and adjustments.</li>
<li>Running aging, production and collection reports.</li>
</ul>
<p>Software vendors usually offer their own training materials and videos. If you are hiring, ask candidates which systems they know and test the skills you rely on most.</p>

<h2>How can a new biller practice safely?</h2>
<p>The fastest learning happens on real work, but real work involves real patient data and real money. A practical training plan for a new team member might look like this:</p>
<ol>
<li><strong>Shadow first.</strong> Sit with an experienced biller for verification calls, claim creation and payment posting.</li>
<li><strong>Work on a test patient</strong> in the practice management system, if your software supports one, to practice entering plans and building claims.</li>
<li><strong>Review before sending.</strong> Have an experienced team member check claims and postings for the first few weeks.</li>
<li><strong>Take on one task at a time.</strong> Start with verification or posting, then add claims, then follow-up and appeals.</li>
<li><strong>Keep a personal notebook</strong> of payer quirks and office rules, written in your own words.</li>
</ol>
<p>Pair this with a short weekly review of mistakes and lessons. Most errors in a new biller's first months are process gaps, not knowledge gaps, and they are easy to fix when someone points them out early.</p>

<h2>How do you judge a dental billing course?</h2>
<ul>
<li>Does it use current CDT material and the current ADA claim form?</li>
<li>Does it include hands-on practice with real-world scenarios?</li>
<li>Does it cover both front-end verification and back-end follow-up?</li>
<li>Is the instructor experienced in dental billing, not only medical billing?</li>
<li>Is the content updated each year?</li>
<li>Are the claims about job placement or earnings realistic? Be cautious of promises.</li>
</ul>

<h2>What resources can help you keep learning?</h2>
<ul>
<li><strong>ADA resources</strong> on the CDT Code, the dental claim form and dental insurance topics.</li>
<li><strong>Your state dental association</strong>, which may offer courses and insurance help.</li>
<li><strong>Payer provider manuals</strong>, which explain each plan's rules.</li>
<li><strong>Software vendor training</strong> for your practice management system.</li>
<li><strong>Peer groups</strong> of dental office managers and billers.</li>
</ul>

<h2>Is training enough, or do you need outside help?</h2>
<p>Training builds a strong in-house team, but turnover and vacations can still leave gaps. Some practices pair trained in-house staff with an outside team for verification, claims or AR follow-up. Our <a href="/services/dental-billing/">dental billing</a> service and <a href="/services/dental-virtual-assistant/">dental virtual assistant</a> support are designed to work alongside your staff inside your own software.</p>

<h2>Building or rebuilding your billing team?</h2><p>If you are training a new biller and want to know where your current process is most fragile, <a href="/consultation/">schedule a free consultation</a>. We can walk through your verification, claims and follow-up steps with you and suggest which ones are worth documenting first for a new team member.</p>
`,
    faqs: [
      {
        q: 'What should a dental billing training course cover?',
        a: 'It should cover dental insurance types, benefit verification, CDT coding, the ADA Dental Claim Form and electronic claims, attachments, payment posting, AR follow-up, appeals, patient communication and HIPAA basics.',
      },
      {
        q: 'Is dental billing different from medical billing?',
        a: 'Yes. Dental billing uses CDT codes and the ADA Dental Claim Form, and dental plans have features such as annual maximums and frequency limits. Medical billing uses ICD-10-CM, CPT and HCPCS codes and the CMS-1500 form.',
      },
      {
        q: 'How long does it take to learn dental billing?',
        a: 'It varies. Basic tasks can be learned in weeks with good supervision, while confident handling of denials, appeals and complex plans usually takes longer hands-on experience.',
      },
      {
        q: 'Is there a certification for dental billing?',
        a: 'There is no single required national dental billing certification. Some organizations and schools offer certificates, so judge each program by its content, currency and instructor experience.',
      },
    ],
    sources: [S.adaCdt, S.adaClaimForm, S.adaInsurance, S.medicaidDental, S.cmsAdminSimp],
  },

  // 13 -----------------------------------------------------------------
  {
    slug: 'common-medical-billing-denial-codes',
    title: 'Common Medical Billing Denial Codes Explained, With Fixes',
    seoTitle: 'Common Medical Billing Denial Codes and How to Fix Them',
    metaDescription:
      'Common medical billing denial codes in plain language: CARC group codes (CO, PR, OA, PI) and frequent reason codes, what each means and how to fix it.',
    excerpt:
      'A plain-language guide to the denial and adjustment codes you see most on remittances: what the group codes mean, what common reason codes usually signal, and practical fixes for each.',
    category: 'Denial Management',
    tags: ['common medical billing denial codes', 'CARC', 'RARC', 'denial management', 'remittance advice'],
    readingMinutes: 9,
    publishedAt: '2026-10-12',
    html: `
<p><strong>The most common medical billing denial codes are Claim Adjustment Reason Codes (CARCs), paired with a group code (CO, PR, OA or PI) that shows who is responsible for the amount.</strong> Frequent ones point to missing information, duplicate claims, eligibility problems, missing authorization, bundling, medical necessity and timely filing. Each points to a different fix, so reading the code is the first step in working the denial.</p>

<p>These codes are maintained by the X12 code committee and appear on the electronic remittance advice (the 835 transaction) and paper explanations of benefits. The descriptions below are written in our own plain words to explain what each code usually signals in practice. For official wording, use the X12 code lists, and for a searchable list see our <a href="/tools/denial-reasons-guide/">denial reasons guide</a>.</p>

<h2>What are CARC group codes?</h2>
<p>Every adjustment on a remittance has a group code that tells you who is financially responsible for that amount:</p>
<table>
<thead><tr><th>Group code</th><th>Short name</th><th>What it usually means for you</th></tr></thead>
<tbody>
<tr><td>CO</td><td>Contractual obligation</td><td>The provider is responsible under the contract or payer policy. You generally cannot bill the patient for it.</td></tr>
<tr><td>PR</td><td>Patient responsibility</td><td>The amount can be billed to the patient, such as deductible, coinsurance or copay, or a non-covered service the patient agreed to pay for.</td></tr>
<tr><td>OA</td><td>Other adjustment</td><td>An adjustment that does not fit CO or PR, often related to coordination of benefits or informational items.</td></tr>
<tr><td>PI</td><td>Payer initiated reduction</td><td>The payer reduced the amount, and it is not the patient's responsibility, but it may not be a contractual write-off either.</td></tr>
</tbody>
</table>
<p>The group code matters as much as the reason code. The same reason with CO means a write-off or appeal on your side, while with PR it may become a patient balance.</p>

<h2>What do the most common reason codes mean?</h2>
<p>Below are frequent CARCs, grouped by the kind of problem they signal. Payers also send Remittance Advice Remark Codes (RARCs) that add detail, so always read the remark codes alongside the reason code.</p>

<h3>Patient cost sharing: CARC 1, 2 and 3</h3>
<p><strong>What they signal:</strong> the amount applied to the patient's deductible (1), coinsurance (2) or copay (3). These are not denials in the usual sense.</p>
<p><strong>Fix:</strong> post them as patient responsibility, check that the amounts match the patient's benefits, and bill the patient or a secondary plan as appropriate.</p>

<h3>Missing or incorrect information: CARC 16</h3>
<p><strong>What it signals:</strong> the claim lacks information or has errors that prevent processing. A remark code usually names the missing item.</p>
<p><strong>Fix:</strong> read the remark code, correct the field, such as a missing NPI, referring provider or invalid date, and submit a corrected claim. Tighten front-end checks or scrubber rules so the same gap does not repeat.</p>

<h3>Duplicate claims: CARC 18</h3>
<p><strong>What it signals:</strong> the payer believes it already received this claim or service.</p>
<p><strong>Fix:</strong> check claim status before resubmitting. If it was a true duplicate, no action is needed. If the service was distinct, such as a repeat procedure on the same day, submit a corrected claim with the appropriate modifier and documentation rather than sending the same claim again.</p>

<h3>Coordination of benefits: CARC 22</h3>
<p><strong>What it signals:</strong> another payer may be primary.</p>
<p><strong>Fix:</strong> confirm coverage order with the patient and payers, update the patient record, and bill the primary plan first. Send the secondary claim with the primary's remittance.</p>

<h3>Coverage ended or not yet active: CARC 27 and related codes</h3>
<p><strong>What it signals:</strong> the patient was not covered on the date of service.</p>
<p><strong>Fix:</strong> verify eligibility, ask the patient about new coverage and bill the right plan. Prevent it by checking eligibility before every visit with a consistent <a href="/services/insurance-eligibility-verification/">insurance eligibility verification</a> routine.</p>

<h3>Timely filing: CARC 29</h3>
<p><strong>What it signals:</strong> the payer received the claim after its filing deadline.</p>
<p><strong>Fix:</strong> if you have proof the claim was submitted on time, such as clearinghouse acceptance reports, appeal with that proof. If not, the amount is often a write-off. Prevent it with regular follow-up on unacknowledged claims.</p>

<h3>Fee schedule adjustment: CARC 45</h3>
<p><strong>What it signals:</strong> the charge exceeds the contracted or allowed amount. With group CO, this is the normal contractual write-off.</p>
<p><strong>Fix:</strong> usually none, but compare the allowed amount with your contract. If it is lower than agreed, follow up as an underpayment.</p>

<h3>Medical necessity: CARC 50</h3>
<p><strong>What it signals:</strong> the payer does not consider the service medically necessary based on what it received.</p>
<p><strong>Fix:</strong> check that diagnosis codes support the service and match coverage policies, then appeal with documentation if the record supports necessity. For Medicare patients, a properly issued Advance Beneficiary Notice before the service affects whether the patient can be billed.</p>

<h3>Non-covered services: CARC 96</h3>
<p><strong>What it signals:</strong> the service is not covered under the patient's plan. A remark code often gives the reason.</p>
<p><strong>Fix:</strong> confirm the benefit. If it is truly excluded, decide whether the patient can be billed under the plan and any advance notice rules. If you believe it is covered, appeal with the plan language.</p>

<h3>Bundling: CARC 97</h3>
<p><strong>What it signals:</strong> the payment for this service is included in another service or procedure paid on the same claim or date.</p>
<p><strong>Fix:</strong> review coding edits such as the National Correct Coding Initiative. If the services were separate and distinct and documentation supports it, a modifier and corrected claim may be appropriate. If not, it is a coding education issue.</p>

<h3>Wrong payer: CARC 109</h3>
<p><strong>What it signals:</strong> this payer or contractor is not responsible for the claim, for example a Medicare Advantage patient billed to Original Medicare.</p>
<p><strong>Fix:</strong> identify the correct payer and resubmit there.</p>

<h3>Diagnosis or modifier mismatch: CARC 4, 11 and 167</h3>
<p><strong>What they signal:</strong> a modifier is inconsistent with the procedure or missing (4), the diagnosis does not fit the procedure (11), or the diagnosis is not covered (167).</p>
<p><strong>Fix:</strong> review the documentation and coding, correct and resubmit if there was an error, or appeal if the coding was right.</p>

<h3>Authorization missing: CARC 197</h3>
<p><strong>What it signals:</strong> the service required precertification, authorization or notification that the payer did not find.</p>
<p><strong>Fix:</strong> check whether an authorization exists and was linked to the claim. If it was obtained, resubmit with the number. If it was not, some payers allow retro-authorization; otherwise, the amount may be a write-off. Prevent it with a clear <a href="/services/prior-authorization/">prior authorization</a> workflow.</p>

<h3>Attachment needed: CARC 252</h3>
<p><strong>What it signals:</strong> the payer needs supporting documentation.</p>
<p><strong>Fix:</strong> send the requested records through the payer's attachment process quickly, referencing the claim number.</p>

<h2>How should a practice work denial codes efficiently?</h2>
<ol>
<li><strong>Sort denials by group and reason code</strong> every week.</li>
<li><strong>Separate correctable errors from true disputes.</strong> Corrections go back fast; disputes go to appeal.</li>
<li><strong>Track root causes</strong>, such as registration, coding, authorization or payer error.</li>
<li><strong>Fix the process, not just the claim.</strong> Repeated codes point to a front-end gap.</li>
<li><strong>Watch deadlines</strong> for corrections and appeals.</li>
</ol>
<p>Our guide on <a href="/blog/how-to-reduce-claim-denials/">how to reduce claim denials</a> covers prevention in more depth, and our <a href="/services/denial-management/">denial management</a> team works these codes inside your practice management system.</p>

<h2>Want help reading your remittances?</h2><p>If your team sees the same denial codes month after month, <a href="/consultation/">book a free consultation</a>. We can go through a recent batch of remittances with you, group the denials by cause and talk through which front-end changes would address the biggest groups.</p>
`,
    faqs: [
      {
        q: 'What is a CARC in medical billing?',
        a: 'A Claim Adjustment Reason Code (CARC) explains why a claim or service line was paid differently than billed. It is maintained by X12 and appears on electronic remittances and EOBs, paired with a group code.',
      },
      {
        q: 'What is the difference between CO and PR denial codes?',
        a: 'CO means contractual obligation, so the provider is responsible and generally cannot bill the patient. PR means patient responsibility, such as deductible, coinsurance or copay, which can be billed to the patient.',
      },
      {
        q: 'What is the most common reason for a claim denial?',
        a: 'Common causes include missing or incorrect information, eligibility problems, missing authorization, bundling edits, medical necessity and late filing. The most frequent causes vary by practice and payer mix.',
      },
      {
        q: 'What is the difference between a CARC and a RARC?',
        a: 'A CARC gives the main reason for an adjustment, while a Remittance Advice Remark Code (RARC) adds detail or instructions, such as naming the missing information.',
      },
    ],
    sources: [S.x12Carc, S.x12Rarc, S.cmsAdminSimp, S.cmsCob],
  },
];
