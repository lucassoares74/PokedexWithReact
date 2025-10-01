import { Search, CircleUser, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useRef } from "react";

function Navbar(props) {
  const [inputText, setinputText] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef(null);

  useEffect(() => {
    // foca no input assim que o componente renderizar
    inputRef.current.focus();
  }, [props.searchDisplay]);

  return (
    <div className="bg-[#feffff] p-6 flex justify-center items-center rounded-md">
      <div
        className={
          `md:flex gap-2 items-center basis-1/3 ` + props.searchDisplayOthers
        }
      >
        <div>
          <img
            className="h-11 w-11"
            src="/Pokebola-pokeball-png-0.png"
            alt=""
          />
        </div>
        <div className="text-4xl font-bold">Pokédex</div>
      </div>
      <div className="text-2xl gap-6 basis-1/3 justify-center hidden md:flex">
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/Search">
          <button>Search</button>
        </Link>
        <Link to="/home">
          <button>Favorites</button>
        </Link>
      </div>
      <div className="basis-1/3 text-3xl flex justify-end gap-2">
        <button
          onClick={() => props._openCollapsedMenu()}
          className="md:hidden"
        >
          <Menu />
        </button>
        <button>
          <CircleUser />
        </button>
        <div className="flex justify-center items-center ">
          <button
            onClick={() => {
              props._openSearchInput();
            }}
          >
            <Search />
          </button>
          <input
            ref={inputRef}
            type="text"
            className={
              `text-2xl bg-white border-2 hidden` + props.searchDisplay
            }
            onChange={(event) => {
              if (location.pathname === "/") {
                setTimeout(() => {
                  navigate(`/Search?nome=${event.target.value}`);
                }, 500); // 500ms de atraso
              } else {
                setinputText(event.target.value);
                props.puxar_dados(inputText);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
