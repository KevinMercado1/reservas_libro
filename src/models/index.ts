import User from './user.js';
import Book from './book.js';
import Reserve from './reserva.js';

User.hasMany(Reserve, { foreignKey: 'userId', as: 'reserves' });
Book.hasMany(Reserve, { foreignKey: 'bookId', as: 'reserves' });

Reserve.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Reserve.belongsTo(Book, { foreignKey: 'bookId', as: 'book' });

export { User, Book, Reserve };
