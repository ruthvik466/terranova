import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Calendar } from './ui/calendar';
import { ArrowLeft, Clock, Trash2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface WasteScheduleProps {
  onBack: () => void;
}

interface Schedule {
  day: string;
  time: string;
  type: string;
}

export function WasteSchedule({ onBack }: WasteScheduleProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('terranova_schedule');
    if (saved) {
      setSchedules(JSON.parse(saved));
    } else {
      const defaultSchedule = [
        { day: 'Monday', time: '07:00 AM', type: 'General Waste' },
        { day: 'Wednesday', time: '07:00 AM', type: 'Recyclables' },
        { day: 'Friday', time: '07:00 AM', type: 'Organic Waste' },
      ];
      setSchedules(defaultSchedule);
      localStorage.setItem('terranova_schedule', JSON.stringify(defaultSchedule));
    }
  }, []);

  const updateSchedule = (index: number, field: string, value: string) => {
    const updated = [...schedules];
    updated[index] = { ...updated[index], [field]: value };
    setSchedules(updated);
    localStorage.setItem('terranova_schedule', JSON.stringify(updated));
  };

  const addSchedule = () => {
    const newSchedule = { day: 'Monday', time: '07:00 AM', type: 'General Waste' };
    const updated = [...schedules, newSchedule];
    setSchedules(updated);
    localStorage.setItem('terranova_schedule', JSON.stringify(updated));
  };

  const removeSchedule = (index: number) => {
    const updated = schedules.filter((_, i) => i !== index);
    setSchedules(updated);
    localStorage.setItem('terranova_schedule', JSON.stringify(updated));
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const times = Array.from({ length: 24 }, (_, i) => {
    const hour = i % 12 || 12;
    const period = i < 12 ? 'AM' : 'PM';
    return `${hour.toString().padStart(2, '0')}:00 ${period}`;
  });
  const wasteTypes = ['General Waste', 'Recyclables', 'Organic Waste', 'E-Waste', 'Hazardous'];

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="mb-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2>Waste Collection Schedule</h2>
          <p className="text-muted-foreground">Manage your pickup times</p>
        </div>
        <Button
          variant={editMode ? 'default' : 'outline'}
          onClick={() => setEditMode(!editMode)}
        >
          {editMode ? 'Done' : 'Edit'}
        </Button>
      </div>

      {/* Calendar */}
      <Card className="mb-6">
        <CardContent className="pt-6 flex justify-center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </CardContent>
      </Card>

      {/* Schedule List */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Weekly Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {schedules.map((schedule, index) => (
              <div
                key={index}
                className="p-4 border border-border rounded-lg"
              >
                {editMode ? (
                  <div className="space-y-3">
                    <div>
                      <label className="block mb-2" style={{ fontSize: '0.875rem' }}>Day</label>
                      <Select
                        value={schedule.day}
                        onValueChange={(value) => updateSchedule(index, 'day', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {days.map((day) => (
                            <SelectItem key={day} value={day}>{day}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block mb-2" style={{ fontSize: '0.875rem' }}>Time</label>
                      <Select
                        value={schedule.time}
                        onValueChange={(value) => updateSchedule(index, 'time', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {times.map((time) => (
                            <SelectItem key={time} value={time}>{time}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block mb-2" style={{ fontSize: '0.875rem' }}>Waste Type</label>
                      <Select
                        value={schedule.type}
                        onValueChange={(value) => updateSchedule(index, 'type', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {wasteTypes.map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeSchedule(index)}
                      className="w-full"
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Trash2 className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p style={{ fontWeight: 'bold' }}>{schedule.day}</p>
                        <p className="text-muted-foreground" style={{ fontSize: '0.875rem' }}>
                          {schedule.type}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{schedule.time}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {editMode && (
            <Button onClick={addSchedule} variant="outline" className="w-full mt-4">
              Add New Schedule
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Reminders */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Collections</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {schedules.slice(0, 3).map((schedule, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <div>
                  <p style={{ fontSize: '0.875rem' }}>
                    {schedule.day} at {schedule.time}
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: '0.75rem' }}>
                    {schedule.type}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
