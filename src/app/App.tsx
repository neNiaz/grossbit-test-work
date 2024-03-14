import "./styles/App.scss";
import { FC } from "react";
import { ConverterInfo } from "../shared/pages";

interface Props {}

const App: FC<Props> = () => {
  return (
    <div className={"App"}>
      <ConverterInfo />
    </div>
  );
};

export default App;
