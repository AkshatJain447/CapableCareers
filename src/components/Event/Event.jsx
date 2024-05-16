const Event = ({ event }) => {
  console.log(event);
  return (
    <li className="border flex flex-col lg:place-items-center lg:flex-row border-gray-300 hover:shadow-lg duration-200 hover:border-gray-500 rounded-md p-1 m-2 mb-3">
      <ul className="flex flex-col p-1 w-full lg:w-[85%]">
        <li>
          <span className="font-semibold">Event Title:</span> {event.title}
        </li>
        <li>
          <span className="font-semibold">Field:</span> {event.field}
        </li>
        <li>
          <span className="font-semibold">Event Description:</span>
          {event.description}
        </li>
        <li>
          <span className="font-semibold">Event DeadLine:</span> {event.date}
        </li>
      </ul>
      <button className="h-fit border p-2 w-fit lg:m-auto place-self-end lg:place-self-auto hover:scale-105 hover:border-secondary hover:text-secondary duration-200 shadow-sm hover:shadow-md font-semibold bg-gray-200 text-gray-800 hover:bg-white rounded-md cursor-pointer">
        Register for this event
      </button>
    </li>
  );
};

export default Event;
