import Table from 'react-bootstrap/Table';
import { useAuthContext } from './hooks/useAuthContext';
import NavBar from './partials/NavBar';
import { useState, useEffect } from 'react';
import {Modal, Button} from 'react-bootstrap'
const Home = () => {
    
    const {user} = useAuthContext()
    const [userDatas, setUserDatas] = useState(null)
    const [selectedUser,setSelectedUser] =useState(null)
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [feedback, setFeedback] = useState('')
    useEffect(()=>{
      const fetchUserDatas = async () => {
          const response = await fetch('/dashboard',{
            headers:{
              'Authorization':`Bearer ${user.token}`
            }
          })
    
          const json = await response.json()
    
          if(response.ok){
            setUserDatas(json)
            console.log("useeffect called admin ",json)
          }
        }
      
    
        if (user) {
          fetchUserDatas()
        }
  },[user])

  const handleSubmit=()=>{
    console.log("Submit")
  }

    return ( <>
      <NavBar/>
      <div className='App'>
        
      <h1>fetch User datas</h1>
      
      <div className='container mt-5'>
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

        {userDatas==null ? 
                  ""
        
        :
        userDatas.map(userData=>{
         return( <tr key={userData._id}>
            <td>{userData.heartbeat}</td>
            <td>{userData.pulserate}</td>
            <td>{userData.oxygen}</td>
            <td>{userData.temperature}</td>
            <td> <img src={userData.ecg} alt="ECG" width={100} height={100}/></td>
            <td><button className='btn'>Download</button></td>
            <td><button className='btn' onClick={handleShow}>Upload Report</button></td>
          </tr>)
        })

      

          }
        </tbody>
      </Table>
      </div>
      <Modal show={show} onHide={handleClose}>
      <form onSubmit={handleSubmit}>
      <Modal.Header closeButton>
      <Modal.Title>User Name: {selectedUser && selectedUser.name}</Modal.Title>
    </Modal.Header>
    <Modal.Body>  
            <div className="form-group mt-3">
            <input
                type="text"
                name="draft"
                onChange={(e)=>{setFeedback(e.target.value)}}
                value={feedback}
                className="form-style"

                id="draft"
                autoComplete="off"

            />
            </div>


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
  </Modal>
  </div>
      </>

     );
}
 
export default Home;