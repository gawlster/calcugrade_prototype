import { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../lib/mongodb'
import { ObjectId } from 'mongodb'
import { AssignmentType, CourseType } from '../../Types'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { db } = await connectToDatabase()

    if (req.method !== 'POST')
        return res
            .status(400)
            .json({ message: `Request method ${req.method} not allowed for request type POST` })

    const userID = req.body.userID
    const courseID = req.body.courseID

    if (!userID || !courseID)
        return res
            .status(400)
            .json({ message: 'Bad request, please include username and password in body' })

    try {
        /*
         *
         * 1. get the user
         * 2. get the courses array
         * 3. remove the specified course from the array
         * 4. update the user in the db
         *
         */
        let updated = false

        const user = await db.collection('Users').findOne({ _id: ObjectId(userID) })
        for (let i = 0; i < user.courses.length; i++) {
            if (user.courses[i]._id == courseID) {
                user.courses.splice(i, 1)

                const response = await db.collection('Users').update(
                    {
                        _id: ObjectId(userID),
                    },
                    {
                        $set: user,
                    }
                )
                updated = response.result.nModified != 0

                break
            }
        }
        if (updated) {
            return res.status(200).json({ message: 'SUCCESS' })
        } else {
            return res.status(500).json({ message: 'error occured' })
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'error here' })
    }
}
