import React from "react";

export default function Login() {
  // const [] = useState()
  const handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    console.log("signedin");
    event.preventDefault();
  };
  return (
    <div>
      <h2>Sign in</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          name="email"
          onChange={handleChange}
          placeholder="test@test.com"
          type="text"
        />
        <input
          name="password"
          onChange={handleChange}
          placeholder="password"
          type="text"
        />
        <input />
        <button>Log in</button>
      </form>
    </div>
  );
}
