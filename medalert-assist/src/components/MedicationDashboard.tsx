import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Clock, Check, AlertCircle, Pill, X, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { useNotification } from "@/contexts/NotificationContext";
import { useSpeech } from "@/contexts/SpeechContext";
import AddMedicationForm from "./AddMedicationForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import MedicationService, { Medication as MedicationData } from "@/services/medication.service";
import MedicationStatusService, { MedicationStatusResponse } from "@/services/medicationStatus.service";
import { useAuth } from "@/contexts/AuthContext";

interface Medication {
  id: string;
  name: string;
  dosage: string;
  time: string;
  taken: boolean;
  type: "morning" | "afternoon" | "evening" | "night";
  instructions?: string;
  notes?: string;
  frequency?: string;
  startDate?: string;
  endDate?: string;
  daysOfWeek?: string[];
}

const MedicationDashboard = () => {
  const { toast } = useToast();
  const { speak } = useSpeech();
  const { isAuthenticated } = useAuth();
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch medications and their status from backend or local storage
  useEffect(() => {
    const fetchMedications = async () => {
      if (!isAuthenticated) {
        // If not authenticated, load from localStorage or use demo data
        const savedMedications = localStorage.getItem('medalert-medications');
        if (savedMedications) {
          try {
            const parsedMedications = JSON.parse(savedMedications);
            setMedications(parsedMedications);
          } catch (error) {
            console.error('Error parsing saved medications:', error);
            loadDemoMedications();
          }
        } else {
          loadDemoMedications();
        }
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        // Fetch medications with their current status
        const statusData = await MedicationStatusService.getMedicationStatus();
        
        // Transform backend data to component format
        const formattedData = statusData.map(item => ({
          id: item.medication._id,
          name: item.medication.name,
          dosage: item.medication.dosage,
          time: item.medication.time,
          frequency: item.medication.frequency,
          notes: item.medication.notes,
          taken: item.status.taken, // Use actual status from database
          type: getTimeOfDay(item.medication.time)
        }));
        
        setMedications(formattedData);
        setError(null);
      } catch (err: any) {
        console.error('Failed to fetch medications:', err);
        setError('Failed to load medications. Please try again.');
        
        // Fallback: try to get medications without status
        try {
          const data = await MedicationService.getMedications();
          const formattedData = data.map(med => ({
            id: med._id || '',
            name: med.name,
            dosage: med.dosage,
            time: med.time,
            frequency: med.frequency,
            notes: med.notes,
            taken: false, // Default to not taken
            type: getTimeOfDay(med.time)
          }));
          setMedications(formattedData);
        } catch (fallbackErr) {
          console.error('Fallback fetch failed:', fallbackErr);
          loadDemoMedications();
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchMedications();
  }, [isAuthenticated]);
  
  // Helper function to determine time of day
  const getTimeOfDay = (timeString: string): "morning" | "afternoon" | "evening" | "night" => {
    const hour = parseInt(timeString.split(':')[0], 10);
    if (hour >= 5 && hour < 12) return "morning";
    if (hour >= 12 && hour < 17) return "afternoon";
    if (hour >= 17 && hour < 21) return "evening";
    return "night";
  };

  const { addNotification } = useNotification();

  // Function to load demo medications
  const loadDemoMedications = () => {
    const demoMeds = [ 
      {
        id: "1",
        name: "Lisinopril",
        dosage: "10mg",
        time: "08:00",
        taken: false,
        type: "morning" as const,
        notes: "Take with food",
        frequency: "Daily"
      }, 
      {
        id: "2",
        name: "Metformin",
        dosage: "500mg",
        time: "12:00",
        taken: false,
        type: "afternoon" as const,
        notes: "Take with lunch",
        frequency: "Daily"
      },
      {
        id: "3",
        name: "Vitamin D3",
        dosage: "2000 IU",
        time: "18:00",
        taken: false,
        type: "evening" as const,
        frequency: "Daily"
      }, 
      {
        id: "4",
        name: "Melatonin",
        dosage: "3mg",
        time: "22:00",
        taken: false,
        type: "night" as const,
        notes: "30 minutes before bed",
        frequency: "Daily"
      } 
    ];
    setMedications(demoMeds);
    // Save to localStorage for persistence
    if (!isAuthenticated) {
      localStorage.setItem('medalert-medications', JSON.stringify(demoMeds));
    }
  };

  // Save medications to localStorage when not authenticated
  useEffect(() => {
    if (!isAuthenticated && medications.length > 0) {
      localStorage.setItem('medalert-medications', JSON.stringify(medications));
    }
  }, [medications, isAuthenticated]);

  const toggleMedication = async (id: string) => {
    try {
      // Find the medication to toggle
      const medToToggle = medications.find(med => med.id === id);
      if (!medToToggle) return;
      
      // Update local state immediately for responsive UI
      setMedications(meds => 
        meds.map(med => {
          if (med.id === id) {
            const updated = { ...med, taken: !med.taken };
            return updated;
          }
          return med;
        })
      );
      
      // If authenticated, update in backend
      if (isAuthenticated) {
        // In a real app, we would update the status in the backend
        // await ReminderService.updateReminderStatus(id, newStatus);
      }
      
      // Show toast and notification
      const updated = { ...medToToggle, taken: !medToToggle.taken };
      toast({
        title: updated.taken ? "✓ Medication Taken" : "⏸ Medication Reset",
        description: `${updated.name} ${updated.taken ? 'marked as taken' : 'reset to pending'}`,
      });
      
      if (updated.taken) {
        addNotification(
          "Medication Taken",
          `${updated.name} has been marked as taken`,
          "medicine-taken"
        );
        
        // Speak confirmation
        speak(`${updated.name} marked as taken`);
      }
    } catch (err) {
      console.error('Failed to toggle medication status:', err);
      toast({
        title: "Error",
        description: "Failed to update medication status",
        variant: "destructive"
      });
      
      // Revert the local state change
      setMedications(meds => 
        meds.map(med => {
          if (med.id === id) {
            const reverted = { ...med, taken: !med.taken };
            return reverted;
          }
          return med;
        })
      );
    }
  };

  const deleteMedication = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // Prevent triggering the card click event
    
    try {
      // Update local state immediately for responsive UI
      const medToDelete = medications.find(med => med.id === id);
      setMedications(meds => meds.filter(med => med.id !== id));
      
      // If authenticated, delete from backend
      if (isAuthenticated) {
        await MedicationService.deleteMedication(id);
      }
      
      toast({
        title: "Medication Deleted",
        description: `${medToDelete?.name || 'Medication'} has been removed from your schedule`,
      });
      
      // Speak confirmation
      if (medToDelete) {
        speak(`${medToDelete.name} removed from your schedule`);
      }
    } catch (err) {
      console.error('Failed to delete medication:', err);
      toast({
        title: "Error",
        description: "Failed to delete medication",
        variant: "destructive"
      });
      
      // Refetch medications to restore state
      if (isAuthenticated) {
        try {
          const data = await MedicationService.getMedications();
          const formattedData = data.map(med => ({
            id: med._id || '',
            name: med.name,
            dosage: med.dosage,
            time: med.time,
            frequency: med.frequency,
            notes: med.notes,
            taken: false,
            type: getTimeOfDay(med.time)
          }));
          setMedications(formattedData);
        } catch (fetchErr) {
          console.error('Failed to refetch medications:', fetchErr);
        }
      }
    }
  };

  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddMedication = () => {
    setShowAddForm(true);
  };

  const handleAddMedicationSubmit = async (medication: Medication) => {
    try {
      if (isAuthenticated) {
        // Save to backend
        const newMed = await MedicationService.createMedication({
          name: medication.name,
          dosage: medication.dosage,
          time: medication.time,
          frequency: medication.frequency || 'Daily',
          notes: medication.notes
        });
        
        // Add to local state with backend ID
        const formattedMed = {
          id: newMed._id || '',
          name: newMed.name,
          dosage: newMed.dosage,
          time: newMed.time,
          frequency: newMed.frequency,
          notes: newMed.notes,
          taken: false,
          type: getTimeOfDay(newMed.time)
        };
        setMedications(prev => [...prev, formattedMed]);
      } else {
        // For non-authenticated users, just add to local state
        setMedications(prev => [...prev, medication]);
      }
      
      setShowAddForm(false);
      toast({
        title: "Medication Added",
        description: `${medication.name} has been added to your schedule`,
      });
    } catch (error) {
      console.error('Failed to add medication:', error);
      toast({
        title: "Error",
        description: "Failed to add medication. Please try again.",
        variant: "destructive"
      });
    }
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
          
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-destructive/10 text-destructive rounded-lg">
              {error}
            </div>
          )}
          
          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-lg">Loading medications...</span>
            </div>
          ) : (
            <>
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
            </>
          )}
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
                  
                  {medication.notes && (
                    <div className="flex items-start space-x-2 text-sm">
                      <AlertCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{medication.notes}</span>
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
          <DialogContent className="sm:max-w-[800px] p-0" aria-describedby="add-medication-description">
            <DialogHeader className="sr-only">
              <DialogTitle>Add New Medication</DialogTitle>
              <DialogDescription id="add-medication-description">
                Add a new medication to your daily schedule with dosage, timing, and frequency information.
              </DialogDescription>
            </DialogHeader>
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