import { useNavigate, useParams} from "react-router-dom";
import {getUser, deleteUser} from "../data";

export default function User() {
  let navigate = useNavigate();
  let params = useParams();
  let user = getUser(parseInt(params.userId, 10));
  return(

<main style={{ padding: "1rem" }}>
      <h2>User profile: {user.avatar}</h2>
      <p>
        {user.username}
      </p>
      <p>First name: {user.first_name}</p>
      
      <p>
        <button
          onClick={() => {
            deleteUser(user.id);
            navigate("/users");
          }}
        >
          Delete
        </button>
      </p>
    </main>

  )
}