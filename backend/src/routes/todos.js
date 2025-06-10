import express from 'express';
import jwt from 'jsonwebtoken';
import Todo from '../models/Todo.js';
import User from '../models/User.js';

const router = express.Router();

// Middleware to verify JWT token
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    
    if (!user) {
      return res.status(401).json({ message: 'Token is not valid' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Get all todos for a user
router.get('/', auth, async (req, res) => {
  try {
    const todos = await Todo.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']]
    });
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new todo
router.post('/', auth, async (req, res) => {
  try {
    const { title } = req.body;
    const todo = await Todo.create({
      title,
      userId: req.user.id
    });
    res.status(201).json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a todo
router.patch('/:id', auth, async (req, res) => {
  try {
    const todo = await Todo.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    const updatedTodo = await todo.update(req.body);
    res.json(updatedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a todo
router.delete('/:id', auth, async (req, res) => {
  try {
    const todo = await Todo.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    await todo.destroy();
    res.json({ message: 'Todo deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 