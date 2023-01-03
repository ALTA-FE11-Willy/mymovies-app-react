import { Component, useState } from "react";
import "../styles/ListFavorite.css";

import Layout from "../components/Layout";
import { CardMyFavorite } from "../components/Card";

interface DatasType {
  id: number;
  title: string;
  image: string;
}

export default class ListFavorite extends Component {
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
        ],
        loading: false,
      });
    }, 1000);
  }
  render() {
    return (
      <Layout>
        <div className="text-center font-bold text-5xl mt-9">
          <p>My Favorite</p>
        </div>
        <div className="grid grid-cols-4 gap-3 my-9 mx-9">
          {this.state.loading ? (
            <p>Loading...</p>
          ) : (
            this.state.datas.map((data: DatasType) => (
              <CardMyFavorite
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
