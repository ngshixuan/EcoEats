import salad from '../assets/images/ChickenSalad.png'
const HomeMessage = () => {
  return (
    <div className="py-8 bg-white flex items-center justify-evenly mb-12">
      <div className="  w-2/5 ">

        <h1 className="vanBold text-4xl pb-2 border-b-2 border-black">LET'S SAVE THE FOOD</h1>
        <p className="mt-4 text-lg">We stand firmly against waste in all its forms – be it food, time, or opportunities. At Myecoeats, we are dedicated to creating meaningful change that reverberates through our planet and society. Take a stand with us today and contribute to a movement that's making a real difference. Together, let's combat food waste and build a sustainable future for all.</p>
      </div>
      <div className="">
        <img src={salad} alt="" className="h-64" />
      </div>
    </div>
  );
};

export default HomeMessage;