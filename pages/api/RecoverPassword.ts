import { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../lib/mongodb'
import nodemailer from 'nodemailer'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { db } = await connectToDatabase()

    if (req.method !== 'POST')
        return res
            .status(400)
            .json({ message: `Request method ${req.method} not allowed for request type POST` })

    const username = req.body.username
    const email = req.body.email

    if ((!username && !email) || (username && email))
        return res
            .status(400)
            .json({ message: 'Bad request, please include username OR email in body' })

    let userEmail: string
    let userID: string

    if (username) {
        // using username
        try {
            const user = await db.collection('Users').findOne({ username: username })
            userEmail = user.email
            userID = user._id
        } catch (err) {
            return res.status(400).json({ message: 'error here', error: err })
        }
    } else if (email) {
        // using email
        try {
            const user = await db.collection('Users').findOne({ email: email })
            userEmail = user.email
            userID = user._id
        } catch (err) {
            return res.status(400).json({ message: 'error here', error: err })
        }
    } else {
        return res.status(500).json({ message: 'internal server error' })
    }

    // send an email to userEmail which has a link to reset-password/[userID]
    let encodedUserEmail = ''
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'calcugrade@gmail.com',
                pass: 'lvelmcpcuxaigljl',
            },
        })

        const mailOptions = {
            from: 'calcugrade@gmail.com',
            to: userEmail,
            subject: 'Reset your Calcugrade Password',
            text: 'Testing',
            html: `<p>Click <a href='https://calcugrade.vercel.app/auth/reset-password/${userID}'>this link</a> to reset your password.</p>`,
        }

        transporter.sendMail(mailOptions, (error, data) => {
            if (error) {
                console.error(error)
            } else {
                console.log(`email sent to ${userEmail}: ${data.response}`)
            }
        })

        const firstPart = userEmail.split('@')[0]
        const encodedFirstPart =
            firstPart[0] + '*'.repeat(firstPart.length - 2) + firstPart[firstPart.length - 1]
        encodedUserEmail = encodedFirstPart + '@' + userEmail.split('@')[1]
        console.log(encodedUserEmail)
    } catch (err) {
        console.error(err)
    }

    return res.status(200).json({ message: 'worked', email: encodedUserEmail })
}
