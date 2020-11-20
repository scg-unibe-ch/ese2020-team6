import { Model } from 'sequelize';

interface ModelName {
  tableName: string;
  schema: string;
  delimiter: string;
}

export class InstanceDoesNotExistError extends Error {

  constructor(modelName: string | ModelName) {
    super('No instance in table \'' + modelName + '\' exists with the specified attributes!');
    Object.setPrototypeOf(this, InstanceDoesNotExistError.prototype);
  }

  private static getTableName(modelName: string | ModelName): string {
    if (typeof modelName === 'string') {
      return modelName as string;
    } else {
      return (modelName as ModelName).tableName;
    }
  }
}
