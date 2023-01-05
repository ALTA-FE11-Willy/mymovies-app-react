import { Component, useState } from "react";
import "../styles/Homepage.css";
import axios from "axios";
import Layout from "../components/Layout";
import Card from "../components/Card";
import { SkeletonLoading } from "../components/Loading";
import { MovieType } from "../utils/types/movie";
import { Carousel } from "react-responsive-carousel";

interface PropsType {}

interface StateType {
  loading: boolean;
  datas: MovieType[];
  page: number;
  totalPage: number;
}

export default class Homepage extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      datas: [],
      loading: true,
      page: 1,
      totalPage: 1,
    };
  }

  componentDidMount() {
    this.fetchData(1);
  }

  fetchData(page: number) {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${
          import.meta.env.VITE_API_KEY
        }&language=en-US&page=${page}`
      )
      .then((data) => {
        const { results, total_pages } = data.data;
        this.setState({ datas: results, totalPage: total_pages });
      })
      .catch((error) => {
        alert(error.toString());
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  nextPage() {
    const newPage = this.state.page + 1;
    this.setState({ page: newPage });
    this.fetchData(newPage);
  }

  prevPage() {
    const newPage = this.state.page - 1;
    this.setState({ page: newPage });
    this.fetchData(newPage);
  }

  handleFavorite(data: MovieType) {
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

  render() {
    return (
      <Layout>
        <Carousel showStatus={false} showIndicators={false} showThumbs={false}>
          {this.state.datas.slice(0, 5).map((data, key) => (
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
          {this.state.loading
            ? [...Array(20).keys()].map((data) => (
                <SkeletonLoading key={data} />
              ))
            : this.state.datas.map((data) => (
                <Card
                  key={data.id}
                  title={data.title}
                  image={data.poster_path}
                  id={data.id}
                  labelButton="ADD TO FAVORITE"
                  onClickFav={() => this.handleFavorite(data)}
                />
              ))}
        </div>
        <div className="btn-group w-full justify-center">
          <button
            className="btn"
            onClick={() => this.prevPage()}
            disabled={this.state.page === 1}
          >
            «
          </button>
          <button className="btn">{this.state.page}</button>
          <button
            className="btn"
            onClick={() => this.nextPage()}
            disabled={this.state.page === this.state.totalPage}
          >
            »
          </button>
        </div>
      </Layout>
    );
  }
}
