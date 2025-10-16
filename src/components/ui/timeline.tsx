import React from "react";

interface TimelineEvent {
  date: string;
  time: string;
  description: string;
}

interface TimelineProps {
  events: TimelineEvent[];
}

export const Timeline: React.FC<TimelineProps> = ({ events }) => {
  return (
    <div className="relative border-l border-neutral-700 ml-4">
      {events.map((event, index) => (
        <div key={index} className="mb-8 ml-6">
          {/* Dot */}
          <div className="absolute w-3 h-3 bg-neutral-400 rounded-full -left-[7px] top-2" />

          {/* Event content */}
          <div>
            <p className="text-sm text-neutral-400">
              {event.date}, {event.time}
            </p>
            <p className="text-white font-medium">{event.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
