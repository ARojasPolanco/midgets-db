import Racer from "./racer.model.js";


export class RacerService {

  async findAllRacer() {
    return await Racer.findAll({
      where: {
        status: true,
      }
    });
  }

  async createRacer(data) {
    return await Racer.create(data);
  }

  async findOneRacer(id, racerId) {
    return await Racer.findOne({
      where: {
        status: true,
        id: racerId || id
      },
    });
  }

  async updateRacer(racer, data) {
    return await racer.update(data);
  }

  async deleteRace(racer) {
    return await racer.update({
      status: false,
    });
  }
}