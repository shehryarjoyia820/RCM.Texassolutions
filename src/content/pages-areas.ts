/**
 * Dental-only service area and carrier pages for Texas Solutions RCM.
 *
 * Replaces the service-areas, texas, florida, california and new-york pages in
 * pages.ts and adds the carriers hub plus six carrier pages. Follow
 * docs/DENTAL-WRITING.md: dental examples only, no invented results, prices,
 * timelines, payer IDs or phone numbers, and links only to live URLs.
 */

import type { PageContent } from './pages';

/* ---------- block markup helpers (copied from pages.ts) ---------- */

const h2 = (t: string): string =>
  `<!-- wp:heading -->\n<h2 class="wp-block-heading">${t}</h2>\n<!-- /wp:heading -->`;

const h3 = (t: string): string =>
  `<!-- wp:heading {"level":3} -->\n<h3 class="wp-block-heading">${t}</h3>\n<!-- /wp:heading -->`;

const p = (t: string): string => `<!-- wp:paragraph -->\n<p>${t}</p>\n<!-- /wp:paragraph -->`;

const li = (items: string[]): string =>
  items.map((i) => `<!-- wp:list-item -->\n<li>${i}</li>\n<!-- /wp:list-item -->`).join('\n');

const ul = (items: string[]): string =>
  `<!-- wp:list -->\n<ul class="wp-block-list">${li(items)}</ul>\n<!-- /wp:list -->`;

const a = (href: string, text: string): string => `<a href="${href}">${text}</a>`;

const blocks = (...b: string[]): string => b.join('\n\n');

/* ---------- shared links ---------- */

const S = {
  verify: a('/services/dental-insurance-verification/', 'Insurance Verification &amp; Eligibility'),
  claims: a('/services/dental-claims-processing/', 'Dental Claims Management'),
  denials: a('/services/denial-management/', 'Denial Management &amp; Appeals'),
  posting: a('/services/payment-posting/', 'Payment Posting'),
  ar: a('/services/dental-accounts-receivable/', 'Accounts Receivable (A/R) Management'),
  patient: a('/services/patient-billing/', 'Patient Billing &amp; Collections Support'),
  cred: a('/services/dental-credentialing/', 'Dental Credentialing &amp; Provider Enrollment'),
  reports: a('/services/rcm-analytics-reporting/', 'Dental RCM Reporting &amp; Revenue Analysis'),
};

const CONSULT = (text = 'Book a free consultation'): string => a('/consultation/', text);

const TRADEMARK = (carrier: string): string =>
  p(
    `${carrier} and the other carrier names on this site are trademarks of their respective owners. Texas Solutions RCM is an independent dental revenue cycle management company. We are not affiliated with, sponsored by or endorsed by ${carrier} or any other carrier, and nothing on this page is official carrier guidance. Always confirm current rules in the carrier's own provider materials and your participation agreement.`
  );

/* ---------- service areas hub ---------- */

const serviceAreas: PageContent = {
  key: 'service-areas',
  title: 'Dental Revenue Cycle Management Across the USA',
  seoTitle: 'Dental Revenue Cycle Management in All 50 States',
  metaDescription:
    'Remote dental revenue cycle management for practices in all 50 states, built around your Medicaid dental program, carriers, dental board and prompt pay laws.',
  template: 'location',
  intro:
    'Texas Solutions RCM is a dental revenue cycle management (dental RCM) company serving practices in all 50 states. Our remote team works inside your own dental software, clearinghouse and carrier portals, and adapts to the carriers, Medicaid dental program and state rules where your office is located.',
  body: blocks(
    h2('Why location still matters for remote dental RCM'),
    p(
      'Most of the dental revenue cycle happens in software: eligibility checks, 837D claims, ERAs from the clearinghouse and follow-up in carrier portals or on the phone. None of that requires a revenue cycle team in your building. What it does require is a team that knows the carriers your patients actually carry, the Medicaid dental program in your state and the rules your state applies to dental plans.'
    ),
    p(
      'Our team works remotely for dental offices, group practices and DSOs across the country. You create named user accounts for us in your practice management system, whether that is Open Dental, Dentrix or Eaglesoft, and in your clearinghouse and carrier portals. A Business Associate Agreement is signed before anyone on our team sees patient data, and your administrators can switch off our access at any time. If you searched for dental billing services near me or dental revenue cycle management near me, distance matters less than it seems: billing is one part of the dental revenue cycle we manage, and all of it is done remotely in your systems. Read more about ' +
        `${a('/how-we-work/', 'how we work')} and ${a('/security/', 'how we handle security')}.`
    ),
    h2('Dental carriers differ by state'),
    p(
      'Several of the largest dental carriers operate nationally, but the company that actually administers a patient\'s plan can depend on where the plan was sold. That changes the portal, the fee schedule and where an appeal goes.'
    ),
    h3('Delta Dental member companies'),
    p(
      `Delta Dental is a national network of independent member companies coordinated by the Delta Dental Plans Association. Each member company serves one or more states, so a Delta Dental PPO patient in Texas and one in New York may have plans administered by different companies with different provider portals and processing rules. Our ${a('/carriers/delta-dental/', 'Delta Dental billing page')} explains how we handle this.`
    ),
    h3('National carriers and regional plans'),
    p(
      `MetLife, Cigna, Aetna, Guardian and UnitedHealthcare Dental write dental coverage in many states, and each has its own portal, attachment process and appeal route. Alongside them, most states have regional dental plans, dental HMOs and benefit administrators that only operate locally. Our ${a('/carriers/', 'carrier billing hub')} covers the national carriers we see most often.`
    ),
    h2('State Medicaid dental programs'),
    p(
      'Every state runs its own Medicaid program, and dental benefits are delivered in very different ways. Some states pay dental claims on a fee-for-service basis through a fiscal agent. Others contract with dental plans or dental benefit administrators that manage the benefit for Medicaid and CHIP members. Many use a mix of both, with children\'s and adult benefits handled differently.'
    ),
    ul([
      'Enrollment in one state\'s Medicaid program does not carry over to another state.',
      'Where dental plans manage the benefit, each plan usually runs its own credentialing, prior authorization and claims process.',
      'Adult dental coverage under Medicaid varies widely from state to state and changes more often than children\'s coverage.',
    ]),
    p(
      `During onboarding we confirm which programs and plans you participate in and how each one processes claims. Our ${a('/blog/medicaid-and-medicare-dental-billing/', 'guide to Medicaid and Medicare dental billing')} covers the basics.`
    ),
    h2('State dental boards and credentialing'),
    p(
      `Dentists and hygienists are licensed by a dental board or licensing agency in the state where they practice. Carriers check that license, along with other items such as DEA registration where it applies and malpractice coverage, when they credential a provider into their network. When an associate joins your practice, moves between locations in different states or renews a license, the carrier records have to match. Our ${S.cred} service keeps those records current so claims are not held up by a provider who is not yet set up in a network.`
    ),
    h2('Prompt pay laws vary'),
    p(
      'Most states have prompt pay laws that set how long a state-regulated insurer or plan has to pay or deny a clean claim, and when interest or penalties apply. The deadlines, the definition of a clean claim and the types of plans covered differ by state. Whether a given dental plan is subject to the law depends on how it is licensed and who funds it. Self-funded employer plans are generally governed by federal ERISA rules instead of state prompt pay laws. We track claim ages by carrier and plan type so a slow-paying claim can be escalated with the right reference when one applies.'
    ),
    h2('State guides'),
    p('We have written guides for four large state markets. Each covers the state Medicaid dental program, the carriers commonly seen there, the dental board and the prompt pay basics.'),
    ul([
      a('/service-areas/texas/', 'Dental revenue cycle management in Texas'),
      a('/service-areas/florida/', 'Dental revenue cycle management in Florida'),
      a('/service-areas/california/', 'Dental revenue cycle management in California'),
      a('/service-areas/new-york/', 'Dental revenue cycle management in New York'),
    ]),
    p('If your state is not listed, we still support practices there and confirm your carriers, Medicaid participation and state rules during onboarding.'),
    h2('What we can take on for your practice'),
    ul([
      `${S.verify} before each appointment, including frequency limits, waiting periods and remaining annual maximums.`,
      `${S.claims}, from claim creation and attachments to rejected claim resubmission.`,
      `${S.denials} for downgrades, missing information requests and frequency denials.`,
      `${S.posting} from EOBs and ERAs, with contractual adjustments and underpayment checks.`,
      `${S.ar} for 30, 60 and 90+ day insurance balances.`,
      `${S.reports} built from your own practice management data.`,
    ]),
    p(
      `${CONSULT()} to talk through your state, your carriers and the work you want help with.`
    )
  ),
};

