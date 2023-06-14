import Table from 'react-bootstrap/Table';
import { useAuthContext } from './hooks/useAuthContext';
import NavBar from './partials/NavBar';
import { useState, useEffect } from 'react';

const Home = () => {
    
    const {user} = useAuthContext()
    const [userDatas, setUserDatas] = useState(null)



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
            <td><button>Download</button></td>
          </tr>)
        })

      

          }
        </tbody>
      </Table>
      </div>
  </div>
      </>

     );
}
 
export default Home;