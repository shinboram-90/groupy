// import { useNavigate, useParams} from "react-router-dom";
// import {getUser, deleteUser} from "../data";
import { useState, useEffect } from "react";
import axios from "axios";
// import { Outlet, useSearchParams} from "react-router-dom";
// import { Link } from "react-router-dom";

export default function User() {
  // let navigate = useNavigate();
  const [user, setUser] = useState([]);
  // let params = useParams();
  // let user = getUser(parseInt(params.userId, 10));
  // const {id} = useParams;
  // console.log(id);

  useEffect(() => {
    fetchUser();
  },[]);

  const fetchUser = () => {
    axios.get(`http://localhost:3001/api/users/6`).then((response) => {
      setUser(response.data.user[0]);
      console.log(response.data.user[0]);
      
    }).catch((error) => {
      console.log(error);
    })
  };


  return(

<main style={{ padding: "1rem" }}>
      <h2>User profile: {user.username}</h2>
      <p>
        {user.id} {user.role}
      </p>
      <p>Email: {user.email}</p>
      
      <p>
        <button
          // onClick={() => {
          //   deleteUser(user.id);
          //   navigate("/users");
          // }}
        >
          Delete
        </button>
      </p>
    </main>

  )
}