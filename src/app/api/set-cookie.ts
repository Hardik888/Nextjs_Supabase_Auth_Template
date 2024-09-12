import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.body

  if (!token) {
    return res.status(400).json({ error: 'Token is required' })
  }

  res.setHeader(
    'Set-Cookie',
    `sb-access-token=${token}; Path=/; HttpOnly; Secure; SameSite=Lax;`
  )

  return res.status(200).json({ message: 'Cookie set successfully' })
}