/* ---------- Texas ---------- */

const texas: PageContent = {
  key: 'texas',
  parent: 'service-areas',
  title: 'Dental Revenue Cycle Management in Texas',
  seoTitle: 'Dental RCM Services in Texas | Texas Solutions RCM',
  metaDescription:
    'Dental revenue cycle management in Texas from a team based in Midland: Medicaid and CHIP dental DMOs, PPO carriers, credentialing and Texas prompt pay rules.',
  template: 'location',
  intro:
    'Texas Solutions RCM provides dental revenue cycle management (dental RCM) in Texas for general dentists, specialists and group practices. Our office is in Midland, and our remote team works inside your own dental software and carrier portals from El Paso to Beaumont.',
  body: blocks(
    h2('A Texas dental RCM company for Texas dental offices'),
    p(
      'Our office is at 401 W Kentucky Ave in Midland, Texas. Our revenue cycle team works remotely in your practice management system, clearinghouse and carrier portals, so it makes no difference whether your office is in the Permian Basin, the Rio Grande Valley or the Dallas-Fort Worth area. Texas spans the Central and Mountain time zones, and we agree working hours that overlap with your office day.'
    ),
    p(
      'Texas dental billing has its own mix of programs and rules: dental maintenance organizations for children\'s Medicaid and CHIP, TMHP enrollment, a large PPO market and Texas Department of Insurance prompt pay rules. Practices looking for a dental billing company in Texas often find that claims are only part of the problem, so our dental billing services in Texas are delivered as one part of dental revenue cycle management, alongside verification, credentialing and A/R follow-up. Here is how those pieces fit together.'
    ),
    h2('Texas Medicaid and CHIP dental'),
    p(
      'Texas Medicaid and the Children\'s Health Insurance Program (CHIP) are overseen by the Texas Health and Human Services Commission (HHSC). For children, HHSC delivers Medicaid and CHIP dental benefits through dental maintenance organizations (DMOs) that it contracts with statewide, separate from the plans that cover other health services. The state\'s current managed care service area materials list DentaQuest, MCNA Dental and UnitedHealthcare Dental as the statewide dental plans.'
    ),
    p(
      'Each DMO has its own provider manual, portal, prior authorization requirements and claims process, even though all of them work under HHSC contract rules. A pediatric or general practice that sees many Medicaid and CHIP children may submit claims to all three in the same week. That makes the first check at every visit simple but important: which DMO is this child assigned to today, and is your office in that DMO\'s network?'
    ),
    ul([
      'Medicaid and CHIP children choose or are assigned a DMO, and the main dentist on file with the plan can matter for some services.',
      'Covered services and documentation requirements, such as radiographs or narratives for certain procedures, are set out in each DMO\'s manual and the state\'s rules.',
      'CHIP dental coverage is similar to children\'s Medicaid in many respects but is a separate program, so benefit details and limits should be checked rather than assumed.',
      'Adult Medicaid dental coverage in Texas is much more limited, and some adult members receive dental benefits through their health plan as an added benefit rather than through a DMO.',
    ]),
    p(
      `Providers enroll in Texas Medicaid through the Texas Medicaid &amp; Healthcare Partnership (TMHP), the state\'s Medicaid claims administrator, before DMO credentialing can be completed. Our ${S.cred} service covers TMHP enrollment and each DMO\'s credentialing steps. Offices with a large share of children, such as ${a('/specialties/pediatric-dentistry/', 'pediatric dentistry')} and ${a('/specialties/orthodontics/', 'orthodontic')} practices, often carry the most DMO volume.`
    ),
    h2('Commercial dental carriers in Texas'),
    p(
      'Most Texas dental offices see a familiar group of commercial carriers: the Delta Dental member company for Texas, MetLife, Cigna, Aetna, Guardian and UnitedHealthcare Dental, plus regional plans, dental HMOs and employer plans run by third-party administrators. Large employers in energy, healthcare and education often sponsor self-funded dental plans, which are administered by a carrier but follow the employer\'s plan document.'
    ),
    p(
      `For each carrier we check eligibility and benefits before the appointment, including frequency limits, waiting periods, downgrade rules and remaining annual maximums. Our ${a('/carriers/', 'carrier billing pages')} describe the work for each national carrier, starting with ${a('/carriers/delta-dental/', 'Delta Dental')}, ${a('/carriers/metlife/', 'MetLife')} and ${a('/carriers/unitedhealthcare-dental/', 'UnitedHealthcare Dental')}.`
    ),
    h2('Texas prompt pay basics'),
    p(
      'The Texas Insurance Code sets prompt pay rules for HMOs and preferred provider plans regulated by the Texas Department of Insurance (TDI). TDI guidance describes a 30-day window to pay a clean electronic claim and 45 days for a clean paper claim, with penalties when a payable clean claim is paid late. These rules apply to state-regulated plans with network providers. They do not cover self-funded employer plans or Medicaid, and whether a particular dental plan falls under them depends on how the plan is licensed and your contract status.'
    ),
    p(
      'That is why our A/R notes record the plan type as well as the carrier. When a clean claim from a state-regulated plan sits past the deadline, the office has a clear basis to escalate. When it is a self-funded plan, the follow-up path is the administrator and the plan document instead.'
    ),
    h2('Texas State Board of Dental Examiners and credentialing'),
    p(
      'Dentists, dental hygienists and certain dental assistant registrations in Texas are regulated by the Texas State Board of Dental Examiners. Carriers verify the dental license during credentialing and re-credentialing, and most commercial carriers also rely on a CAQH ProView profile. When a new associate joins or a provider\'s license or address changes, every carrier and DMO record has to be updated, or claims for that provider can deny as out of network.'
    ),
    p(
      `We track license renewal dates, CAQH attestations and each carrier\'s re-credentialing cycle as part of ${S.cred}, including EFT and ERA enrollment so payments and remittances reach the right account.`
    ),
    h2('What we help Texas dental practices with'),
    ul([
      `${S.verify} that confirms the right DMO or PPO plan and the patient\'s remaining benefits.`,
      `${S.claims}, including attachments such as radiographs, perio charts and narratives.`,
      `${S.denials} for DMO and commercial denials, downgrades and requests for more information.`,
      `${S.posting} from EOBs and ERAs, so write-offs match your fee schedules.`,
      `${S.ar} across Medicaid DMOs and commercial carriers.`,
    ]),
    p(
      `See our other ${a('/service-areas/', 'service areas')}, or ${CONSULT('book a free consultation')} to talk through your carrier mix and where your revenue cycle needs help.`
    )
  ),
};

/* ---------- Florida ---------- */

