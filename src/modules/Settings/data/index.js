import { StyleSheet, Switch } from 'react-native';
import { useSelector } from 'react-redux';

import { UserRoles } from '@/types/UserRoles.enums';
const scale = 0.9;
const styles = StyleSheet.create({
  switch: {
    transform: [{ scaleX: scale }, { scaleY: scale }],
  },
});
export default function useSettings() {
  const { type } = useSelector(state => state.user);
  return [
    {
      title: 'Utilisateurs',
      subSettings: [
        {
          subtitle: 'Rôle actuel',
          text:
            type === 'listener'
              ? UserRoles.LISTENER_DISPLAY
              : UserRoles.TALKER_DISPLAY,
          handle: {
            fn: 'setModalVisible',
            prm: [true],
          },
        },
      ],
    },
    {
      title: 'Notifications',
      subSettings: [
        {
          subtitle: 'Messages',
          text: <Switch style={styles.switch} />,
          handle: {
            fn: 'toggleMessageNotification',
            prm: [],
          },
        },
        {
          subtitle: 'Connections',
          text: <Switch style={styles.switch} />,
          handle: {
            fn: 'toggleConnectionsNotification',
            prm: [],
          },
        },
      ],
    },
  ];
}
