import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <ul id="navMenu" role="menu-bar">
      <li role="menu-item" aria-haspopup="false">
        <Link to="/">Home</Link>
        </li>
      <li role="menu-item" aria-haspopup="false">
        <Link to="/intro">Getting Started</Link>
        </li>
      <li role="menu-item" aria-haspopup="false">
        <Link to="/bytebuilder">Byte Builder</Link>
        </li>
      <li role="menu-item" aria-haspopup="false">
        <Link to="/reference">Reference</Link>
        </li>
    </ul>
  );
}