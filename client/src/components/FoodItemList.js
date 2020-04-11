import React from 'react';
import FoodItemDetail from "./FoodItemDetail";




const FoodItemList = (props) => {

	if (!props.foodItems){
	  return (<p>Loading...</p>)
	}

	const foodItems = props.foodItems.map((foodItem, index) => {
	  return (
	    <li key={index} className="component-item">
	    <div className="component">
      <FoodItemDetail foodItem={foodItem}/>
	    </div>
	    </li>
	  )
	})

	return (
	  <ul className="component-list">
	    {foodItems}
	  </ul>
	)
}
 export default FoodItemList;
