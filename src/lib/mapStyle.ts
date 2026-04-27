export const undergroundMapStyle = [
  {
    elementType: 'geometry',
    stylers: [{color: '#141017'}],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [{color: '#f6d2aa'}],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [{color: '#141017'}],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [{color: '#6b3420'}],
  },
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [{color: '#211712'}],
  },
  {
    featureType: 'poi',
    stylers: [{visibility: 'off'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{color: '#3a251b'}],
  },
  {
    featureType: 'road',
    elementType: 'labels.icon',
    stylers: [{visibility: 'off'}],
  },
  {
    featureType: 'transit',
    stylers: [{visibility: 'off'}],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{color: '#0d1720'}],
  },
] as Record<string, unknown>[];
