import FluxStore from './Store.js';

const Actions = {

  /* unused actions
  create(mission: Object) {
    let data = FluxStore.getData();
    data.unshift(mission);
    FluxStore.setData(data);
  },
  updateMission(missionId: string, mission: Object) {
    let data = FluxStore.getData();
    data[missionId] = mission;
    FluxStore.setData(data);
  },
  updateField(missionId: string, key: string, value: string|number) {
    let data = FluxStore.getData();
    data[missionId][key] = value;
    FluxStore.setData(data);
  },
  */
  delete(offset: number) {
    let data = FluxStore.getData();
    data.splice(offset, 1);
    FluxStore.setData(data);
  }

};

export default Actions;
