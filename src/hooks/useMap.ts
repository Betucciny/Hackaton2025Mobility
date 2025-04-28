import { useQuery } from "@tanstack/react-query";
import { getReportLocations } from "../services/reportService";
import { ReportLocation } from "../types/reporte";

// Define query key
const reportsLocationQueryKey = ["reports", "locations"];

export const useGetReportsLocation = () => {
  return useQuery<ReportLocation[], Error>({
    queryKey: reportsLocationQueryKey,
    queryFn: getReportLocations,
    // Optional: Add staleTime or cacheTime if needed
    // staleTime: 5 * 60 * 1000, // 5 minutes
    // cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};
