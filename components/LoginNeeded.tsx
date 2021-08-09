import Link from "next/link";

function LoginNeeded() {
  return (
    <div className="message-container" id="login-needed">
      <div className="message">
        <p>
          It seems like you're not authenticated, please{" "}
          <Link href="/signin">
            <a>click here</a>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginNeeded;
