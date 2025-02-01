import data from "./data.json";

export async function getListOfServiceTypes() {
  return data.services.map((service) => ({
    alias: service.alias,
    id: service.id,
    timeSpendM: service.timeSpendM,
  }));
}
