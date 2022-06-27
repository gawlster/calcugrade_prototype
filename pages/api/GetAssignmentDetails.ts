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

    const uid = req.body.uid
    const cid = req.body.cid
    const aid = req.body.aid

    if (!uid || !cid || !aid)
        return res.status(400).json({ message: 'Bad request, please include userID in body' })

    try {
        const userArr = await db
            .collection('Users')
            .find({
                _id: ObjectId(uid),
            })
            .toArray()

        if (userArr.length !== 1) return res.status(500).json({ message: 'something went wrong' })

        const user = userArr[0]
        let curCourse: CourseType = user.courses[0]

        if (!curCourse) return res.status(400).json({ message: 'something went wrong' })

        let curAssignment: AssignmentType = curCourse.assignments[0]
        for (let i = 0; i < user.courses.length; i++) {
            if (user.courses[i]._id === cid) {
                curCourse = user.courses[i]
                break
            }
        }
        for (let i = 0; i < curCourse.assignments.length; i++) {
            if (curCourse.assignments[i]._id === aid) {
                curAssignment = curCourse.assignments[i]
                break
            }
        }

        return res.status(200).json(curAssignment)
    } catch (err) {
        console.error(err)
    }
}
