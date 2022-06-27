import { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../lib/mongodb'
import { ObjectId } from 'mongodb'
import { AssignmentType, CourseType, TaskType } from '../../Types'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { db } = await connectToDatabase()

    if (req.method !== 'POST')
        return res
            .status(400)
            .json({ message: `Request method ${req.method} not allowed for request type POST` })

    const uid = req.body.uid

    if (!uid) return res.status(400).json({ message: 'Bad request, please include userID in body' })

    const userArr = await db
        .collection('Users')
        .find({ _id: ObjectId(uid) })
        .toArray()
    if (userArr.length === 1) {
        try {
            let tasks: TaskType[] = []
            const courses = userArr[0].courses
            courses.forEach((course: CourseType) => {
                const assignments = course.assignments
                assignments.forEach((assignment: AssignmentType) => {
                    if (assignment.status === 'todo') {
                        const task: TaskType = {
                            _id: assignment._id,
                            courseID: course._id,
                            assignmentName: assignment.assignmentName,
                            courseCode: course.courseCode,
                            daysToDue: getDaysToDue(assignment.dueDate).days,
                            type: getDaysToDue(assignment.dueDate).type,
                            percentageOfFinal: assignment.percentageOfFinal,
                            sorter: getSorter(assignment.dueDate),
                        }
                        tasks.push(task)
                    }
                })
            })
            // sort the array by due date
            tasks.sort(compare)
            return res.status(200).json({ tasks: tasks })
        } catch (err) {
            console.error(err)
            return res.status(400).json({ error: err })
        }
    } else {
        return res.status(400).json({ message: 'INVALID' })
    }
}

function compare(a: TaskType, b: TaskType) {
    if (a.sorter < b.sorter) {
        return -1
    }
    if (a.sorter > b.sorter) {
        return 1
    }
    return 0
}

function getDaysToDue(dueDate: Date): { days: number; type: 'due' | 'overdue' } {
    const today = new Date()
    const timeBetween = parseDate(dueDate).getTime() - today.getTime()
    const days = Math.ceil(timeBetween / (1000 * 3600 * 24))
    if (days >= 0) {
        return {
            days,
            type: 'due',
        }
    } else {
        return {
            days: Math.abs(days),
            type: 'overdue',
        }
    }
}

function getSorter(dueDate: Date): number {
    const today = new Date()
    const timeBetween = parseDate(dueDate).getTime() - today.getTime()
    return Math.ceil(timeBetween / (1000 * 3600 * 24))
}

function parseDate(input: any) {
    var parts = input.match(/(\d+)/g)
    // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
    return new Date(parts[0], parts[1] - 1, parts[2]) // months are 0-based
}
