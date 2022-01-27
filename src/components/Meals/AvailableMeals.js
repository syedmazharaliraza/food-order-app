import React, { useState, useEffect } from 'react'
import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';


function AvailableMeals() {
  const [mealsList, setMealsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const fetchMeals = async () => {
      try {
        const response = await fetch("https://react-http-56bc0-default-rtdb.firebaseio.com/meals.json");
 
        if (!response.ok) {
          throw new Error('Something went wrong');
        }

        const fetchedMeals = await response.json();


        const updatedMealsList = [];

        for (const key in fetchedMeals) {
          updatedMealsList.push({
            id: key,
            name: fetchedMeals[key].name,
            description: fetchedMeals[key].description,
            price: fetchedMeals[key].price,
          });
        }

        setMealsList(updatedMealsList);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setFetchError(err);
      }
    }

    fetchMeals();

  }, []);

  return (
    <section className={classes.meals}>
      <Card>
        {isLoading && <p>Loading available meals...</p>}
        {fetchError && <p>Something Went Wrong</p>}
        <ul>
          {mealsList.map(meal => {
            return <MealItem id={meal.id} key={meal.id} name={meal.name} description={meal.description} price={meal.price} />;
          })}
        </ul>
      </Card>
    </section>
  )
}

export default AvailableMeals

