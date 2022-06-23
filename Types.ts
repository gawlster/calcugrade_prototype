export type User = {
    _id: string
    username: string
    password: string
    fname: string
    lname: string
    email: string
    courses: Course[]
}

export const defaultUser: User = {
    _id: '',
    username: '',
    password: '',
    fname: '',
    lname: '',
    email: '',
    courses: [],
}

export type Course = {
    _id: string
    school: string
    courseCode: string
    courseName: string
    earnedGrade: string
    expectedGrade: string
    onTrackGrade: string
    assignments: Assignment[]
}

export const defaultCourse: Course = {
    _id: '',
    school: '',
    courseCode: '',
    courseName: '',
    earnedGrade: '',
    expectedGrade: '',
    onTrackGrade: '',
    assignments: [],
}

export type Assignment = {
    _id: string
    assignmentName: string
    percentageOfFinal: string
    status: 'graded' | 'submitted' | 'todo'
    dueDate: Date
    grade: number
    earnedOfFinal: number
}

export const defaultAssignment: Assignment = {
    _id: '',
    assignmentName: '',
    percentageOfFinal: '',
    status: 'todo',
    dueDate: new Date(),
    grade: 0,
    earnedOfFinal: 0,
}
