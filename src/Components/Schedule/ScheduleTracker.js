import React, { useState, useEffect } from 'react';
import { Clock, Bell } from 'lucide-react';

export default function ScheduleTracker() {
  const [currentClass, setCurrentClass] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [nextClass, setNextClass] = useState(null);

  useEffect(() => {
    const updateSchedule = () => {
      try {
        const settings = JSON.parse(localStorage.getItem('nexus_settings') || '{}');
        const schedule = settings.schedule || {};
        
        // Check if schedule is enabled
        if (!schedule.enabled) {
          setCurrentClass(null);
          setNextClass(null);
          return;
        }
        
        const periods = schedule.periods || [];
        
        if (periods.length === 0) {
          setCurrentClass(null);
          return;
        }

        const now = new Date();
        const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
        const currentTime = now.getHours() * 60 + now.getMinutes(); // Minutes since midnight

        // Skip weekends
        if (currentDay === 0 || currentDay === 6) {
          setCurrentClass(null);
          return;
        }

        // Find current class
        let current = null;
        let next = null;

        for (let i = 0; i < periods.length; i++) {
          const period = periods[i];
          if (!period.enabled) continue;

          const [startHour, startMin] = period.startTime.split(':').map(Number);
          const [endHour, endMin] = period.endTime.split(':').map(Number);
          const startMinutes = startHour * 60 + startMin;
          const endMinutes = endHour * 60 + endMin;

          if (currentTime >= startMinutes && currentTime < endMinutes) {
            current = {
              ...period,
              endMinutes,
              minutesLeft: endMinutes - currentTime
            };
          } else if (currentTime < startMinutes && !next) {
            next = {
              ...period,
              startMinutes,
              minutesUntil: startMinutes - currentTime
            };
          }
        }

        setCurrentClass(current);
        setNextClass(next);
        setTimeRemaining(current?.minutesLeft || null);

        // Send notification X minutes before class ends (configurable)
        const notifyMinutes = schedule.notifyBeforeEnd || 5;
        if (current && current.minutesLeft === notifyMinutes) {
          if (window.nexusNotifications) {
            window.nexusNotifications.show({
              type: 'info',
              title: '🔔 Class Ending Soon',
              body: `${current.name} ends in ${notifyMinutes} minutes - start packing up!`
            });
          }
        }

      } catch (err) {
        console.error('Schedule update failed:', err);
      }
    };

    updateSchedule();
    const interval = setInterval(updateSchedule, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  if (!currentClass && !nextClass) {
    return null;
  }

  return (
    <div className="flex items-center gap-3 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
      {currentClass ? (
        <>
          <Clock className="w-4 h-4 text-cyan-400" />
          <div className="flex flex-col">
            <span className="text-white text-sm font-medium">{currentClass.name}</span>
            <span className="text-white/60 text-xs">
              {timeRemaining} min left • Ends {currentClass.endTime}
            </span>
          </div>
        </>
      ) : nextClass ? (
        <>
          <Bell className="w-4 h-4 text-yellow-400" />
          <div className="flex flex-col">
            <span className="text-white text-sm font-medium">Next: {nextClass.name}</span>
            <span className="text-white/60 text-xs">
              Starts in {nextClass.minutesUntil} min ({nextClass.startTime})
            </span>
          </div>
        </>
      ) : null}
    </div>
  );
}
