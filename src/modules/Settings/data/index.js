export default function useSettings() {
  return [
    [
      {
        icon: 'modern-mic',
        text: 'Changer de rôle',
        handle: {
          fn: 'setModalVisible',
          prm: [true],
        },
      },

      {
        subtitle: 'Notifications',
        icon: 'bell',
        text: 'Notifications',
        handle: {
          fn: 'toggleMessageNotification',
          prm: [],
        },
      },
    ],
    [
      {
        icon: 'log-out',
        text: 'Deconnexion',
        handle: {
          fn: 'signOut',
          prm: [true],
        },
      },
    ],
    [
      {
        icon: 'warning',
        text: 'Supprimer mon compte',
        handle: {
          fn: 'signOut',
          prm: [true],
        },
      },
    ],
  ];
}
