import { DataTypes, Model } from 'sequelize';
import db from '../config/database.js';
import User from './user.js';
import Book from './book.js';

class Reserve extends Model {
  declare id: number;
  declare userId: number;
  declare bookId: number;
  declare status: 'pendiente' | 'completada' | 'cancelada';
}

Reserve.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pendiente', 'completada', 'cancelada'),
      allowNull: false,
      defaultValue: 'pendiente',
    },
  },
  {
    sequelize: db,
    modelName: 'Reserve',
    tableName: 'reserves',
  },
);

export default Reserve;
