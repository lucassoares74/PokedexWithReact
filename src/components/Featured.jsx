import { useNavigate } from "react-router-dom";

function Featured(props) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-2xl  font-light">Featured Pokémon</div>
      <ul
        className={`${
          props.loading
            ? "flex justify-center"
            : "grid lg:grid-cols-4 xl:grid-cols-6 grid-cols-2 gap-6"
        }`}
      >
        {props.loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-30 w-30 border-t-4 border-b-4 border-blue-500"></div>
          </div>
        ) : (
          props.pokemons.map((a) => {
            if (a.id <= 18) {
              return (
                <li
                  onClick={() => navigate(`/Single?nome=${a.name}`)}
                  key={a.id}
                  className="bg-white px-12 py-6 items-center justify-center rounded-md"
                >
                  <h1 className="text-center">{a.name}</h1>
                  <img src={a.sprites.front_default} alt="" />
                </li>
              );
            }
          })
        )}
      </ul>
    </div>
  );
}

export default Featured;
