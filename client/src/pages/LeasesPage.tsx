import { PageHeader } from "@/components/shared/PageHeader";
import { DataTable } from "@/components/shared/DataTable";
import { useGetLeases, useGetApartments } from "@/api/rental";
import { Badge } from "@/components/ui/badge";
import { Lease } from "@/lib/validators";
import { Calendar, User, DollarSign } from "lucide-react";

export default function LeasesPage() {
  const { data: leases = [], isLoading } = useGetLeases();
  const { data: apartments = [] } = useGetApartments();

  const getApartmentLabel = (aptId: string) => {
    const apt = apartments.find(a => a.id === aptId);
    return apt ? `Unit ${apt.unitNumber}` : aptId;
  };

  const columns = [
    {
      header: "Tenant",
      cell: (l: Lease) => (
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{l.tenantName}</span>
        </div>
      ),
    },
    {
      header: "Apartment",
      cell: (l: Lease) => (
        <Badge variant="outline">{getApartmentLabel(l.apartmentId)}</Badge>
      ),
    },
    {
      header: "Current Rent",
      cell: (l: Lease) => (
        <div className="flex items-center text-sm">
          <DollarSign className="h-3 w-3 mr-1" />
          {l.currentRent}
        </div>
      ),
    },
    {
      header: "End Date",
      cell: (l: Lease) => (
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          {l.endDate || "Periodic"}
        </div>
      ),
    },
    {
      header: "Status",
      cell: (l: Lease) => (
        <Badge variant={l.moveOutConfirmedAt ? "destructive" : "default"}>
          {l.moveOutConfirmedAt ? "Ending" : "Active"}
        </Badge>
      ),
    },
  ];

  return (
    <div className="container mx-auto py-10 px-4">
      <PageHeader 
        title="Leases" 
        description="Track active tenant agreements and upcoming move-outs."
      />
      <DataTable columns={columns} data={leases} isLoading={isLoading} />
    </div>
  );
}