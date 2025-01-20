// hooks/useEvents.ts
import { useState, useEffect } from "react";
import { Event } from "@/types/event.types";
import { eventService } from "@/services/event.service";

interface UseEventsOptions {
  status?: Event["status"];
  hostId?: number;
}

export const useEvents = (options: UseEventsOptions = {}) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      setError(null);
      let data: Event[];

      /*
      if (options.status) {
        data = await eventService.getEventsByStatus(options.status);
      } else if (options.hostId) {
        data = await eventService.getEventsByHost(options.hostId);
      } else {
        */
      data = await eventService.getAllEvents();
      console.log(JSON.stringify(data));
      /*
      }

        */
      setEvents(data);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to fetch events"),
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [options.status, options.hostId]);

  return {
    events,
    isLoading,
    error,
    refetch: fetchEvents,
  };
};
