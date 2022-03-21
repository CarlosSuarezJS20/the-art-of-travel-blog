import React, { useEffect, useState } from "react";
import Axios from "axios";

type user = { id: number; email_address: string; password: string };
type users = user[];

const App: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState<users>([]);

  useEffect(() => {}, []);

  const onchangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    if (type === "email") {
      setEmail(e.target.value);
    }
    if (type === "password") {
      setPassword(e.target.value);
    }
  };

  const submitRequest = () => {
    const apiURL = "http://localhost:3001/api/users";
    const details = {
      email_address: email,
      password: password,
    };
    Axios.post(apiURL, details).then(() => {
      alert("Success send");
    });
  };

  const requestAllUsers = () => {
    const apiURL = "http://localhost:3001/api/get_users";
    Axios.get(apiURL).then((res) => {
      setUsers([...res.data]);
    });
  };

  return (
    <React.Fragment>
      <div>
        <label>email</label>
        <input
          type='email'
          onChange={(e) => {
            onchangeHandler(e, "email");
          }}
        />
        <label>password</label>
        <input
          type='password'
          onChange={(e) => {
            onchangeHandler(e, "password");
          }}
        />
        <button onClick={submitRequest}>submit</button>
      </div>
      <div>
        <button onClick={requestAllUsers}>Show users</button>
      </div>
      <div>
        {users &&
          users.map((user) => {
            console.log(users);
            console.log(user);
            return <h1 key={user.id}>{user.email_address}</h1>;
          })}
      </div>
    </React.Fragment>
  );
};

export default App;
