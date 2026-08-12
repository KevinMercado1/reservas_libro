import { DataTypes, Model } from 'sequelize';
import db from '../config/database.js';
import Reserve from './reserva.js';

class Book extends Model {
  declare id: number;
  declare title: string;
  declare author: string;
}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'Book',
    tableName: 'books',
  },
);

export default Book;
