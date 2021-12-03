import Model from './Model';

export default class Room extends Model {
  constructor() {
    super();
    this.table = 'room';
  }

  create = users => {
    this.add({
      messages: {},
      users: {
        ...users,
      },
    });
  };
}
