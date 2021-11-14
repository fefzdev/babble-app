import Model from './Model';

export default class TestDB extends Model {
  constructor() {
    super();
    this.table = 'test';
  }
}
