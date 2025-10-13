import axios from "axios";
import React, { useEffect, useState } from "react";


type MealType = {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strMealThumb: string;
};

const Component = () => {
  const [meal, setMeal] = useState<MealType[]>();

  const [search, setsearch] = useState<string>("");
  const [Loading, setLoading] = useState<boolean>(false);
  const [Error, setError] = useState<string>("");

  const FechtMeal = async (query: string) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      setMeal(res.data.meals || []);
    } catch (error) {
      setError("something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  FechtMeal("chicken")
  }, [])

  const handleData = (e:React.FormEvent) => {
    e.preventDefault()
    if (!search.trim) {
      return
    }
    
    FechtMeal(search)
  }

  return (
    <div>
      <div className="w-full flex justify-center mt-10">
        <h1 className="text-3xl font-bold ">🍽Recipe Finder</h1>
      </div>
      
      <div className="w-full flex justify-center mt-5 px-14">
        <form onSubmit={handleData} className="flex justify-center flex-col space-x-5 space-y-3  sm:flex-row w-lg">

        <input
          type="text"
          placeholder="search "
          value={search}
          onChange={(e) => setsearch(e.target.value)}
          className=" w-full  border-1 p-1 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 "
        />
        <button className="bg-amber-500 py-1 px-4 h-9  rounded-md text-white" type="submit">
          search
        </button>
        </form>
      </div>

      <br />
      
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 sm:px-10 lg:px-20">
        
         <div>
          {Loading && }
         </div>
        
        {
          meal?.map((meals) => (

            
            
            <div key={meals.idMeal} className="shadow-lg flex-col hover:scale-105 transform-transition duration-300 space-y-4 rounded-2xl">
              <img src={meals.strMealThumb} alt={meals.strArea} className="w-full h-48 md:h-56 lg:h-64 object-cover rounded-t-2xl" />
               
               <h1 className=" px-3 font-semibold text-2xl">{meals.strMeal}</h1>
            <div className="flex justify-center space-x-10 p-5">

              <h3 className="bg-amber-200 px-3 rounded-2xl">{meals.strCategory}</h3>
              <h3 className="bg-green-300 px-3 rounded-2xl">{meals.strArea}</h3>
              
            </div>
            </div>



          ))
        }
       </div>
      
    </div>
  );
};

export default Component;
