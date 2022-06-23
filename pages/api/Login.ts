import { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../lib/mongodb'
// import bcrypt from 'bcryptjs'

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

    const result = await db.collection('Users').find({ username: username }).toArray()
    if (result.length === 0) {
        return res.status(400).json({ message: 'INVALID' })
    }
    if (result.length === 1) {
        // const validPassword = await bcrypt.compare(password, result[0].password)
        // if (validPassword) {
        //     return res.status(200).json(result[0])
        // }
        return res.status(400).json({ message: 'INVALID' })
    } else {
        return res.status(500).json({ message: 'SERVER ERROR' })
    }
}
