import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function GridSearch(props) {
  const [searchParams] = useSearchParams();
  const nome = searchParams.get("nome");
  let nomeme = "";
  let isArray = false;
  const [Isarray, setIsarray] = useState(false);

  if (nome) {
    nomeme = nome;
  }

  const [nameN, setnameN] = useState(nomeme);

  useEffect(() => {
    setIsarray(isArray);
  }, [isArray, nameN]);

  useEffect(() => {
    if (props.pokemonName) {
      setnameN(props.pokemonName);
    }
  }, [props.pokemonName]);

  function spinner() {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-30 w-30 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  function grid(poke, name) {
    const newList = poke.filter((a) =>
      a.name.includes(name.trim(name.toLowerCase()))
    );

    if (newList.length !== 0) {
      isArray = false;
      console.log("esse é mesmo: " + isArray);
      return newList.map((b) => (
        <li
          key={b.id}
          className="bg-white px-12 py-6 items-center justify-center rounded-md"
        >
          <h1 className="text-center">{b.name}</h1>
          <img src={b.sprites.front_default} alt="" />
        </li>
      ));
    } else {
      isArray = true;
      console.log("esse é mesmo: " + isArray);
      return (
        <li>
          <div>
            <h1 className="text-5xl">Não encontrado</h1>
          </div>
        </li>
      );
    }
  }

  return (
    <div>
      <ul
        className={
          props.loading || Isarray
            ? "flex justify-center"
            : "grid lg:grid-cols-4 xl:grid-cols-6 grid-cols-2 gap-6"
        }
      >
        {props.loading ? spinner() : grid(props.pokemon, nameN)}
      </ul>
    </div>
  );
}

export default GridSearch;
