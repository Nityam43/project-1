import { Link } from "react-router-dom";

const RecipeCard = (props) => {
  const { id, image, title, desc, chef } = props.recipe;
  return (
    <Link
      to={`/recipes/details/${id}`}
      className="duration-150 hover:scale-101 mr-3 mb-3 w-[23vw] rounded overflow-hidden block shadow"
    >
      <img className="w-full h-[20vh] object-cover" src={image} alt="" />
      <h1 className="mt-2 font-black px-2">{title}</h1>
      <small className="px-2 text-red-400">{chef}</small>
      <p className="px-2 pb-3">
        {desc.slice(0, 100)}... <small className="text-blue-400">more</small>
      </p>
    </Link>

    // <div key={recipe.id}>
    //   <h1>{recipe.title}</h1>
    // </div>
  );
};

export default RecipeCard;
