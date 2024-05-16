import { collection, onSnapshot } from "firebase/firestore";
import { database } from "../../firebase/firebaseConfig";
import { useEffect, useState } from "react";
import Event from "../Event/Event";

const Events = () => {
  const collectionRef = collection(database, "Events");
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    onSnapshot(collectionRef, (snapshot) => {
      const eventArr = [];
      snapshot.forEach((doc) => {
        eventArr.push(doc.data());
      });
      setEventList(eventArr);
    });
  }, []);

  return (
    <>
      <h1 className="text-3xl font-semibold tracking-wide w-[95%] lg:w-[85%] bg-primaryDark text-white py-2 px-6 my-4 m-auto shadow-md rounded-md">
        Looking for Events, here are all active events:
      </h1>
      <ul className="shadow-xl border border-gray-100 w-[95%] text-justify lg:w-[85%] mb-5 mx-auto rounded-lg p-1">
        {eventList.map((event) => (
          <Event key={event.title} event={event} />
        ))}
      </ul>
    </>
  );
};

export default Events;
