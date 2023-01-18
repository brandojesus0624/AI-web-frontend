import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Collection = () => {
  const settings = {
    centerMode: true,
    centerPadding: '10px',
    slidesToShow: 6,
    speed: 500,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          arrows: true,
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          arrows: true,
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          arrows: false,
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="flex flex-col w-full px-8 md:px-16 py-8 mt-16 shadow-xl rounded-3xl">
      <h1 className="font-poppinsBold text-4xl md:text-5xl text-gray-900 mt-8" id="name">Gustavo</h1>
      <span className="text-gray-600 text-sm" id="created_date">16.01.2023.</span>
      <div className="flex mt-6 w-full" id="image_gallery">
        <Slider {...settings}>
          <img src={require("../../assets/img/demo(1).png")} className="rounded-xl mr-9" />
          <img src={require("../../assets/img/demo(2).png")} className="rounded-xl mr-9" />
          <img src={require("../../assets/img/demo(3).png")} className="rounded-xl mr-9" />
          <img src={require("../../assets/img/demo(4).png")} className="rounded-xl mr-9" />
          <img src={require("../../assets/img/demo(5).png")} className="rounded-xl mr-9" />
          <img src={require("../../assets/img/demo(6).png")} className="rounded-xl mr-9" />
        </Slider>
      </div>
      <div className="flex justify-center">
        <button className="bg-primary-600 rounded-lg px-11 py-2.5 mt-6 text-white font-poppinsSemiBold text-sm" >View Collection</button>
      </div>
    </div>
  );
};

export default Collection;
