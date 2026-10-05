import { Router } from 'express'
import { createUser, deleteUser, getUser, listUsers, updateUser } from '../store.js'

export const usersRouter = Router()

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function parseId(value) {
  const id = Number(value)
  if (!Number.isInteger(id) || id < 1) return undefined
  return id
}

function readUserFields(body, { requireAll }) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { error: 'Body harus berupa objek JSON' }
  }

  const patch = {}

  if (body.name !== undefined) {
    if (typeof body.name !== 'string' || body.name.trim() === '') {
      return { error: 'name wajib berupa teks dan tidak boleh kosong' }
    }
    patch.name = body.name.trim()
  } else if (requireAll) {
    return { error: 'name wajib diisi' }
  }

  if (body.email !== undefined) {
    if (typeof body.email !== 'string' || !emailPattern.test(body.email.trim())) {
      return { error: 'email tidak valid' }
    }
    patch.email = body.email.trim()
  } else if (requireAll) {
    return { error: 'email wajib diisi' }
  }

  if (!requireAll && patch.name === undefined && patch.email === undefined) {
    return { error: 'Kirim minimal salah satu field: name atau email' }
  }

  return { value: patch }
}

usersRouter.get('/users', (req, res) => {
  const q = typeof req.query.q === 'string' ? req.query.q : undefined
  res.json(listUsers(q))
})

usersRouter.get('/users/:id', (req, res) => {
  const id = parseId(req.params.id)
  if (!id) {
    res.status(404).json({ message: 'Pengguna tidak ditemukan' })
    return
  }

  const user = getUser(id)
  if (!user) {
    res.status(404).json({ message: 'Pengguna tidak ditemukan' })
    return
  }

  res.json(user)
})

usersRouter.post('/users', (req, res) => {
  const parsed = readUserFields(req.body, { requireAll: true })
  if (parsed.error) {
    res.status(400).json({ message: parsed.error })
    return
  }

  res.status(201).json(createUser(parsed.value))
})

usersRouter.patch('/users/:id', (req, res) => {
  const id = parseId(req.params.id)
  if (!id || !getUser(id)) {
    res.status(404).json({ message: 'Pengguna tidak ditemukan' })
    return
  }

  const parsed = readUserFields(req.body, { requireAll: false })
  if (parsed.error) {
    res.status(400).json({ message: parsed.error })
    return
  }

  res.json(updateUser(id, parsed.value))
})

usersRouter.delete('/users/:id', (req, res) => {
  const id = parseId(req.params.id)
  if (!id || !deleteUser(id)) {
    res.status(404).json({ message: 'Pengguna tidak ditemukan' })
    return
  }

  res.status(204).end()
})
