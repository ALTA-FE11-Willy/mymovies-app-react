import { Component, useState } from "react";
import "../styles/Homepage.css";

import Layout from "../components/Layout";
import Carrousel from "../components/Carrousel";
import { CardNowPlaying } from "../components/Card";

interface DatasType {
  id: number;
  title: string;
  image: string;
}

export default class Homepage extends Component {
  state = {
    datas: [],
    loading: true,
  };
  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    setTimeout(() => {
      this.setState({
        datas: [
          {
            id: 1,
            title: "Avengers 1",
            image: "https://pbs.twimg.com/media/FY-BpW9XwAIXIui.jpg",
          },
          {
            id: 2,
            title: "Avengers 2",
            image: "https://pbs.twimg.com/media/FY-BpW9XwAIXIui.jpg",
          },
          {
            id: 3,
            title: "Avengers 3",
            image: "https://pbs.twimg.com/media/FY-BpW9XwAIXIui.jpg",
          },
          {
            id: 4,
            title: "Avengers 4",
            image: "https://pbs.twimg.com/media/FY-BpW9XwAIXIui.jpg",
          },
          {
            id: 5,
            title: "Avengers 5",
            image: "https://pbs.twimg.com/media/FY-BpW9XwAIXIui.jpg",
          },
          {
            id: 6,
            title: "Avengers 6",
            image: "https://pbs.twimg.com/media/FY-BpW9XwAIXIui.jpg",
          },
        ],
        loading: false,
      });
    }, 1000);
  }
  render() {
    return (
      <Layout>
        <Carrousel />
        <div className="text-center font-bold text-5xl mt-9">
          <p>Now Playing</p>
        </div>
        <div className="grid grid-cols-5 gap-3 my-9 mx-9">
          {this.state.loading ? (
            <p>Loading...</p>
          ) : (
            this.state.datas.map((data: DatasType) => (
              <CardNowPlaying
                key={data.id}
                title={data.title}
                image={data.image}
              />
            ))
          )}
        </div>
      </Layout>
    );
  }
}
