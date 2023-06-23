
// import Form from 'react-bootstrap/Form';
// import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
// import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
// import { Link } from 'react-router-dom';
// import { useLogout } from '../hooks/useLogout'
import NavBar from '../partials/NavBar';
import {Modal, Button} from 'react-bootstrap'
const UserHome = () => {
    const {user} = useAuthContext()
    const [userData, setUserData] = useState(null)
    const [heartbeat, setHeartbeat] = useState('')
    const [pulserate, setPulserate] = useState('')
    const [oxygen, setOxygen] = useState('')
    const [temperature, setTemperature] = useState('')
    const [ecg, setEcg] = useState('')

    const [selectedImg,setSelectedImg] =useState(null)
    const [showImg, setShowImg] = useState(false)


    const handleCloseImg = () => setShowImg(false);
    
  const handlePDFChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setEcg(reader.result);
    };
  };
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    // const {logout} = useLogout()

    // const handleClick = () =>{
    //   logout()
    // }

    const createUserData= async(e)=>{
      e.preventDefault()
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
        console.log("Error in Creating meeting",json)

      }
      if (response.ok) {
        setHeartbeat('')
        setPulserate('')
        // console.log(meetings)
        setOxygen('')
        setTemperature('')
        setEcg('')
        // setTimeout(()=>{
        //   navigate('/')
        // },2000)
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
              console.log(typeof(json.report) === 'undefined')
            }
          }
        
      
          if (user) {
            fetchUserData()
          }
    },[user])
    return ( 
        <>
        <header>
          <NavBar/>
        </header>
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
                    <input type='text' onChange={(e)=>{setHeartbeat(e.target.value)}} value={heartbeat} required/>
                  </td>
                  <td>
                    <input type='text' onChange={(e)=>{setPulserate(e.target.value)}} value={pulserate} required/>
                  </td>
                  <td>
                    <input type='text' onChange={(e)=>{setOxygen(e.target.value)}} value={oxygen} required/>
                  </td>
                  <td>
                    <input type='text' onChange={(e)=>{setTemperature(e.target.value)}} value={temperature} required/>
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
        <h5  className='text-center'>Your report has been generated !</h5>
        }
       
          </form>
        </div>
        <div>

        </div>
    </div>




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