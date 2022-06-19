import { connectToDatabase } from '../../util/mongodb'

export default async (req, res) => {
    if (req.method !== 'POST')
        return res
            .status(405)
            .json({ message: `Mehtod ${req.method} not allowed on endpoint of type POST` })

    const { db } = await connectToDatabase()

    const confirmUniqueUsername = await db
        .collection('Users')
        .find({ username: req.body.username })
        .toArray()
    if (confirmUniqueUsername.length !== 0)
        return res.status(400).json({ messsage: 'Username already taken' })

    const confirmUniqueEmail = await db
        .collection('Users')
        .find({ email: req.body.email })
        .toArray()
    if (confirmUniqueEmail.length !== 0)
        return res.status(400).json({ message: 'Email already in use' })

    const newUserInfo = {
        username: req.body.username,
        password: req.body.password,
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
    }

    const newUser = await db.collection('Users').insert(newUserInfo)
    return res.status(200).json(newUser)
}
