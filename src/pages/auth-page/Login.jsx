import React, { useContext } from 'react'
import { GlobalContext } from '../../components/GlobalContextState';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const {setLoading, loginFormData, setLoginFormData, onLoginSubmit } = useContext(GlobalContext)

  function handleChange(e) {

    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  }
  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    const result = onLoginSubmit();
    result.then(data => {
      if (data.user) {
        navigate('/profile')
        setLoading(false);
      }
    }).catch(error => {
      console.log(error)
    })
  }


  return (
    <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
      <div className="w-96 border p-5 rounded-xl">
        <form onSubmit={handleSubmit} className="max-w-md md:ml-auto w-full">
          <h3 className="text-slate-900 lg:text-3xl text-2xl font-bold mb-8 text-center">
            Login
          </h3>
          <div className="space-y-4">

            <div>
              <label className='text-sm text-slate-800 font-medium mb-2 block'>Email</label>
              <input name="email" type="email" value={loginFormData.email} onChange={handleChange} className="bg-slate-100 w-full text-sm text-slate-800 px-4 py-3 rounded-md outline-none border focus:border-blue-600 focus:bg-transparent" placeholder="Enter Email" />
            </div>
            <div>
              <label className='text-sm text-slate-800 font-medium mb-2 block'>Password</label>
              <input name="password" value={loginFormData.password} onChange={handleChange} type="password" className="bg-slate-100 w-full text-sm text-slate-800 px-4 py-3 rounded-md outline-none border focus:border-blue-600 focus:bg-transparent" placeholder="Enter Password" />
            </div>
          </div>
          <div className="!mt-8">
            <button type="submit" className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>)
}

export default Login