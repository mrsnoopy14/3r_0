import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import MapView, { Marker, Polyline, UrlTile, PROVIDER_DEFAULT } from 'react-native-maps';

interface Coordinate {
  latitude: number;
  longitude: number;
}

interface LiveMapProps {
  region: Coordinate & { latitudeDelta: number; longitudeDelta: number };
  agentLocation: Coordinate;
  userLocation: Coordinate;
  style?: StyleProp<ViewStyle>;
}

export function LiveMap({ region, agentLocation, userLocation, style }: LiveMapProps) {
  return (
    <MapView
      style={[styles.map, style]}
      provider={PROVIDER_DEFAULT}
      region={region}
      scrollEnabled={false}
      zoomEnabled={false}
      showsUserLocation={false}
      showsMyLocationButton={false}
      showsCompass={false}
      toolbarEnabled={false}
    >
      <UrlTile
        urlTemplate="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        maximumZ={19}
        flipY={false}
      />
      <Marker coordinate={agentLocation} anchor={{ x: 0.5, y: 0.5 }}>
        <View style={styles.agentMarker}>
          <Text style={{ fontSize: 20 }}>🚛</Text>
        </View>
      </Marker>
      <Marker coordinate={userLocation} anchor={{ x: 0.5, y: 1 }}>
        <View style={styles.userMarker}>
          <View style={styles.userMarkerInner} />
        </View>
      </Marker>
      <Polyline
        coordinates={[agentLocation, userLocation]}
        strokeColor="#15803d"
        strokeWidth={3}
        lineDashPattern={[8, 4]}
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: { flex: 1 },
  agentMarker: { backgroundColor: 'white', borderRadius: 16, padding: 3, elevation: 2 },
  userMarker: { width: 18, height: 18, borderRadius: 9, backgroundColor: 'rgba(59,130,246,0.25)', alignItems: 'center', justifyContent: 'center' },
  userMarkerInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#3b82f6', borderWidth: 2, borderColor: 'white' },
});
