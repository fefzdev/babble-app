import { getAuth, signOut } from 'firebase/auth';
import { Alert } from 'react-native';

const auth = getAuth();

export default function useSettings(navigation) {
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
  const settingsList = [
    [
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
    ],
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

  return {
    onSignOut,
    onAccountDeleteOut,
    settingsList,
  };
}
