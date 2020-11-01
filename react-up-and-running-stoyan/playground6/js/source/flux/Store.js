// @flow

import { EventEmitter } from 'fbemitter';
const emitter = new EventEmitter();

import { List } from 'immutable';

let schema;
let data = List([
{
  "mission": "1",
  "shuttle": "Challenger",
  "date": "6"
},
{
  "mission": "2",
  "shuttle": "Enterprise",
  "date": "7"
},
{
  "mission": "3",
  "shuttle": "Atlantis",
  "date": "8"
}
]);

const headers = [ "mission", "shuttle", "date" ];

const Store = {
  getData(): Array<Object> {
    return data;
  },

  setData(newData: Array<Object>, commit: boolean = true) {
    data = newData;
    if (commit === true) {
      localStorage.setItem('data', JSON.stringify(data));
    }
    emitter.emit('change');
  },

  getCount(): number {
    return data.count();
  },

  getSchema(): Array<Object> {
    return schema;
  },

  getHeaders(): Array<Object> {
    return headers;
  },

  getMission(id:string): Object {
    return undefined;  // return data.get(id);
  },

  init(initSchema: Array<Object>) {
    schema = initSchema;

    const storage = 'localStorage' in window ? localStorage.getItem('data') : null;
    if (typeof storage === 'string') {
      data = List(JSON.parse(storage));
    }
  },

  addListener(eventType: string, fx: Function) {
    emitter.addListener(eventType, fx);
  }

};

export default Store;
