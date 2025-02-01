import { getListOfWorkers } from '../../mock-db/get-workers';
import { getWorkersScheduleByDate } from '../../mock-db/get-workers-schedule';

export async function getFittingWorkers(serviceId: string, workerId?: string): Promise<string[]> {
    const fitWorkers = workerId
        ? await getWorkerById(workerId)
        : await getWorkersByServiceId(serviceId);

    return fitWorkers.map((fitWrk) => fitWrk.id);
}

export async function getWorkersScheduleByDay(date: string, workerIds: string[]) {
    return (await getWorkersScheduleByDate(date)).filter((daySchedule) => {
        return workerIds.includes(daySchedule.workerId);
    });
}

async function getWorkerById(employerId: string) {
    return (await getListOfWorkers()).filter((emp) => emp.id === employerId);
}

async function getWorkersByServiceId(serviceId: string) {
    return (await getListOfWorkers()).filter((wrk) =>
        wrk.services.some((workerServiceId) => workerServiceId === serviceId),
    );
}
