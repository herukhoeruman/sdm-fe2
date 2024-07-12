import { ScrollArea } from "@/components/ui/scroll-area";
import { FormCreatePegawai } from "../_components/form/form-create-pegawai";

const CreatePage = () => {
  return (
    <ScrollArea className="h-full">
      <div className="p-6 space-y-6">
        <p className="text-2xl font-medium">Create Pegawai</p>
        <FormCreatePegawai initialData={null} />
      </div>
    </ScrollArea>
  );
};

export default CreatePage;
