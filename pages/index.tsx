import { NextPage } from 'next'

const Home: NextPage = () => {
    async function handleLoginClick() {
        window.location.pathname = '/login'
    }
    async function handleSignupClick() {
        window.location.pathname = '/signup'
    }
    async function handleAllUsersClick() {
        window.location.pathname = '/all-users'
    }
    return (
        <div className='flex flex-col gap-4'>
            <button onClick={() => handleLoginClick()}>Log in</button>
            <button onClick={() => handleSignupClick()}>Sign Up</button>
            <button onClick={() => handleAllUsersClick()}>All users</button>
        </div>
    )
}

export default Home
