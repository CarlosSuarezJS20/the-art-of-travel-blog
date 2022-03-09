import React, { useState } from "react";

const App: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <label>email</label>
      <input type='email' onChange={(e) => {}} />
      <label>password</label>
      <input type='password' />
      <button>submit</button>
    </div>
  );
};

export default App;
