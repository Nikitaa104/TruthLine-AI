
const sources = ['Twitter', 'Facebook', 'WhatsApp', 'News', 'Reddit', 'Telegram'];
const categories = ['Health', 'Disaster', 'Politics', 'Technology', 'Environment', 'Economy'];
const statuses = ['verified', 'misinformation'];
const verifiers = ['WHO', 'CDC', 'USGS', 'Reuters', 'NASA', 'UN', 'Fact Check Org'];
const locations = [
  { city: 'New York', country: 'USA' },
  { city: 'London', country: 'UK' },
  { city: 'Mumbai', country: 'India' },
  { city: 'Tokyo', country: 'Japan' },
  { city: 'Sydney', country: 'Australia' },
  { city: 'Paris', country: 'France' },
  { city: 'Berlin', country: 'Germany' },
  { city: 'Dubai', country: 'UAE' }
];

const claims = {
  Health: [
    'New vaccine shows 95% effectiveness in trials',
    'False claim about vitamin supplements curing diseases',
    'WHO releases new health guidelines',
    'Misinformation about hospital capacity spreads online'
  ],
  Disaster: [
    'Earthquake of magnitude 6.5 reported in coastal region',
    'False tsunami warning circulates on social media',
    'Hurricane approaching with Category 4 strength',
    'Fake evacuation orders cause panic'
  ],
  Politics: [
    'New policy announced by government officials',
    'Misleading information about election results',
    'Political figure makes controversial statement',
    'Fabricated quotes attributed to leaders'
  ],
  Technology: [
    'Major tech company announces breakthrough in AI',
    'False claims about data breach spread online',
    'New cybersecurity threat identified',
    'Fake software update warning goes viral'
  ],
  Environment: [
    'Climate report shows rising global temperatures',
    'Misleading information about recycling practices',
    'Endangered species population increases',
    'False claims about environmental policies'
  ],
  Economy: [
    'Stock market shows significant movement',
    'Fake news about currency devaluation spreads',
    'Central bank announces policy changes',
    'Misleading investment advice goes viral'
  ]
};

const generateFakeFeed = (count = 10) => {
  const feed = [];

  for (let i = 0; i < count; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];

    feed.push({
      _id: `alert_${Date.now()}_${i}`,
      source: sources[Math.floor(Math.random() * sources.length)],
      claim: claims[category][Math.floor(Math.random() * claims[category].length)],
      status: status,
      category: category,
      verifiedBy: verifiers[Math.floor(Math.random() * verifiers.length)],
      location: location,
      severity: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)],
      timestamp: new Date(Date.now() - Math.random() * 86400000), // Random time in last 24h
      evidenceLinks: [
        'https://example.com/source1',
        'https://example.com/source2'
      ]
    });
  }

  return feed.sort((a, b) => b.timestamp - a.timestamp);
};

module.exports = { generateFakeFeed };