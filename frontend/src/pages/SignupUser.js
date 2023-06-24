import {Link} from 'react-router-dom'
import * as Unicons from '@iconscout/react-unicons';
import { useState } from 'react';
import { useSignup } from '../hooks/useSignup';
import dashpic from '../assets/dashpic.png'

const SignupUser = () => {
  const user_type="user"
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUserName] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
  const [phno, setPhno] = useState('')
  const [disease, setDisease] = useState('')
  const {signupUser, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await signupUser(username,email,password,age,gender,phno,disease,user_type)
  }

    return (
    <div className='container'>
     <div className='row'>
        <div className='col-8'>
          <img className='img-fluid pb-5' src={dashpic} alt="dashboardmage"/>
        </div>

        <div className="form-box col-4 ">
      <form className="center-wrap" onSubmit={handleSubmit}>
              <div className="section text-center">
              <h4 className="mb-4 pb-3">User Sign Up</h4>
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
              <div className='row mt-2'>
              <span className="form-group2 col-6">
              <input
                  type="number"
                  name="age"
                  className="form-style"
                  placeholder="Age"
                  id="age"
                  autoComplete="off"
                  value={age}
                  onChange={(e)=>{setAge(e.target.value)}}
                  maxLength={3}
                  required
              />
              <Unicons.Uil18Plus className="input-icon2 uil uil-at"  />
              </span>
              <span className="form-group2  col-6">
              <input
                  type="text"
                  name="gender"
                  className="form-style"
                  placeholder="Gender"
                  id="gender"
                  autoComplete="off"
                  value={gender}
                  onChange={(e)=>{setGender(e.target.value)}}
                  required
              />
              <Unicons.UilMars className="input-icon2 uil uil-at"  />
              </span>
              </div>
              <div className="form-group  mt-2">
                <input
                  type="number"
                  name="phno"
                  className="form-style"
                  placeholder="Your Phone number"
                  id="phno"
                  autoComplete="off"
                  value={phno}
                  onChange={(e)=>{setPhno(e.target.value)}}
                  maxLength={10}
                  max={9999999999}
                  required
                />
                <Unicons.UilMobileAndroid className="input-icon uil uil-at"  />
              </div>
              <div className="form-group mt-2">
              <textarea
              className="form-style2"
                  id="disease"
                  name="disease"
                  rows={4}
                  cols={50}
                  value={
                    disease
                  }
                  onChange={(e)=>{setDisease(e.target.value)}}
                  placeholder='Diease (in detail)'
                  required
                />
                <Unicons.UilHeadSideCough className="input-icon2 uil uil-at"  />
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
 
export default SignupUser;