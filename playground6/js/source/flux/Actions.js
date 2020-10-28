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
  },

  _sortCallback(a: (string|number), b: (string|number), descending: boolean): number {
    let result: number = 0;
    if ((typeof a === 'number') && (typeof b === 'number')) {
      result = a - b;
    } else {
      result = String(a).localeCompare(String(b));
    }
    return descending ? -1 * result : result;
  },

  sort(key: string, descending: boolean) {
    let data = FluxStore.getData();
    data.sort((a, b) => this._sortCallback(a[key], b[key], descending));
    FluxStore.setData(data);
  }

};

export default Actions;