const florida: PageContent = {
  key: 'florida',
  parent: 'service-areas',
  title: 'Dental Revenue Cycle Management in Florida',
  seoTitle: 'Dental RCM Services in Florida | Texas Solutions RCM',
  metaDescription:
    'Dental revenue cycle management in Florida for SMMC Medicaid dental plans and PPO carriers: remote verification, claims, denials, A/R and credentialing.',
  template: 'location',
  intro:
    'Texas Solutions RCM provides dental revenue cycle management (dental RCM) in Florida for general and specialty dental practices. Our team serves Florida offices remotely, working inside your dental software, clearinghouse and carrier portals.',
  body: blocks(
    h2('Remote dental RCM for Florida practices'),
    p(
      'We serve Florida practices remotely. Our team logs into your practice management system, clearinghouse and carrier portals through accounts your office creates and controls, and all notes, postings and claim activity stay in your system. Florida spans the Eastern and Central time zones, and we set working hours that overlap with your front desk so questions get answered the same day.'
    ),
    p(
      'Florida dental billing has a few features that set it apart: a Medicaid dental program run entirely through contracted dental plans, a large population of patients with retiree and individual dental coverage, and prompt pay statutes that apply to state-regulated insurers and HMOs. Offices comparing dental billing services in Florida can start with one part of the revenue cycle or the full cycle, with the scope agreed in writing, and as a dental billing company in Florida we still treat billing as one part of dental revenue cycle management.'
    ),
    h2('Florida Medicaid dental: the SMMC Dental program'),
    p(
      'Florida Medicaid is administered by the Agency for Health Care Administration (AHCA). Most Medicaid recipients receive care through the Statewide Medicaid Managed Care (SMMC) program, and dental services are delivered through a separate SMMC Dental component rather than through the plans that cover other health services. AHCA contracts with dental plans to provide Medicaid dental benefits to children and adults, and Medicaid enrollees are enrolled in a dental plan.'
    ),
    p(
      'The current generation of SMMC contracts took effect on February 1, 2025. When contracts change, patients can move between dental plans, and the office sees new portals, new prior authorization rules and new claims addresses. Checking which dental plan a patient is assigned to at every visit, not only the first one, is the most reliable protection against billing the wrong plan.'
    ),
    h3('Dental anesthesia in hospitals and surgery centers'),
    p(
      'Florida also moved payment responsibility for some anesthesia services. Effective October 1, 2025, AHCA shifted payment for non-emergency dental anesthesia and sedation performed in a hospital outpatient setting or ambulatory surgical center from the Medicaid dental plans to the Medicaid health plans. Anesthesia provided with dental treatment in the office remains with the dental plans when it is clinically necessary. Practices that treat children or patients with special needs under general anesthesia need to know which plan to bill for each part of the case.'
    ),
    p(
      `Each SMMC dental plan runs its own credentialing, and providers generally need to be enrolled with Florida Medicaid before a plan can contract with them. Our ${S.cred} service covers Medicaid enrollment and dental plan credentialing, and our ${S.verify} work confirms the assigned plan before treatment.`
    ),
    h2('Commercial dental carriers in Florida'),
    p(
      'Commercial dental coverage in Florida is spread across national carriers and regional plans. Offices commonly see the Delta Dental member company that serves Florida, MetLife, Cigna, Aetna, Guardian and UnitedHealthcare Dental, along with dental HMOs, discount plans and Medicare Advantage plans that include a dental benefit. Because Florida has a large retiree population, many offices also deal with dental benefits bundled into Medicare Advantage plans, which have their own networks, annual limits and claims routes.'
    ),
    p(
      `That mix makes verification more than a yes or no eligibility check. We confirm the plan type, network status, frequency limits, waiting periods, missing tooth clauses and remaining annual maximum, then record a patient responsibility estimate in your software. See our ${a('/carriers/', 'carrier pages')} for how we work with ${a('/carriers/metlife/', 'MetLife')}, ${a('/carriers/cigna/', 'Cigna')} and ${a('/carriers/guardian/', 'Guardian')}.`
    ),
    h2('Florida prompt pay basics'),
    p(
      'Florida has prompt pay statutes for health insurers and HMOs, including section 627.6131 of the Florida Statutes for insurers and section 641.3155 for HMOs. They set timelines for a carrier to pay, deny or contest a claim and provide for interest on overdue payments. Whether a particular dental policy is covered depends on how the plan is issued and regulated, and self-funded employer plans and Medicaid fall outside these state rules. We note the plan type on each open claim so an office can tell when a state prompt pay reference is appropriate.'
    ),
    h2('Florida Board of Dentistry and credentialing'),
    p(
      'Dentists and dental hygienists in Florida are licensed through the Florida Board of Dentistry, which operates under the Florida Department of Health. Carriers verify the Florida license during credentialing and re-credentialing, and most commercial carriers use the provider\'s CAQH ProView profile. When an associate joins, a provider changes locations or a license is renewed, carrier records need to match, or claims for that provider can process out of network.'
    ),
    p(
      `We track license renewals, CAQH attestations and re-credentialing dates as part of ${S.cred}, including EFT and ERA enrollment for each carrier.`
    ),
    h2('What we help Florida dental practices with'),
    ul([
      `${S.verify} that identifies the correct SMMC dental plan, PPO or Medicare Advantage dental benefit.`,
      `${S.claims}, with radiographs, perio charts and narratives attached where the carrier requires them.`,
      `${S.denials} for missing information requests, frequency denials and downgrades.`,
      `${S.posting} from EOBs and ERAs, with underpayments flagged against your fee schedules.`,
      `${S.ar} for aging insurance balances across Medicaid dental plans and commercial carriers.`,
      `${S.reports} so you can see claim status and denial trends by carrier.`,
    ]),
    p(
      `See our other ${a('/service-areas/', 'service areas')}, or ${CONSULT('book a free consultation')} to talk through your Florida carrier mix and the work you want help with.`
    )
  ),
};

/* ---------- California ---------- */

const california: PageContent = {
  key: 'california',
  parent: 'service-areas',
  title: 'Dental Revenue Cycle Management in California',
  seoTitle: 'Dental RCM Services in California | Texas Solutions RCM',
  metaDescription:
    'Dental revenue cycle management in California for Medi-Cal Dental, dental managed care and PPO carriers: verification, claims, A/R and credentialing.',
  template: 'location',
  intro:
    'Texas Solutions RCM provides dental revenue cycle management (dental RCM) in California for general dentists, specialists and group practices. Our team serves California offices remotely, working inside your dental software, clearinghouse and carrier portals during your Pacific time office hours.',
  body: blocks(
    h2('Remote dental RCM for California practices'),
    p(
      'We serve California practices remotely. Your office creates named accounts for our team in your practice management system, clearinghouse and carrier portals, and every claim, note and payment stays in your system. Because California is on Pacific time, we set working hours that overlap with your office day so your front desk can reach our revenue cycle team while patients are still in the chair.'
    ),
    p(
      'California dental billing has its own structure: a statewide Medi-Cal Dental program with its own fiscal intermediary and treatment authorization rules, dental managed care in two counties, and two separate state regulators for dental plans. As a dental billing company in California, we treat billing as one part of dental revenue cycle management, so our dental billing services in California connect claims with verification, credentialing and A/R follow-up.'
    ),
    h2('Medi-Cal Dental'),
    p(
      'Medi-Cal is California\'s Medicaid program, run by the Department of Health Care Services (DHCS). Dental benefits for children and adults are overseen by the DHCS Medi-Cal Dental Services Division, and many dentists still call the program Denti-Cal. Across most of the state, Medi-Cal Dental is delivered on a fee-for-service basis. Providers are enrolled through the program\'s fiscal intermediary, which also processes claims and treatment authorization requests.'
    ),
    p(
      'Medi-Cal Dental publishes its own provider handbook, with rules on enrollment, radiographs and documentation, treatment authorization and claim submission. Some procedures require an approved treatment authorization request before they are performed, and the supporting radiographs and narratives must meet the program\'s requirements. Missing or unreadable attachments are a common reason a request or claim is returned.'
    ),
    h3('Dental managed care in Sacramento and Los Angeles counties'),
    p(
      'Medi-Cal Dental managed care operates only in Sacramento and Los Angeles counties. In Sacramento County, enrollment in a dental managed care plan is mandatory for most members. In Los Angeles County, members can choose a dental managed care plan or stay in fee-for-service. DHCS lists Health Net Dental, LIBERTY Dental Plan and California Dental Network as the dental managed care plans in both counties, after a plan change that took effect on July 1, 2025. Covered services are the same as fee-for-service, but claims, authorizations and assigned dental homes go through the plan.'
    ),
    p(
      `For an office in either county, the first check is whether the patient is fee-for-service or assigned to a plan, and if so, which one. Our ${S.verify} service records that before the appointment, and our ${S.cred} service handles Medi-Cal Dental enrollment and plan contracting.`
    ),
    h2('Commercial dental carriers in California'),
    p(
      'California has a large and varied commercial dental market. Offices commonly see the Delta Dental member company that serves California, MetLife, Cigna, Aetna, Guardian and UnitedHealthcare Dental, along with a significant number of dental HMO plans and regional carriers. Dental HMO patients are usually assigned to a specific office, and the plan may pay a capitation amount plus copayments rather than a per-claim fee, which changes how claims, encounters and patient balances are handled.'
    ),
    p(
      `We sort your patients by plan type during verification so the front desk knows whether to expect a PPO payment, an HMO copayment or a Medi-Cal Dental claim. See our ${a('/carriers/delta-dental/', 'Delta Dental')}, ${a('/carriers/aetna/', 'Aetna')} and ${a('/carriers/cigna/', 'Cigna')} pages for carrier-specific details.`
    ),
    h2('California regulators and prompt pay'),
    p(
      'California splits oversight of dental coverage between two agencies. The Department of Managed Health Care (DMHC) licenses and regulates health care service plans under the Knox-Keene Act, which includes many dental HMO and some dental PPO products. The California Department of Insurance (CDI) regulates dental insurance policies issued by insurers. Both have claims payment rules and processes for provider disputes. Knowing which regulator oversees a plan tells you where an unresolved payment dispute can go. California has also updated its claims payment rules in recent legislation, so we check the current requirements before citing them for a specific claim. Self-funded employer plans fall outside both regulators.'
    ),
    h2('Dental Board of California and credentialing'),
    p(
      'Dentists in California are licensed by the Dental Board of California. Carriers and Medi-Cal Dental verify the license during enrollment and credentialing, and most commercial carriers use the provider\'s CAQH ProView profile. When an associate joins, a provider moves between locations or a license is renewed, each carrier record needs to be updated so claims do not deny for an unrecognized provider.'
    ),
    p(
      `We track license renewals, CAQH attestations and carrier re-credentialing dates as part of ${S.cred}, along with EFT and ERA enrollment for each carrier.`
    ),
    h2('What we help California dental practices with'),
    ul([
      `${S.verify} that separates Medi-Cal Dental fee-for-service, dental managed care, PPO and HMO patients.`,
      `${S.claims}, including treatment authorization support and attachments.`,
      `${S.denials} for returned requests, missing documentation and frequency denials.`,
      `${S.posting} for PPO EOBs, ERAs and Medi-Cal Dental remittances.`,
      `${S.ar} across Medi-Cal Dental, managed care plans and commercial carriers.`,
      `${S.patient} so HMO copayments and PPO balances are billed correctly.`,
    ]),
    p(
      `See our other ${a('/service-areas/', 'service areas')}, or ${CONSULT('book a free consultation')} to talk through your California payer mix.`
    )
  ),
};

