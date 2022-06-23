import { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../lib/mongodb'
import { ObjectId } from 'mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { db } = await connectToDatabase()

    if (req.method !== 'POST')
        return res
            .status(400)
            .json({ message: `Request method ${req.method} not allowed for request type POST` })

    const userID = req.body.userID
    const school = req.body.school
    const courseCode = req.body.courseCode
    const courseName = req.body.courseName
    const earnedGrade = req.body.earnedGrade
    const expectedGrade = req.body.expectedGrade
    const onTrackGrade = req.body.onTrackGrade

    if (!userID || !school || !courseCode || !courseName)
        return res
            .status(400)
            .json({ message: 'Bad request, please include username and password in body' })

    const toSend = {
        _id: new ObjectId(),
        school: school,
        courseCode: courseCode,
        courseName: courseName,
        earnedGrade: earnedGrade,
        expectedGrade: expectedGrade,
        onTrackGrade: onTrackGrade,
        assignments: [],
    }

    try {
        const result = await db.collection('Users').update(
            { _id: ObjectId(userID) },
            {
                $push: { courses: { ...toSend } },
            }
        )
        return res.status(200).json({ message: 'SUCCESS' })
    } catch (err) {
        return res.status(500).json({ message: 'error here' })
    }
}
