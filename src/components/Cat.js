import "../css/Cat.css";
import axios from "axios";
import queryString from "query-string";
import { useEffect, useState } from "react";

function Cat() {
  const [catimg, setCatimg] = useState("");
  const [cat, setCat] = useState("Abyssinian");
  const [num, setNum] = useState(1);
  const [search, setSearch] = useState("");
  const [full, setFull] = useState("");
  const [page, setPage] = useState("");

  useEffect(() => {
    getCat();
  }, [cat, num]);

  const getCat = async () => {
    const queryObj = queryString.parse(window.location.search);
    const query = queryObj.query;

    if (query) {
      if (query.indexOf("-") !== -1) {
        //console.log(query);
        const de = query.indexOf("-");
        setSearch(query.slice(0, de));
        const subb = query.slice(de + 1);
        setCat(subb);
        setFull(query);
      } else {
        setSearch(query.slice(0, 4));
        setCat(query);
        setFull(query);
      }
    }
    //console.log(cat, search);

    const len = await axios.get(
      `https://api.thecatapi.com/v1/images/search?limit=100&breed_ids=${search}`
    );
    setPage(len.data);
    //console.log(page);

    try {
      const result = await axios.get(
        `https://api.thecatapi.com/v1/images/search?breed_ids=${search}&page=${num}`
      );
      setCatimg(result.data[0].url);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        alert("없는 종 입니다.");
        window.location.href = "/cat";
      } else {
        alert("에러 발생");
        window.location.href = "/cat";
      }
    }
  };

  const changecat = (e) => {
    window.location.href = "/cat?query=" + e.target.value;
  };

  const changeNum = () => {
    if (num >= page.length) {
      setNum(1);
    } else {
      setNum(num + 1);
    }
  };

  const wiki = () => {
    window.open.name = "_blank";
    window.location.href = `https://ko.wikipedia.org/w/index.php?search=${cat}&ns0=1&searchToken=8uhr1bea6pbzcjlf9t3uh693h`;
  };
  return (
    <div id="cat">
      <img src={catimg} alt={catimg} />
      <button className="catbtn" onClick={changeNum}>
        next
      </button>
      <div className="cats">{cat}</div>
      <div className="catnum">
        {catimg.length >= 1 ? num + "/" + page.length : "0/0"}
      </div>
      <select className="cat-selector" onChange={changecat} value={full}>
        <option value="Abyssinian">Abyssinian</option>
        <option value="Aegean">Aegean</option>
        <option value="abob-American Bobtail">American Bobtail</option>
        <option value="acur-American Curl">American Curl</option>
        <option value="awir-American Wirehair">American Wirehair</option>
        <option value="amau-Arabian Mau">Arabian Mau</option>
        <option value="amis-Australian Mist">Australian Mist</option>
        <option value="Balinese">Balinese</option>
        <option value="Bambino">Bambino</option>
        <option value="Bengal">Bengal</option>
        <option value="Birman">Birman</option>
        <option value="Bombay">Bombay</option>
        <option value="bslo-British Longhair">British Longhair</option>
        <option value="bsho-British Shorthair">British Shorthair</option>
        <option value="bure-Burmese">Burmese</option>
        <option value="buri-Burmilla">Burmilla</option>
        <option value="cspa-California Spangled">California Spangled</option>
        <option value="ctif-Chantilly-Tiffany">Chantilly-Tiffany</option>
        <option value="Chartreux">Chartreux</option>
        <option value="Chausie">Chausie</option>
        <option value="Cheetoh">Cheetoh</option>
        <option value="csho-Colorpoint Shorthair">Colorpoint Shorthair</option>
        <option value="crex-Cornish Rex">Cornish Rex</option>
        <option value="Cymric">Cymric</option>
        <option value="Cyprus">Cyprus</option>
        <option value="drex-Devon Rex">Devon Rex</option>
        <option value="Donskoy">Donskoy</option>
        <option value="lihu-Dragon Li">Dragon Li</option>
        <option value="emau-Egyptian Mau">Egyptian Mau</option>
        <option value="ebur-European Burmese">European Burmese</option>
        <option value="esho-Exotic Shorthair">Exotic Shorthair</option>
        <option value="hbro-Havana Brown">Havana Brown</option>
        <option value="Himalayan">Himalayan</option>
        <option value="jbob-Japanese Bobtail">Japanese Bobtail</option>
        <option value="Javanese">Javanese</option>
        <option value="Khao Manee">Khao Manee</option>
        <option value="Korat">Korat</option>
        <option value="Kurilian">Kurilian</option>
        <option value="LaPerm">LaPerm</option>
        <option value="mcoo-Maine Coon">Maine Coon</option>
        <option value="Malayan">Malayan</option>
        <option value="Manx">Manx</option>
        <option value="Munchkin">Munchkin</option>
        <option value="Nebelung">Nebelung</option>
        <option value="Norwegian Forest Cat">Norwegian Forest Cat</option>
        <option value="Ocicat">Ocicat</option>
        <option value="Oriental">Oriental</option>
        <option value="Persian">Persian</option>
        <option value="Pixie-bob">Pixie-bob</option>
        <option value="Ragamuffin">Ragamuffin</option>
        <option value="Ragdoll">Ragdoll</option>
        <option value="rblu-Russian Blue">Russian Blue</option>
        <option value="Savannah">Savannah</option>
        <option value="sfol-Scottish Fold">Scottish Fold</option>
        <option value="srex-Selkirk Rex">Selkirk Rex</option>
        <option value="Siamese">Siamese</option>
        <option value="Siberian">Siberian</option>
        <option value="Singapura">Singapura</option>
        <option value="Snowshoe">Snowshoe</option>
        <option value="Somali">Somali</option>
        <option value="Sphynx">Sphynx</option>
        <option value="Tonkinese">Tonkinese</option>
        <option value="Toyger">Toyger</option>
        <option value="tang-Turkish Angora">Turkish Angora</option>
        <option value="tvan-Turkish Van">Turkish Van</option>
        <option value="ycho-York Chocolate">York Chocolate</option>
      </select>

      <div
        className="find"
        onClick={() =>
          window.open(
            `https://ko.wikipedia.org/w/index.php?search=${cat}&ns0=1&searchToken=8uhr1bea6pbzcjlf9t3uh693h`,
            "_blank"
          )
        }
      >
        ?
      </div>
    </div>
  );
}

export default Cat;
