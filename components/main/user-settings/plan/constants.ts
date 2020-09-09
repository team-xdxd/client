const PRO_V1_SUMMARY = 'Perfect for smaller teams poised for growth'
const PREMIUM_V1_SUMMARY = 'Ideal for teams that are scaling and have more complex workflows'
const ENTERPRISE_SUMMARY = 'Robust Enterprise capabilities to server larger companies'

const PRO_V1_FEATURES = [
  '100GB of Storage',
  '1 Admin',
  'Unlimited Users',
  'Shared Calendar',
  'Collaboration Features',
  'Digital Asset Management'
]

const PREMIUM_V1_FEATURES = [
  'Everything from PRO',
  '1TB of Storage',
  '3 Admins',
  'Advanced Workflow tools',
  'Asset distribution via CDN',
  'Advanced Integrations'
]

const ENTERPRISE_FEATURES = [
  'Everything from PREMIUM',
  'Custom Storage',
  'Dedicated Account Manager',
  'Unlimited Admins',
  'Automated workflows',
  'Advanced Security'
]

const ENTERPRISE_PLAN = {
  id: 'enterprise',
  type: 'enterprise',
  name: 'Enterprise',
  metadata: { benefits_id: 'ENTERPRISE' }
}

export default {
  PRO_V1_SUMMARY,
  PRO_V1_FEATURES,
  PREMIUM_V1_SUMMARY,
  PREMIUM_V1_FEATURES,
  ENTERPRISE_SUMMARY,
  ENTERPRISE_FEATURES,

  ENTERPRISE_PLAN
}

