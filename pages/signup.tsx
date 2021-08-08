import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import signupHandler from "../lib/api/singupHandler";

function Signup() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isError, setIsError] = useState(false);
  const router = useRouter();
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    (await signupHandler(username, email, password))
      ? router.push("/panel/campaigns")
      : setIsError(true);
  }
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form shadow-xl">
        <h3 className="form-title">SIGN UP</h3>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          id=""
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input type="submit" value="Sign In" className="btn-high" />
      </form>
    </div>
  );
}

export default Signup;
