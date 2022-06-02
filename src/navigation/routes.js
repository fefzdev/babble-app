import Account from '@/screens/Account';
import CameraScreen from '@/screens/CameraScreen';
import Home from '@/screens/Home';
import Room from '@/screens/Room';
import Settings from '@/screens/Settings';

export default [
  {
    name: 'Home',
    header: true,
    component: Home,
  },
  {
    name: 'Room',
    header: true,
    component: Room,
  },
  {
    name: 'Settings',
    header: false,
    component: Settings,
  },
  {
    name: 'Account',
    header: true,
    component: Account,
  },
  {
    name: 'Camera',
    header: false,
    component: CameraScreen,
  },
];
