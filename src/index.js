import 'core-js/stable';
import 'regenerator-runtime/runtime';
import {Excel} from '@/components/excel/Excel';

import './scss/index.scss';

console.log('Working!');

const excel = new Excel('#app', {
  components: [],
});
console.log('Excel', excel);
