import supabase from "../lib/supabase"; // Changed to default import
import { ReportLocation } from "../types/reporte";

export const getReportLocations = async (): Promise<ReportLocation[]> => {
  const { data, error } = await supabase
    .from("reporte")
    .select("*")
    .not("latitud", "is", null)
    .not("longitud", "is", null);

  if (error) {
    console.error("Error fetching report locations:", error);
    throw new Error(error.message);
  }

  // Ensure latitud and longitud are numbers, filter out any unexpected nulls again just in case
  return (data || []).filter(
    (report: any): report is ReportLocation =>
      typeof report.latitud === "number" && typeof report.longitud === "number"
  );
}; 