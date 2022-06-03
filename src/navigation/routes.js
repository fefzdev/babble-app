import Home from '@/screens/Home';
import Room from '@/screens/Room';
import Settings from '@/screens/Settings';

export default [
  {
    name: 'Accueil',
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
];
