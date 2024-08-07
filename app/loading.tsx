import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <Loader2 className="w-16 h-16 animate-spin text-blue-800" />
    </div>
  );
};

export default Loading;
