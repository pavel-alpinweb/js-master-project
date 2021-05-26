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
import {debounce, storage} from '@core/utils';
import {initialState} from '@/store/initialState';

const store = createStore(rootReducer, initialState);

const stateListener = debounce(state => {
  storage('excel-state', state);
}, 300);

store.subscribe(stateListener);

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
});

excel.render();

