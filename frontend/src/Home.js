import Table from 'react-bootstrap/Table';
import { useAuthContext } from './hooks/useAuthContext';
import NavBar from './partials/NavBar';
import { useState, useEffect } from 'react';
import {Modal, Button} from 'react-bootstrap'
import Uploader from './partials/Uploader';
import { BsFileEarmarkPlus} from 'react-icons/bs'
// import { uploadReport } from '../../backend/controller/userDataController';

const Home = () => {
    
    const {user} = useAuthContext()
    const [userDatas, setUserDatas] = useState(null)
    const [selectedImg,setSelectedImg] =useState(null)
    const [selectedUser,setSelectedUser] =useState(null)
    const [show, setShow] = useState(false)
    const [error, setError] = useState(false)
    const [showImg, setShowImg] = useState(false)
    const [isLoading,setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState(0)
    const [toggle,setToggle] = useState(false)
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
          setLoading(false)
        }
      
    
        if (user) {
          fetchUserDatas()
        }
  },[user,toggle])


  //upload Report
  const uploadFn=async(report)=>{
    const response = await fetch('/dashboard/'+selectedUser._id,{
      method:'PATCH',
      body:JSON.stringify({report}),
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })

    const json = await response.json()
    if(!response.ok){
      console.log(json.error)
      setError(json.error)
    }
    if(response.ok){
      console.log("upload successful",json)
      setShow(false)
      setToggle(!toggle)
    }

    setLoading(false)
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    setLoading(true)
    let report;
    if( feedback || image){

      if(activeTab===0){
        report = feedback
      }else{
        report = image
      }
    }else{
      return
    }
    
    uploadFn(report)
    // console.log("Submit", image)
  }

    return ( <>
      <NavBar/>
      <div className=''>
        
      <h3 className='text-center my-5'>Patient Datas</h3>
      
      { isLoading ?
      
        <div className='position-absolute bottom-50 end-50'>
        <div className="spinner-grow" style={{width: "3rem", height: "3rem"}} role="status">
          <span className="visually-hidden">Loading...</span>
          </div>
        </div>

      :
      <div className='container mt-2'>
      <Table table-hover bordered hover size="sm">
        <thead>
          <tr>
            <th className='text-center'>Sl</th>
            <th className='text-center'>Name</th>
            <th className='text-center'>Heart Beat</th>
            <th className='text-center'>Pulse rate</th>
            <th className='text-center'>Oxygen</th>
            <th className='text-center'>Temperature</th>
            <th className='text-center'>ECG</th>
            <th className='text-center'>Add report </th>
          </tr>
        </thead>
        <tbody>

        {userDatas==null ? 
                  ""
        
        :
        userDatas.map((userData,idx)=>{
         return( <tr key={userData._id}>
            <td className='text-center'>{idx+1}</td>
            <td className='text-center'>{userData.uname}</td>
            <td className='text-center'>{userData.heartbeat}</td>
            <td className='text-center'>{userData.pulserate}</td>
            <td className='text-center'>{userData.oxygen}</td>
            <td className='text-center'>{userData.temperature}</td>
            <td className='text-center'> <img className='viewImg' src={userData.ecg} alt="ECG" width={100} height={100}  onClick={()=>{
              setSelectedImg(userData.ecg)
              setShowImg(true)}}/></td>
            <td className='text-center'>
              {
              typeof(userData.report) === 'undefined' ?
               <BsFileEarmarkPlus className='mt-1 addreport' size={30} onClick={()=>{handleShow(userData._id)}}/>
               :
                "Data uploaded"
                }
             
            </td>
          </tr>)
        })
        }
        </tbody>
      </Table>
      </div>
      }


      <Modal show={show} onHide={handleClose}>
      <form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Add Report:   <span class="h4 text-body-secondary"> {selectedUser && selectedUser.uname}</span></Modal.Title>
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
            </form>
      </Modal>
      
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
      </div>
      </>

     );
}
 
export default Home;