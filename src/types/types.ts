export interface ScheduleWorkerConfig {
    workerId: string;
    workingHours: WorkingHours;
    busySlots: BusySlot[];
}

export interface Slot {
    start: string;
    count: number;
}

export interface WorkingHours {
    start: string;
    end: string;
}

export interface BusySlot {
    startTime: string;
    durationM: number;
}
