import React from "react";
import { StyleSheet, View, Image, ActivityIndicator, Text } from "react-native";
import MapLibreRN, {
  Camera,
  MapView,
  MarkerView,
} from "@maplibre/maplibre-react-native";
import { useGetReportsLocation } from "../../../src/hooks/useMap";

function Maplibre() {
  const MAPTILER_API_KEY = process.env.EXPO_PUBLIC_MAPTILER_API_KEY;

  const {
    data: reportLocations,
    isLoading,
    isError,
    error,
  } = useGetReportsLocation();

  const vectorStyleURL = `https://api.maptiler.com/maps/streets-v2/style.json?key=${MAPTILER_API_KEY}`;

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text>Cargando reportes...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centered}>
        <Text>Error al cargar los reportes: {error?.message}</Text>
      </View>
    );
  }

  return (
    <MapView
      mapStyle={vectorStyleURL}
      style={styles.map}
      logoEnabled={false}
      attributionEnabled={true}
      attributionPosition={{ bottom: 8, right: 8 }}
    >
      <Camera
        // zoomLevel={initialZoomLevel}
        // centerCoordinate={initialCenterCoordinate}
        animationMode={"flyTo"}
        animationDuration={1500}
      />

      {reportLocations?.map((report) => (
        <MarkerView
          key={report.id_reporte}
          coordinate={[report.longitud, report.latitud]}
          anchor={{ x: 0.5, y: 1 }}
        >
          <View style={styles.markerContainer}>
            <Image
              source={require("../../../assets/images/favicon.png")}
              style={styles.markerIcon}
            />
          </View>
        </MarkerView>
      ))}
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
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Maplibre;
