import { connectToDatabase } from '../../util/mongodb'
import { NextApiRequest, NextApiResponse } from '../../node_modules/next/dist/shared/lib/utils'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET')
        return res
            .status(405)
            .json({ message: `Method ${req.method} not allowed on endpoint of type GET` })

    const { db } = await connectToDatabase()

    const username = req.body.username
    const password = req.body.password

    const curUsernameUser = await db.collection('Users').find({ username: username }).toArray()

    if (curUsernameUser.length === 0) return res.status(400).json({ message: 'Invalid username' })

    if (password !== curUsernameUser.password)
        return res.status(400).json({ message: 'Incorrect password' })

    res.json(curUsernameUser)
}
