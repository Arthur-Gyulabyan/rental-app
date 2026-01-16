import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPropertySchema } from "@/lib/validators";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateProperty } from "@/api/rental";
import { useToast } from "@/hooks/use-toast";

export function PropertyForm({ onSuccess }: { onSuccess?: () => void }) {
  const { toast } = useToast();
  const createProperty = useCreateProperty();

  const form = useForm({
    resolver: zodResolver(createPropertySchema),
    defaultValues: {
      name: "",
      address: "",
      managerName: "",
      managerEmail: "",
      unitsCount: "0",
    },
  });

  async function onSubmit(values: any) {
    try {
      await createProperty.mutateAsync(values);
      toast({ title: "Success", description: "Property created successfully" });
      onSuccess?.();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property Name</FormLabel>
              <FormControl><Input placeholder="Maple Court" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl><Input placeholder="123 Main St" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="managerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Manager Name</FormLabel>
                <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="managerEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Manager Email</FormLabel>
                <FormControl><Input placeholder="pm@rentco.com" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="unitsCount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Units Count</FormLabel>
              <FormControl><Input type="number" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={createProperty.isPending}>
          {createProperty.isPending ? "Creating..." : "Create Property"}
        </Button>
      </form>
    </Form>
  );
}