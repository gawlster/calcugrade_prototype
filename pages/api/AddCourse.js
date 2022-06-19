import { connectToDatabase } from '../../util/mongodb'

export default async (req, res) => {
    if (req.method !== 'PATCH')
        return res
            .status(405)
            .json({ message: `Method ${req.method} not allowed on endpoint of type PATCH` })

    const { db } = await connectToDatabase()

    if (
        !req.body.username ||
        !req.body.school ||
        !req.body.courseCode ||
        !req.body.courseName ||
        !req.body.faculty
    ) {
        return res.status(400).json({ message: 'Invalid request' })
    }

    const newCourse = {
        school: req.body.school,
        courseCode: req.body.courseCode,
        courseName: req.body.courseName,
        faculty: req.body.faculty,
        grades: {
            assignments: [],
        },
    }

    try {
        const dbCourse = await db
            .collection('Users')
            .update({ username: req.body.username }, { $push: { courses: newCourse } })

        return res.status(200).json(dbCourse)
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: 'error adding course', ...err })
    }
}
