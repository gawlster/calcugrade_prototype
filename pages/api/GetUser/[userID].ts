import { connectToDatabase } from '../../../util/mongodb'
import { NextApiRequest, NextApiResponse } from '../../../node_modules/next/dist/shared/lib/utils'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET')
        return res
            .status(405)
            .json({ message: `Method ${req.method} not allowed on endpoint of type GET` })

    const { db } = await connectToDatabase()

    const { curUsername } = req.query

    const curUser = await db.collection('Users').find({ username: curUsername }).toArray()

    // if (curUser.length !== 1) return res.status(400).json({ message: 'User does not exist' })

    res.json(curUser)
}
