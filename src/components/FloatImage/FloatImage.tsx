import sloganImage from "../../assets/imgs/slogan.png"

const FloatImage = () => {
  return (
    <div className="w-full lg:w-1/2 flex justify-center items-center relative mt-8 lg:mt-4">
      <div className="w-[90%] lg:w-full max-w-lg rounded-3xl shadow-xl overflow-hidden animate-[float_6s_ease-in-out_infinite]">
        <img
          src={sloganImage}
          alt="Slogan"
          className="w-full h-auto object-cover rounded-3xl"
        />
      </div>
    </div>
  );
};

export default FloatImage;
