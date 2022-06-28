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
        let updated: boolean = false

        const user = await db.collection('Users').findOne({ _id: ObjectId(userID) })

        let course: CourseType = user.courses[0] || null
        let assignment: AssignmentType = course.assignments[0] || null
        for (let i = 0; i < user.courses.length; i++) {
            if (user.courses[i]._id == courseID) {
                course = user.courses[i]

                for (let j = 0; j < course.assignments.length; j++) {
                    if (course.assignments[j]._id == assignmentID) {
                        assignment = course.assignments[j]

                        assignment.assignmentName = assignmentName
                        assignment.percentageOfFinal = percentageOfFinal
                        assignment.status = status
                        assignment.dueDate = dueDate
                        assignment.grade = grade
                        assignment.earnedOfFinal = earnedOfFinal

                        course.assignments[j] = assignment
                        user.courses[i] = course

                        //update db set correct user to updated user
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
            }
        }
        if (updated) {
            return res.status(200).json({ message: 'SUCCESS' })
        } else {
            return res.status(500).json({ message: 'error occured' })
        }
    } catch (err) {
        return res.status(500).json({ message: 'error here' })
    }
}
