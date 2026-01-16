import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Building2, 
  DoorOpen, 
  FileText, 
  Hammer, 
  RefreshCcw, 
  Search 
} from "lucide-react";
import { Link } from "react-router-dom";
import { 
  useGetProperties, 
  useGetApartments, 
  useGetLeases, 
  useGetTurnovers, 
  useGetWorkOrders 
} from "@/api/rental";

export default function Dashboard() {
  const { data: properties } = useGetProperties();
  const { data: apartments } = useGetApartments();
  const { data: leases } = useGetLeases();
  const { data: turnovers } = useGetTurnovers();
  const { data: workOrders } = useGetWorkOrders();

  const stats = [
    { label: "Properties", value: properties?.length || 0, icon: Building2, color: "text-blue-600", href: "/properties" },
    { label: "Total Units", value: apartments?.length || 0, icon: DoorOpen, color: "text-green-600", href: "/apartments" },
    { label: "Active Leases", value: leases?.length || 0, icon: FileText, color: "text-purple-600", href: "/leases" },
    { label: "Active Turnovers", value: turnovers?.length || 0, icon: RefreshCcw, color: "text-orange-600", href: "/turnovers" },
    { label: "Pending Work Orders", value: workOrders?.length || 0, icon: Hammer, color: "text-red-600", href: "/maintenance" },
  ];

  return (
    <div className="container mx-auto py-10 px-4">
      <PageHeader title="Rental Management Overview" description="Manage your properties, units, and turnover workflows." />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {stats.map((stat) => (
          <Link key={stat.label} to={stat.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Turnovers</CardTitle>
          </CardHeader>
          <CardContent>
            {turnovers?.slice(0, 5).map((t) => (
              <div key={t.id} className="flex items-center justify-between py-3 border-b last:border-0">
                <div>
                  <p className="font-medium">Turnover #{t.id}</p>
                  <p className="text-xs text-muted-foreground">Target Ready: {t.targetReadyDate}</p>
                </div>
                <div className="text-sm font-semibold">
                  {t.listingReady === "true" ? "Ready" : "In Progress"}
                </div>
              </div>
            ))}
            {!turnovers?.length && <p className="text-muted-foreground text-sm">No active turnovers.</p>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Maintenance Queue</CardTitle>
          </CardHeader>
          <CardContent>
            {workOrders?.slice(0, 5).map((wo) => (
              <div key={wo.id} className="flex items-center justify-between py-3 border-b last:border-0">
                <div className="max-w-[70%]">
                  <p className="font-medium truncate">{wo.scopeSummary}</p>
                  <p className="text-xs text-muted-foreground">Assigned to: {wo.assignedToEmail || 'Unassigned'}</p>
                </div>
                <span className="text-xs bg-slate-100 px-2 py-1 rounded">WO-{wo.id.slice(-4)}</span>
              </div>
            ))}
            {!workOrders?.length && <p className="text-muted-foreground text-sm">No pending work orders.</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}