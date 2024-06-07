import { PageProps } from "$fresh/server.ts";
import MainContainer from "../components/MainContainer.tsx";
import Menu from "../components/Menu.tsx";
import { State } from "../types.ts";

export default ({ Component, state }: PageProps<unknown, State>) => {
  return (
    <MainContainer>
      <Menu name={state.name} />
      <Component />
    </MainContainer>
  );
};
