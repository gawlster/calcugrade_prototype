export type UserType = {
    _id: string
    username: string
    password: string
    fname: string
    lname: string
    email: string
    courses: CourseType[]
}

export const defaultUser: UserType = {
    _id: '',
    username: '',
    password: '',
    fname: '',
    lname: '',
    email: '',
    courses: [],
}

export type CourseType = {
    _id: string
    school: string
    courseCode: string
    courseName: string
    earnedGrade: string
    expectedGrade: string
    onTrackGrade: string
    assignments: AssignmentType[]
}

export const defaultCourse: CourseType = {
    _id: '',
    school: '',
    courseCode: '',
    courseName: '',
    earnedGrade: '',
    expectedGrade: '',
    onTrackGrade: '',
    assignments: [],
}

export type AssignmentType = {
    _id: string
    assignmentName: string
    percentageOfFinal: number
    status: 'graded' | 'submitted' | 'todo'
    dueDate: Date
    grade: number
    earnedOfFinal: number
}

export const defaultAssignment: AssignmentType = {
    _id: '',
    assignmentName: '',
    percentageOfFinal: 0,
    status: 'todo',
    dueDate: new Date(),
    grade: 0,
    earnedOfFinal: 0,
}

export type TaskType = {
    _id: string
    courseID: string
    assignmentName: string
    courseCode: string
    daysToDue: number
    type: 'due' | 'overdue'
    percentageOfFinal: number
    sorter: number
}

export const defaultTask: TaskType = {
    _id: '',
    courseID: '',
    assignmentName: '',
    courseCode: '',
    daysToDue: 0,
    type: 'due',
    percentageOfFinal: 0,
    sorter: 0,
}
