import { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../lib/mongodb'
import { ObjectId } from 'mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { db } = await connectToDatabase()

    if (req.method !== 'POST')
        return res
            .status(400)
            .json({ message: `Request method ${req.method} not allowed for request type POST` })

    const uid = req.body.uid

    if (!uid) return res.status(400).json({ message: 'Bad request, please include userID in body' })

    const result = await db
        .collection('Users')
        .find({ _id: ObjectId(uid) })
        .toArray()
    if (result.length === 1) {
        return res.status(200).json(result[0])
    } else {
        return res.status(400).json({ message: 'INVALID' })
    }
}