/* ---------- New York ---------- */

const newYork: PageContent = {
  key: 'new-york',
  parent: 'service-areas',
  title: 'Dental Revenue Cycle Management in New York',
  seoTitle: 'Dental RCM Services in New York | Texas Solutions RCM',
  metaDescription:
    'Dental revenue cycle management in New York for eMedNY fee-for-service, Medicaid managed care dental and PPO carriers, with claims, A/R and credentialing.',
  template: 'location',
  intro:
    'Texas Solutions RCM provides dental revenue cycle management (dental RCM) in New York for general and specialty dental practices, from New York City to upstate. Our team serves New York offices remotely, working inside your dental software, clearinghouse and carrier portals.',
  body: blocks(
    h2('Remote dental RCM for New York practices'),
    p(
      'We serve New York practices remotely. Your office creates named accounts for our team in your practice management system, clearinghouse and carrier portals, and every claim, note and posting stays in your system where your staff can see it. We set working hours on Eastern time so our revenue cycle team is available while your office is open.'
    ),
    p(
      'New York dental billing combines a Medicaid dental benefit that can be billed two different ways, a busy commercial market with many union and employer plans, and a state prompt pay law with clear deadlines for state-regulated plans. Practices looking for a dental billing company in New York or dental billing services in New York will find billing handled here as one part of dental revenue cycle management, from verification through A/R follow-up.'
    ),
    h2('New York Medicaid dental'),
    p(
      'New York State Medicaid, administered by the New York State Department of Health, covers dental services for both children and adults. Depending on the member, dental care is billed either fee-for-service through eMedNY, the state\'s Medicaid claims system, or through the member\'s Medicaid managed care plan. Most managed care plans include dental benefits, and many use a dental benefit administrator to run the network, prior approvals and claims.'
    ),
    p(
      'For fee-for-service claims, eMedNY publishes the Dental Policy and Procedure Code Manual and the dental fee schedule. Updated versions took effect on January 1, 2026. Managed care plans follow the state benefit but can set their own prior approval and documentation requirements for some services, so the same procedure may need different paperwork depending on where the patient is enrolled. Plan enrollment can also change from month to month, so we check it again before each visit rather than relying on the last check.'
    ),
    h3('Expanded adult coverage criteria'),
    p(
      'In January 2024, the Department of Health changed the clinical criteria for root canals, crowns, replacement dentures and dental implants to allow broader coverage, with the aim of keeping a member\'s natural teeth whenever clinically appropriate. Prior approval requests for some of these services must include specific state forms, whether the patient is fee-for-service or in managed care. Offices that see many adult Medicaid patients should expect more prior approval work and more documentation per case.'
    ),
    p(
      `The key steps for a New York dental office are confirming whether the patient is fee-for-service or managed care, identifying the plan\'s dental administrator and following its prior approval rules. Our ${S.verify} and ${S.claims} services handle those steps, and our ${S.cred} service covers eMedNY enrollment and plan credentialing.`
    ),
    h2('Commercial dental carriers in New York'),
    p(
      'Commercial dental coverage in New York is spread across national carriers, regional plans and union benefit funds. Offices commonly see the Delta Dental member company that serves New York, MetLife, Cigna, Aetna, Guardian and UnitedHealthcare Dental. UnitedHealthcare Dental also administers some plans through its Healthplex business in the New York area. Union and public employee dental funds often follow their own schedules of allowances and claim procedures, so verification has to look at the specific plan, not just the carrier name.'
    ),
    p(
      `See our ${a('/carriers/', 'carrier pages')} for how we approach ${a('/carriers/guardian/', 'Guardian')}, ${a('/carriers/metlife/', 'MetLife')} and ${a('/carriers/unitedhealthcare-dental/', 'UnitedHealthcare Dental')} claims.`
    ),
    h2('New York prompt pay basics'),
    p(
      'New York\'s prompt pay law, section 3224-a of the Insurance Law, requires insurers and HMOs regulated by the Department of Financial Services (DFS) to pay undisputed claims within 30 days of receipt for electronic claims and 45 days for paper claims, or to deny the claim or request the information needed within 30 days. Interest can apply to late payments. Self-funded employer plans and union funds governed by federal ERISA rules fall outside the state law, and Medicaid follows its own program rules. We record the plan type on each open claim so an office knows when the state law applies.'
    ),
    h2('Licensing and credentialing in New York'),
    p(
      'Dentists and dental hygienists in New York are licensed through the New York State Education Department\'s Office of the Professions, with guidance from the State Board for Dentistry. Carriers verify the license and registration during credentialing, and most commercial carriers use the provider\'s CAQH ProView profile. New York licenses must be re-registered on a regular cycle, and a lapsed registration can interrupt both credentialing and claims.'
    ),
    p(
      `We track registration dates, CAQH attestations and carrier re-credentialing as part of ${S.cred}, including EFT and ERA enrollment for each carrier.`
    ),
    h2('What we help New York dental practices with'),
    ul([
      `${S.verify} that separates fee-for-service Medicaid, managed care dental, PPO and union plans.`,
      `${S.claims}, including prior approval packets and required state forms.`,
      `${S.denials} for missing documentation, frequency denials and downgrades.`,
      `${S.posting} from EOBs, ERAs and eMedNY remittances.`,
      `${S.ar}, with prompt pay escalation where it applies.`,
      `${S.reports} so you can see aging and denial trends by carrier.`,
    ]),
    p(
      `See our other ${a('/service-areas/', 'service areas')}, or ${CONSULT('book a free consultation')} to talk through your New York carrier mix.`
    )
  ),
};

/* ---------- carriers hub ---------- */

