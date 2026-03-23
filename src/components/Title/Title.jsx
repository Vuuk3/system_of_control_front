import { Helmet } from "react-helmet";
import main from "./main.ico";

function Title({ text }) {
  return (
    <>
      <Helmet>
        <link rel="icon" href={main} />
        <title>{text}</title>
      </Helmet>
    </>
  );
}

export default Title;
