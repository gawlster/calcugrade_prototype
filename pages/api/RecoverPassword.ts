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
        const user = await db.collection('Users').findOne({ username: username })
        userEmail = user.email
        userID = user._id
    } else if (email) {
        // using email
        const user = await db.collection('Users').findOne({ email: email })
        userEmail = user.email
        userID = user._id
    } else {
        return res.status(500).json({ message: 'internal server error' })
    }

    // send an email to userEmail which has a link to reset-password/[userID]
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
            html: '<p>Click <a href="https://calcugrade.vercel.app.com/auth/reset-password/">this link</a> to reset your password.</p>',
        }

        transporter.sendMail(mailOptions, (error, data) => {
            if (error) {
                console.error(error)
            } else {
                console.log(`email sent to ${userEmail}: ${data.response}`)
            }
        })

        console.log('worked here')
    } catch (err) {
        console.log('error here')
        console.error(err)
    }

    return res.status(200).json({ message: 'worked' })
}

/*
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'youremail@gmail.com',
    pass: 'yourpassword'
  }
});

var mailOptions = {
  from: 'youremail@gmail.com',
  to: 'myfriend@yahoo.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
*/