const carriers: PageContent = {
  key: 'carriers',
  title: 'Dental Carrier Billing and Claims Follow-Up',
  seoTitle: 'Dental Insurance Carrier Billing & Claims Follow-Up',
  metaDescription:
    'Dental insurance carrier billing and claims follow-up for Delta Dental, MetLife, Cigna, Aetna, Guardian and UnitedHealthcare Dental, inside your own systems.',
  template: 'location',
  intro:
    'Dental carrier billing is the carrier-by-carrier work of verifying benefits, sending clean claims, posting payments and following up until each claim is paid or correctly closed. Our remote team does that work inside your dental software and the carrier portals you already use.',
  body: blocks(
    h2('Why each carrier needs its own approach'),
    p(
      'Every dental carrier accepts the same basic claim, the ADA claim form or its electronic version, the 837D. After that, the details differ. Each carrier has its own provider portal, its own way of receiving radiographs and narratives, its own pre-treatment estimate process and its own route for reconsiderations and appeals. Plans sold by the same carrier can also differ, with PPO, dental HMO, indemnity and self-funded employer plans all handled differently.'
    ),
    p(
      'A billing team that treats every carrier the same tends to send the same avoidable mistakes over and over: attachments missing on a carrier that always asks for them, frequency limits checked against the wrong plan year, or an appeal sent to an address that only handles new claims. Working carrier by carrier keeps those mistakes visible so they can be fixed at the source.'
    ),
    h2('What carrier billing includes'),
    ul([
      `<strong>Eligibility and benefits.</strong> Confirming coverage, plan type, network status, deductibles, annual maximums, frequency limits, waiting periods and downgrade rules before the appointment, through our ${S.verify} service.`,
      `<strong>Claim submission.</strong> Sending claims electronically through your clearinghouse or the carrier\'s portal, with radiographs, perio charts, intraoral photos and narratives attached when the procedure calls for them, through ${S.claims}.`,
      '<strong>Pre-treatment estimates.</strong> Submitting estimates for larger treatment plans so patients can see their likely share before they commit.',
      `<strong>Payment posting.</strong> Posting EOBs and ERAs line by line, applying contractual adjustments and flagging underpayments through ${S.posting}.`,
      `<strong>Follow-up.</strong> Working unpaid and pended claims by age, by phone and in the carrier portal, through ${S.ar}.`,
      `<strong>Denials and appeals.</strong> Reading the denial reason, correcting what can be corrected and appealing what should be appealed, through ${S.denials}.`,
      `<strong>Credentialing.</strong> Joining and staying in each carrier\'s network, including re-credentialing and EFT/ERA enrollment, through ${S.cred}.`,
    ]),
    h2('Carriers we cover in detail'),
    p('Each page below explains how billing and follow-up work for that carrier in general terms. Plan rules vary, so we always confirm details in the carrier\'s current provider materials and your agreement.'),
    ul([
      `${a('/carriers/delta-dental/', 'Delta Dental claims billing and follow-up')}: a national network of independent member companies, each serving its own states.`,
      `${a('/carriers/metlife/', 'MetLife dental claims billing and follow-up')}: PPO and other dental plans with a dedicated dentist portal.`,
      `${a('/carriers/cigna/', 'Cigna dental claims billing and follow-up')}: DPPO, dental HMO and indemnity plans with online reconsiderations.`,
      `${a('/carriers/aetna/', 'Aetna dental claims billing and follow-up')}: PPO, DMO and plans administered for third-party administrators.`,
      `${a('/carriers/guardian/', 'Guardian dental claims billing and follow-up')}: group dental plans with a self-service provider portal.`,
      `${a('/carriers/unitedhealthcare-dental/', 'UnitedHealthcare Dental claims billing and follow-up')}: commercial, Medicare Advantage and Medicaid dental plans on separate platforms.`,
    ]),
    h2('Carriers by state'),
    p(
      `The carriers your patients carry depend partly on where your office is. Delta Dental is administered by a different member company in different states, and Medicaid dental programs use their own plans and administrators. Our ${a('/service-areas/', 'service area pages')} cover the carrier landscape in ${a('/service-areas/texas/', 'Texas')}, ${a('/service-areas/florida/', 'Florida')}, ${a('/service-areas/california/', 'California')} and ${a('/service-areas/new-york/', 'New York')}.`
    ),
    h2('How we track carrier performance'),
    p(
      `Because we work in your own practice management system, every claim note and posting is recorded there. Through ${S.reports}, we can show aging, denial reasons and payment patterns by carrier, which helps you see which carriers are slow, which denials keep coming back and where a fee schedule may need review.`
    ),
    p(
      'Carrier names on this site are trademarks of their respective owners. Texas Solutions RCM is an independent dental revenue cycle management company and is not affiliated with, sponsored by or endorsed by any dental carrier.'
    ),
    p(`${CONSULT()} to talk through the carriers your practice bills and where claims tend to stall.`)
  ),
};

/* ---------- carrier pages ---------- */

const deltaDental: PageContent = {
  key: 'delta-dental',
  parent: 'carriers',
  title: 'Delta Dental Claims Billing & Follow-Up',
  seoTitle: 'Delta Dental Claims Billing & Follow-Up for Dentists',
  metaDescription:
    'Delta Dental claims billing and follow-up for dental offices: eligibility checks, claims and attachments, estimates, posting, appeals and credentialing.',
  template: 'location',
  intro:
    'Delta Dental claims billing starts with one question many offices skip: which Delta Dental company administers this patient\'s plan? Our remote team answers that first, then handles verification, claims, posting and follow-up inside your own systems.',
  body: blocks(
    h2('How Delta Dental is organized'),
    p(
      'Delta Dental is not a single insurer. It is a national network of independent member companies, coordinated by the Delta Dental Plans Association. The association lists 39 member companies that together offer coverage in all 50 states, the District of Columbia and Puerto Rico.'
    ),
    p(
      'For a dental office, this matters because each member company has its own provider portal, provider handbook, fee schedules and processing practices. A patient whose employer is based in another state may carry a plan administered by a different Delta Dental company from the one that serves your state. Your participation agreement, the patient\'s ID card and the company\'s own provider materials tell you how that claim should be handled.'
    ),
    h2('Network levels and plan types'),
    p(
      'Delta Dental companies commonly offer more than one network, such as a PPO network and a broader premier-style network, and some also offer dental HMO products. An office can participate in one network and not another, which changes the allowed amount on the same procedure. We record which Delta Dental networks you participate in and check that the patient\'s plan matches, because writing off to the wrong fee schedule is one of the quietest ways a practice loses money.'
    ),
    h2('Eligibility and benefits checks'),
    p(
      `Before the appointment we confirm coverage through the correct member company\'s portal or phone line, and record the details that drive most Delta Dental denials and patient complaints:`
    ),
    ul([
      'Plan type and network, and whether your office is in network for that plan.',
      'Deductible and remaining annual maximum for the benefit year.',
      'Frequency limits for exams, cleanings, radiographs and fluoride, including history from other offices where the portal shows it.',
      'Waiting periods, missing tooth clauses and alternate benefit (downgrade) provisions for crowns, posterior composites and prosthetics.',
      'Coordination of benefits when the patient has a second dental plan.',
    ]),
    p(`This is the core of our ${S.verify} service.`),
    h2('Claims, attachments and pre-treatment estimates'),
    p(
      `Claims are sent electronically through your clearinghouse, or through the member company\'s portal where that is the better route. Procedures such as crowns, buildups, scaling and root planing, and implants usually need supporting documentation, such as pre-operative radiographs, periodontal charting or a narrative. We attach them at submission rather than waiting for a request as part of ${S.claims}.`
    ),
    p(
      'For larger treatment plans we submit pre-treatment estimates so the patient can see an expected share before treatment. An estimate is not a guarantee of payment: the final claim still depends on eligibility, remaining maximums and frequency limits on the date of service.'
    ),
    h2('Posting EOBs and ERAs: reading a Delta Dental EOB'),
    p(
      `Delta Dental payments are posted line by line from the EOB or ERA, with contractual write-offs matched to your fee schedule for that network. We flag any line paid below the expected amount, any procedure downgraded to an alternate benefit and any patient portion that differs from the estimate, as part of ${S.posting}.`
    ),
    p(
      'A Delta Dental explanation of benefits (EOB) shows, for each procedure line, the submitted fee, the amount Delta Dental allows under the network that applies, the plan payment, the patient portion and any adjustment or remark codes. Reading those columns side by side tells you whether a difference comes from the network fee schedule, a frequency limit, an alternate benefit or the annual maximum, which decides whether to post, correct or appeal the line.'
    ),
    h2('Why Delta Dental claims get pended or denied'),
    p('The reasons are usually familiar, though each member company words them differently:'),
    ul([
      'Frequency limit already met, sometimes because of treatment at another office.',
      'Missing or unreadable radiographs, perio charting or narrative.',
      'Waiting period not yet satisfied or missing tooth clause applied.',
      'Provider not recognized at that location or network, or claim sent to the wrong member company.',
    ]),
    h2('Reconsiderations and appeals'),
    p(
      `When a claim is denied or paid incorrectly, the first step is often a corrected claim or a request for review with the missing documentation. If that does not resolve it, each member company has a written appeal or reconsideration process described in its provider materials, with its own filing limits. We follow that process, track the response and escalate when needed through ${S.denials}. Our guide on ${a('/blog/how-to-appeal-a-denied-dental-claim/', 'how to appeal a denied dental claim')} covers the general steps.`
    ),
    h2('Credentialing with Delta Dental'),
    p(
      `Each member company credentials providers for its own networks, so an office that wants to join, add an associate or add a location applies with the company that serves that state. Our ${S.cred} service manages applications, CAQH profiles, re-credentialing dates, provider and location updates, and EFT and ERA enrollment so payments and remittances arrive electronically. Unpaid claims are then worked by age in ${S.ar}.`
    ),
    TRADEMARK('Delta Dental'),
    p(`${CONSULT()} to talk about your Delta Dental claims and the networks you participate in.`)
  ),
};

