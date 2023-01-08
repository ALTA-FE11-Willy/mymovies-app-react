import { useState, useEffect } from "react";
import "../styles/Homepage.css";
import axios from "axios";
import Layout from "../components/Layout";
import Card from "../components/Card";
import SkeletonLoading from "../components/Loading";
import { MovieType } from "../utils/types/movie";
import { Carousel } from "react-responsive-carousel";
import { useTitle } from "../utils/hooks/useTitle";

const Homepage = () => {
  useTitle("YMovies! - Now Playing Movie");
  const [datas, setDatas] = useState<MovieType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);

  // this.state = {
  //   datas: [],
  //   loading: true,
  //   page: 1,
  //   totalPage: 1,
  // };

  useEffect(() => {
    fetchData(1);
  }, []);

  // componentDidMount() {
  //   this.fetchData(1);
  // }

  function fetchData(page: number) {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${
          import.meta.env.VITE_API_KEY
        }&language=en-US&page=${page}`
      )
      .then((data) => {
        const { results, total_pages } = data.data;
        setDatas(results);
        setTotalPage(total_pages);
      })
      .catch((error) => {
        alert(error.toString());
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function nextPage() {
    const newPage = page + 1;
    setPage(newPage);
    fetchData(newPage);
  }

  function prevPage() {
    const newPage = page - 1;
    setPage(newPage);
    fetchData(newPage);
  }

  function handleFavorite(data: MovieType) {
    const checkExist = localStorage.getItem("FavMovie");
    if (checkExist) {
      let parseFav: MovieType[] = JSON.parse(checkExist);
      let exist = parseFav.filter((clicked) => clicked.id === data.id);
      let inExist = exist[0];

      if (inExist !== undefined) {
        alert("Movie already added in favorite");
        return;
      }
      parseFav.push(data);
      localStorage.setItem("FavMovie", JSON.stringify(parseFav));
    } else {
      localStorage.setItem("FavMovie", JSON.stringify([data]));
      alert("Movie added to favorite");
    }
  }

  return (
    <Layout>
      <Carousel showStatus={false} showIndicators={false} showThumbs={false}>
        {datas.slice(0, 5).map((data, key) => (
          <div key={key}>
            <img
              className="relative"
              style={{ filter: "brightness(50%)" }}
              src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
              alt=""
            />
            <div className="absolute h-full w-full left-auto top-1/3 text-7xl align-middle font-bold tracking-wider">
              {data.title}
            </div>
          </div>
        ))}
      </Carousel>
      <div className="text-center font-bold text-5xl mt-9">
        <p>Now Playing</p>
      </div>
      <div className="grid grid-cols-5 gap-4 my-9 mx-28">
        {loading
          ? [...Array(20).keys()].map((data) => <SkeletonLoading key={data} />)
          : datas.map((data) => (
              <Card
                key={data.id}
                title={data.title}
                image={data.poster_path}
                id={data.id}
                labelButton="ADD TO FAVORITE"
                onClickFav={() => handleFavorite(data)}
              />
            ))}
      </div>
      <div className="btn-group w-full justify-center">
        <button
          className="btn"
          onClick={() => prevPage()}
          disabled={page === 1}
        >
          «
        </button>
        <button className="btn">{page}</button>
        <button
          className="btn"
          onClick={() => nextPage()}
          disabled={page === totalPage}
        >
          »
        </button>
      </div>
    </Layout>
  );
};

export default Homepage;
