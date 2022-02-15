import { Input, Label } from 'semantic-ui-react'
import { useState, useEffect } from "react";
import axios from "../api/axios"
import { Outlet, useSearchParams} from "react-router-dom";

import { useLocation, NavLink } from 'react-router-dom';

// Keep the search filtered
function QueryNavLink({ to, ...props }) {
  let location = useLocation();
  return <NavLink to={to + location.search} {...props} />;
}

export default function Users() {
  const [users, setUsers] = useState([]);
  let[searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    fetchUsers();
  },[]);

  const fetchUsers = () => {
    axios.get("/users").then((response) => {
      console.log(response);
      setUsers(response.data.userList);
     
    }).catch((error) => {
      console.log(error);
    })
  };
  

  return(
    <main style = {{padding: "1rem 0"}}>
    <h2>Users list</h2>
 

    <div style={{display:"flex"}}>
      <nav
        style={{
          borderRight: "solid 1px",
          padding: "1rem"
        }}
      >
      <Input icon='users' iconPosition='left' placeholder='Search users...' value = {searchParams.get("filter") || ""}
        onChange={event => {
          let filter = event.target.value;
          if (filter) {
            setSearchParams({ filter });
          } else {
            setSearchParams({});
          }
        }}
      />

      {Object.values(users).filter(user => {
        let filter = searchParams.get("filter");
        if (!filter) return true;
        let username = user.username.toLowerCase();
        return username.startsWith(filter.toLowerCase());
      })
      .map(user =>(
        <QueryNavLink style ={({isActive}) => {
          return{
            display:"block",
            margin:"1rem 0",
            color:isActive ? "red": ''
          }
        }}
        
       
        to={`/users/${user.id}`}
        key={user.id}>

        {user.role==="user" ? (
          <Label as='a' color='blue' image>
            <img src='https://react.semantic-ui.com/images/avatar/small/veronika.jpg' />
            {user.username}

          </Label>):( 
          <Label as='a' color='teal' image>
            <img src='https://react.semantic-ui.com/images/avatar/small/christian.jpg' />
            {user.username}
            <Label.Detail>{user.role}</Label.Detail>
         </Label>)}
         
      </QueryNavLink>

      ))}
      {/* <User/> */}
      </nav>

      <Outlet />
    </div>
    </main>
  );
}