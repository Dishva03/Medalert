import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { ChevronRight, ChevronLeft, Plus, AlertCircle } from "lucide-react";
import { format } from "date-fns";

interface Medication {
  id: string;
  name: string;
  dosage: string;
  time: string;
  taken: boolean;
  type: "morning" | "afternoon" | "evening" | "night";
  instructions?: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  daysOfWeek?: string[];
}

interface AddMedicationFormProps {
  onAddMedication: (medication: Medication) => void;
  onCancel: () => void;
}

const AddMedicationForm = ({ onAddMedication, onCancel }: AddMedicationFormProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<Medication>>({
    name: "",
    dosage: "",
    time: "08:00",
    type: "morning",
    instructions: "",
    frequency: "daily",
    startDate: format(new Date(), "yyyy-MM-dd"),
    taken: false,
  });

  const [dosageType, setDosageType] = useState("tablet");
  const [dosageAmount, setDosageAmount] = useState("1");
  const [selectedDays, setSelectedDays] = useState<string[]>(["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTimeChange = (time: string) => {
    let type: "morning" | "afternoon" | "evening" | "night" = "morning";
    const hour = parseInt(time.split(":")[0]);
    
    if (hour >= 5 && hour < 12) {
      type = "morning";
    } else if (hour >= 12 && hour < 17) {
      type = "afternoon";
    } else if (hour >= 17 && hour < 21) {
      type = "evening";
    } else {
      type = "night";
    }
    
    setFormData((prev) => ({ ...prev, time, type }));
  };

  const handleDosageChange = () => {
    const dosage = `${dosageAmount} ${dosageType}${parseInt(dosageAmount) > 1 ? 's' : ''}`;
    setFormData((prev) => ({ ...prev, dosage }));
  };

  const handleDayToggle = (day: string) => {
    setSelectedDays((prev) => {
      if (prev.includes(day)) {
        return prev.filter((d) => d !== day);
      } else {
        return [...prev, day];
      }
    });
  };

  const nextStep = () => {
    if (step === 1 && !formData.name) {
      toast({
        title: "Missing Information",
        description: "Please enter the medication name",
        variant: "destructive",
      });
      return;
    }

    if (step === 2) {
      handleDosageChange();
    }

    if (step < 4) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.dosage) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const newMedication: Medication = {
      id: Date.now().toString(),
      name: formData.name!,
      dosage: formData.dosage!,
      time: formData.time!,
      taken: false,
      type: formData.type!,
      instructions: formData.instructions,
      frequency: formData.frequency!,
      startDate: formData.startDate!,
      endDate: formData.endDate,
      daysOfWeek: formData.frequency === "specific-days" ? selectedDays : undefined,
    };

    onAddMedication(newMedication);
    toast({
      title: "Medication Added",
      description: `${formData.name} has been added to your schedule`,
    });
  };

  const commonMedicines = [
    "Aspirin",
    "Paracetamol",
    "Ibuprofen",
    "Metformin",
    "Lisinopril",
    "Atorvastatin",
    "Amoxicillin",
    "Vitamin D3",
  ];

  const dosageTypes = ["tablet", "capsule", "pill", "ml", "mg", "g", "spray", "drop"];
  const dosageAmounts = ["0.5", "1", "2", "5", "10", "15", "20"];

  return (
    <div className="w-full max-w-3xl mx-auto bg-card rounded-xl shadow-lg border border-border p-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-foreground">Add New Medication</h2>
      
      {/* Progress Indicator */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= i ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
              >
                {i}
              </div>
              {i < 4 && (
                <div className={`w-10 h-1 ${step > i ? 'bg-primary' : 'bg-muted'}`}></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Medication Name */}
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <Label htmlFor="name" className="text-lg font-medium">Medication Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter medication name"
              className="mt-2"
            />
          </div>

          <div>
            <Label className="text-sm text-muted-foreground mb-2 block">Common Medications</Label>
            <div className="flex flex-wrap gap-2">
              {commonMedicines.map((med) => (
                <Button
                  key={med}
                  type="button"
                  variant={formData.name === med ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFormData((prev) => ({ ...prev, name: med }))}
                >
                  {med}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Dosage */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <Label className="text-lg font-medium">Dosage</Label>
            <div className="flex items-center space-x-2 mt-2">
              <Select
                value={dosageAmount}
                onValueChange={setDosageAmount}
              >
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="Amount" />
                </SelectTrigger>
                <SelectContent>
                  {dosageAmounts.map((amount) => (
                    <SelectItem key={amount} value={amount}>
                      {amount}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={dosageType}
                onValueChange={setDosageType}
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  {dosageTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}{
                        parseInt(dosageAmount) > 1 ? 's' : ''
                      }
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="instructions" className="text-lg font-medium">Special Instructions (Optional)</Label>
            <Input
              id="instructions"
              name="instructions"
              value={formData.instructions}
              onChange={handleInputChange}
              placeholder="E.g., Take with food, Take before bed"
              className="mt-2"
            />
          </div>
        </div>
      )}

      {/* Step 3: Schedule */}
      {step === 3 && (
        <div className="space-y-6">
          <div>
            <Label className="text-lg font-medium">Frequency</Label>
            <RadioGroup
              value={formData.frequency}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, frequency: value }))}
              className="mt-2 space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="daily" id="daily" />
                <Label htmlFor="daily">Daily</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="specific-days" id="specific-days" />
                <Label htmlFor="specific-days">Specific Days</Label>
              </div>
            </RadioGroup>
          </div>

          {formData.frequency === "specific-days" && (
            <div className="ml-6 space-y-2">
              <Label className="text-sm text-muted-foreground">Select Days</Label>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: "monday", label: "Mon" },
                  { id: "tuesday", label: "Tue" },
                  { id: "wednesday", label: "Wed" },
                  { id: "thursday", label: "Thu" },
                  { id: "friday", label: "Fri" },
                  { id: "saturday", label: "Sat" },
                  { id: "sunday", label: "Sun" },
                ].map((day) => (
                  <Button
                    key={day.id}
                    type="button"
                    variant={selectedDays.includes(day.id) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleDayToggle(day.id)}
                  >
                    {day.label}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div>
            <Label htmlFor="time" className="text-lg font-medium">Time</Label>
            <Input
              id="time"
              type="time"
              value={formData.time}
              onChange={(e) => handleTimeChange(e.target.value)}
              className="mt-2"
            />
          </div>
        </div>
      )}

      {/* Step 4: Duration */}
      {step === 4 && (
        <div className="space-y-6">
          <div>
            <Label htmlFor="startDate" className="text-lg font-medium">Start Date</Label>
            <Input
              id="startDate"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleInputChange}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="endDate" className="text-lg font-medium">End Date (Optional)</Label>
            <Input
              id="endDate"
              name="endDate"
              type="date"
              value={formData.endDate}
              onChange={handleInputChange}
              className="mt-2"
            />
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium text-foreground">Medication Summary</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {formData.name}, {formData.dosage || `${dosageAmount} ${dosageType}${parseInt(dosageAmount) > 1 ? 's' : ''}`}, 
                  {formData.frequency === "daily" ? "daily" : "on specific days"} at {formData.time}
                  {formData.instructions && `, ${formData.instructions}`}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        {step > 1 ? (
          <Button type="button" variant="outline" onClick={prevStep}>
            <ChevronLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        ) : (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}

        <Button type="button" onClick={nextStep}>
          {step < 4 ? (
            <>
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" /> Add Medication
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default AddMedicationForm;