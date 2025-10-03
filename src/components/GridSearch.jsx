import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function GridSearch(props) {
  const [searchParams] = useSearchParams();
  const nome = searchParams.get("nome");
  const [nameN, setnameN] = useState(nome || "");
  const [filtered, setfiltered] = useState([]);
  const [isArr, setisArr] = useState(false);
  const [currentPage, setcurrentPage] = useState(0);
  const [fulllist, setfulllist] = useState([]);
  const itemsPerPage = 18;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  useEffect(() => {
    if (props.pokemonName) {
      setnameN(props.pokemonName);
      setcurrentPage(0);
    }
  }, [props.pokemonName]);

  useEffect(() => {
    if (!props.loading) {
      const newList = props.pokemon.filter((a) => {
        return a.name.toLowerCase().includes(nameN.trim().toLowerCase());
      });
      setfulllist(newList);
      const definitive = newList.slice(startIndex, endIndex);
      setfiltered(definitive);

      if (newList.length !== 0) {
        setisArr(false);
      } else {
        setisArr(true);
      }
    }
  }, [nameN, props.pokemon, props.loading, startIndex, endIndex]);

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

  function _button() {
    if (props.loading) {
      console.log("ainda não foi");
    } else {
      return (
        <div className="flex gap-3">
          <button
            onClick={() => {
              setcurrentPage((prev) => Math.max(prev - 1, 0));
              console.log("aaaaaaaaaaaaaaquiiiii: " + currentPage);
            }}
            className={`bg-slate-400 text-white px-4 py-2 rounded ${
              currentPage === 0 ? "hidden" : ""
            }`}
          >
            Anterior
          </button>
          <button
            className={`bg-slate-400 text-white px-4 py-2 rounded ${
              currentPage === Math.ceil(fulllist.length / itemsPerPage) - 1
                ? "hidden"
                : ""
            }`}
            onClick={() => {
              setcurrentPage((prev) =>
                prev + 1 < Math.ceil(fulllist.length / itemsPerPage)
                  ? prev + 1
                  : prev
              );
            }}
          >
            Proximo
          </button>
        </div>
      );
    }
  }

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <ul
        className={
          props.loading || isArr
            ? "flex justify-center"
            : "grid lg:grid-cols-4 xl:grid-cols-6 grid-cols-2 gap-6"
        }
      >
        {props.loading ? spinner() : grid()}
      </ul>
      {_button()}
    </div>
  );
}

export default GridSearch;
