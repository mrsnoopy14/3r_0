import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import MapplsGL from 'mappls-map-react-native';
import { mapService } from '../../services/mapService';

interface TrackingMapProps {
  userCoordinate: [number, number];
  agentLocation?: { lat: number; lng: number } | null;
}

export function TrackingMap({ userCoordinate, agentLocation }: TrackingMapProps) {
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    mapService.getMapConfig()
      .then(key => {
        MapplsGL.setMapSDKKey(key);
        MapplsGL.setRestAPIKey(key);
        setMapReady(true);
      })
      .catch(() => {});
  }, []);

  if (!mapReady) {
    return (
      <View style={styles.mapComingSoon}>
        <ActivityIndicator size="small" color="#16a34a" />
        <Text style={styles.mapComingSoonTitle}>Initializing map...</Text>
      </View>
    );
  }

  return (
    <MapplsGL.MapView style={{ flex: 1 }} logoEnabled={false} compassEnabled={false}>
      <MapplsGL.Camera
        centerCoordinate={agentLocation ? [agentLocation.lng, agentLocation.lat] : userCoordinate}
        zoomLevel={14}
        animationMode="flyTo"
        animationDuration={500}
      />
      <MapplsGL.PointAnnotation id="user-pin" coordinate={userCoordinate} title="Pickup">
        <View style={styles.pinWrap}>
          <View style={styles.userPin}><Text style={{ fontSize: 19 }}>🏠</Text></View>
          <View style={styles.userPinStem} />
        </View>
      </MapplsGL.PointAnnotation>
      {agentLocation && (
        <MapplsGL.PointAnnotation id="agent-pin" coordinate={[agentLocation.lng, agentLocation.lat]} title="Agent">
          <View style={styles.pinWrap}>
            <View style={styles.agentPin}><Text style={{ fontSize: 19 }}>🛵</Text></View>
            <View style={styles.agentPinStem} />
          </View>
        </MapplsGL.PointAnnotation>
      )}
    </MapplsGL.MapView>
  );
}

const styles = StyleSheet.create({
  mapComingSoon: { flex: 1, backgroundColor: '#f0fdf4', alignItems: 'center', justifyContent: 'center', padding: 20 },
  mapComingSoonTitle: { fontSize: 14, fontWeight: '700', color: '#15803d', marginTop: 8, textAlign: 'center' },
  pinWrap: { alignItems: 'center' },
  userPin: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#16a34a', borderWidth: 3, borderColor: '#fff', alignItems: 'center', justifyContent: 'center', elevation: 5, shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 6, shadowOffset: { width: 0, height: 3 } },
  userPinStem: { width: 0, height: 0, borderLeftWidth: 7, borderRightWidth: 7, borderTopWidth: 11, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderTopColor: '#fff', marginTop: -3 },
  agentPin: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#fff', borderWidth: 3, borderColor: '#0284c7', alignItems: 'center', justifyContent: 'center', elevation: 5, shadowColor: '#0284c7', shadowOpacity: 0.35, shadowRadius: 6, shadowOffset: { width: 0, height: 3 } },
  agentPinStem: { width: 0, height: 0, borderLeftWidth: 7, borderRightWidth: 7, borderTopWidth: 11, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderTopColor: '#0284c7', marginTop: -3 },
});
