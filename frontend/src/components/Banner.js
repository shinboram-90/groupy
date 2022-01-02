import logo from "../assets/logo.svg";
import "../styles/Banner.css";

function Banner() {
  const title = "Groupomania";
  return (
    <div className="lmj-banner">
      <img src={logo} alt="La maisonjungle" className="lmj-logo" />
      <h1 className="lmj-title">{title}</h1>
    </div>
  );
}

export default Banner;
