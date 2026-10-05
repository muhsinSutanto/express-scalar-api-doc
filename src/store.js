const users = [
  { id: 1, name: 'Ayu Pratama', email: 'ayu@example.com' },
  { id: 2, name: 'Budi Santoso', email: 'budi@example.com' },
]

let nextId = 3

export function listUsers(query) {
  const needle = query?.trim().toLowerCase()
  if (!needle) return users
  return users.filter(
    (user) =>
      user.name.toLowerCase().includes(needle) ||
      user.email.toLowerCase().includes(needle),
  )
}

export function getUser(id) {
  return users.find((user) => user.id === id)
}

export function createUser({ name, email }) {
  const user = { id: nextId++, name, email }
  users.push(user)
  return user
}

export function updateUser(id, patch) {
  const user = getUser(id)
  if (!user) return undefined
  if (patch.name !== undefined) user.name = patch.name
  if (patch.email !== undefined) user.email = patch.email
  return user
}

export function deleteUser(id) {
  const index = users.findIndex((user) => user.id === id)
  if (index === -1) return false
  users.splice(index, 1)
  return true
}
