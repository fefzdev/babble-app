export default function useSettings() {
  return [
    [
      {
        icon: 'modern-mic',
        text: 'Changer de rôle',
        handle: {
          fn: 'setRoleModalVisible',
          prm: [true],
        },
      },

      {
        subtitle: 'Notifications',
        icon: 'bell',
        text: 'Notifications',
        handle: {
          fn: 'setNotifsModalVisible',
          prm: [true],
        },
      },
    ],
    [
      {
        icon: 'log-out',
        text: 'Deconnexion',
        handle: {
          fn: 'signOut',
          prm: [],
        },
      },
    ],
    [
      {
        icon: 'warning',
        text: 'Supprimer mon compte',
        handle: {
          fn: 'accountDelete',
          prm: [],
        },
      },
    ],
  ];
}
