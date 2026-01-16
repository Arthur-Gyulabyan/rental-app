import { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { useGetProperties } from "@/api/rental";
import { PropertyForm } from "@/features/properties/PropertyForm";
import { Plus, Building2, MapPin, User, Mail } from "lucide-react";
import { Property } from "@/lib/validators";

export default function PropertiesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data: properties = [], isLoading } = useGetProperties();

  const columns = [
    {
      header: "Property Name",
      cell: (p: Property) => (
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{p.name}</span>
        </div>
      ),
    },
    {
      header: "Address",
      cell: (p: Property) => (
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          {p.address}
        </div>
      ),
    },
    {
      header: "Manager",
      cell: (p: Property) => (
        <div className="flex flex-col text-sm">
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            {p.managerName}
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Mail className="h-3 w-3" />
            {p.managerEmail}
          </div>
        </div>
      ),
    },
    { header: "Units", accessorKey: "unitsCount" as keyof Property },
    {
      header: "Actions",
      cell: (p: Property) => (
        <Button variant="ghost" size="sm">View Units</Button>
      ),
    },
  ];

  return (
    <div className="container mx-auto py-10 px-4">
      <PageHeader 
        title="Properties" 
        description="Oversee your portfolio of rental buildings."
      >
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Property
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Property</DialogTitle>
            </DialogHeader>
            <PropertyForm onSuccess={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </PageHeader>

      <DataTable columns={columns} data={properties} isLoading={isLoading} />
    </div>
  );
}