import "../css/Home.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Home() {
  const [ani, setAni] = useState([]);

  useEffect(() => {
    getAnimal();
  }, []);

  const getAnimal = async () => {
    let alist = [];
    for (var i = 0; i < 5; i++) {
      const result = await axios.get(`https://dog.ceo/api/breeds/image/random`);
      alist.push(result.data.message);
      const opsult = await axios.get(
        `https://api.thecatapi.com/v1/images/search?limit=1`
      );
      alist.push(opsult.data[0].url);
    }
    setAni(alist);
    console.log(ani);
  };

  const settings = {
    initialSlide: 0,
    dots: false, // 슬라이드 밑에 점 보이게 함
    infinite: true, // 무한으로 반복
    speed: 300,
    autoplay: true,
    autoplaySpeed: 3000, // 넘어가는 속도
    slidesToScroll: 1, // 1장씩 뒤로 넘어가게
    centerMode: true,
    centerPadding: "0px", // 0px 하면 슬라이드 끝쪽 이미지가 안잘림
    pauseOnHover: false,
  };

  let animal = ani.map((data) => (
    <div key={data} id="my-slide-element">
      <img src={data} alt={data} />
    </div>
  ));

  return (
    <div id="home">
      <Slider {...settings}>{animal}</Slider>
    </div>
  );
}

export default Home;
