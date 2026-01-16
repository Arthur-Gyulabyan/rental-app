import { PageHeader } from "@/components/shared/PageHeader";
import { DataTable } from "@/components/shared/DataTable";
import { useGetWorkOrders, useGetRenovationCases } from "@/api/rental";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Hammer, ClipboardList, AlertCircle } from "lucide-react";

export default function MaintenancePage() {
  const { data: workOrders = [], isLoading: loadingWO } = useGetWorkOrders();
  const { data: renovations = [], isLoading: loadingReno } = useGetRenovationCases();

  const woColumns = [
    { header: "ID", cell: (wo: any) => <span className="text-xs font-mono">{wo.id}</span> },
    { header: "Scope", accessorKey: "scopeSummary" as any },
    { header: "Assigned", accessorKey: "assignedToEmail" as any },
    { 
      header: "Dates", 
      cell: (wo: any) => (
        <div className="text-xs">
          <div>S: {wo.startDate}</div>
          <div>E: {wo.endDate}</div>
        </div>
      ) 
    },
    {
      header: "Status",
      cell: (wo: any) => (
        <Badge variant={wo.varianceNotes ? "warning" : "secondary"}>
          {wo.varianceNotes ? "Delayed" : "Scheduled"}
        </Badge>
      ),
    },
  ];

  const renoColumns = [
    { header: "Turnover ID", accessorKey: "turnoverId" as any },
    { header: "Scope Notes", accessorKey: "scopeNotes" as any },
    { header: "Target Ready", accessorKey: "targetReadyDate" as any },
    { 
      header: "Options", 
      cell: (r: any) => (
        <div className="text-xs text-muted-foreground">
          {r.requestedLevels}
        </div>
      ) 
    },
  ];

  return (
    <div className="container mx-auto py-10 px-4">
      <PageHeader 
        title="Maintenance & Renovations" 
        description="Handle work orders and renovation project lifecycles."
      />

      <Tabs defaultValue="work-orders">
        <TabsList className="mb-6">
          <TabsTrigger value="work-orders" className="gap-2">
            <Hammer className="h-4 w-4" /> Work Orders
          </TabsTrigger>
          <TabsTrigger value="renovations" className="gap-2">
            <ClipboardList className="h-4 w-4" /> Renovation Projects
          </TabsTrigger>
        </TabsList>

        <TabsContent value="work-orders">
          <DataTable columns={woColumns} data={workOrders} isLoading={loadingWO} />
        </TabsContent>

        <TabsContent value="renovations">
          <DataTable columns={renoColumns} data={renovations} isLoading={loadingReno} />
        </TabsContent>
      </Tabs>
    </div>
  );
}