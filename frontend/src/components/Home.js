import { useEffect, useState } from 'react';

export default function Home() {
  const [initialState, setInitialState] = useState([]);

  useEffect(
    () =>
      fetch('/api/users')
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((jsonresponse) => setInitialState(jsonresponse.userList)),
    []
  );
  console.log(initialState);
  return <div>Hey</div>;
}
