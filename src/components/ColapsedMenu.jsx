import { Link } from "react-router-dom";
function ColapsedMenu(props) {
  return (
    <div
      className={`w-full bg-white flex flex-col items-center -mt-6 gap-4 p-2 md:hidden ${props.visible}`}
    >
      <Link to="/">
        <button>Home</button>
      </Link>
      <Link to="/Search">
        <button>Search</button>
      </Link>
      <Link to="/">
        <button>Favorites</button>
      </Link>
    </div>
  );
}

export default ColapsedMenu;