const metlife: PageContent = {
  key: 'metlife',
  parent: 'carriers',
  title: 'MetLife Dental Claims Billing & Follow-Up',
  seoTitle: 'MetLife Dental Claims Billing & Follow-Up',
  metaDescription:
    'MetLife dental claims billing and follow-up for dental offices: benefit checks, claims, pretreatment estimates, EOB posting, appeals and PPO credentialing.',
  template: 'location',
  intro:
    'MetLife dental claims billing covers everything from checking a patient\'s PDP benefits before the visit to following an unpaid claim until it is resolved. Our remote team does this work inside your dental software and MetLife\'s dentist portal.',
  body: blocks(
    h2('MetLife dental plans in your office'),
    p(
      'MetLife is one of the largest group dental carriers in the United States, and many offices see MetLife patients through employer plans every day. Most MetLife patients have a preferred provider plan, often called the PDP, though MetLife also offers dental HMO and other plan designs in some markets. Plans are designed by the employer within MetLife\'s options, so two MetLife patients can have very different frequency limits, waiting periods and maximums.'
    ),
    h2('The MetLife dentist portal'),
    p(
      'MetLife provides a dedicated online portal for dental offices, MetDental.com, which is separate from the member site that patients use. Offices use it to check eligibility and benefits, review claim and estimate status and see claim history. We work in the portal with the access your office sets up, and record what we find in your practice management system so the information stays with the patient record.'
    ),
    h2('Eligibility and benefits checks'),
    p(`For each MetLife patient, our ${S.verify} work confirms:`),
    ul([
      'Active coverage, plan type and whether your office is in the PDP network.',
      'Deductible, annual maximum and how much of it has been used.',
      'Frequency limits for exams, prophylaxis, radiographs, fluoride and periodontal maintenance.',
      'Waiting periods for basic and major services, and any missing tooth or replacement provisions.',
      'Alternate benefit rules for posterior composites, crowns and prosthetics.',
      'Orthodontic benefits and lifetime maximums where they apply.',
    ]),
    h2('Claims and attachments'),
    p(
      `MetLife claims are usually sent electronically through your clearinghouse. Procedures such as crowns, scaling and root planing, buildups and implants generally need supporting radiographs, periodontal charting or a narrative. Our ${S.claims} work attaches them at submission, through the attachment service your clearinghouse supports, so the claim is not held waiting for a records request.`
    ),
    h2('Pretreatment estimates'),
    p(
      'MetLife encourages dentists to submit a pretreatment estimate before costly work such as crowns, bridges, dentures and periodontal treatment. The estimate shows the patient what the plan is expected to pay, but MetLife notes that the actual payment can differ based on remaining maximums, deductibles, frequency limits and other plan provisions on the date of service. We submit estimates for larger cases, record the response in your software and re-check benefits before treatment if time has passed.'
    ),
    h2('Posting MetLife EOBs and ERAs'),
    p(
      `Payments are posted line by line from the EOB or ERA through ${S.posting}. We match write-offs to your PDP fee schedule, note any procedure paid as an alternate benefit and flag lines paid below the expected allowance for review. Patient balances are then updated so statements reflect what MetLife actually paid.`
    ),
    h2('Common reasons MetLife claims are pended or denied'),
    ul([
      'Supporting radiographs, charting or narrative missing or not clear enough to review.',
      'Frequency limit reached, sometimes from treatment at another office.',
      'Waiting period not satisfied for the service category.',
      'Coordination of benefits information needed from the patient.',
      'Alternate benefit applied, which reduces payment rather than denying the claim outright.',
      'Provider or location information that does not match MetLife\'s records.',
    ]),
    h2('Reviews and appeals'),
    p(
      `When a claim is denied or paid lower than expected, we first check whether the issue can be fixed with a corrected claim or additional documentation. If the denial should be challenged, we follow the review and appeal process described in the EOB and MetLife\'s provider materials, including any filing limits, and track the outcome through ${S.denials}. See our ${a('/blog/ppo-dental-billing-guide/', 'PPO dental billing guide')} for more on how PPO claims move.`
    ),
    h2('MetLife network credentialing'),
    p(
      `If you want to join the MetLife PDP network, add an associate or add a location, our ${S.cred} service prepares the application, keeps CAQH profiles current, tracks re-credentialing dates and sets up EFT and ERA enrollment so payments and remittances arrive electronically.`
    ),
    h2('Follow-up on unpaid claims'),
    p(
      `Open MetLife claims are worked by age in ${S.ar}. We check status in the portal first, call when the portal does not answer the question, and note every step in your system.`
    ),
    TRADEMARK('MetLife'),
    p(`${CONSULT()} to talk through your MetLife claims and where they tend to stall.`)
  ),
};

const cigna: PageContent = {
  key: 'cigna',
  parent: 'carriers',
  title: 'Cigna Dental Claims Billing & Follow-Up',
  seoTitle: 'Cigna Dental Claims Billing & Follow-Up',
  metaDescription:
    'Cigna dental claims billing and follow-up for dental offices: DPPO and DHMO benefit checks, claims, attachments, posting, reconsiderations and credentialing.',
  template: 'location',
  intro:
    'Cigna dental claims billing means working across Cigna\'s dental PPO, dental HMO and indemnity plans, each with its own rules. Our remote team handles verification, claims, posting and follow-up inside your dental software and Cigna\'s provider portal.',
  body: blocks(
    h2('Cigna dental plan types'),
    p(
      'Cigna offers several kinds of dental coverage, and the plan type decides almost everything about how a claim is handled. Dental PPO (DPPO) plans pay network dentists according to a contracted fee schedule. Cigna Dental Care, the dental HMO product, assigns patients to a network general dentist and uses a patient charge schedule for covered services. Indemnity plans pay based on the plan\'s allowance regardless of network. Knowing which one a patient carries before the visit prevents most of the confusion that follows.'
    ),
    h2('CignaforHCP and Cigna dental provider resources'),
    p(
      'Cigna\'s provider portal, CignaforHCP.com, is where dental offices check eligibility and benefits, review claim status and remittances, and handle several follow-up tasks online. Cigna also publishes dental provider resources, including guidance on electronic claims and attachments. We work in the portal using the access your office manages and record what we find in your practice management system.'
    ),
    h2('Eligibility and benefits checks'),
    p(`Our ${S.verify} work for Cigna patients records:`),
    ul([
      'Plan type (DPPO, dental HMO or indemnity) and network status.',
      'For dental HMO patients, whether your office is the assigned dental office and the patient charges that apply.',
      'Deductible, annual maximum and remaining benefits for PPO and indemnity plans.',
      'Frequency limits, waiting periods and alternate benefit provisions.',
      'Coordination of benefits with any second dental plan.',
    ]),
    h2('Claims and electronic attachments'),
    p(
      `Cigna encourages electronic claim submission, including primary and secondary claims. For supporting documentation, Cigna\'s dental resources describe electronic attachments sent through the standard attachment transaction using approved vendors listed on its EDI vendor page. Our ${S.claims} work sends radiographs, perio charts and narratives with the claim whenever the procedure is likely to need them.`
    ),
    p(
      'When a claim is pended for information, Cigna allows providers to view the pended claim and its reason codes in CignaforHCP and upload the requested documentation there. That upload route is for pended claims only, not for original submissions, so we keep the two processes separate.'
    ),
    h2('Pre-treatment estimates'),
    p(
      'For larger PPO and indemnity cases, we submit pre-treatment estimates so the patient sees an expected share before committing. Dental HMO cases work differently, because the patient charge schedule sets the patient portion for covered services, so we confirm the schedule rather than requesting an estimate.'
    ),
    h2('Posting Cigna payments'),
    p(
      `PPO and indemnity payments are posted from the EOB or ERA, with write-offs matched to your fee schedule. Dental HMO activity is posted according to your agreement, with patient charges collected from the patient. Our ${S.posting} work flags underpayments and any line paid differently from the estimate.`
    ),
    h2('Common reasons Cigna dental claims are pended or denied'),
    ul([
      'Documentation such as radiographs or charting needed before the claim can be reviewed.',
      'Frequency or age limits already reached.',
      'Patient not assigned to your office under a dental HMO plan.',
      'Coordination of benefits information missing.',
      'Provider not recognized at the billing location.',
    ]),
    h2('Reconsiderations and appeals'),
    p(
      `Cigna separates reconsiderations from formal appeals. A reconsideration can be requested online in CignaforHCP for a finalized claim by a user with the right portal permissions, and Cigna suggests calling customer service first, since some issues can be adjusted on the call. If that does not resolve it, a written appeal can be filed with the supporting records. We handle each step through ${S.denials} and note every request in your system. Our ${a('/blog/how-to-appeal-a-denied-dental-claim/', 'dental appeal guide')} explains the general approach.`
    ),
    h2('Credentialing with Cigna'),
    p(
      `Joining Cigna\'s dental networks, adding a provider or moving a location requires credentialing and network updates. Our ${S.cred} service prepares applications, keeps CAQH current, tracks re-credentialing and sets up EFT and ERA enrollment.`
    ),
    h2('Follow-up until paid'),
    p(
      `Unpaid Cigna claims are worked by age in ${S.ar}, with portal checks first and calls when needed, all noted in your practice management system.`
    ),
    TRADEMARK('Cigna'),
    p(`${CONSULT()} to talk through your Cigna dental claims.`)
  ),
};

