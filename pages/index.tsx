import React from 'react'

const Home = () => {
    async function handleLoginClick() {
        console.log('logging in')
        window.location.pathname = '/login'
    }
    async function handleSignupClick() {
        console.log('signing up')
        window.location.pathname = '/signup'
    }

    return (
        <div>
            <button onClick={() => handleLoginClick()}>Login</button>
            <button onClick={() => handleSignupClick()}>Signup</button>
        </div>
    )
}

export default Home
