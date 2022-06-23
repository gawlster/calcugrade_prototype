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

    const userID = req.body.uid

    if (!userID)
        return res
            .status(400)
            .json({ message: 'Bad request, please include username and password in body' })

    try {
        const userArr = await db
            .collection('Users')
            .find({ _id: ObjectId(userID) })
            .toArray()
        const user = userArr[0]

        user.courses.forEach(async (course: CourseType) => {
            let earnedGrade = 0
            let estimatedGrade = 0
            let onTrackGrade = 0
            let onTrackDivisor = 0
            course.assignments.forEach((assignment: AssignmentType) => {
                if (assignment.status === 'graded') {
                    earnedGrade += assignment.earnedOfFinal
                    estimatedGrade += assignment.earnedOfFinal
                    onTrackGrade += assignment.earnedOfFinal
                    onTrackDivisor += assignment.percentageOfFinal
                } else if (assignment.status === 'submitted') {
                    estimatedGrade += assignment.earnedOfFinal
                    onTrackGrade += assignment.earnedOfFinal
                    onTrackDivisor += assignment.percentageOfFinal
                }
            })

            if (onTrackDivisor !== 0) {
                const divisor = onTrackDivisor / 100
                onTrackGrade /= divisor
            }
            // update db here
            await db.collection('Users').update(
                { _id: ObjectId(userID), 'courses._id': ObjectId(course._id) },
                {
                    $set: {
                        'courses.$.earnedGrade': earnedGrade,
                        'courses.$.expectedGrade': estimatedGrade,
                        'courses.$.onTrackGrade': onTrackGrade,
                    },
                }
            )
        })

        return res.status(200).json({ message: 'SUCCESS' })
    } catch (err) {
        return res.status(500).json({ message: 'error here' })
    }
}
