import { getAvailableTimeSlots } from '../src/main';

describe('getAvailableTimeSlots', () => {
    test('получение слотов для массажа ног', async () => {
        const slots = await getAvailableTimeSlots({
            date: '2025-05-05T00:00:00',
            serviceId: 'service-massage-1', // Массаж ног
        });
        expect(slots).toEqual([
            { start: '2025-05-05T10:00:00', count: 1 },
            { start: '2025-05-05T10:30:00', count: 1 },
            { start: '2025-05-05T11:00:00', count: 1 },
            { start: '2025-05-05T11:30:00', count: 1 },
            { start: '2025-05-05T12:00:00', count: 2 },
            { start: '2025-05-05T12:30:00', count: 2 },
            { start: '2025-05-05T13:00:00', count: 2 },
            { start: '2025-05-05T13:30:00', count: 2 },
            { start: '2025-05-05T14:00:00', count: 1 },
            { start: '2025-05-05T14:30:00', count: 1 },
            { start: '2025-05-05T15:00:00', count: 1 },
            { start: '2025-05-05T15:30:00', count: 1 },
            { start: '2025-05-05T16:00:00', count: 2 },
            { start: '2025-05-05T16:30:00', count: 2 },
            { start: '2025-05-05T17:00:00', count: 2 },
            { start: '2025-05-05T17:30:00', count: 2 },
        ]);
    });

    test('получение слотов на дату, смен для которой ещё нет', async () => {
        const slots = await getAvailableTimeSlots({
            date: '2100-01-01T00:00:00',
            serviceId: 'service-massage-1',
        });
        expect(slots).toEqual([]);
    });

    test('получение слотов на тренировку', async () => {
        const slots = await getAvailableTimeSlots({
            date: '2025-05-05T00:00:00',
            serviceId: 'service-fitness-1',
        });
        expect(slots).toEqual([
            { start: '2025-05-05T10:00:00', count: 1 },
            { start: '2025-05-05T10:50:00', count: 1 },
            { start: '2025-05-05T11:40:00', count: 1 },
            { start: '2025-05-05T12:30:00', count: 1 },
            { start: '2025-05-05T13:20:00', count: 1 },
            { start: '2025-05-05T14:10:00', count: 1 },
            { start: '2025-05-05T15:00:00', count: 1 },
            { start: '2025-05-05T15:50:00', count: 1 },
            { start: '2025-05-05T16:40:00', count: 1 },
        ]);
    });

    test('получение слотов на тренировку у тренера на пол ставки', async () => {
        const slots = await getAvailableTimeSlots({
            date: '2025-05-05T00:00:00',
            serviceId: 'service-fitness-2',
        });
        expect(slots).toEqual([
            { start: '2025-05-05T10:00:00', count: 1 },
            { start: '2025-05-05T11:40:00', count: 1 },
        ]);
    });

    test('получение слотов на массаж у конкретного массажиста', async () => {
        const slots = await getAvailableTimeSlots({
            date: '2025-05-05T00:00:00',
            serviceId: 'service-massage-2',
            workerId: 'worker-id-1',
        });
        expect(slots).toEqual([
            { start: '2025-05-05T11:00:00', count: 1 },
            { start: '2025-05-05T12:00:00', count: 1 },
            { start: '2025-05-05T13:00:00', count: 1 },
            { start: '2025-05-05T16:00:00', count: 1 },
            { start: '2025-05-05T17:00:00', count: 1 },
        ]);
    });
});
