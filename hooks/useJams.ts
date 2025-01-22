// hooks/useJams.ts
import { useState, useEffect } from "react";
import { Event } from "@/types/event.types";
import { eventService } from "@/services/event.service";
import { useRefreshStore } from "@/store/refresh.store";
import JamsBack from "@/components/home/JamsBack";
import {Jam, JamDTO} from "@/types/jam.types";
import {jamService} from "@/services/jam.service";

interface UseJamsOptions {
    status?: JamsBack["status"];
    hostId?: number;
}

export const useJams = (options: UseJamsOptions = {}) => {
    const [jams, setJams] = useState<Jam[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const refreshTrigger = useRefreshStore((state) => state.refreshTrigger);

    const fetchJams = async () => {
        try {
            setIsLoading(true);
            const data: Jam[] = await jamService.getRunningJams();
            setJams(data);
        } catch (err) {
            console.error("Error fetching jams:", err);
            setError(err instanceof Error ? err : new Error("Failed to fetch jams"));
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        fetchJams();
    }, [options.status, options.hostId, refreshTrigger]);

    return {
        jams,
        isLoading,
        error,
        refetch: fetchJams,
    };
};
