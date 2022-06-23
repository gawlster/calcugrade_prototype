import { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../lib/mongodb'
import bcrypt from 'bcryptjs'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { db } = await connectToDatabase()

    if (req.method !== 'POST')
        return res
            .status(400)
            .json({ message: `Request method ${req.method} not allowed for request type POST` })

    const username = req.body.username
    const password = req.body.password
    const fname = req.body.fname
    const lname = req.body.lname
    const email = req.body.email

    if (!username || !password || !fname || !lname || !email)
        return res
            .status(400)
            .json({ message: 'Bad request, please include username and password in body' })

    const validUsername = await db.collection('Users').find({ username: username }).toArray()
    if (validUsername.length !== 0) return res.status(400).json({ message: 'USERNAME TAKEN' })

    const validEmail = await db.collection('Users').find({ email: email }).toArray()
    if (validEmail.length !== 0) return res.status(400).json({ message: 'EMAIL TAKEN' })

    try {
        const salt = await bcrypt.genSalt()
        const encryptedPassword = await bcrypt.hash(password, salt)

        const result = await db.collection('Users').insert({
            username: username,
            password: encryptedPassword,
            fname: fname,
            lname: lname,
            email: email,
            courses: [],
        })
        return res.status(200).json({ newUserID: result.insertedIds[0] })
    } catch (err) {
        return res.status(500).json({ message: 'error here' })
    }
}
