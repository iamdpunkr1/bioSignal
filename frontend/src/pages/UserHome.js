import Table from 'react-bootstrap/Table';

import { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

import NavBar from '../partials/NavBar';
import {Modal, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom';

const UserHome = () => {
    const {user} = useAuthContext()
    const [userData, setUserData] = useState(null)
    const [heartbeat, setHeartbeat] = useState('')
    const [pulserate, setPulserate] = useState('')
    const [oxygen, setOxygen] = useState('')
    const [temperature, setTemperature] = useState('')
    const [ecg, setEcg] = useState('')
    const [isLoading,setLoading] = useState(true)
    const [selectedImg,setSelectedImg] =useState(null)
    const [showImg, setShowImg] = useState(false)
    const [showReport, setShowReport] = useState(false)

    const handleCloseImg = () => setShowImg(false);
    const handleCloseReport = () => setShowReport(false);
    
  const handlePDFChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setEcg(reader.result);
    };
  };

  function isBase64Image(str) {
    // Check if the string starts with a data URI prefix
    if (!str.startsWith("data:image")) {
      return false;
    }
  
    // Extract the base64 part of the string
    const base64Part = str.split(",")[1];
  
    // Create a regular expression to match a valid base64 string
    const base64Regex = /^[A-Za-z0-9+/=]+$/;
  
    // Check if the base64 part of the string matches the regex
    return base64Regex.test(base64Part);
  }


  //Submit user details
    const createUserData= async(e)=>{
      e.preventDefault()
      setLoading(true)
      if (!user) {
        console.log('You must be logged in')
        return
      }

 
      const userdata = {uname:user.user.username ,heartbeat, pulserate, oxygen, temperature, ecg}

      const response = await fetch('/userhome', {
        method: 'POST',
        body: JSON.stringify(userdata),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
     
        }
      })
      const json = await response.json()
  
      if (!response.ok) {
        console.log("Error in Submitting Data",json)
        setLoading(false)

      }
      if (response.ok) {
        setHeartbeat('')
        setPulserate('')
        setOxygen('')
        setTemperature('')
        setEcg('')
        setUserData(json)
        setLoading(false)

      }

  }

    useEffect(()=>{
        const fetchUserData = async () => {
            const response = await fetch('/userhome',{
              headers:{
                'Authorization':`Bearer ${user.token}`
              }
            })
      
            const json = await response.json()
      
            if(response.ok){
              setUserData(json)
            }
            setLoading(false)
          }
        
      
          if (user) {
            fetchUserData()
          }
    },[])
    return ( 
        <>
        <header>
          <NavBar/>
        </header>

        { isLoading ?
         <div className='position-absolute bottom-50 end-50'>
          <div className="spinner-grow" style={{width: "3rem", height: "3rem"}} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
         </div>

          :
          <div className='container mt-5'>

          <h1>Welcome!</h1>
          
           {/* <Button onClick={handleClick} className='mt-2'>Logout</Button> */}
          
          <div className='mt-5'>
          <form onSubmit={createUserData}>
  
          <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Heart Beat</th>
              <th>Pulse rate</th>
              <th>Oxygen</th>
              <th>Temperature</th>
              <th>ECG</th>
            </tr>
          </thead>
          <tbody>
  
          {userData==null ? 
                    <tr>
                    <td>
                      <input type='number' maxLength={3} onChange={(e)=>{setHeartbeat(e.target.value)}} value={heartbeat} required/>
                    </td>
                    <td>
                      <input type='number'  maxLength={3} onChange={(e)=>{setPulserate(e.target.value)}} value={pulserate} required/>
                    </td>
                    <td>
                      <input type='number'  maxLength={3} onChange={(e)=>{setOxygen(e.target.value)}} value={oxygen} required/>
                    </td>
                    <td>
                      <input type='number'  maxLength={3} onChange={(e)=>{setTemperature(e.target.value)}} value={temperature} required/>
                    </td>
                    <td>
                      <input className='text-body-primary py-1'  onChange={handlePDFChange}  type='file'  accept=".jpg,.jpeg,.png,.pdf"/>
                    </td>
          
                    </tr>
          
          :
              <tr key={userData._id}>
                  <td>{userData.heartbeat}</td>
                  <td>{userData.pulserate}</td>
                  <td>{userData.oxygen}</td>
                  <td>{userData.temperature}</td>
                  <td> <img className='viewImg' src={userData.ecg} alt="ECG" width={100} height={100}
                  onClick={()=>{
                    setSelectedImg(userData.ecg)
                    setShowImg(true)}}
                  /></td>
                  {/* <td><button className={userData.feedbacks.filter(f=>f.email===user.user.email)? "btn disabled":"btn"} onClick={()=>handleSelect(m.meet_id)}>Check here</button></td> */}
  
            </tr>
            }
          </tbody>
        </Table>
        {userData==null ? 
         <Button type='submit' className={userData!==null?"btn mt-2 disabled":"btn mt-2"}>
              Submit
          </Button> 
          : 
          typeof(userData.report) === 'undefined' ?
          <h5 className='text-center'>Your data has been uploaded! . Your report will be available soon</h5>
          :
          <>
          <h5  className='text-center'>Your report has been generated !</h5>
          <div  className='d-flex justify-content-center mt-2'>
            <button className='reportBtn' onClick={()=>{setShowReport(true)}}>View Report</button>
          </div>
            <Modal  size="lg" show={showReport} onHide={handleCloseReport}>
                <Modal.Header closeButton>
                  <h5 className='text-center'>YOUR REPORT</h5> 
                </Modal.Header>
                <Modal.Body> 
                  <div  className='d-flex justify-content-center mt-2'> 
                  {isBase64Image(userData.report)===true ?
                    <img src={userData.report} alt="preview"  />
                     :
                     <div className="card text-center mb-3" style={{width: "100%"}}>
                        <div className="card-body">
                          {/* <h5 className="card-title">Special title treatment</h5> */}
                          <p className='card-text'>{userData.report}</p>
                          <button className="reportBtn">Download</button>
                        </div>
                      </div>  
                    
                    }
                    </div>
                </Modal.Body>
          </Modal>
          </>
          }
         
            </form>
          </div>
          <div>
  
          </div>
      </div>
  
  
        } 
      
    
    {/* Preview Image */}
    <Modal  size="xl" show={showImg} onHide={handleCloseImg}>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body> 
              <div  className='d-flex justify-content-center mt-2'> 
              <img src={selectedImg && selectedImg} alt="preview"  />
              </div>
            </Modal.Body>
      </Modal>
        </>
 
     );
}
 
export default UserHome;