import {Link} from 'react-router-dom'
import * as Unicons from '@iconscout/react-unicons';
import { useState } from 'react';
import { useSignup } from '../hooks/useSignup';
import dashpic from '../assets/dashpic.png'

const Signup = () => {
  const user_type="admin"
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [age, setAge] = useState('')
  const [phno, setPhno] = useState('')
  const [username, setUserName] = useState('')
  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await signup(username,email,password,age,phno,user_type)
  }

    return (
      <div className='container'>
      <div className='row'>
         <div className='col-8'>
           <img className='img-fluid pb-5' src={dashpic} alt="dashboardmage"/>
         </div>
 
      <div className="form-box col-4">
      <form className="center-wrap" onSubmit={handleSubmit}>
              <div className="section text-center">
              <h4 className="mb-4 pb-3">Admin Sign Up</h4>
              <div className="form-group">
                <input
                    type="text"
                    name="username"
                    className="form-style"
                    placeholder="Your Full Name"
                    id="username"
                    autoComplete="off"
                    value={username}
                    onChange={(e)=>{setUserName(e.target.value)}}
                    required
                />
                <Unicons.UilUser className="input-icon uil uil-at"  />
                </div>
              <div className="form-group  mt-2">
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
              <div className="form-group mt-2">
              <input
                  type="number"
                  name="age"
                  className="form-style"
                  placeholder="Age"
                  id="age"
                  autoComplete="off"
                  value={age}
                  onChange={(e)=>{setAge(e.target.value)}}
                  required
              />
              <Unicons.UilEnvelope className="input-icon uil uil-at"  />
              </div>
              <div className="form-group mt-2">
              <input
                  type="number"
                  name="phno"
                  className="form-style"
                  placeholder="Phone Number"
                  id="phno"
                  autoComplete="off"
                  value={phno}
                  onChange={(e)=>{setPhno(e.target.value)}}
                  required
              />
              <Unicons.UilEnvelope className="input-icon uil uil-at"  />
              </div>
              <button className={isLoading?"btn mt-4 disabled":"btn mt-4"}>
                submit
              </button>
              {error && <div className="error">{error}</div>}
              <p className="mb-0 mt-4 text-center">
              Have a account? <Link to="/">Login</Link>
              </p>
            </div>
        </form>
      </div>
      </div>
      </div>
      );
}
 
export default Signup;