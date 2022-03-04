import { UserRoles } from 'app/constants/Roles';
import FirstLoginModule from 'app/modules/FirstLogin';
import ListenerHomeModule from 'app/modules/ListenerHome';
import TalkerHomeModule from 'app/modules/TalkerHome';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

function Home({ navigation }) {
  const { type } = useSelector(state => state.user);

  if (type === UserRoles.TALKER)
    return <TalkerHomeModule navigation={navigation} />;
  if (type === UserRoles.LISTENER)
    return <ListenerHomeModule navigation={navigation} />;
  return <FirstLoginModule />;
}

export default Home;
