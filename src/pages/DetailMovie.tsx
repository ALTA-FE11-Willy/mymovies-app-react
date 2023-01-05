import { Component, useState } from "react";
import "../styles/Detail.css";
import axios from "axios";

import Layout from "../components/Layout";
import Card, { CardDetail } from "../components/Card";
import { SkeletonLoading } from "../components/Loading";
import { MovieType } from "../utils/types/movie";
import { withRouter } from "../utils/navigation";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

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
  genres?: any;
}

interface PropsType {
  params?: any;
}

export interface VideosType {
  id?: string;
  key?: string;
  name?: string;
}

interface StateType {
  loading: boolean;
  datas: DatasType[];
  data: DataType;
  id_movie: number;
  videos: VideosType[];
}

class DetailMovie extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      data: {},
      datas: [],
      loading: true,
      id_movie: 0,
      videos: [],
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const { id_movie } = this.props.params;
    let nowPlaying = `https://api.themoviedb.org/3/movie/now_playing?api_key=${
      import.meta.env.VITE_API_KEY
    }&language=en-US&page=1`;
    let selectedMovie = `https://api.themoviedb.org/3/movie/${id_movie}?api_key=${
      import.meta.env.VITE_API_KEY
    }&language=en-US&append_to_response=videos`;

    const requestNowPlaying = axios.get(nowPlaying);
    const requestSelectedMovie = axios.get(selectedMovie);

    axios
      .all([requestNowPlaying, requestSelectedMovie])
      .then(
        axios.spread((...responses) => {
          const responseNowPlaying = responses[0].data.results;
          const responseSelectedMovie = responses[1].data;
          const responseSelectedMovieTrailer = responses[1].data.videos.results;

          this.setState({ datas: responseNowPlaying });
          this.setState({ data: responseSelectedMovie });
          this.setState({ videos: responseSelectedMovieTrailer });
        })
      )
      .catch((error) => {
        alert(error.toString());
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  handleFavorite(data: MovieType) {
    const checkExist = localStorage.getItem("FavMovie");
    if (checkExist) {
      let parseFav: MovieType[] = JSON.parse(checkExist);

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
        <Carousel showStatus={false} showIndicators={false} showThumbs={false}>
          {this.state.videos.slice(0, 3).map((data, key) => (
            <div key={key}>
              <iframe
                width="100%"
                height="415"
                src={`https://www.youtube.com/embed/${data.key}`}
                title={data.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          ))}
        </Carousel>
        <div className="text-center font-bold text-5xl mt-9">
          <p>Similar Movie</p>
        </div>
        <div className="grid grid-cols-5 gap-4 my-9 mx-28 ">
          {this.state.loading
            ? [...Array(8).keys()].map((data) => <SkeletonLoading key={data} />)
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
      </Layout>
    );
  }
}

export default withRouter(DetailMovie);
