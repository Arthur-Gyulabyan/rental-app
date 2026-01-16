import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { 
  Property, Apartment, Lease, Turnover, Inspection, WorkOrder, RenovationCase 
} from "@/lib/validators";

// Properties
export const useGetProperties = () => useQuery<Property[]>({
  queryKey: ["properties"],
  queryFn: () => api.get("/get-all-propertys"),
});

export const useCreateProperty = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => api.post("/create-property", data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["properties"] }),
  });
};

// Apartments
export const useGetApartments = () => useQuery<Apartment[]>({
  queryKey: ["apartments"],
  queryFn: () => api.get("/get-all-apartments"),
});

export const useCreateApartment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => api.post("/create-apartment", data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["apartments"] }),
  });
};

// Leases
export const useGetLeases = () => useQuery<Lease[]>({
  queryKey: ["leases"],
  queryFn: () => api.get("/get-all-leases"),
});

export const useCreateLease = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => api.post("/create-lease", data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["leases"] }),
  });
};

// Turnovers
export const useGetTurnovers = () => useQuery<any[]>({
  queryKey: ["turnovers"],
  queryFn: () => api.get("/get-all-turnovers"),
});

export const useCreateTurnover = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => api.post("/create-turnover", data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["turnovers"] }),
  });
};

// Inspections
export const useGetInspection = (id: string) => useQuery<any>({
  queryKey: ["inspection", id],
  queryFn: () => api.get(`/get-inspection-by-id/${id}`),
  enabled: !!id,
});

export const useScheduleInspection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => api.post("/schedule-inspection", data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["inspections"] }),
  });
};

// Work Orders
export const useGetWorkOrders = () => useQuery<any[]>({
  queryKey: ["work-orders"],
  queryFn: () => api.get("/get-all-work-orders"),
});

export const useCreateWorkOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => api.post("/create-work-order", data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["work-orders"] }),
  });
};

// Renovations
export const useGetRenovationCases = () => useQuery<any[]>({
  queryKey: ["renovation-cases"],
  queryFn: () => api.get("/get-all-renovation-cases"),
});