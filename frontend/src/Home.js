import Table from 'react-bootstrap/Table';
import { useAuthContext } from './hooks/useAuthContext';
import NavBar from './partials/NavBar';
import { useState, useEffect } from 'react';
import {Modal, Button} from 'react-bootstrap'
import Uploader from './partials/Uploader';
import { BsFileEarmarkPlus} from 'react-icons/bs'

const Home = () => {
    
    const {user} = useAuthContext()
    const [userDatas, setUserDatas] = useState(null)
    const [selectedImg,setSelectedImg] =useState(null)
    const [selectedUser,setSelectedUser] =useState(null)
    const [show, setShow] = useState(false)
    const [showImg, setShowImg] = useState(false)
    const [feedImg,setFeedImg] = useState('')
    const [activeTab, setActiveTab] = useState(0)

    const [image, setImage] =useState(null)
    const [fileName, setFileName]= useState("No file selected")


    const handleClose = () => setShow(false);
    const handleCloseImg = () => setShowImg(false);
    const handleTabs = (n) =>{
      setActiveTab(n)
    }
    const handleShow = (_id) => {
      const [data] = userDatas && userDatas.filter(u=> u._id === _id)
      setSelectedUser(data)
      setShow(true)
    };

    const handlePDFChange = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFeedImg(reader.result);
      };
    };
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
        
      <h1>User datas</h1>
      
      <div className='container mt-5'>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Sl</th>
            <th>Name</th>
            <th>Heart Beat</th>
            <th>Pulse rate</th>
            <th>Oxygen</th>
            <th>Temperature</th>
            <th>ECG</th>
            <th>Add report </th>
          </tr>
        </thead>
        <tbody>

        {userDatas==null ? 
                  ""
        
        :
        userDatas.map((userData,idx)=>{
         return( <tr key={userData._id}>
            <td>{idx+1}</td>
            <td>{userData.uname}</td>
            <td>{userData.heartbeat}</td>
            <td>{userData.pulserate}</td>
            <td>{userData.oxygen}</td>
            <td>{userData.temperature}</td>
            <td> <img className='viewImg' src={userData.ecg} alt="ECG" width={100} height={100}  onClick={()=>{
              setSelectedImg(userData.ecg)
              setShowImg(true)}}/></td>
            <td><BsFileEarmarkPlus className='mt-1 addreport' size={30} onClick={()=>{handleShow(userData._id)}}/></td>
          </tr>)
        })
        }
        </tbody>
      </Table>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Report: {selectedUser && selectedUser.uname}</Modal.Title>
        </Modal.Header>
        <Modal.Body>  
                <div className='row bg-warning p-3 rounded'>
                  <div onClick={()=>{handleTabs(0)}} style={{backgroundColor: activeTab===0 ?"black":"#FFC107",color: activeTab===0 ?"white":"black"}} className='col text-center tabBtn  rounded  mx-2'>
                      Write report
                  </div>
                  <div  onClick={()=>{handleTabs(1)}} style={{backgroundColor: activeTab===1 ?"black":"#FFC107",color: activeTab===1 ?"white":"black"}} className='col text-center  rounded tabBtn'>
                   Upload report  
                  </div>
                </div>
                {activeTab===0?
                 <form onSubmit={handleSubmit}>
                    <div className="form-group mt-3">
                      <textarea
                        className="form-style2"
                          id="disease"
                          name="disease"
                          rows={4}
                          cols={50}
                          value={
                            feedback
                          }
                          onChange={(e)=>{setFeedback(e.target.value)}}
                          placeholder='Type your report here.....'
                          required
                        />
                {/* <Unicons.UilHeadSideCough className="input-icon2 uil uil-at"  /> */}
                  </div>
                </form>
                :
                <div className='d-flex justify-content-center mt-2'>
                    <Uploader image={image} setImage={setImage}
                          fileName={fileName} setFileName={setFileName} />
                </div>
      
                }

        </Modal.Body>
        <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <button type="submit" className='btn btn-primary' >
                Save Changes
              </button>
        </Modal.Footer>
  </Modal>

  <Modal  size="xl" show={showImg} onHide={handleCloseImg}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body> 
          <div  className='d-flex justify-content-center mt-2'> 
          <img src={selectedImg && selectedImg} alt="preview"  />
          </div>
        </Modal.Body>
  </Modal>
  </div>
      </>

     );
}
 
export default Home;