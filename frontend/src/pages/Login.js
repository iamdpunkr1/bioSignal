import {Link} from 'react-router-dom'
import * as Unicons from '@iconscout/react-unicons';
import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import dashpic from '../assets/dashpic.png'
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useLogin()

  const handleSubmit = async(e)=>{
    e.preventDefault()

    await login(email,password)
  }
    return (
      <div className='container'>
      <div className='row '>
         <div className='col-8'>
           <img className='img-fluid pb-5 min-vh-100' src={dashpic} alt="dashboardmage"/>
         </div>
         <div className="form-box  min-vh-100  col-4">
   ``   <form className="center-wrap " onSubmit={handleSubmit}>
              <div className="section text-center">
              <h4 className="mb-4 pb-3">Log In</h4>
              
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  className="form-style"
                  placeholder="Your Email"
                  id="email"
                  autoComplete="off"
                  value={email}
                  onChange={(e)=>{setEmail(e.target.value)}}
                  required
                />
                <Unicons.UilAt className="input-icon uil uil-at"  />
              </div>
              <div className="form-group mt-2">
                <input
                  type="password"
                  name="password"
                  className="form-style"
                  placeholder="Your Password"
                  id="password"
                  autoComplete="off"
                  value={password}
                  onChange={(e)=>{setPassword(e.target.value)}}
                  required
                />
                <Unicons.UilLock className="input-icon uil uil-at"  />
              </div>
              <button className={isLoading?"btn mt-4 disabled":"btn mt-4"}>
                submit
              </button>
              {error && <div className="error">{error}</div>}
              <p className="mb-0 mt-4 text-center">
              Create a account? <Link to="/signupAdmin">Admin</Link> <Link to="/signupUser">User</Link>
              </p>
            </div>
        </form>
      </div>
      </div>
      </div>
     
      );
}
 
export default Login;