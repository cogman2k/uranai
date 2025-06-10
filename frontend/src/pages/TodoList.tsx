import { useState, useEffect } from 'react';
import { 
  List, 
  Input, 
  Button, 
  Card, 
  Checkbox, 
  Popconfirm, 
  message,
  Layout,
  Typography,
  Space
} from 'antd';
import { 
  PlusOutlined, 
  DeleteOutlined, 
  LogoutOutlined 
} from '@ant-design/icons';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const { Header, Content } = Layout;
const { Title } = Typography;

interface Todo {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const fetchTodos = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/todos', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTodos(response.data);
    } catch (error) {
      message.error('Failed to fetch todos');
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    if (!newTodo.trim()) return;

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/todos',
        { title: newTodo },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTodos([response.data, ...todos]);
      setNewTodo('');
      message.success('Todo added successfully');
    } catch (error) {
      message.error('Failed to add todo');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTodo = async (todo: Todo) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        `http://localhost:5000/api/todos/${todo._id}`,
        { completed: !todo.completed },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTodos(todos.map(t => t._id === todo._id ? response.data : t));
    } catch (error) {
      message.error('Failed to update todo');
    }
  };

  const handleDeleteTodo = async (todoId: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/todos/${todoId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTodos(todos.filter(t => t._id !== todoId));
      message.success('Todo deleted successfully');
    } catch (error) {
      message.error('Failed to delete todo');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Layout style={{ minHeight: '100vh'}}>
      <Header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        background: '#fff',
        padding: '0 24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <Title level={3} style={{ margin: 0 }}>Todo App</Title>
        <Button 
          icon={<LogoutOutlined />} 
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Header>
      <Content style={{ padding: '24px', maxWidth: 800, margin: '0 auto', width: '100%' }}>
        <Card style={{ marginBottom: 24 }}>
          <Space.Compact style={{ width: '100%' }}>
            <Input
              placeholder="Add a new todo"
              value={newTodo}
              onChange={e => setNewTodo(e.target.value)}
              onPressEnter={handleAddTodo}
              size="large"
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddTodo}
              loading={loading}
              size="large"
            >
              Add
            </Button>
          </Space.Compact>
        </Card>

        <List
          dataSource={todos}
          renderItem={todo => (
            <List.Item
              actions={[
                <Popconfirm
                  title="Delete this todo?"
                  onConfirm={() => handleDeleteTodo(todo._id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button 
                    type="text" 
                    danger 
                    icon={<DeleteOutlined />}
                  />
                </Popconfirm>
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Checkbox
                    checked={todo.completed}
                    onChange={() => handleToggleTodo(todo)}
                  />
                }
                title={
                  <span style={{ 
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? '#999' : 'inherit'
                  }}>
                    {todo.title}
                  </span>
                }
                description={todo.description}
              />
            </List.Item>
          )}
        />
      </Content>
    </Layout>
  );
};

export default TodoList; 