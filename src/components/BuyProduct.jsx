import { useEffect, useState } from "react"
import { getFoods } from "../api";

const CartItem = ({item}) => {

  const [selectedQty, setSelectedQty] = useState(Array(item.foodName.length).fill(0));

  const countHandler = (available, index, value) => {

    if(value < 0){
      alert('invalid quantity')
      return false;
    } else if(value > available){
      alert('stock not available')
      return false;
    } else {
      const newArray = [...selectedQty];
      newArray[index] = value;
      setSelectedQty(newArray);
      localStorage.setItem(item.cartId, newArray);
      return true;
    }
  }
  
  return (
    <>
      <p> Cart : {item.cartId}</p>
      <div style={{ margin: '10px', padding: '2px', border: '1px solid white', borderRadius: '5px'}}>
        {item.foodName.map((food, index) => {

          const [count, setCount] = useState(selectedQty[index]);

          return (
            <div key={index} style={{display: 'flex', justifyContent: 'center', width: '600px' }}>

              <div style={{ width: '400px' }}>
                <p> {food} </p>
              </div>

              <div style={{display: 'flex', justifyContent: 'center', width: '200px', padding: '2px' }} >
                <button 
                  style={{ margin: '1px' }} 
                  onClick={() => { 
                    if(countHandler(item.qty[index], index, count - 1)){ 
                      setCount(count-1);
                    }
                  }}
                > - </button>

                <p style={{ margin: '10px', padding: '1px' }}> {count} </p>

                <button 
                  style={{ margin: '1px' }} 
                  onClick={() => {
                    if(countHandler(item.qty[index],index, count + 1)){
                      setCount(count+1);
                    }
                  }}
                > + </button>

              </div>
            </div>
          )
        })}
      </div>
    </>
  );
}

const BuyProduct = () => {

  const [foods, setFoods] = useState([]);

  const submitHandler = () => {

    for(let i = 0; i<foods.length; i++){
      console.log('cart Id :', foods[i].cartId);
      console.log('Items :', foods[i].foodName);
      console.log('Available Qty :', foods[i].qty);
      console.log('Ordered Qty :', localStorage.getItem(foods[i].cartId));
    }
  }

  useEffect(() => {

    async function getData(){
      let response = await getFoods();
      let foods = response.data;
      setFoods(foods);
    }

    getData();
  }, []);
  return (
    <>
      {foods.map((food, index) => {
        return(<div key={index}> <CartItem item={food} /> </div>)
      })}

      <button onClick={() => submitHandler()}> Proceed to buy </button>
    </>

  )
}

export default BuyProduct