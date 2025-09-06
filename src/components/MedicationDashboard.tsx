import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Clock, Check, AlertCircle, Pill, X } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import AddMedicationForm from "./AddMedicationForm";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";

interface Medication {
  id: string;
  name: string;
  dosage: string;
  time: string;
  taken: boolean;
  type: "morning" | "afternoon" | "evening" | "night";
  instructions?: string;
  frequency?: string;
  startDate?: string;
  endDate?: string;
  daysOfWeek?: string[];
}

const MedicationDashboard = () => {
  const { toast } = useToast();
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: "1",
      name: "Lisinopril",
      dosage: "10mg",
      time: "08:00",
      taken: true,
      type: "morning",
      instructions: "Take with food"
    },
    {
      id: "2",
      name: "Metformin",
      dosage: "500mg",
      time: "12:00",
      taken: false,
      type: "afternoon",
      instructions: "Take with lunch"
    },
    {
      id: "3",
      name: "Vitamin D3",
      dosage: "2000 IU",
      time: "18:00",
      taken: false,
      type: "evening"
    },
    {
      id: "4",
      name: "Melatonin",
      dosage: "3mg",
      time: "22:00",
      taken: false,
      type: "night",
      instructions: "30 minutes before bed"
    }
  ]);

  const toggleMedication = (id: string) => {
    setMedications(meds => 
      meds.map(med => {
        if (med.id === id) {
          const updated = { ...med, taken: !med.taken };
          toast({
            title: updated.taken ? "✓ Medication Taken" : "⏸ Medication Reset",
            description: `${updated.name} ${updated.taken ? 'marked as taken' : 'reset to pending'}`,
          });
          return updated;
        }
        return med;
      })
    );
  };

  const deleteMedication = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // Prevent triggering the card click event
    setMedications(meds => meds.filter(med => med.id !== id));
    toast({
      title: "Medication Deleted",
      description: "The medication has been removed from your schedule",
    });
  };

  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddMedication = () => {
    setShowAddForm(true);
  };

  const handleAddMedicationSubmit = (medication: Medication) => {
    setMedications(prev => [...prev, medication]);
    setShowAddForm(false);
  };

  const handleCancelAddMedication = () => {
    setShowAddForm(false);
  };

  const today = new Date();
  const takenCount = medications.filter(med => med.taken).length;
  const totalCount = medications.length;
  const completionRate = Math.round((takenCount / totalCount) * 100);

  return (
    <section id="dashboard" className="py-20 bg-gradient-to-b from-background to-accent/10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Today's Schedule
          </h2>
          <p className="text-xl text-muted-foreground mb-6">
            {format(today, "EEEE, MMMM do, yyyy")}
          </p>
          
          {/* Progress Summary */}
          <div className="inline-flex items-center space-x-4 bg-card rounded-2xl p-6 shadow-lg">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{takenCount}</div>
              <div className="text-sm text-muted-foreground">Taken</div>
            </div>
            <div className="w-px h-12 bg-border"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">{totalCount - takenCount}</div>
              <div className="text-sm text-muted-foreground">Remaining</div>
            </div>
            <div className="w-px h-12 bg-border"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{completionRate}%</div>
              <div className="text-sm text-muted-foreground">Complete</div>
            </div>
          </div>
        </div>

        {/* Medications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {medications.map((medication) => (
            <Card 
              key={medication.id} 
              className={`transition-all duration-300 hover:shadow-lg cursor-pointer border-2 ${
                medication.taken 
                  ? 'bg-secondary/5 border-secondary/30' 
                  : 'bg-card border-border hover:border-primary/30'
              }`}
              onClick={() => toggleMedication(medication.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between relative">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      medication.taken ? 'bg-secondary text-white' : 'bg-primary/10 text-primary'
                    }`}>
                      {medication.taken ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <Pill className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{medication.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{medication.dosage}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={medication.taken ? "secondary" : "outline"}>
                      {medication.taken ? "Taken" : "Pending"}
                    </Badge>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 rounded-full hover:bg-destructive/10 hover:text-destructive" 
                      onClick={(e) => deleteMedication(e, medication.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{medication.time}</span>
                    <span className="text-muted-foreground capitalize">({medication.type})</span>
                  </div>
                  
                  {medication.instructions && (
                    <div className="flex items-start space-x-2 text-sm">
                      <AlertCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{medication.instructions}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add Medication Button */}
        <div className="text-center">
          <Button 
            size="lg" 
            onClick={handleAddMedication}
            className="bg-gradient-to-r from-primary to-secondary hover:shadow-hover transition-all duration-300"
          >
            <Plus className="mr-2 h-5 w-5" />
            Add New Medication
          </Button>
        </div>

        {/* Add Medication Dialog */}
        <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
          <DialogContent className="sm:max-w-[800px] p-0">
            <AddMedicationForm 
              onAddMedication={handleAddMedicationSubmit} 
              onCancel={handleCancelAddMedication} 
            />
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default MedicationDashboard;