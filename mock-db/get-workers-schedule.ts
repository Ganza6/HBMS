import data from './data.json';

export async function getWorkersScheduleByDate(date: string) {
    const schedulesForDate = data.shifts.filter((shift) => shift.date === date);
    return schedulesForDate.map((schedule) => ({
        workerId: schedule.workerId,
        workingHours: {
            start: schedule.startTime,
            end: schedule.endTime,
        },
        busySlots: data.busySlots
            .filter((slot) => slot.scheduleId === schedule.id)
            .map((slot) => ({
                startTime: slot.startTime,
                durationM: slot.durationM,
            })),
    }));
}
