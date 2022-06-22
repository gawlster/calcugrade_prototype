import { Logout } from '../hooks/Logout'

const AlreadyLoggedIn = () => {
    return (
        <div className='w-full h-full flex flex-col justify-center items-center gap-2'>
            <p className='text-slate-700 text-lg font-bold'>
                It appears you are already logged in.
            </p>
            <div className='flex flex-row gap-1'>
                <button
                    onClick={() => Logout()}
                    className='transition-colors border border-slate-700 px-2 py-1 hover:bg-slate-700 hover:text-white'>
                    Log out
                </button>
                <button
                    onClick={() => (window.location.pathname = '/dashboard')}
                    className='transition-colors border border-slate-700 px-2 py-1 hover:bg-slate-700 hover:text-white'>
                    View my dashboard
                </button>
            </div>
        </div>
    )
}

export default AlreadyLoggedIn
