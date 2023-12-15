import React from 'react';
const privacyConstants = [
  {
    title: 'Data Collection',
    points: [
      'We collect minimal personal information, including name and email.',
      'Your data is stored securely using industry-standard encryption methods.',
      'We may collect usage data for analytics purposes.',
      'Information collected is solely for platform improvement.',
    ],
  },
  {
    title: 'Data Usage',
    points: [
      'We use your data for platform functionality, such as personalized content.',
      'No data is shared with third parties without explicit consent.',
      'Data may be used to communicate platform updates or important notices.',
      'Your data will never be sold or traded for marketing purposes.',
    ],
  },
  {
    title: 'Security Measures',
    points: [
      'User passwords are securely hashed using bcrypt.',
      'Authentication is managed using JSON Web Tokens (JWT).',
      'Regular security audits are conducted to identify and address vulnerabilities.',
      'Access to user data is restricted to authorized personnel only.',
    ],
  },
];

export default privacyConstants;
