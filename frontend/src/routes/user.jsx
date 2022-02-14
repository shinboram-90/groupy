import { useParams} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../api/axios"
// import ModifyUser from "../components/ModifyUser"
// import {getUser, deleteUser} from "../data";

// import { Link } from "react-router-dom";

export default function User() {
 const params = useParams()
  const id = params.id;
  // let navigate = useNavigate();
  const [user, setUser] = useState([]);

  // const modifyUser = () => {
  //   axios.put(`/users/${id}`).then((response) => {
  //     console.log(response);
  //     setUser(response.data.user[0]);
      
  //   }).catch((error) => {
  //     console.log(error);
  //   })
  // }

  useEffect(() => {
    const fetchUser = () => {
       axios.get(`/users/${id}`).then((response) => {
         console.log(response);
         setUser(response.data.user[0]);
         
       }).catch((error) => {
         console.log(error);
       })
     };
    fetchUser();
  },[id]);



  return(

<main style={{ padding: "1rem" }}>
      <h2>User profile: {id}</h2>
      <img src= {`${user.avatar}`} alt="avatar"/>
      <p>
        {user.id} {user.role}
      </p>
      <p>Email: {user.email}<br/> 
      Bio : {user.biography}</p>
      
      <p>
        <button
          // onClick={() => {
          //   deleteUser(user.id);
          //   navigate("/users");
          // }}
     
        >
      Do sth
        </button>
      </p>
    </main>

  )
}