'use client'
import React, { useState, useEffect } from 'react';
import { Card, Text, Group, Divider, Button } from '@mantine/core'; 
import { Star, StarOff } from '@tabler/icons-react';
import { IconMail, IconPhone, IconWorld } from '@tabler/icons-react';
import { IconHttpDelete } from '@tabler/icons-react';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error(`Error fetching users: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);

  const handleFollow = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, isFollowing: !user.isFollowing } : user
      )
    );
  };

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
    console.log(`Deleting user with ID: ${userId}`);
  };

  const getAvatarUrl = (userName) => {
    const initials = userName.split(' ').map((name) => name[0].toUpperCase()).join('');
    return `https://api.dicebear.com/8.x/initials/svg?seed=${initials}`;
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', margin: '20px' }}>
      {users.length > 0 ? (
        users.map((user) => (
          <Card
            key={user.id}
            className="user-card"
            shadow="sm"
            p="md"
            mt="md"
            style={{ margin: '20px', border: '1px solid #ddd', height: '310px', width: '310px' }}
          >
            <Group direction="column" style={{ height: '100%' }}>
              <Group style={{ justifyContent: 'center', marginBottom: '10px' }}>
                <img src={getAvatarUrl(user.name)} alt={`Avatar for ${user.name}`} width={64} height={64} />
              </Group>
              <Group>
                <Text>
                  {user.name} {user.isFollowing && <span>&#9733;</span>}
                </Text>
              </Group>
              <Divider />
              <Group>
                <Text weight="bold">
                  <IconMail />
                </Text>
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </Group>
              <Divider />
              <Group>
                <Text weight="bold">
                  <IconPhone />
                </Text>
                <a href={`tel:${user.phone}`}>{user.phone}</a>
              </Group>
              <Group>
                <Text weight="bold">
                  <IconWorld />
                </Text>
                <a href={user.website}>{user.website}</a>
              </Group>
              <Group style={{ justifyContent: 'space-between', marginTop: 'auto' }}>
                <Button onClick={() => handleFollow(user.id)}>  <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-user-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M16 19h6" /><path d="M19 16v6" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4" /></svg>{user.isFollowing ? 'Unfollow' : 'Follow'}</Button>
                <Button onClick={() => handleDelete(user.id)}  > <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>Delete</Button>
              </Group>
            </Group>
          </Card>
        ))
      ) : (
        <Text>Loading users...</Text>
      )}
    </div>
  );
}

export default UserList;
