import Account from 'app/pages/Account/Account';
import Home from 'app/pages/Home';
import Room from 'app/pages/Room';
import Settings from 'app/pages/Settings/Settings';
import Test from 'app/pages/Test';
import Test2 from 'app/pages/Test2/Test2';

export default [
  {
    name: 'Home',
    header: true,
    component: Home,
  },
  {
    name: 'Test',
    header: true,
    component: Test,
  },
  {
    name: 'Room',
    header: true,
    component: Room,
  },
  {
    name: 'Test2',
    header: true,
    component: Test2,
  },
  {
    name: 'Settings',
    header: true,
    component: Settings,
  },
  {
    name: 'Account',
    header: true,
    component: Account,
  },
];
