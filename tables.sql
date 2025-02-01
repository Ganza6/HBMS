-- Таблица Workers хранит информацию о работниках, включая их тип и рабочие часы.
CREATE TABLE Workers (
    id VARCHAR(255) PRIMARY KEY, -- Уникальный идентификатор работника
    name VARCHAR(255) NOT NULL, -- Имя работника
    workerType ENUM('masseur') NOT NULL, -- Тип работника (например, массажист)
    startWorkHour TIME NOT NULL, -- Время начала рабочего дня
    endWorkHour TIME NOT NULL -- Время окончания рабочего дня
);

-- Таблица Services хранит информацию об услугах, включая их идентификатор и продолжительность.
CREATE TABLE Services (
    id VARCHAR(255) PRIMARY KEY, -- Уникальный идентификатор услуги
    alias VARCHAR(255) NOT NULL, -- Название услуги
    timeSpendM INT NOT NULL -- Время, необходимое для выполнения услуги (в минутах)
);

-- Таблица WorkerServices связывает работников с услугами, которые они предоставляют.
CREATE TABLE WorkerServices (
    workerId VARCHAR(255), -- Идентификатор работника
    serviceId VARCHAR(255), -- Идентификатор услуги
    FOREIGN KEY (workerId) REFERENCES Workers(id),
    FOREIGN KEY (serviceId) REFERENCES Services(id),
    PRIMARY KEY (workerId, serviceId)
);

-- Таблица Schedules хранит расписание для каждого работника на определенный день.
CREATE TABLE Schedules (
    id SERIAL PRIMARY KEY, -- Уникальный идентификатор расписания
    workerId VARCHAR(255), -- Идентификатор работника
    date DATE NOT NULL, -- Дата расписания
    startTime TIME NOT NULL, -- Время начала рабочего дня
    endTime TIME NOT NULL, -- Время окончания рабочего дня
    FOREIGN KEY (workerId) REFERENCES Workers(id)
);

-- Таблица BusySlots хранит занятые слоты в расписании, включая время начала и продолжительность.
CREATE TABLE BusySlots (
    id SERIAL PRIMARY KEY, -- Уникальный идентификатор занятого слота
    scheduleId INT, -- Идентификатор расписания
    startTime TIME NOT NULL, -- Время начала занятого слота
    durationM INT NOT NULL, -- Продолжительность занятого слота (в минутах)
    FOREIGN KEY (scheduleId) REFERENCES Schedules(id)
); 