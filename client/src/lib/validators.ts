import { z } from "zod";

// Entities
export const propertySchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  managerName: z.string().min(1, "Manager name is required"),
  managerEmail: z.string().email("Invalid email"),
  unitsCount: z.string(),
});

export const apartmentSchema = z.object({
  id: z.string(),
  propertyId: z.string(),
  unitNumber: z.string().min(1, "Unit number is required"),
  floorAreaSqm: z.string(),
  bedrooms: z.string(),
  status: z.string(),
});

export const leaseSchema = z.object({
  id: z.string(),
  apartmentId: z.string(),
  endDate: z.string().optional(),
  noticeDate: z.string().optional(),
  currentRent: z.string(),
  nextActorEmail: z.string().email().optional(),
  moveOutConfirmedAt: z.string().optional(),
  turnoverId: z.string().optional(),
  tenantName: z.string().min(1, "Tenant name is required"),
});

export const turnoverSchema = z.object({
  id: z.string(),
  leaseId: z.string(),
  targetReadyDate: z.string(),
  nextActorEmail: z.string().email().optional(),
  vacatedAt: z.string().optional(),
  keysReturned: z.string().optional(),
  notes: z.string().optional(),
  readyToRentDate: z.string().optional(),
  listingReady: z.string().optional(),
  marketingEmail: z.string().email().optional(),
  finalInspectionPassedAt: z.string().optional(),
  openWorkOrdersCount: z.string().optional(),
  checklist: z.string().optional(),
});

export const inspectionSchema = z.object({
  id: z.string(),
  turnoverId: z.string(),
  scheduledAt: z.string(),
  assignedToEmail: z.string().email().optional(),
  inspectorName: z.string().optional(),
  locationNotes: z.string().optional(),
  nextActorEmail: z.string().email().optional(),
  completedAt: z.string().optional(),
  findingsSummary: z.string().optional(),
  hasDamages: z.string().optional(),
  photosUrl: z.string().url().optional().or(z.literal("")),
  passedAt: z.string().optional(),
  certificateUrl: z.string().url().optional().or(z.literal("")),
  checklist: z.string().optional(),
  rescheduledReason: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const workOrderSchema = z.object({
  id: z.string(),
  renovationCaseId: z.string(),
  scopeSummary: z.string(),
  accessDetails: z.string().optional(),
  materialsList: z.string(),
  nextActorEmail: z.string().email().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  crewName: z.string().optional(),
  assignedToEmail: z.string().email().optional(),
  materialsReady: z.string().optional(),
  actualStartDate: z.string().optional(),
  actualEndDate: z.string().optional(),
  completionNotes: z.string().optional(),
  photosUrl: z.string().url().optional().or(z.literal("")),
  varianceNotes: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const renovationCaseSchema = z.object({
  id: z.string(),
  turnoverId: z.string(),
  requestedLevels: z.string().optional(),
  scopeNotes: z.string().optional(),
  targetReadyDate: z.string().optional(),
  costGood: z.string().optional(),
  costBetter: z.string().optional(),
  costPremium: z.string().optional(),
  leadDaysGood: z.string().optional(),
  leadDaysBetter: z.string().optional(),
  leadDaysPremium: z.string().optional(),
  selectedLevel: z.string().optional(),
  budgetApproved: z.string().optional(),
  expectedCompletionDate: z.string().optional(),
  projectedRent: z.string().optional(),
  decisionReason: z.string().optional(),
});

// Request Schemas (Omitting IDs for creations)
export const createPropertySchema = propertySchema.omit({ id: true });
export const createApartmentSchema = apartmentSchema.omit({ id: true });
export const createLeaseSchema = leaseSchema.pick({ apartmentId: true, currentRent: true, tenantName: true }).extend({ nextActorEmail: z.string().email().optional() });
export const createTurnoverSchema = z.object({ leaseId: z.string(), targetReadyDate: z.string(), nextActorEmail: z.string().email().optional() });
export const scheduleInspectionSchema = z.object({ turnoverId: z.string(), scheduledAt: z.string(), assignedToEmail: z.string().email(), locationNotes: z.string().optional(), nextActorEmail: z.string().email().optional() });
export const createWorkOrderSchema = z.object({ renovationCaseId: z.string(), scopeSummary: z.string(), materialsList: z.string(), nextActorEmail: z.string().email().optional() });

export type Property = z.infer<typeof propertySchema>;
export type Apartment = z.infer<typeof apartmentSchema>;
export type Lease = z.infer<typeof leaseSchema>;
export type Turnover = z.infer<typeof turnoverSchema>;
export type Inspection = z.infer<typeof inspectionSchema>;
export type WorkOrder = z.infer<typeof workOrderSchema>;
export type RenovationCase = z.infer<typeof renovationCaseSchema>;