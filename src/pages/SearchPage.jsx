import Navbar from "./../components/Navbar";
import ColapsedMenu from "./../components/ColapsedMenu";
import React, { useEffect, useState } from "react";
import axios from "axios";
import GridSearch from "./../components/GridSearch";
import Banner from "./../components/Banner";
import Footer from "./../components/Footer";



function SearchPage() {
  const [isOpen, setisOpen] = useState(false);
  const [isOpenInput, setisOpenInput] = useState(false);
  const [Pokemon, setPokemon] = useState();
  const [loading, setloading] = useState(true);
  const [pokemonName, setpokemonName] = useState("");

  useEffect(() => {
    async function GetPokemons() {
      try {
        const res = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=1000"
        );
        const list = res.data.results;
        const detalhes = await Promise.all(list.map((p) => axios.get(p.url)));
        const dadosCompletos = detalhes.map((r) => r.data);
        setPokemon(dadosCompletos);
        setloading(false);
      } catch (error) {
        console.error("Erro ao carregar Pokémon:", error);
      }
    }
    GetPokemons();
  }, []);

  function _openCollapsedMenu() {
    if (isOpen == false) {
      setisOpen(true);
    } else {
      setisOpen(false);
    }
  }
  function _openSearchInput() {
    console.log("foi bb");
    console.log(Pokemon);
    if (isOpenInput == false) {
      setisOpenInput(true);
    } else {
      setisOpenInput(false);
    }
  }

  function puxar_dados(input) {
    setpokemonName(input);
  }
  return (
    <div className="w-screen min-h-screen bg-[#f2f4f5] flex flex-col sm:px-19 gap-6">
      <Navbar
        _openSearchInput={_openSearchInput}
        _openCollapsedMenu={_openCollapsedMenu}
        searchDisplay={isOpenInput ? "block" : ""}
        searchDisplayOthers={isOpenInput ? "hidden" : "flex"}
        puxar_dados={puxar_dados}
      ></Navbar>
      <ColapsedMenu visible={isOpen ? "" : "hidden"} />
      <Banner></Banner>
      <GridSearch
        pokemonName={pokemonName}
        pokemon={loading ? {} : Pokemon}
        loading={loading}
      ></GridSearch>
      <Footer></Footer>
    </div>
  );
}

export default SearchPage;
