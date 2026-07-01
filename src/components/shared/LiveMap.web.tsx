import React from 'react';

interface Coordinate {
  latitude: number;
  longitude: number;
}

interface LiveMapProps {
  region: Coordinate & { latitudeDelta: number; longitudeDelta: number };
  agentLocation: Coordinate;
  userLocation: Coordinate;
  style?: any;
}

// react-native-maps has no web support, so the web build embeds a lightweight
// OpenStreetMap iframe covering both points instead.
export function LiveMap({ agentLocation, userLocation }: LiveMapProps) {
  const minLat = Math.min(agentLocation.latitude, userLocation.latitude) - 0.01;
  const maxLat = Math.max(agentLocation.latitude, userLocation.latitude) + 0.01;
  const minLon = Math.min(agentLocation.longitude, userLocation.longitude) - 0.01;
  const maxLon = Math.max(agentLocation.longitude, userLocation.longitude) + 0.01;
  const bbox = `${minLon}%2C${minLat}%2C${maxLon}%2C${maxLat}`;
  const marker = `${userLocation.latitude}%2C${userLocation.longitude}`;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${marker}`;

  return (
    <iframe
      title="Live location map"
      src={src}
      style={{ width: '100%', height: '100%', border: 0 }}
    />
  );
}
