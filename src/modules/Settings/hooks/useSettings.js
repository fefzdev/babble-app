import { getAuth, signOut } from 'firebase/auth';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';

const auth = getAuth();

export default function useSettings(navigation) {
  const { type } = useSelector(state => state.user);

  const onSignOut = () => {
    Alert.alert(
      'Se déconnecter ?',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        {
          text: 'Oui, me déconnecter',
          style: 'destructive',
          onPress: async () => signOut(auth),
        },
        {
          text: 'Non, annuler',
          style: 'default',
          onPress: () => null,
        },
      ],
    );
  };

  const onAccountDeleteOut = () => {
    Alert.alert(
      'Supprimer le compte ?',
      'Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible et entraine la suppression de toutes vos données.',
      [
        {
          text: 'Oui, supprimer',
          style: 'destructive',
          onPress: async () => signOut(auth),
        },
        {
          text: 'Non, annuler',
          style: 'default',
          onPress: () => null,
        },
      ],
    );
  };
  const defaultSettingsList = [
    [
      {
        icon: 'log-out',
        text: 'Deconnexion',
        action: () => onSignOut(),
      },
    ],
    [
      {
        icon: 'warning',
        text: 'Supprimer mon compte',
        action: () => onAccountDeleteOut(),
      },
    ],
  ];

  const getSettings = () => {
    const settings = defaultSettingsList;
    if (type)
      settings.unshift([
        {
          icon: 'modern-mic',
          text: 'Changer de rôle',
          action: () => navigation.navigate('Role'),
        },

        {
          subtitle: 'Notifications',
          icon: 'bell',
          text: 'Notifications',
          action: () => navigation.navigate('Notifications'),
        },
      ]);
    return settings;
  };

  return {
    onSignOut,
    onAccountDeleteOut,
    getSettings,
  };
}
