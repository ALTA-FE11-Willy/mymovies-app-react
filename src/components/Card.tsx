import React, { Component } from "react";
import Button from "./Button";
import moment from "moment";
import { withRouter } from "../utils/navigation";

type GenreType = {
  id: number;
  name: string;
};

interface CardProps {
  id?: number;
  title?: string;
  poster_path?: string;
  overview?: string;
  release_date?: string;
  runtime?: number;
  genres?: GenreType[];
  image?: string;
  labelButton?: string;
  onClickFav?: () => void;
  navigate?: any;
  params?: any;
}
export class Card extends Component<CardProps> {
  onClickDetail() {
    this.props.navigate(`/movie/${this.props.id}`);
  }

  render() {
    return (
      <div className="card card-compact  bg-base-100 shadow-xl  hover:scale-105 hover:z-10 duration-300 ">
        <figure onClick={() => this.onClickDetail()}>
          <img
            src={`https://image.tmdb.org/t/p/w500${this.props.image}`}
            alt={this.props.title}
          />
        </figure>
        <div className="card-body justify-between">
          <h2
            className="card-title justify-center text-center"
            onClick={() => this.onClickDetail()}
          >
            {" "}
            {this.props.title}
          </h2>

          <div className="card-actions w-full justify-center">
            <Button
              label={this.props.labelButton}
              onClick={this.props.onClickFav}
            />
          </div>
        </div>
      </div>
    );
  }
}

export class CardMyFavorite extends Component<CardProps> {
  onClickDetail() {
    this.props.navigate(`/movie/${this.props.id}`);
  }
  render() {
    return (
      <div className="card card-compact  bg-base-100 shadow-xl ">
        <figure onClick={() => this.onClickDetail()}>
          <img
            src={`https://image.tmdb.org/t/p/w500${this.props.image}`}
            alt={this.props.title}
          />
        </figure>
        <div className="card-body ">
          <h2
            className="card-title justify-center"
            onClick={() => this.onClickDetail()}
          >
            {" "}
            {this.props.title}
          </h2>
          <div className="card-actions justify-end">
            <Button
              className="btn  text-[#f0e9d2]"
              label={this.props.labelButton}
              onClick={this.props.onClickFav}
            ></Button>
          </div>
        </div>
      </div>
    );
  }
}

export class CardDetail extends Component<CardProps> {
  render() {
    return (
      <div className="card lg:card-side glass shadow-xl px-16 py-16 ">
        <figure className="w-1/2">
          <img
            className=" "
            src={`https://image.tmdb.org/t/p/w342${this.props.poster_path}`}
            alt={this.props.title}
          />
        </figure>
        <div className="flex flex-col ml-9 h-full  justify-between">
          <div className="text-lg ">
            <h3 className="card-title  justify-center font-extrabold slice text-3xl  mb-5">
              {this.props.title}
            </h3>
            <p>
              {" "}
              <strong>Title:</strong> {this.props.title}
            </p>
            <p>
              {" "}
              <strong>Release Date:</strong>{" "}
              {moment(this.props.release_date).format("DD MMMM YYYY")}
            </p>
            <p>
              {" "}
              <strong>Runtime:</strong> {this.props.runtime}
            </p>
            <p>
              <strong>Genre:</strong>{" "}
              {this.props.genres
                ?.map((genre) => {
                  return genre.name;
                })
                .join(", ")}
            </p>
            <p className="text-justify break-all">
              {" "}
              <strong>Overview:</strong> {this.props.overview}
            </p>
          </div>
          <div className="card-actions justify-end ">
            <button className="btn btn-primary">Watch Now</button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Card);
