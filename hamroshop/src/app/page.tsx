import React from 'react';

const Home = () => {
  return (
    <div className="hero bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="hero-section flex flex-col-reverse lg:flex-row justify-center items-center w-full max-w-6xl px-4">
        <div className="txt text-center lg:text-left max-w-lg mt-8 lg:mt-0 lg:mr-12">
          <h1 className="text-3xl lg:text-4xl italic font-bold text-gray-800">
            Welcome To My Shop
          </h1>
          <p className="mt-4 text-gray-600">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit,
            odio dolor? Nesciunt incidunt dolores eligendi, aperiam ut porro in
            laborum laudantium perspiciatis, blanditiis eveniet id sapiente
            facilis iusto velit provident?
          </p>
          <button className="p-2 mt-6 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition duration-300">
            Read more
          </button>
        </div>
        <div className="img max-w-xs lg:max-w-sm h-auto">
          <img
            src={`img/hero-img.png`}
            alt="hero img"
            className="w-full object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
