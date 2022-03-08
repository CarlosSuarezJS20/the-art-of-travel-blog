import React, { useState } from "react";

const App: React.FC = () => {
  const [email, setText] = useState("");
  return (
    <div>
      <input type='email' />
      <button>send</button>
    </div>
  );
};

export default App;
