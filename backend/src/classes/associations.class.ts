import { Model, Association } from 'sequelize';

export class Associations<T, S> extends Model<T, S> {
  public static getAllAssociations(): Array<Association> {
    return Object.values(this.associations) as Array<Association>;
  }
}
