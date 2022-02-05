let users = [
  {
    id: 1,
    username: 'Santa Monica',
    first_name: 1995,
    last_name: '$10,800',
    avatar: '12/05/1995',
  },
  {
    id: 2,
    username: 'Stankonia',
    first_name: 2000,
    last_name: '$8,000',
    avatar: '10/31/2000',
  },
  {
    id: 3,
    username: 'Ocean Avenue',
    first_name: 2003,
    last_name: '$9,500',
    avatar: '07/22/2003',
  },
  {
    id: 4,
    username: 'Tubthumper',
    first_name: 1997,
    last_name: '$14,000',
    avatar: '09/01/1997',
  },
  {
    id: 5,
    username: 'Wide Open Spaces',
    first_name: 1998,
    last_name: '$4,600',
    avatar: '01/27/2998',
  },
];

export function getUsers() {
  return users;
}

export function getUser(id) {
  return users.find((user) => user.id === id);
}

export function deleteUser(id) {
  users = users.filter((user) => user.id !== id);
}
