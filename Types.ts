type User = {
    userID: any
    username: string
    password: string
    fname: string
    lname: string
    email: string
    courses: Course[]
}

type Course = {
    courseID: any
    school: string
    courseCode: string
    courseName: string
    faculty: string
    assignments: Assignment[]
}

type Assignment = {
    assignmentID: any
    assignmentName: string
    percentageOfFinal: number
    grade: number | null
}

type NotLoggedIn = {
    message: string
}

export { type User, type Course, type Assignment, type NotLoggedIn }
