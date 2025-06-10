import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

const Todo = sequelize.define('Todo', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  }
}, {
  timestamps: true
});

// Define associations
Todo.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Todo, { foreignKey: 'userId' });

export default Todo; 