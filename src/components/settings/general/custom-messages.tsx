import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { GeneralConfig } from "@/types";

export const CustomMessagesSettings: React.FC<{
  formData: GeneralConfig;
  updateFormData: any;
}> = ({ formData, updateFormData }) => {
  const handleMessagesChange = (
    field: "relaxingMessages" | "clockedOutMessages" | "weekendMessages",
    value: string,
  ) => {
    const messages = value.split("\n");
    updateFormData((prev: GeneralConfig) => ({
      ...prev,
      [field]: messages,
    }));
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="relaxing-messages" className="text-base font-medium">
          Before Office Hours
        </Label>
        <Textarea
          id="relaxing-messages"
          placeholder="Good morning! Ready to tackle the day?&#10;Take a moment to plan your priorities..."
          value={(formData.relaxingMessages || []).join("\n")}
          onChange={(e) =>
            handleMessagesChange("relaxingMessages", e.target.value)
          }
          className="min-h-[80px] resize-y text-sm"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="clockedout-messages" className="text-base font-medium">
          After Office Hours
        </Label>
        <Textarea
          id="clockedout-messages"
          placeholder="Great work today! Time to unwind.&#10;Remember to take breaks..."
          value={(formData.clockedOutMessages || []).join("\n")}
          onChange={(e) =>
            handleMessagesChange("clockedOutMessages", e.target.value)
          }
          className="min-h-[80px] resize-y text-sm"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="clockedout-messages" className="text-base font-medium">
          During Weekends
        </Label>
        <Textarea
          id="Weekend-messages"
          placeholder="Its the weekend, you should go away and have fun"
          value={(formData.weekendMessages || []).join("\n")}
          onChange={(e) =>
            handleMessagesChange("weekendMessages", e.target.value)
          }
          className="min-h-[80px] resize-y text-sm"
        />
      </div>
    </div>
  );
};
