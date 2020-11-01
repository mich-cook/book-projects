import classification from './classification.js';

// show is to show in datatable
// align is how to align data in datatable

export default [
  {
    "id": "mission",
    "label": "Mission",
    "show": true,
    "sample": "Misson Name",
    "align": "left"
  },
  {
    "id": "shuttle",
    "label": "Shuttle",
    "type": "suggest",
    "options": classification.shuttles,
    "show": true,
    "sample": "Atlantis",
    "align": "left"
  },
  {
    "id": "date",
    "label": "Date",
    "type": "year",
    "show": true,
    "sample": 2013
  },
/*
  {
    "id": "rating",
    "label": "Rating",
    "type": "rating",
    "show": true,
    "sample": 3
  },
*/
  {
    "id": "notes",
    "label": "Notes",
    "show": false,
    "type": "text",
    "sample": "Successful mission. All objectives completed."
  }
];
