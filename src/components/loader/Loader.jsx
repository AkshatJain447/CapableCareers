import { TailSpin } from "react-loader-spinner";
const Loader = () => {
  return (
    <div className="grid place-content-center w-full h-[300px]">
      <TailSpin height={"80px"} width={"80px"} color="#404c6c" />
    </div>
  );
};
export default Loader;
