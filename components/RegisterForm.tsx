import { FunctionComponent } from "preact";

type Props = {
  showError: boolean;
};

const RegisterForm: FunctionComponent<Props> = ({ showError }) => {
  return (
    <div class="register-container">
      <h2>Register</h2>
      {showError && (
        <p class="error-message">
          Email already used
        </p>
      )}
      <form action="/register" method="post">
        <label for="name">Full Name</label>
        <input type="text" name="name" id="name" required />
        <label for="email">Email</label>
        <input type="email" name="email" id="email" required />
        <label for="password">Password</label>
        <input type="password" name="password" id="password" required />
        <button type="submit">Register</button>
        <p class="register-link">
          {"Already have an account? "} <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
