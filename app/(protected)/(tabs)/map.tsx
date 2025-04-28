import React from "react";
import { StyleSheet, View, Image } from "react-native";
import MapLibreRN, {
  Camera,
  MapView,
  MarkerView,
} from "@maplibre/maplibre-react-native";

const initialCenterCoordinate = [-98.2376, 19.3154];
const initialZoomLevel = 10;

function Maplibre() {
  const MAPTILER_API_KEY = process.env.EXPO_PUBLIC_MAPTILER_API_KEY;

  const vectorStyleURL = `https://api.maptiler.com/maps/streets-v2/style.json?key=${MAPTILER_API_KEY}`;
  return (
    <MapView
      mapStyle={vectorStyleURL}
      style={styles.map}
      logoEnabled={false}
      attributionEnabled={true}
      attributionPosition={{ bottom: 8, right: 8 }}
    >
      <Camera
        zoomLevel={initialZoomLevel}
        centerCoordinate={initialCenterCoordinate}
        animationMode={"flyTo"}
        animationDuration={1500}
      />

      {/* {locations.map((location) => (
        <MarkerView
          key={location.id}
          coordinate={location.coords}
          anchor={{ x: 0.5, y: 1 }}
        >
          <View style={styles.markerContainer}>
            <Image
              source={require("../../../assets/images/favicon.png")}
              style={styles.markerIcon}
            />
          </View>
        </MarkerView>
      ))} */}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  markerContainer: {
    alignItems: "center",
  },
  markerIcon: {
    width: 30,
    height: 40,
    resizeMode: "contain",
  },
});

export default Maplibre;
