import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { mappls } from 'mappls-web-maps';
import { MAPPLS_WEB_KEY } from '../../config/mappls';

interface TrackingMapProps {
  userCoordinate: [number, number];           // [lng, lat] — pickup
  agentLocation?: { lat: number; lng: number } | null; // agent live location
}

const mapplsObj = new mappls();

// Blinkit-style pins: circular badge on a pointed stem, ground shadow below.
// Pickup = solid green with house; agent = white badge with scooter.
const pinHtml = (bg: string, border: string, emoji: string) =>
  '<div style="display:flex;flex-direction:column;align-items:center;width:48px;">' +
    `<div style="width:42px;height:42px;border-radius:50%;background:${bg};border:3px solid ${border};box-shadow:0 4px 10px rgba(0,0,0,0.35);display:flex;align-items:center;justify-content:center;font-size:20px;">${emoji}</div>` +
    `<div style="width:0;height:0;border-left:7px solid transparent;border-right:7px solid transparent;border-top:11px solid ${border};margin-top:-3px;"></div>` +
    '<div style="width:14px;height:4px;border-radius:50%;background:rgba(0,0,0,0.25);margin-top:1px;"></div>' +
  '</div>';

const USER_PIN_HTML = pinHtml('#16a34a', '#ffffff', '🏠');
const AGENT_PIN_HTML = pinHtml('#ffffff', '#0284c7', '🛵');

// OpenStreetMap iframe — used only if the Mappls Web SDK fails to load,
// so the tracking view is never worse than before.
function OsmFallback({ userCoordinate, agentLocation }: TrackingMapProps) {
  const [userLng, userLat] = userCoordinate;
  const pts = agentLocation ? [[userLat, userLng], [agentLocation.lat, agentLocation.lng]] : [[userLat, userLng]];
  const lats = pts.map(p => p[0]); const lons = pts.map(p => p[1]);
  const bbox = `${Math.min(...lons) - 0.01}%2C${Math.min(...lats) - 0.01}%2C${Math.max(...lons) + 0.01}%2C${Math.max(...lats) + 0.01}`;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${userLat}%2C${userLng}`;
  return <iframe title="Live tracking map" src={src} style={{ width: '100%', height: '100%', border: 0 }} />;
}

export function TrackingMap({ userCoordinate, agentLocation }: TrackingMapProps) {
  const containerId = useRef(`mappls-track-${Math.random().toString(36).slice(2)}`);
  const mapRef = useRef<any>(null);
  const userMarkerRef = useRef<any>(null);
  const agentMarkerRef = useRef<any>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'fallback'>('loading');

  useEffect(() => {
    let cancelled = false;
    const failTimer = setTimeout(() => { if (!cancelled) setStatus(s => (s === 'ready' ? s : 'fallback')); }, 12000);

    try {
      mapplsObj.initialize(MAPPLS_WEB_KEY, { map: true }, () => {
        if (cancelled) return;
        try {
          const map = mapplsObj.Map({
            id: containerId.current,
            properties: {
              center: [userCoordinate[1], userCoordinate[0]], // Mappls: [lat, lng]
              zoom: 14,
              zoomControl: true,
            },
          });
          mapRef.current = map;
          map.on('load', () => {
            if (cancelled) return;
            clearTimeout(failTimer);
            setStatus('ready');
            userMarkerRef.current = mapplsObj.Marker({
              map,
              position: { lat: userCoordinate[1], lng: userCoordinate[0] },
              html: USER_PIN_HTML,
              width: 48,
              height: 62,
              offset: [0, -28],
            });
          });
        } catch (e) {
          console.error('[TrackingMap.web] Map() failed:', e);
          setStatus('fallback');
        }
      });
    } catch (e) {
      console.error('[TrackingMap.web] initialize failed:', e);
      setStatus('fallback');
    }

    return () => {
      cancelled = true;
      clearTimeout(failTimer);
      try { mapRef.current?.remove?.(); } catch {}
      mapRef.current = null;
    };
  }, []);

  // Live agent marker — moves as the agent's location updates
  useEffect(() => {
    if (status !== 'ready' || !agentLocation || !mapRef.current) return;
    const pos = { lat: agentLocation.lat, lng: agentLocation.lng };
    try {
      if (agentMarkerRef.current) {
        agentMarkerRef.current.setPosition(pos);
      } else {
        agentMarkerRef.current = mapplsObj.Marker({
          map: mapRef.current,
          position: pos,
          html: AGENT_PIN_HTML,
          width: 48,
          height: 62,
          offset: [0, -28],
        });
      }
      mapRef.current.setCenter([agentLocation.lng, agentLocation.lat]);
    } catch (e) {
      console.warn('[TrackingMap.web] agent marker update failed:', e);
    }
  }, [agentLocation, status]);

  if (status === 'fallback') {
    return <OsmFallback userCoordinate={userCoordinate} agentLocation={agentLocation} />;
  }

  return (
    <View style={styles.container}>
      <div id={containerId.current} style={{ width: '100%', height: '100%' }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
