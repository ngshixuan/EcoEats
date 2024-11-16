import { LiaBinocularsSolid } from "react-icons/lia";
import { GoGoal } from "react-icons/go";
import { GiImpactPoint } from "react-icons/gi";


const About = () => {
 return (
   <div
     style={{ backgroundColor: "rgb(196,243,199)" }}
     className="p-12 text-center flex flex-col items-center"
   >
     <div className="w-4/5">
       <div className="mb-8">
         <h1 className="text-7xl vanBold mb-8">Our Ambition</h1>
         <p className="text-2xl">
           We're working to end food waste. To do so, we're assembling a
           passionate team of problem-solvers to help us make this happen. From
           customer care to sales, marketing to public affairs. We give you a
           chance to use your talent for good.
         </p>
       </div>
       <div className="flex justify-center gap-8">
         <div className="flex flex-col items-center">
           <GoGoal size={128} />
           <h1 className="vanBold text-3xl my-4">Mission</h1>
           <p>To inspire and empower everyone to fight food waste together.</p>
         </div>
         <div className="flex flex-col items-center">
           <LiaBinocularsSolid size={128} />
           <h1 className="vanBold text-3xl my-4">Vision</h1>
           <p>We dream of a planet with no food waste.</p>
         </div>
         <div className="flex flex-col items-center">
           <GiImpactPoint size={128} />
           <h1 className="vanBold text-3xl my-4">Impact</h1>
           <p>We are a social impact activist, making real change.</p>
         </div>
       </div>
     </div>
   </div>
 );
};


export default About;