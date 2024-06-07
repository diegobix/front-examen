import { FunctionComponent } from "preact";

const MainContainer: FunctionComponent = ({ children }) => {
  return (
    <div class="page-container">
      {children}
    </div>
  );
};

export default MainContainer;
