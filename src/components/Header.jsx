import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { GlobalContext } from './GlobalContextState'
import auth, { googleProvider } from '../helpers/firebase'
import { signInWithPopup } from 'firebase/auth'

const Header = () => {
    const { handleLogout, user } = useContext(GlobalContext)

    async function handleGoogleLogin() {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            setUser(result.user);
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className='flex justify-between items-center border-b px-5 py-2'>
            <div className='font-extrabold text-xl'>
                Header
            </div>
            <div className='flex gap-3 font-medium'>
                <Link to={'/profile'}>Profile</Link>
                {
                    !user ? <>
                        <Link to={'/login'}>Login</Link>
                        <Link to={'/register'}>Register</Link>
                    </> : null
                }

            </div>
            <div className='space-x-2'>
                {
                    !user ?
                        <button onClick={handleGoogleLogin} className='border p-1 px-4 rounded-3xl'>Sign in With Google</button>
                        :  <button onClick={handleLogout} className='border p-1 px-4 rounded-3xl'>logout</button>
                }
            </div>
        </div>
    )
}

export default Header