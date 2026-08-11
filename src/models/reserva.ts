import { DataTypes, Model } from 'sequelize';
import db from '../config/database.js';

class Reserve extends Model {
  declare id: number;
  declare user_id: number;
  declare book_id: number;
  declare status: 'pendiente' | 'completada' | 'cancelada';
}

Reserve.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    book_id: {
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
  }
);

export default Reserve;
