import { FunctionComponent } from "preact";
import LogoutButton from "../islands/LogoutButton.tsx";

type Props = {
  name: string;
};

const Menu: FunctionComponent<Props> = ({ name }) => {
  return (
    <header class="header-container">
      <div class="header-content">
        <span class="user-name">{name}</span>
        <LogoutButton />
      </div>
    </header>
  );
};

export default Menu;
