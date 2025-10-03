import { useLocation } from "react-router-dom";

function Banner({ name }) {
  const location = useLocation();
  return (
    <div className="w-full h-[400px] bg-gradient-to-r from-white via-blue-100 to-blue-200 p-6 rounded-lg hidden md:flex -mt-6 items-center justify-center gap-2">
      <img
        className="w-80 h-80 object-cover rounded-md shadow-lg"
        src={
          location.pathname === "/" || location.pathname === "/Search"
            ? `https://www.pngarts.com/files/3/Pokemon-Pikachu-Transparent-Image.png`
            : `https://img.pokemondb.net/artwork/${name}.jpg`
        }
        alt=""
      />
      <h1 className="text-4xl font-extrabold text-slate-700 drop-shadow-md tracking-wide uppercase">
        {location.pathname === "/" || location.pathname === "/Search"
          ? "Catch them all"
          : name}
      </h1>
    </div>
  );
}

export default Banner;
