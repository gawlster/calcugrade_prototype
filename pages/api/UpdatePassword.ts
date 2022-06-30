import { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../lib/mongodb'
import { ObjectId } from 'mongodb'
import bcrypt from 'bcryptjs'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { db } = await connectToDatabase()

    if (req.method !== 'POST')
        return res
            .status(400)
            .json({ message: `Request method ${req.method} not allowed for request type POST` })

    const userID = req.body.uid
    const newPass = req.body.newPass

    if (!userID || !newPass)
        return res
            .status(400)
            .json({ message: 'Bad request, please include username and password in body' })

    try {
        const salt = await bcrypt.genSalt()
        const encryptedPassword = await bcrypt.hash(newPass, salt)

        await db
            .collection('Users')
            .update({ _id: ObjectId(userID) }, { $set: { password: encryptedPassword } })

        return res.status(200).json({ message: 'SUCCESS' })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'error here' })
    }
}
