import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function GridSearch(props) {
  const [searchParams] = useSearchParams();
  const nome = searchParams.get("nome");
  const [nameN, setnameN] = useState(nome || "");
  const [filtered, setfiltered] = useState([]);
  const [isArr, setisArr] = useState(false);

  useEffect(() => {
    if (props.pokemonName) {
      setnameN(props.pokemonName);
    }
  }, [props.pokemonName]);

  useEffect(() => {
    if (!props.loading) {
      const newList = props.pokemon.filter((a) =>
        a.name.toLowerCase().includes(nameN.trim().toLowerCase())
      );
      setfiltered(newList);
      if (newList.length !== 0) {
        setisArr(false);
      } else {
        setisArr(true);
      }
    }
  }, [nameN, props.pokemon, props.loading]);

  function spinner() {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-30 w-30 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  function grid() {
    if (filtered.length !== 0) {
      return filtered.map((b) => (
        <li
          key={b.id}
          className="bg-white px-12 py-6 items-center justify-center rounded-md"
        >
          <h1 className="text-center">{b.name}</h1>
          <img src={b.sprites.front_default} alt="" />
        </li>
      ));
    } else {
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
          props.loading || isArr
            ? "flex justify-center"
            : "grid lg:grid-cols-4 xl:grid-cols-6 grid-cols-2 gap-6"
        }
      >
        {props.loading ? spinner() : grid()}
      </ul>
    </div>
  );
}

export default GridSearch;
