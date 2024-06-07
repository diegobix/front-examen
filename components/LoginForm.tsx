import { FunctionComponent } from "preact";

type Props = {
  showError: boolean;
};

const LoginForm: FunctionComponent<Props> = ({ showError }) => {
  return (
    <div class="login-container">
      <h2>Login</h2>
      {showError && (
        <p class="error-message">
          Incorrect credentials or user does not exist
        </p>
      )}
      <form action="/login" method="post">
        <label for="email">Email</label>
        <input type="text" name="email" id="email" required />
        <label for="password">Password</label>
        <input type="password" name="password" id="password" />
        <button type="submit">Login</button>
        <p class="register-link">
          {"Don't have an account? "}
          <a href="/register">Register</a>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
