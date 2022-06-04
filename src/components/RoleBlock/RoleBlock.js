import { useSelector } from 'react-redux';

import BabbleInfoBox from '../BabbleInfoBox';

function Role() {
  const currentUserType = useSelector(state => state.user.type);

  return (
    <BabbleInfoBox
      icon="medal"
      content={`Vous êtes connecté en tant que ${currentUserType}`}
    />
  );
}

export default Role;
