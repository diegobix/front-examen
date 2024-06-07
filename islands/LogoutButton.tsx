import { FunctionComponent } from "preact";

const LogoutButton: FunctionComponent = () => {
  const logout = () => {
    document.cookie = "auth=; path=/;";
    window.location.href = "/login";
  };

  return <a class="logout-button" onClick={() => logout()}>Logout</a>;
};

export default LogoutButton;
