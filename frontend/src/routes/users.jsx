import { Outlet, useSearchParams} from "react-router-dom";
import {getUsers} from "../data";
import { useLocation, NavLink } from 'react-router-dom';

// Keep the search filtered
function QueryNavLink({ to, ...props }) {
  let location = useLocation();
  return <NavLink to={to + location.search} {...props} />;
}

export default function Users() {
  let users = getUsers();
  let[searchParams, setSearchParams] = useSearchParams();
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
            <input
              value={searchParams.get("filter") || ""}
              onChange={event => {
                let filter = event.target.value;
                if (filter) {
                  setSearchParams({ filter });
                } else {
                  setSearchParams({});
                }
              }}
            />
            {users
              .filter(user => {
              let filter = searchParams.get("filter");
              if (!filter) return true;
              let username = user.username.toLowerCase();
              return username.startsWith(filter.toLowerCase());
          })
    
          .map(user =>(
            <QueryNavLink
              style={({ isActive }) => {
                return {
                  display: "block",
                  margin: "1rem 0",
                  color: isActive ? "red" : ""
                }
                }}
                to={`/users/${user.id}`}
                key={user.id}>
                {user.username}
            </QueryNavLink>
          ))}
      </nav>
      <Outlet />
    </div>
    </main>
  );
}