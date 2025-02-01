import { getFittingWorkers, getWorkersScheduleByDay } from './functions/workers-helpers';
import { getFreeTimeSlots } from './functions/get-free-timeslot';
import { getServiceSpendTime } from './functions/services-helpers';
import { Slot } from './types/types';

export async function getAvailableTimeSlots(options: {
    date: string;
    serviceId: string;
    workerId?: string;
}): Promise<Slot[]> {
    const { date, serviceId, workerId } = options;

    const fittingEmployerIds = await getFittingWorkers(serviceId, workerId);
    const needTimeM = await getServiceSpendTime(serviceId);
    const fittingWorkersSchedule = await getWorkersScheduleByDay(date, fittingEmployerIds);

    return getFreeTimeSlots(fittingWorkersSchedule, needTimeM);
}

async function main() {
    console.log(
        await getAvailableTimeSlots({
            date: '2025-05-05T00:00:00',
            serviceId: 'service-massage-2',
            workerId: 'worker-id-1',
        })
    );
}

main();
