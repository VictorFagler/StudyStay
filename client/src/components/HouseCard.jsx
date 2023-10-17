// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// export default function HouseCard() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     // Make an API request to fetch your MongoDB data
//     fetch("http://localhost:5000/listings") // Replace with your API endpoint
//       .then((res) => res.json())
//       .then((res) => {
//         if (Array.isArray(res)) {
//           setData(res);
//         } else {
//           console.error("API did not return an array of data:", res);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   }, []);

//   return (
//     <div className="flex flex-wrap w-30 h-30 justify-center m-4">
//       {data.map((item, index) => (
//         <Link key={index} to={`/listings/${item._id}`}>
//           <div key={index} className="w-[18rem] h-[26rem] m-4">
//             <div className=" h-[12rem] w-full">
//               {item.images.length > 0 && (
//                 <img
//                   src={`data:${item.images[0].contentType};${item.images[0].data[0]}`}
//                   alt={item.title}
//                   className="h-full w-full object-cover rounded-xl"
//                 />
//               )}
//             </div>
//             <div className="flex justify-between font-bold ">
//               {item.street} {item.streetNumber} <span>{item.city}</span>
//             </div>
//             <div className="flex justify-between my-2">{item.price} kr/mån <span>BRF</span></div>
//             <div className="flex justify-between">
//               {item.rooms} RoK <span>{item.size}m² </span>
//             </div>
//           </div>
//         </Link>
//       ))}
//     </div>
//   );
// }
