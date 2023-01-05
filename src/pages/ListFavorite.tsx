import { Component, useState } from "react";
import "../styles/ListFavorite.css";

import Layout from "../components/Layout";
import CardNowPlaying, { CardMyFavorite } from "../components/Card";
import { MovieType } from "../utils/types/movie";

interface PropsType {}

interface StateType {
  loading: boolean;
  datas: MovieType[];
}

export default class ListFavorite extends Component<PropsType, StateType> {
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
    const getFavorite = localStorage.getItem("FavMovie");
    if (getFavorite) {
      this.setState({ datas: JSON.parse(getFavorite) });
    }
    this.setState({ loading: false });
  }

  removeFavorite(data: MovieType) {
    /*
    Menghapus data (object) di dalam sebuah array of object.
    TODO: Update tampilan ketika data sudah berhasil dihapus
    TODO: Tambahkan konfirmasi ulang sebelum melakukan penghapusan data untuk mencegah terjadinya salah klik
    */
    let dupeDatas: MovieType[] = this.state.datas.slice();
    const filterData = dupeDatas.filter((item) => item.id !== data.id);
    localStorage.setItem("FavMovie", JSON.stringify(filterData));
    alert(`Delete ${data.title} from favorite list`);
  }

  render() {
    return (
      <Layout>
        <div className="text-center font-bold text-5xl mt-9">
          <p>My Favorite</p>
        </div>
        <div className="grid grid-cols-5 gap-4 my-9 mx-28">
          {this.state.loading ? (
            <p>Loading...</p>
          ) : (
            this.state.datas.map((data) => (
              <CardNowPlaying
                key={data.id}
                title={data.title}
                image={data.poster_path}
                id={data.id}
                labelButton="REMOVE FROM FAVORITE"
                onClickFav={() => this.removeFavorite(data)}
              />
            ))
          )}
        </div>
      </Layout>
    );
  }
}
