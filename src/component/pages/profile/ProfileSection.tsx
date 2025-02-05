import { FC } from "react";
import { Edit3 } from "lucide-react";
import { TProfileSectionProps } from "@/types";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const ProfileSection: FC<TProfileSectionProps> = ({
  title,
  content,
  onEdit,
  isLoading = false,
}) => {
  return (
    <section className="p-4 border rounded-md w-80 md:w-[355px] lg:w-full mx-auto">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold">{title}</h2>
        <Button variant="ghost" onClick={onEdit}>
          <Edit3 size={16} />
        </Button>
      </div>
      {isLoading ? (
        <Skeleton className="h-8" />
      ) : (
        <p className="text-base">{content}</p>
      )}
    </section>
  );
};

export default ProfileSection;
