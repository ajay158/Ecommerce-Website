import React from 'react';
// import ASd from '../../public/img/hero-img.png';
// import Image from 'next/image';

const Home = () => {
  return (
    <div>
      <div className="hero ">
        <div className="hero-section flex justify-evenly mt-32">
          <div className="txt ml-28">
            <h1 className="text-5xl italic">Welcome To My Shop</h1>
            <p className="mt-5 w-2/3">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit,
              odio dolor? Nesciunt incidunt dolores eligendi, aperiam ut porro
              in laborum laudantium perspiciatis, blanditiis eveniet id sapiente
              facilis iusto velit provident?
            </p>
            <button className="p-2 mt-5 bg-blue-500 rounded text-white hover:font-bold ">
              Read more
            </button>
          </div>
          <div className="img h-auto max-w-md mr-28">
            <img
              src={`img/hero-img.png`}
              alt="hero img"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
