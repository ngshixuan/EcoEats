import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const CartItem = ({ item }) => {

    const {removeFromCart} = useContext(CartContext);
    const { id, title, price, description, imageURL } = item;
  
    const handleRemove = () => {
        removeFromCart(id);
    }
  
    return (
      <div className="flex items-center">
        <div>
          <img src={imageURL} className="h-20 pr-2 w-32 object-contain" alt="" />
        </div>
        <div className="grow flex justify-between">
          <div>
            <p className="vanBold text-lg">{title}</p>
            <p className="vanRegular text-md text-neutral-700">{`RM ${price}`}</p>
          </div>
  
          <div className="flex items-center gap-4">
            <p>{`RM ${price}`}</p>
            <button
              className="border-solid border-2 border-neutral-500 p-1 rounded-sm text-red-500"
              onClick={handleRemove}
            >
              x
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default CartItem;