const aetna: PageContent = {
  key: 'aetna',
  parent: 'carriers',
  title: 'Aetna Dental Claims Billing & Follow-Up',
  seoTitle: 'Aetna Dental Claims Billing & Follow-Up',
  metaDescription:
    'Aetna dental claims billing and follow-up for dental offices: benefit checks, PPO and DMO claims, attachments, EOB posting, appeals and network credentialing.',
  template: 'location',
  intro:
    'Aetna dental claims billing includes Aetna\'s dental PPO and DMO plans and, in some cases, plans that Aetna\'s network serves on behalf of other administrators. Our remote team sorts out which is which, then handles verification, claims, posting and follow-up inside your systems.',
  body: blocks(
    h2('Aetna dental plans and programs'),
    p(
      'Aetna offers dental PPO plans, dental HMO plans (called DMO), and indemnity coverage through employers, along with dental benefits in some Medicare Advantage plans. Aetna also runs network programs that can confuse a front desk if they are not recognized:'
    ),
    ul([
      '<strong>Aetna Dental Administrators.</strong> A network program for patients enrolled through certain third-party administrators. ID cards carry the Aetna Dental Administrators name, PPO dentists are included in that network, and Aetna describes treatment as paid according to your contracted PPO fee schedule. Claims and eligibility follow the instructions on the patient\'s ID card.',
      '<strong>Aetna Dental Access.</strong> A discount program rather than insurance. Aetna states that offices have no claims to submit under it; the patient pays the discounted fee directly.',
    ]),
    p(
      'Getting this right at check-in avoids claims sent to the wrong place and patient balances calculated on the wrong basis.'
    ),
    h2('Provider portal'),
    p(
      'Aetna directs health care professionals to the Availity portal for many tasks, such as eligibility and benefits checks, claim submission and claim status. Aetna also maintains dental-specific resources for dentists. Some programs, such as Aetna Dental Administrators, send offices to the phone number and claims address on the ID card instead, so we check which route applies to the patient\'s plan.'
    ),
    h2('Eligibility and benefits checks'),
    p(`Our ${S.verify} work for Aetna patients confirms:`),
    ul([
      'Plan type (PPO, DMO, indemnity, Medicare Advantage dental or a third-party administered plan) and network status.',
      'For DMO patients, whether your office is the selected primary dental office and which services need a specialist referral.',
      'Deductible, annual maximum and remaining benefits.',
      'Frequency limits, waiting periods and alternate benefit rules.',
      'Coordination of benefits with other dental coverage.',
    ]),
    h2('Claims and attachments'),
    p(
      `Aetna dental claims are generally sent electronically through your clearinghouse or the provider portal. We attach radiographs, perio charts and narratives for procedures that are likely to be reviewed, such as crowns, buildups, scaling and root planing, and implants, as part of ${S.claims}. For plans administered by a third party, we follow the submission instructions on the ID card.`
    ),
    h2('Pre-treatment estimates'),
    p(
      'For larger PPO and indemnity treatment plans, we submit pre-treatment estimates so the patient has an expected share before deciding. We re-check eligibility and remaining benefits before treatment if time has passed, because the estimate is based on benefits at the time it was issued.'
    ),
    h2('Posting Aetna payments'),
    p(
      `PPO and indemnity payments are posted line by line from the EOB or ERA, with write-offs matched to your contracted fee schedule. DMO activity is posted according to your agreement and the patient\'s copayment schedule. Our ${S.posting} work flags any line that does not match the expected allowance.`
    ),
    h2('Common reasons Aetna dental claims are pended or denied'),
    ul([
      'Supporting documentation missing for procedures that need clinical review.',
      'Frequency limits met or waiting periods not satisfied.',
      'DMO patient not assigned to your office, or a specialist referral missing.',
      'Claim sent to the wrong address or administrator for the plan.',
      'Coordination of benefits information outdated.',
    ]),
    h2('Reconsiderations and appeals'),
    p(
      `When a claim is denied or underpaid, we review whether a corrected claim or additional records will fix it. If not, we follow the dispute and appeal process described in the EOB and Aetna\'s provider materials, or the administrator\'s process for third-party plans, and track it through ${S.denials}.`
    ),
    h2('Credentialing with Aetna'),
    p(
      `Aetna invites dentists to apply to its dental network, and participation in the PPO network can extend to related programs. Our ${S.cred} service prepares applications, keeps CAQH profiles current, tracks re-credentialing and updates provider and location records, along with EFT and ERA enrollment.`
    ),
    h2('Follow-up on open claims'),
    p(
      `Unpaid Aetna claims are worked by age in ${S.ar}, with every portal check and call noted in your practice management system. ${S.reports} shows Aetna aging and denial trends alongside your other carriers.`
    ),
    TRADEMARK('Aetna'),
    p(`${CONSULT()} to talk through your Aetna dental claims and programs.`)
  ),
};

