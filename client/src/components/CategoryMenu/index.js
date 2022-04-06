import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState';
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from '../../utils/actions';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';

function CategoryMenu() {
  const [state, dispatch] = useStoreContext();

  const { categories } = state;

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (categoryData) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });
      categoryData.categories.forEach((category) => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      idbPromise('categories', 'get').then((categories) => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories,
        });
      });
    }
  }, [categoryData, loading, dispatch]);

  const handleClick = (id) => {
    console.log(id);
    if(id.includes("f", 23)) 
    {
      document.body.style.backgroundImage = "url(./images/Background/BirthdayBr.jpg)";
    } 
    else if (id.includes("0", 23)) 
    {
      document.body.style.backgroundImage = "url(./images/Background/CongratsBr.jpg)";
    } 
    else if (id.includes("1", 23)) 
    {
      document.body.style.backgroundImage = "url(./images/Background/EasterBr.jpg)";
    } 
    else if (id.includes("2", 23)) 
    {
      document.body.style.backgroundImage = "url(./images/Background/GiftBr.jpg)";
    } 
    else if (id.includes("3", 23)) 
    {
      document.body.style.backgroundImage = "url(./images/Background/JustCauseBr.jpg)";
    } 
    else if (id.includes("4", 23)) 
    {
      document.body.style.backgroundImage = "url(./images/Background/LoveBr.jpg)";
    } 
    else if (id.includes("5", 23)) 
    {
      document.body.style.backgroundImage = "url(./images/Background/MomBr.jpg)";
    } 
    else if (id.includes("6", 23)) 
    {
      document.body.style.backgroundImage = "url(./images/Background/SympathyBr.jpg)";
    }
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
  };

  return (
    <div>
      <br/><br/>
      {/* <h2>Choose a Category:</h2> */}
      {categories.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
