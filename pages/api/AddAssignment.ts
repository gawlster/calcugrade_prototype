import { connectToDatabase } from '../../util/mongodb'
import { NextApiRequest, NextApiResponse } from '../../node_modules/next/dist/shared/lib/utils'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'PATCH')
        return res
            .status(405)
            .json({ message: `Method ${req.method} not allowed on endpoint of type PATCH` })

    const { db } = await connectToDatabase()

    if (
        !req.body.userID ||
        !req.body.courseID ||
        !req.body.assignmentName ||
        !req.body.percentageOfFinal ||
        !req.body.grade
    ) {
        return res.status(400).json({ message: 'Invalid request' })
    }

    const newAssignment = {
        assignmentName: req.body.assignmentName,
        percentageOfFinal: req.body.percentageOfFinal,
        grade: req.body.grade,
    }

    try {
        const dbAssignment = await db
            .collection('Users')
            .update(
                {
                    $and: [
                        { userID: req.body.userID },
                        { courses: [{ courseID: req.body.courseID }] },
                    ],
                },
                { $push: { courses: { assignments: newAssignment } } }
            )

        return res.status(200).json(dbAssignment)
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: 'error adding course', ...err })
    }
}
