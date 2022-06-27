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
    const courseID = req.body.courseID
    const assignmentID = req.body.assignmentID
    const assignmentName = req.body.assignmentName
    const percentageOfFinal = req.body.percentageOfFinal
    const status = req.body.status
    const dueDate = req.body.dueDate
    const grade = req.body.grade
    const earnedOfFinal = req.body.earnedOfFinal

    if (
        !userID ||
        !courseID ||
        !assignmentID ||
        !assignmentName ||
        typeof percentageOfFinal === 'undefined' ||
        !status ||
        !dueDate ||
        typeof grade === 'undefined' ||
        typeof earnedOfFinal === 'undefined'
    )
        return res
            .status(400)
            .json({ message: 'Bad request, please include username and password in body' })

    try {
        const response = await db.collection('Users').update(
            {
                _id: ObjectId(userID),
                'courses._id': ObjectId(courseID),
                courses: { $elemMatch: { _id: assignmentID } },
            },
            {
                $set: {
                    'courses.$': {
                        assignmentName: assignmentName,
                        percentageOfFinal: percentageOfFinal,
                        status: status,
                        dueDate: dueDate,
                        grade: grade,
                        earnedOfFinal: earnedOfFinal,
                    },
                },
            }
        )
        return res.status(200).send(response)
        return res.status(200).json({ message: 'SUCCESS' })
    } catch (err) {
        return res.status(500).json({ message: 'error here' })
    }
}
