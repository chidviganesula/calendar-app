import React, { useState, useEffect } from "react";
import "./Calendar.css";
import events from "../data/events.json";

interface Event {
  title: string;
  date: string;
  time: string;
  duration: string;
}

const Calendar: React.FC = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [calendarDays, setCalendarDays] = useState<(Date | null)[]>([]);

  const generateCalendar = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    let days: (Date | null)[] = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= lastDate; i++) {
      days.push(new Date(year, month, i));
    }

    setCalendarDays(days);
  };

  useEffect(() => {
    generateCalendar(currentDate);
  }, [currentDate]);

  const handlePrev = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNext = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  const getEventsForDate = (date: Date): Event[] => {
    return events.filter((event: Event) => event.date === formatDate(date));
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={handlePrev}>⟵</button>
        <h2>{currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}</h2>
        <button onClick={handleNext}>⟶</button>
      </div>

      <div className="calendar-grid">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="calendar-day-name">{day}</div>
        ))}

        {calendarDays.map((date, idx) => (
          <div
            key={idx}
            className={`calendar-day ${date && formatDate(date) === formatDate(today) ? "today" : ""}`}
          >
            {date && (
              <>
                <div className="date-number">{date.getDate()}</div>
                <div className="events">
                  {getEventsForDate(date).map((event, i) => (
                    <div key={i} className="event-item">{event.title} @ {event.time}</div>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;