import 'core-js/stable';
import 'regenerator-runtime/runtime';
import {Excel} from '@/components/excel/Excel';

import './scss/index.scss';
import {Header} from '@/components/header/Header';
import {Formula} from '@/components/formula/Formula';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Table} from '@/components/table/Table';

console.log('Working!');

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
});

excel.render();

