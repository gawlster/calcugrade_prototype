import { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../lib/mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { db } = await connectToDatabase()

    if (req.method !== 'POST')
        return res
            .status(400)
            .json({ message: `Request method ${req.method} not allowed for request type POST` })

    const username = req.body.username
    const password = req.body.password

    if (!username || !password)
        return res
            .status(400)
            .json({ message: 'Bad request, please include username and password in body' })

    const result = await db
        .collection('Users')
        .find({ $and: [{ username: username }, { password: password }] })
        .toArray()
    if (result.length === 1) {
        return res.status(200).json(result[0])
    } else {
        return res.status(400).json({ message: 'INVALID' })
    }
}
