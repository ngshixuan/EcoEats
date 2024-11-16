const Card = ({ item, handleClick }) => {
    const { id, title, price, description, expiry, imageURL } = item;
  
    // Convert the expiry date format
    const formattedExpiry = new Date(expiry).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  
    const handleAddToCart = () => {
        handleClick(item);
    }
  
    return (
      <div className="w-1/5">
        <div className="bg-white  rounded-xl mx-4 my-4">
          <div className="flex justify-center pt-4">
            <img src={imageURL} alt="" className="w-4/5 h-36 object-contain" />
          </div>
          <div className="p-5 mb-2">
            <div className="flex items-center justify-center">
              <h5 className="vanBold text-xl uppercase">{title}</h5>
            </div>
            <div className="flex items-center justify-center">
              <h5 className="vanRegular text-md">Expiry: {expiry}</h5>
            </div>
            <div className="mb-4 mt-2">
              <hr className="mb-1"></hr>
              <p className="vanBold text-center">Description</p>
              <hr className="mt-1 mb-2"></hr>
              <div className="h-24">
                <p className="mb-2 whitespace-normal">{description}</p>
              </div>
            </div>
            <h5 className="text-lg">{`RM ${price}`}</h5>
          </div>
        </div>
          <button
          onClick={handleAddToCart}
          className="border-solid border-4 p-1 inline-block border-black text-md vanRegular"
          >
            Add to Cart
          </button>
      </div>
    );
  };
  
  export default Card;