const guardian: PageContent = {
  key: 'guardian',
  parent: 'carriers',
  title: 'Guardian Dental Claims Billing & Follow-Up',
  seoTitle: 'Guardian Dental Claims Billing & Follow-Up',
  metaDescription:
    'Guardian dental claims billing and follow-up for dental offices: benefit checks, claims, pre-determinations, EOB posting, appeals and network credentialing.',
  template: 'location',
  intro:
    'Guardian dental claims billing covers group PPO and other Guardian dental plans, from benefit checks in Guardian Anytime to follow-up on unpaid claims. Our remote team handles that work inside your dental software and Guardian\'s provider portal.',
  body: blocks(
    h2('Guardian dental plans'),
    p(
      'Guardian provides dental coverage mainly through employer group plans, with PPO plans the most common in dental offices, along with dental HMO and indemnity options and individual plans in some markets. As with other group carriers, the employer chooses plan features, so frequency limits, waiting periods and maximums vary from one Guardian patient to the next. Two employees of different companies can both carry a Guardian card and still have very different coverage for the same crown.'
    ),
    h2('Guardian Anytime for providers'),
    p(
      'Guardian\'s self-service portal for dental offices is Guardian Anytime. After registering as a health care provider, offices can verify eligibility and benefits, check claim status, submit pre-determinations and set up direct deposit. Guardian also offers a digital assistant in the portal that can look up several claims at once by patient name, member ID or claim number. We work in Guardian Anytime with the access your office provides and record findings in your practice management system.'
    ),
    h2('Eligibility and benefits checks'),
    p(`Our ${S.verify} work for Guardian patients records:`),
    ul([
      'Active coverage, plan type and network status.',
      'Deductible, annual maximum and used benefits.',
      'Frequency limits for preventive care, radiographs and periodontal maintenance.',
      'Waiting periods for basic and major services, and any missing tooth provisions.',
      'Alternate benefit rules and orthodontic benefits where they apply.',
      'Coordination of benefits when the patient has more than one dental plan.',
    ]),
    h2('Claims and attachments'),
    p(
      `Guardian claims can be sent electronically through your clearinghouse or submitted through Guardian\'s secure portal channels, with paper submission available as a fallback. We send radiographs, perio charts and narratives with claims for procedures likely to be reviewed, as part of ${S.claims}. Paper and fax routes have their own limits on attachments, so we use electronic submission wherever the claim has supporting images.`
    ),
    h2('Pre-determinations'),
    p(
      'Guardian calls its pre-treatment estimate a pre-determination. It explains what the plan is expected to cover and what the patient\'s share will be, and Guardian Anytime lets offices submit one online for larger treatment plans. We submit pre-determinations for crowns, bridges, implants and periodontal treatment, record the result and re-check benefits before treatment if time has passed.'
    ),
    h2('Posting Guardian EOBs and ERAs'),
    p(
      `Guardian payments are posted line by line through ${S.posting}, with write-offs matched to your fee schedule and underpayments flagged. Where Guardian applied an alternate benefit or a different frequency count than expected, we note it so the patient balance and any appeal reflect it.`
    ),
    h2('Common reasons Guardian claims are pended or denied'),
    ul([
      'Radiographs, charting or narrative needed to review the procedure.',
      'Frequency limit already reached.',
      'Waiting period not satisfied.',
      'Pre-determination not submitted for a plan or procedure that calls for one.',
      'Coordination of benefits or patient information missing.',
      'Provider or location details that do not match Guardian\'s records.',
    ]),
    h2('Reviews and appeals'),
    p(
      `If a claim is denied or underpaid, we first look for a fix through a corrected claim or added documentation. When an appeal is warranted, we follow the process described on the EOB and in Guardian\'s provider materials, include the clinical support and track the response through ${S.denials}. Our ${a('/blog/how-to-appeal-a-denied-dental-claim/', 'guide to appealing a denied dental claim')} covers the general steps.`
    ),
    h2('Credentialing with Guardian'),
    p(
      `Our ${S.cred} service manages Guardian network applications, provider and location updates, CAQH profiles and re-credentialing dates, and sets up direct deposit and electronic remittances so payments arrive without paper checks.`
    ),
    h2('Follow-up until resolved'),
    p(
      `Open Guardian claims are worked by age in ${S.ar}, using the portal first and calls when needed, with every step noted in your system. ${S.patient} then bills the patient for the correct remaining balance.`
    ),
    TRADEMARK('Guardian'),
    p(`${CONSULT()} to talk through your Guardian dental claims.`)
  ),
};

const uhcDental: PageContent = {
  key: 'unitedhealthcare-dental',
  parent: 'carriers',
  title: 'UnitedHealthcare Dental Claims Billing & Follow-Up',
  seoTitle: 'UnitedHealthcare Dental Claims Billing & Follow-Up',
  metaDescription:
    'UnitedHealthcare Dental claims billing and follow-up: benefit checks, claims and attachments, pre-treatment estimates, posting, appeals and credentialing.',
  template: 'location',
  intro:
    'UnitedHealthcare Dental claims billing spans commercial, Medicare Advantage and Medicaid dental plans, and each one can use a different provider platform. Our remote team identifies the right one, then handles verification, claims, posting and follow-up inside your systems.',
  body: blocks(
    h2('UnitedHealthcare Dental plan types'),
    p(
      'UnitedHealthcare Dental covers employer group plans, including PPO and dental HMO designs, dental benefits in Medicare Advantage plans and dental benefits for Medicaid and dual special needs plan members in many states. The same carrier name on the card can lead to very different networks, fee schedules and claim routes, so plan type is the first thing we confirm. A front desk that books a Medicare Advantage dental patient as if they had an employer PPO plan will usually quote the wrong patient portion.'
    ),
    h2('Provider platforms'),
    p(
      'For commercial and Medicare Advantage dental plans, UnitedHealthcare directs offices to its dental provider portal at UHCdental.com, which uses a One Healthcare ID for sign-in. Each staff member needs an individual ID. Through the portal, offices can check eligibility and benefit details, build treatment plans and submit pre-treatment estimates, submit claims with attachments, check claim history and download EOBs.'
    ),
    p(
      'Medicaid and dual special needs plan members are handled on a separate dental provider site, and some state programs, such as Texas children\'s Medicaid dental, have their own state-specific sites. Some plans in the New York area are administered through Healthplex, which has its own reference guide. We confirm the right platform for each patient before submitting anything.'
    ),
    h2('Eligibility and benefits checks'),
    p(`Our ${S.verify} work for UnitedHealthcare Dental patients records:`),
    ul([
      'Plan type (PPO, dental HMO, Medicare Advantage dental or Medicaid) and network status.',
      'Deductible, annual maximum and benefits used.',
      'Frequency limits, waiting periods and alternate benefit rules.',
      'For dental HMO patients, assignment to your office and copayments.',
      'For Medicare Advantage patients, the plan\'s dental allowance and any network restrictions.',
    ]),
    h2('Claims and attachments'),
    p(
      `UnitedHealthcare notes that submitting claims and pre-treatment estimates online, through the provider portal or a clearinghouse, may speed up processing. We send claims electronically and attach radiographs, perio charts and narratives for procedures likely to be reviewed, using the attachment method the portal or your clearinghouse supports, as part of ${S.claims}. Fax is not an option for claims with radiographs or attachments, so we avoid that route for anything that needs documentation.`
    ),
    h2('Pre-treatment estimates'),
    p(
      'For PPO and Medicare Advantage dental patients, the portal\'s treatment plan tools let an office build a plan and request a pre-treatment estimate. We submit estimates for larger cases, record the result in your software and re-check benefits before treatment, since the estimate depends on benefits at the time it was issued.'
    ),
    h2('Posting UnitedHealthcare Dental payments'),
    p(
      `Payments are posted line by line from EOBs and ERAs through ${S.posting}, with write-offs matched to the fee schedule for that plan type and underpayments flagged. Medicaid dental remittances are posted using the rules of the state program.`
    ),
    h2('Common reasons claims are pended or denied'),
    ul([
      'Supporting documentation missing for procedures that need review.',
      'Frequency limit reached or waiting period not satisfied.',
      'Claim sent through the commercial portal for a Medicaid or dual special needs member, or the reverse.',
      'Dental HMO patient not assigned to your office.',
      'Provider or location not set up for that plan type.',
    ]),
    h2('Reconsiderations and appeals'),
    p(
      `If a claim is denied or underpaid, we check whether a corrected claim or added records will fix it, then follow the reconsideration and appeal process in the EOB and UnitedHealthcare\'s provider materials for that plan type. Medicaid dental appeals follow the state program\'s rules. We track each request through ${S.denials}.`
    ),
    h2('Credentialing with UnitedHealthcare Dental'),
    p(
      `Commercial, Medicare Advantage and Medicaid dental networks may each require their own participation. Our ${S.cred} service manages applications, CAQH profiles, re-credentialing dates and location updates, along with EFT and ERA enrollment.`
    ),
    h2('Follow-up on open claims'),
    p(
      `Unpaid UnitedHealthcare Dental claims are worked by age in ${S.ar}, checking the correct portal first and calling when needed, with every step noted in your practice management system.`
    ),
    TRADEMARK('UnitedHealthcare Dental'),
    p(`${CONSULT()} to talk through your UnitedHealthcare Dental claims.`)
  ),
};

export const areaPages: PageContent[] = [
  serviceAreas,
  texas,
  florida,
  california,
  newYork,
  carriers,
  deltaDental,
  metlife,
  cigna,
  aetna,
  guardian,
  uhcDental,
];
