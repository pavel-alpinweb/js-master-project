import 'core-js/stable';
import 'regenerator-runtime/runtime';
import {Excel} from '@/components/excel/Excel';

import './scss/index.scss';
import {Header} from '@/components/header/Header';
import {Formula} from '@/components/formula/Formula';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Table} from '@/components/table/Table';
import {createStore} from '@core/createStore';
import {rootReducer} from '@/store/rootReducer';

const store = createStore(rootReducer);

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
});

excel.render();

