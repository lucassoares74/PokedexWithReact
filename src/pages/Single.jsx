import Navbar from "./../components/Navbar";
import Banner from "./../components/Banner";
import Footer from "./../components/Footer";
import ColapsedMenu from "./../components/ColapsedMenu";
import React, { useEffect, useState } from "react";
import axios from "axios";
import SingleContent from "./../components/SingleContent";

function Single() {
  const [isOpen, setisOpen] = useState(false);
  const [isOpenInput, setisOpenInput] = useState(false);
  const [Pokemon, setPokemon] = useState();
  const [PokemonEspecies, setPokemonEspecies] = useState();
  const [loading, setloading] = useState(true);
  const [EvoChain, setEvoChain] = useState();
  const [pokemonName, setpokemonName] = useState("arcanine");

  //#region fetch api
  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`)
      .then((response) => {
        const data = response.data;
        setPokemonEspecies(data);
        setloading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar Pokémon:", error);
      });

    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((r2) => {
        const data2 = r2.data;
        setPokemon(data2);
      })
      .catch((error) => {
        console.error("Erro ao buscar Pokémon:", error);
      });
    if (PokemonEspecies) {
      axios
        .get(PokemonEspecies.evolution_chain.url)
        .then((r3) => {
          const data3 = r3.data;
          setEvoChain(data3);
        })
        .catch((error) => {
          console.error("Erro ao buscar Pokémon:", error);
        });
    }
  }, [pokemonName, PokemonEspecies]); //#endregion

  function _openCollapsedMenu() {
    if (isOpen == false) {
      setisOpen(true);
    } else {
      setisOpen(false);
    }
  }
  function _openSearchInput() {
    console.log(EvoChain);

    if (isOpenInput == false) {
      setisOpenInput(true);
    } else {
      setisOpenInput(false);
    }
  }

  return (
    <div className="w-screen min-h-screen bg-[#f2f4f5] flex flex-col sm:px-19 gap-6">
      <Navbar
        _openSearchInput={_openSearchInput}
        _openCollapsedMenu={_openCollapsedMenu}
        searchDisplay={isOpenInput ? "block" : ""}
        searchDisplayOthers={isOpenInput ? "hidden" : "flex"}
      ></Navbar>
      <ColapsedMenu visible={isOpen ? "" : "hidden"} />
      <Banner name={pokemonName}></Banner>
      <SingleContent
        pokemonEspecies={PokemonEspecies}
        loading={loading}
        evoChain={EvoChain}
        pokemon={Pokemon}
      ></SingleContent>
      <Footer></Footer>
    </div>
  );
}

export default Single;
