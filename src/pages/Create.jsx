import { nanoid } from "nanoid";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { recipecontext } from "../context/RecipeContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate()
  const { data, setdata } = useContext(recipecontext);
  const { register, handleSubmit, reset } = useForm();

  const submitHandler = (recipe) => {
    recipe.id = nanoid();
    console.log(recipe);
    const copydata = [...data];
    copydata.push(recipe);
    setdata(copydata);

    // Sort form for the above code.
    // setdata([...data, recipe]);
    localStorage.setItem("recipes", JSON.stringify(copydata))
    toast.success("New recipe created!");

    reset();
    navigate("/recipes")
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
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

      <button className="block mt-5 bg-gray-900 px-4 py-2 rounded">
        Save Recipe
      </button>
    </form>
  );
};

export default Create;
