import data from './data.json';

export async function getListOfWorkers() {
    return data.workers.map((worker) => ({
        name: worker.name,
        workerType: worker.workerType,
        startWorkHour: worker.startWorkHour,
        endWorkHour: worker.endWorkHour,
        id: worker.id,
        services: data.workerServices
            .filter((ws) => ws.workerId === worker.id)
            .map((ws) => ws.serviceId),
    }));
}
