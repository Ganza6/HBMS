import { parseISO, addMinutes, compareAsc, format } from 'date-fns';
import { Slot, BusySlot, ScheduleWorkerConfig } from '../types/types';

function getBusyIntervals(busySlots: BusySlot[]): { start: Date; end: Date }[] {
    return busySlots
        .map((slot) => ({
            start: parseISO(slot.startTime),
            end: addMinutes(parseISO(slot.startTime), slot.durationM),
        }))
        .sort((a, b) => compareAsc(a.start, b.start));
}

function getFreeIntervals(start: Date, end: Date, chunkSizeM: number): string[] {
    const intervals: string[] = [];
    let currentStart = start;

    while (compareAsc(addMinutes(currentStart, chunkSizeM), end) <= 0) {
        intervals.push(format(currentStart, "yyyy-MM-dd'T'HH:mm:ss"));
        currentStart = addMinutes(currentStart, chunkSizeM);
    }

    return intervals;
}

function getWorkerFreeSlots(
    workingHours: { start: string; end: string },
    busySlots: BusySlot[],
    chunkSizeM: number
): string[] {
    const startTime = parseISO(workingHours.start);
    const endTime = parseISO(workingHours.end);
    const sortedBusyIntervals = getBusyIntervals(busySlots);

    let lastEnd = startTime;
    const freeSlots: string[] = [];

    for (const { start: busyStart, end: busyEnd } of sortedBusyIntervals) {
        if (compareAsc(lastEnd, busyStart) === -1) {
            freeSlots.push(...getFreeIntervals(lastEnd, busyStart, chunkSizeM));
        }
        lastEnd = compareAsc(lastEnd, busyEnd) === 1 ? lastEnd : busyEnd;
    }

    if (compareAsc(lastEnd, endTime) === -1) {
        freeSlots.push(...getFreeIntervals(lastEnd, endTime, chunkSizeM));
    }

    return freeSlots;
}

function mergeFreeSlots(allFreeSlots: string[]): Slot[] {
    const slotCounts = allFreeSlots.reduce((acc, slot) => {
        acc[slot] = (acc[slot] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    return Object.entries(slotCounts)
        .map(([start, count]) => ({
            start,
            count,
        }))
        .sort((a, b) => compareAsc(parseISO(a.start), parseISO(b.start)));
}

export function getFreeTimeSlots(workers: ScheduleWorkerConfig[], chunkSizeM: number): Slot[] {
    const allFreeSlots = workers.flatMap(({ workingHours, busySlots }) =>
        getWorkerFreeSlots(workingHours, busySlots, chunkSizeM)
    );

    const mergedSlots = mergeFreeSlots(allFreeSlots);

    return mergedSlots;
}
