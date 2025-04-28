import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from "react-native";
import MapLibreRN, {
  Camera,
  MapView,
  MarkerView,
} from "@maplibre/maplibre-react-native";
import Animated from "react-native-reanimated";
import { useGetReportsLocation } from "../../../src/hooks/useMap";
import { ReportLocation } from "@/src/types/reporte";
import ModalInfo from "@/src/components/Maps/ModalInfo";

function Maplibre() {
  const MAPTILER_API_KEY = process.env.EXPO_PUBLIC_MAPTILER_API_KEY;

  const {
    data: reportLocations,
    isLoading,
    isError,
    error,
  } = useGetReportsLocation();

  const vectorStyleURL = `https://api.maptiler.com/maps/streets-v2/style.json?key=${MAPTILER_API_KEY}`;

  const [selectedReport, setSelectedReport] = useState<ReportLocation | null>(
    null,
  );
  const [isVisible, setIsVisible] = useState(false);
  console.log(selectedReport, isVisible);
  function onMarkerPress(report: ReportLocation) {
    setIsVisible(true);
    setSelectedReport(report);
  }

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
    <>
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
              <TouchableOpacity onPressIn={() => onMarkerPress(report)}>
                <View
                  style={{
                    padding: 5,
                    borderRadius: 5,
                  }}
                >
                  <Image
                    source={require("../../../assets/images/favicon.png")}
                    style={styles.markerIcon}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </MarkerView>
        ))}
      </MapView>
      <ModalInfo
        report={selectedReport}
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
      />
    </>
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
