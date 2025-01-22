// hooks/useJams.ts
import {useEffect, useState} from "react";
import {useRefreshStore} from "@/store/refresh.store";
import {Jam} from "@/types/jam.types";
import {jamService} from "@/services/jam.service";
import Jams from "@/components/home/Jams";

interface UseJamsOptions {
    status?: Jams["status"];
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
            // console.log(data)
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
