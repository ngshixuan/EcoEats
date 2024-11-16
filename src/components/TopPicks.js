import no_products from "../assets/images/empty.png";
import Shop from "../pages/Shop";

const TopPicks = () => {
 

  return (
    <div
      className="relative bg-white"
      style={{ backgroundColor: "rgb(196,243,199)" }}
    >
      <div className="p-12">
        <h1 className="vanBold text-5xl mb-8">Top Picks</h1>
          <Shop forTopPicks={true}/>
      </div>
    </div>
  );
};

export default TopPicks;