import { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../lib/mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { db } = await connectToDatabase()

    if (req.method !== 'GET')
        return res
            .status(400)
            .json({ message: `Request method ${req.method} not allowed for request type GET` })

    const users = await db.collection('Users').find({}).toArray()
    return res.status(200).json({ data: users })
}
