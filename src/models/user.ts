import { DataTypes, Model } from 'sequelize';
import db from '../config/database.js';
import Reserve from './reserva.js';

class User extends Model {
  declare id: number;
  declare name: string;
  declare email: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize: db,
    modelName: 'User',
    tableName: 'users',
  },
);

export default User;
