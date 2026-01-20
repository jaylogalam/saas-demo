import { Construction } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ProjectsPage = () => {
  return (
    <>
      <p className="text-muted-foreground mb-8">
        Manage all your projects in one place.
      </p>

      <Card className="border-dashed">
        <CardContent className="py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Construction className="text-primary" size={32} />
          </div>
          <h2 className="text-xl font-semibold mb-2">
            Projects Module Under Construction
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Soon you'll be able to create, track, and collaborate on projects
            with your team.
          </p>
        </CardContent>
      </Card>
    </>
  );
};

export default ProjectsPage;
