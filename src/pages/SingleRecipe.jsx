import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { recipecontext } from "../context/RecipeContext";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const SingleRecipe = () => {
  const { data, setdata } = useContext(recipecontext);
  const params = useParams();
  const recipe = data.find((recipe) => params.id == recipe.id);
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: recipe?.title,
      chef: recipe?.chef,
      image: recipe?.image,
      desc: recipe?.desc,
      inst: recipe?.inst,
      ingr: recipe?.ingr,
    },
  });

  const UpdateHandler = (recipe) => {
    const index = data.findIndex((recipe) => params.id == recipe.id);
    const copydata = [...data];
    copydata[index] = { ...copydata[index], ...recipe };
    setdata(copydata);
    localStorage.setItem("recipes", JSON.stringify(copydata));
    toast.success("Recipe Updated");
  };

  const DeleteHandler = () => {
    const filterdata = data.filter((r) => r.id != params.id);
    setdata(filterdata);
    localStorage.setItem("recipes", JSON.stringify(filterdata));

    const updatedFav = favourite.filter((f) => f.id !== params.id);
    setFavourite(updatedFav);
    localStorage.setItem("fav", JSON.stringify(updatedFav));

    toast.success("Recipe Deleted");
    navigate("/recipes");
  };

  const [favourite, setFavourite] = useState(
    JSON.parse(localStorage.getItem("fav")) || []
  );

  const FavHandler = () => {
    let copyFav = [...favourite];
    copyFav.push(recipe);
    setFavourite(copyFav);
    localStorage.setItem("fav", JSON.stringify(copyFav));
  };

  const UnFavHandler = () => {
    const filterFav = favourite.filter((f) => f.id != recipe?.id);
    setFavourite(filterFav);
    localStorage.setItem("fav", JSON.stringify(filterFav));
  };

  useEffect(() => {
    console.log("singleRecipe.jsx Mounted");
    return () => {
      console.log("singleRecipe.jsx Unmounted");
    };
  }, [favourite]);

  return recipe ? (
    <div className="w-full flex">
      <div className=" relative left w-1/2 p-10">
        {favourite.find((f) => f.id == recipe?.id) ? (
          <i
            onClick={UnFavHandler}
            className="right-[5%] absolute text-3xl text-red-400 ri-heart-fill"
          ></i>
        ) : (
          <i
            onClick={FavHandler}
            className="right-[5%] absolute text-3xl text-red-400 ri-heart-line"
          ></i>
        )}
        <h1 className="text-5xl font-black">{recipe.title}</h1>
        <img className="h-[20vh]" src={recipe.image} />
        <h1>{recipe.chef}</h1>
        <p>{recipe.desc}</p>
      </div>

      <form className="w-1/2 p-2" onSubmit={handleSubmit(UpdateHandler)}>
        <input
          className="block border-b outline-0 p-2"
          {...register("image")}
          type="url"
          placeholder="Enter Image url"
        />
        <small className="text-red-400">This is error</small>

        <input
          className="block border-b outline-0 p-2"
          {...register("title")}
          type="text"
          placeholder="Recipe Title"
        />

        <input
          className="block border-b outline-0 p-2"
          {...register("chef")}
          type="text"
          placeholder="Chef Name"
        />

        <textarea
          className="block border-b outline-0 p-2"
          {...register("desc")}
          placeholder="start from here"
        ></textarea>

        <textarea
          className="block border-b outline-0 p-2"
          {...register("ing")}
          placeholder="write ingredients seperated by comma"
        ></textarea>

        <textarea
          className="block border-b outline-0 p-2"
          {...register("inst")}
          placeholder="write instructions seperated by comma"
        ></textarea>

        <select
          className="block border-b outline-0 p-2"
          {...register("category")}
        >
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="supper">Supper</option>
          <option value="dinner">Dinner</option>
        </select>

        <button className="block mt-5 bg-blue-900 px-4 py-2 rounded">
          Update Recipe
        </button>
        <button
          onClick={DeleteHandler}
          className="block mt-5 bg-red-900 px-4 py-2 rounded"
        >
          Delete Recipe
        </button>
      </form>
    </div>
  ) : (
    "Loading..."
  );
};

export default SingleRecipe;
