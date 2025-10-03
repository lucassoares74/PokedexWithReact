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
    <div>
      <div className="grid grid-cols-2 grid-rows-2 gap-4">
        <div className=" bg-white rounded-md flex place-items-center text-2xl text-center">
          <h1>
            {pokemonEspecies.flavor_text_entries[5].flavor_text.replace(
              /[\n\f]/g,
              " "
            )}
          </h1>
        </div>
        <div>
          <h1 className="text-black text-2xl font-semibold mb-4">stats</h1>
          <ul>
            {pokemon.stats.map((b) => (
              <li>
                <div className="space-y-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      {b.stat.name}
                    </span>
                    <span className="text-sm font-bold text-gray-900">
                      {b.base_stat}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-green-500 h-4 rounded-full"
                      style={{ width: "80%" }}
                    ></div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col ">
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
      </div>
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col">
          <h1 className="text-black text-2xl font-semibold mb-4">Sprites</h1>
          <div className="flex gap-8">
            <img
              src={pokemon.sprites.back_default}
              alt="Sprite 1"
              className="w-32 h-32 object-contain"
            />
            <img
              src={pokemon.sprites.front_default}
              alt="Sprite 4"
              className="w-32 h-32  object-contain"
            />
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-black text-2xl font-semibold mb-4">Moves</h1>
          <ul className="flex flex-wrap gap-2 text-sm font-medium">
            {pokemon.moves.map((c) => {
              return (
                <li className="bg-white text-gray-800 px-2 py-1 rounded shadow-sm">
                  {c.move.name}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SingleContent;
