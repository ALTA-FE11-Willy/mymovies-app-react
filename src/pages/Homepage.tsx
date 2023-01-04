import { Component, useState } from "react";
import "../styles/Homepage.css";
import axios from "axios";
import Layout from "../components/Layout";
import Carrousel from "../components/Carrousel";
import { CardNowPlaying } from "../components/Card";
import { SkeletonLoading } from "../components/Loading";

interface DatasType {
  id: number;
  title: string;
  poster_path: string;
}

interface PropsType {}

interface StateType {
  loading: boolean;
  datas: DatasType[];
}

export default class Homepage extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      datas: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${
          import.meta.env.VITE_API_KEY
        }&language=en-US&page=1`
      )
      .then((data) => {
        const { results } = data.data;
        this.setState({ datas: results });
        console.log(results);
      })
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
        <Carrousel />
        <div className="text-center font-bold text-5xl mt-9">
          <p>Now Playing</p>
        </div>
        <div className="grid grid-cols-5 gap-4 my-9 mx-28">
          {this.state.loading
            ? [...Array(8).keys()].map((data) => <SkeletonLoading />)
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
