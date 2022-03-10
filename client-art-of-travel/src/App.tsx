import React, { useEffect, useState } from "react";
import Axios from "axios";

const App: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  return (
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
  );
};

export default App;
