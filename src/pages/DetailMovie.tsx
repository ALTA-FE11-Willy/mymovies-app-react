import { Component, useState } from "react";
import "../styles/Detail.css";
import axios from "axios";

import Layout from "../components/Layout";
import { CardDetail, CardNowPlaying } from "../components/Card";
import { SkeletonLoading } from "../components/Loading";

interface DatasType {
  id: number;
  title: string;
  poster_path: string;
}

type GenreType = {
  id?: number;
  name?: string;
};

interface DataType {
  id?: number;
  title?: string;
  poster_path?: string;
  backdrop_path?: string;
  overview?: string;
  release_date?: string;
  runtime?: number;
  genres?: GenreType[];
}

interface PropsType {}

interface StateType {
  loading: boolean;
  datas: DatasType[];
  data: DataType;
}

export default class Homepage extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      data: {},
      datas: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    let nowPlaying = `https://api.themoviedb.org/3/movie/now_playing?api_key=${
      import.meta.env.VITE_API_KEY
    }&language=en-US&page=1`;
    let selectedMovie = `https://api.themoviedb.org/3/movie/683328?api_key=${
      import.meta.env.VITE_API_KEY
    }&language=en-US`;

    const requestNowPlaying = axios.get(nowPlaying);
    const requestSelectedMovie = axios.get(selectedMovie);

    axios
      .all([requestNowPlaying, requestSelectedMovie])
      .then(
        axios.spread((...responses) => {
          const responseNowPlaying = responses[0].data.results;
          const responseSelectedMovie = responses[1].data;
          this.setState({ datas: responseNowPlaying });
          this.setState({ data: responseSelectedMovie });
          console.log(responseSelectedMovie);
        })
      )
      .catch((error) => {
        alert(error.toString());
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }
  render() {
    return (
      <Layout>
        <div
          className="w-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${this.state.data.backdrop_path})`,
          }}
        >
          <div className="flex justify-center p-28 bg-gradient-to-t from-white  dark:from-black">
            <CardDetail
              key={this.state.data.id}
              title={this.state.data.title}
              poster_path={this.state.data.poster_path}
              overview={this.state.data.overview}
              release_date={this.state.data.release_date}
              runtime={this.state.data.runtime}
              genres={this.state.data.genres}
            />
          </div>
        </div>
        <div className="text-center font-bold text-5xl mt-9">
          <p>Similar Movie</p>
        </div>
        <div className="grid grid-cols-5 gap-4 my-9 mx-28 ">
          {this.state.loading
            ? [...Array(8).keys()].map((data) => <SkeletonLoading key={data} />)
            : this.state.datas
                .slice(0, 10)
                .map((data) => (
                  <CardNowPlaying
                    key={data.id}
                    title={data.title}
                    image={data.poster_path}
                  />
                ))}
        </div>
      </Layout>
    );
  }
}
