import React, { useState } from "react";
import Axios from "axios";

type user = { id: number; email_address: string; password: string };
type users = user[];

const App: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState<users>([]);
  const [registering, setRegistering] = useState(false);

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
    const apiURL = registering
      ? "http://localhost:3001/api/register"
      : "http://localhost:3001/api/login";
    const details = {
      email_address: email,
      password: password,
    };
    Axios.post(apiURL, details).then((res) => {
      console.log(res);
    });
  };

  const requestAllUsers = () => {
    const apiURL = "http://localhost:3001/api/users";
    Axios.get(apiURL).then((res) => {
      console.log(res);
      setUsers([...res.data]);
    });
  };

  // Registration handler
  const registrationHandler = () => {
    setRegistering(!registering);
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
        <button onClick={submitRequest}>
          {registering ? "register" : "log in"}
        </button>
      </div>
      <div>
        <button onClick={registrationHandler}>
          {registering ? "back" : "register"}
        </button>
      </div>
      <div>
        <button onClick={requestAllUsers}>Show users</button>
      </div>
      <div>
        {users &&
          users.map((user) => {
            return <h1 key={user.id}>{user.email_address}</h1>;
          })}
      </div>
    </React.Fragment>
  );
};

export default App;
