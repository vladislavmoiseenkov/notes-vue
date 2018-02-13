
import App from './components/App';
import Add from './components/Add';
import Edit from './components/Edit';
import Item from './components/Item';
import Logout from './components/Logout';
import Delete from './components/Delete';

export default [
    { path: '/', component: App, props: true },
    { path: '/add', component: Add },
    { path: '/edit/:id', component: Edit },
    { path: '/item/:id', component: Item },
    { path: '/logout', component: Logout },
    { path: '/delete/:id', component: Delete },
];