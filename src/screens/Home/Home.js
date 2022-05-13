import { useSelector } from 'react-redux';

import FirstLoginModule from '@/modules/FirstLogin';
import ListenerHomeModule from '@/modules/ListenerHome';
import TalkerHomeModule from '@/modules/TalkerHome';
import { UserRoles } from '@/types/UserRoles.enums';

function Home({ navigation }) {
  const { type } = useSelector(state => state.user);

  if (type === UserRoles.TALKER)
    return <TalkerHomeModule navigation={navigation} />;
  if (type === UserRoles.LISTENER)
    return <ListenerHomeModule navigation={navigation} />;
  return <FirstLoginModule />;
}

export default Home;
