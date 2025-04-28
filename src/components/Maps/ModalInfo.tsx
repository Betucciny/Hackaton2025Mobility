import { ReportLocation } from "@/src/types/reporte";
import { Modal, View, Text, TouchableOpacity, ScrollView } from "react-native";
import { PostCardGallery } from "../ReporteCard/Card/PostCardGallery"; // Adjust the import path as needed
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

type ModalInfoProps = {
  report: ReportLocation | null;
  isVisible: boolean;
  onClose: () => void;
};

export default function ModalInfo({
  report,
  isVisible,
  onClose,
}: ModalInfoProps) {
  const BASE_URL = process.env.EXPO_PUBLIC_URL_POST!!;
  if (report === null) return <></>;

  const iconColor = "#555"; // Adjust icon color as needed

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          className="bg-background dark:bg-background-dark"
          style={{
            margin: 20,
            borderRadius: 20,
            padding: 20,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            width: "90%",
            maxHeight: "90%",
          }}
        >
          {/* Title */}
          <Text
            className="text-background-dark dark:text-background"
            style={{
              marginBottom: 15,
              textAlign: "center",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Detalles del Reporte
          </Text>

          {/* Scrollable Content */}
          <ScrollView style={{ width: "100%" }}>
            {/* Image Gallery */}
            {report.foto_reporte && (
              <View style={{ maxHeight: 300, marginBottom: 15 }}>
                <PostCardGallery
                  foto_reporte={report.foto_reporte}
                  postId={report.id_reporte}
                />
              </View>
            )}

            {/* Description */}
            <Text
              className="text-background-dark dark:text-background"
              style={{
                marginBottom: 10,
                textAlign: "center",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              {report.descripcion}
            </Text>

            {/* Status */}
            <Text
              className="text-background-dark dark:text-background"
              style={{
                marginBottom: 10,
                textAlign: "center",
                fontSize: 14,
              }}
            >
              Estado:{" "}
              <Text
                style={{
                  fontWeight: "bold",
                  color: report.estatus ? "green" : "red",
                }}
              >
                {report.estatus ? "Resuelto" : "No Resuelto"}
              </Text>
            </Text>

            {/* Dates */}
            <Text
              className="text-background-dark dark:text-background"
              style={{
                marginBottom: 10,
                textAlign: "center",
                fontSize: 14,
              }}
            >
              Creado el:{" "}
              {new Date(report.fecha_creacion).toLocaleString("es-MX")}
            </Text>
            {report.fecha_resuelto && (
              <Text
                className="text-background-dark dark:text-background"
                style={{
                  marginBottom: 10,
                  textAlign: "center",
                  fontSize: 14,
                }}
              >
                Resuelto el:{" "}
                {new Date(report.fecha_resuelto).toLocaleString("es-MX")}
              </Text>
            )}

            {/* Location Info */}
            <Text
              className="text-background-dark dark:text-background"
              style={{
                marginBottom: 10,
                textAlign: "center",
                fontSize: 14,
              }}
            >
              Zona: {report.zona || "N/A"}
            </Text>
            <Text
              className="text-background-dark dark:text-background"
              style={{
                marginBottom: 10,
                textAlign: "center",
                fontSize: 14,
              }}
            >
              Código Postal: {report.codigo_postal || "N/A"}
            </Text>
            <Text
              className="text-background-dark dark:text-background"
              style={{
                marginBottom: 10,
                textAlign: "center",
                fontSize: 14,
              }}
            >
              Asentamiento: {report.asentamiento || "N/A"}
            </Text>
            <Text
              className="text-background-dark dark:text-background"
              style={{
                marginBottom: 10,
                textAlign: "center",
                fontSize: 14,
              }}
            >
              Municipio: {report.nombre_municipio || "N/A"}
            </Text>
            <Text
              className="text-background-dark dark:text-background"
              style={{
                marginBottom: 10,
                textAlign: "center",
                fontSize: 14,
              }}
            >
              Estado: {report.nombre_estado || "N/A"}
            </Text>
            <Text
              className="text-background-dark dark:text-background"
              style={{
                marginBottom: 10,
                textAlign: "center",
                fontSize: 14,
              }}
            >
              País: {report.pais}
            </Text>

            {/* Cost */}
            <Text
              className="text-background-dark dark:text-background"
              style={{
                marginBottom: 10,
                textAlign: "center",
                fontSize: 14,
              }}
            >
              Costo: {report.costo ? `$${report.costo}` : "N/A"}
            </Text>

            {/* Likes and Comments */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginRight: 20,
                }}
              >
                <AntDesign name="hearto" size={22} color={iconColor} />
                <Text
                  className="text-background-dark dark:text-background"
                  style={{ marginLeft: 5, fontSize: 14 }}
                >
                  {report.likes_count}
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons
                  name="chatbubble-outline"
                  size={22}
                  color={iconColor}
                />
                <Text
                  className="text-background-dark dark:text-background"
                  style={{ marginLeft: 5, fontSize: 14 }}
                >
                  {report.comments_count}
                </Text>
              </View>
            </View>
          </ScrollView>

          {/* Close Button */}
          <TouchableOpacity
            onPress={onClose}
            style={{
              marginTop: 15,
              backgroundColor: "#2196F3",
              borderRadius: 10,
              padding: 10,
              elevation: 2,
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Cerrar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
