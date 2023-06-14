import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
// import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
// import { Link } from 'react-router-dom';
// import { useLogout } from '../hooks/useLogout'
import NavBar from '../partials/NavBar';

const UserHome = () => {
    const {user} = useAuthContext()
    const [userData, setUserData] = useState(null)
    const [heartbeat, setHeartbeat] = useState('')
    const [pulserate, setPulserate] = useState('')
    const [oxygen, setOxygen] = useState('')
    const [temperature, setTemperature] = useState('')
    const [ecg, setEcg] = useState('')
    const [disabled, setDisabled] = useState(false)


    
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
      setDisabled(true)
 
      const userdata = {heartbeat, pulserate, oxygen, temperature, ecg}

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
        setDisabled(false)
      }
      if (response.ok) {
        setHeartbeat('')
        setPulserate('')
        // console.log(meetings)
        setOxygen('')
        setTemperature('')
        setEcg('')
        setDisabled(true)
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
              console.log("useeffect called")
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

        <h1>Welcome, {user.user.username}</h1>
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
                <td> <img src={userData.ecg} alt="ECG" width={100} height={100}/></td>
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
        <h5>Your data has been uploaded! . Your report will be available soon</h5>
        }
       
          </form>
        </div>
        <div>

        </div>
    </div>


    {/* {selectMeet && 
<Modal show={show} onHide={handleClose}>
<form onSubmit={handleFeedback}>
    <Modal.Header closeButton>
      <Modal.Title>Meet_ID: {selectMeet.meet_id}</Modal.Title>
    </Modal.Header>
    <Modal.Body>

      <strong>Topic:</strong> {selectMeet.topic}<br/>
      <strong>Agenda:</strong> {selectMeet.agenda}<br/>
      <strong>Location:</strong> {selectMeet.location}<br/>
      <strong>Date:</strong> {selectMeet.date} &nbsp; &nbsp;
      <strong>Time:</strong> {selectMeet.time}<br/>
      <strong>Draft:</strong> {selectMeet.draft}
      <br/><br/>
        <Form.Group
          className="mb-3"
          controlId="exampleForm.ControlTextarea1"
        >
          <Form.Label><strong>Feedback</strong> </Form.Label>
          <Form.Control as="textarea" value={feedback} onChange={(e)=>setFeedback(e.target.value)} rows={3} />
        </Form.Group>

    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <button type="submit" className='btn btn-primary' >
        Save Changes
      </button>
    </Modal.Footer>
    </form>
  </Modal>    }   */}
        </>
 
     );
}
 
export default UserHome;