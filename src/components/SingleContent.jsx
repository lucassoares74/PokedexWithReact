import { UploadCloudIcon } from "lucide-react";

function SingleContent({ pokemonEspecies, loading, evoChain, pokemon }) {
  if (loading || !pokemonEspecies) {
    return <div>Carregando...</div>;
  }

  const renderEvolutionChain = (node) => {
    if (!node) return null;

    return (
      <>
        <li className="text-gray-800 font-medium">{node.species.name}</li>
        {node.evolves_to?.map((child, i) => (
          <ul
            key={i}
            className="ml-4 border-l-2 border-gray-300 pl-4 space-y-2"
          >
            {renderEvolutionChain(child)}
          </ul>
        ))}
      </>
    );
  };

  return (
    <div className="grid grid-cols-2 grid-rows-3 gap-4">
      <div className=" bg-white rounded-md flex place-items-center text-2xl text-center">
        <h1>
          {pokemonEspecies.flavor_text_entries[5].flavor_text.replace(
            /[\n\f]/g,
            " "
          )}
        </h1>
      </div>
      <div>
        <h1 className="text-black text-2xl font-semibold mb-4">
          Evolution Chain
        </h1>
        <div className="p-6 bg-white rounded-md">
          <ul className="ml-4 border-l-2 border-gray-300 pl-4 space-y-2">
            {evoChain ? renderEvolutionChain(evoChain.chain) : null}
          </ul>
        </div>
      </div>
      <div>
        <h1 className="text-black text-2xl font-semibold mb-4">Abilities</h1>
        <div>
          <ul className="flex gap-2 text-2xl">
            {pokemon
              ? pokemon.abilities.map((a) => {
                  return (
                    <li className="bg-white p-3 rounded-md">
                      {a.ability.name}
                    </li>
                  );
                })
              : ""}
          </ul>
        </div>
      </div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
    </div>
  );
}

export default SingleContent;
