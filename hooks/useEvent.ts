// hooks/useEvents.ts
import { useState, useEffect } from "react";
import { Event } from "@/types/event.types";
import { eventService } from "@/services/event.service";
import { useRefreshStore } from "@/store/refresh.store";

interface UseEventsOptions {
  status?: Event["status"];
  hostId?: number;
}

export const useEvents = (options: UseEventsOptions = {}) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const refreshTrigger = useRefreshStore((state) => state.refreshTrigger);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      setError(null);
      let data: Event[] = await eventService.getAllEvents();
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
  }, [options.status, options.hostId, refreshTrigger]);

  return {
    events,
    isLoading,
    error,
    refetch: fetchEvents,
  };
};
