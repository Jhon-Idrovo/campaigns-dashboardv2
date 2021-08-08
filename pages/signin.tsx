import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import signinHandler from "../lib/api/signinHandler";

function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();
  const [error, setError] = useState<false | string>(false);
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const error = await signinHandler(email, password);
    error ? setError(error) : router.push("/panel/campaigns");
  }
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form shadow-xl">
        <h3 className="form-title">SIGN IN</h3>
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
        {error ? <p>{error}</p> : null}
        <input type="submit" value="Sign In" className="btn-high" />
      </form>
    </div>
  );
}

export default SignIn;
