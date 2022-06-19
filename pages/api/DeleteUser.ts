import { connectToDatabase } from '../../util/mongodb'
import { NextApiRequest, NextApiResponse } from '../../node_modules/next/dist/shared/lib/utils'

//TODO: need to make sure this is authorized so you can't delete any account you want

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'DELETE')
        return res
            .status(405)
            .json({ message: `Method ${req.method} not allowed on endpoint of type DELETE` })

    if (!req.body.username) return res.status(400).json({ message: 'Invalid request' })

    const { db } = await connectToDatabase()

    const deletedUser = await db.collection('Users').remove({ username: req.body.username })
    if (deletedUser.deletedCount !== 0)
        return res.status(200).json({ message: 'User deleted', ...deletedUser })

    return res.status(400).json({ message: "Trying to delete user that doesn't exist" })
}
