import { addNewShifts } from '../../../mock-db/add-new-shifts';
import data from '../../../mock-db/data.json';
import { addWeeks, formatISO } from 'date-fns';

/**
 * Эмулирует создание новых смен для работников через неделю
 * работает раз в день в 00:00
 */
export function createNewDayShift() {
    const nextWeekDate = addWeeks(new Date(), 1);
    nextWeekDate.setHours(0, 0, 0, 0);

    const newShifts = data.workers.map((worker) => {
        const startTime = new Date(nextWeekDate);
        const [startHour, startMinute] = worker.startWorkHour.split(':').map(Number);
        startTime.setHours(startHour, startMinute, 0, 0);

        const endTime = new Date(nextWeekDate);
        const [endHour, endMinute] = worker.endWorkHour.split(':').map(Number);
        endTime.setHours(endHour, endMinute, 0, 0);

        return {
            workerId: worker.id,
            date: formatISO(nextWeekDate, { representation: 'date' }),
            startTime: formatISO(startTime),
            endTime: formatISO(endTime),
        };
    });

    // Добавляем новые смены в существующий список смен
    addNewShifts(newShifts);
}

createNewDayShift();
