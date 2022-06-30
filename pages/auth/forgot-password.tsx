import axios, { AxiosError } from 'axios'
import { NextPage } from 'next'
import { useState } from 'react'

const Login: NextPage = () => {
    const [loading, setLoading] = useState(false)

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')

    const [showUsername, setShowUsername] = useState(false)

    async function handleSubmit(e: any, data: { username: string; email: string }) {
        e.preventDefault()
        setLoading(true)
        if (data.username !== '') {
            // use the username
            try {
                const res = await axios.post('/api/RecoverPassword', { username: data.username })
                console.log(res)
            } catch (err) {
                console.log(err)
            }
        } else if (data.email !== '') {
            // use the email
            alert('using email')
        } else {
            // both empty, invalid input
            alert('invalid')
        }
        setLoading(false)
    }

    return (
        <div className='w-screen h-screen flex flex-col gap-3 justify-center items-center p-3'>
            <div className='text-2xl text-center'>
                Forgot your password? No worries! Fill out the form below to reset it.
            </div>
            <div className='w-full grid place-items-center'>
                {showUsername ? (
                    <>
                        <form
                            action='#'
                            onSubmit={(e) => handleSubmit(e, { username: username, email: '' })}
                            className='flex flex-col gap-4 justify-center items-center outline outline-1 p-8 w-4/5 min-w-fit max-w-lg'>
                            <label className='flex flex-row gap-2'>
                                Username:
                                <input
                                    className='transition-colors focus:outline-0 border-b-2 border-black focus:border-orange-500'
                                    type='text'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </label>
                            <button
                                className='transition-colors focus:outline-0 border-b-2 border-black px-1 text-black hover:text-orange-500 hover:border-orange-500 focus:text-orange-500 focus:border-orange-500 font-semibold'
                                type='submit'>
                                {loading ? 'Loading...' : 'Submit'}
                            </button>
                            <div className='cursor-pointer' onClick={() => setShowUsername(false)}>
                                Use email instead?
                            </div>
                        </form>
                    </>
                ) : (
                    <>
                        <form
                            action='#'
                            onSubmit={(e) => handleSubmit(e, { username: '', email: email })}
                            className='flex flex-col gap-4 justify-center items-center outline outline-1 p-8 w-4/5 min-w-fit max-w-lg'>
                            <label className='flex flex-row gap-2'>
                                Email:
                                <input
                                    className='transition-colors focus:outline-0 border-b-2 border-black focus:border-orange-500'
                                    type='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </label>
                            <button
                                className='transition-colors focus:outline-0 border-b-2 border-black px-1 text-black hover:text-orange-500 hover:border-orange-500 focus:text-orange-500 focus:border-orange-500 font-semibold'
                                type='submit'>
                                {loading ? 'Loading...' : 'Submit'}
                            </button>
                            <div className='cursor-pointer' onClick={() => setShowUsername(true)}>
                                Use username instead?
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    )
}

export default Login
