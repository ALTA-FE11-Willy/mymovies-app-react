import { useState, useEffect } from "react";
import "../styles/ListFavorite.css";

import Layout from "../components/Layout";
import CardNowPlaying from "../components/Card";
import { MovieType } from "../utils/types/movie";
import { useTitle } from "../utils/hooks/useTitle";

interface PropsType {}

interface StateType {
  loading: boolean;
  datas: MovieType[];
}

const ListFavorite = () => {
  useTitle("YMovies! - Your Favorite Movie");
  const [datas, setDatas] = useState<MovieType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  // constructor(props: PropsType) {
  //   super(props);
  //   this.state = {
  //     datas: [],
  //     loading: true,
  //   };
  // }

  useEffect(() => {
    fetchData();
  }, [0]);

  function fetchData() {
    const getFavorite = localStorage.getItem("FavMovie");
    if (getFavorite) {
      setDatas(JSON.parse(getFavorite));
    }
    setLoading(false);
  }

  function removeFavorite(data: MovieType) {
    /*
    Menghapus data (object) di dalam sebuah array of object.
    TODO: Update tampilan ketika data sudah berhasil dihapus
    TODO: Tambahkan konfirmasi ulang sebelum melakukan penghapusan data untuk mencegah terjadinya salah klik
    */
    let dupeDatas: MovieType[] = datas.slice();
    const filterData = dupeDatas.filter((item) => item.id !== data.id);
    localStorage.setItem("FavMovie", JSON.stringify(filterData));
    alert(`Delete ${data.title} from favorite list`);
  }

  return (
    <Layout>
      <div className="text-center font-bold text-5xl mt-9">
        <p>My Favorite</p>
      </div>
      <div className="grid grid-cols-5 gap-4 my-9 mx-28">
        {loading ? (
          <p>Loading...</p>
        ) : (
          datas.map((data) => (
            <CardNowPlaying
              key={data.id}
              title={data.title}
              image={data.poster_path}
              id={data.id}
              labelButton="REMOVE FROM FAVORITE"
              onClickFav={() => removeFavorite(data)}
            />
          ))
        )}
      </div>
    </Layout>
  );
};

export default ListFavorite;
