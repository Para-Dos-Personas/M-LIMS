import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
  Select,
  MenuItem,
} from '@mui/material';
import userService from '../services/userService';

const Users = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const data = await userService.getAll();
      setUsers(data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await userService.updateRole(userId, newRole);
      fetchUsers();
    } catch (err) {
      console.error('Role update failed:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>

      <Paper elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Change Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    size="small"
                  >
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default Users;
