import { useSelector, useDispatch } from "react-redux";
import { useGetPokemonByNameQuery } from "./services/pokemon";
import { addFavorite, removeFavorite } from "../src/redux/pokemonSlice";
import type { RootState } from "./store";

const App = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.pokemon.favorites);
  const { data, isLoading } = useGetPokemonByNameQuery("pikachu");
  const error = useSelector((state: RootState) => state.pokemon.error);
  const errorMessage = useSelector(
    (state: RootState) => state.pokemon.errorMessage
  ); // 新增的選擇器

  console.log("error", error);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{errorMessage}</div>;

  const isFavorite = favorites.includes(data.name);

  return (
    <div>
      <h1>{data.name}</h1>
      <div>
        {isFavorite ? (
          <button onClick={() => dispatch(removeFavorite(data.name))}>
            Remove from Favorites
          </button>
        ) : (
          <button onClick={() => dispatch(addFavorite(data.name))}>
            Add to Favorites
          </button>
        )}
      </div>
      <div>
        <h2>Favorite Pokémon is</h2>
        <ul>
          {favorites.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
