import { getListOfServiceTypes } from '../../mock-db/get-service-types';

export async function getServiceSpendTime(serviceId: string): Promise<number> {
    const service = (await getListOfServiceTypes()).find((s) => s.id === serviceId);
    return service?.timeSpendM ?? 0;
}
