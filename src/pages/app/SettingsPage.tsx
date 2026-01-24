import { Page } from "@/components/ui/page";
import { Construction } from "lucide-react";

const SettingsPage = () => {
  return (
    <Page>
      <div className="text-center px-6 py-16 max-w-md">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-8">
          <Construction className="text-primary" size={32} />
        </div>

        <h1 className="text-3xl font-bold mb-4">Currently Being Worked On</h1>

        <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
          The settings page is under construction. We're working hard to bring
          you something amazing. Check back soon!
        </p>
      </div>
    </Page>
  );
};

export default SettingsPage;
