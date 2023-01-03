import React, { Component } from "react";

interface CardProps {
  title: string;
  image: string;
}
export class CardNowPlaying extends Component<CardProps> {
  render() {
    return (
      <div className="card card-compact  bg-base-100 shadow-xl  hover:scale-105 duration-300">
        <figure>
          <img src={this.props.image} alt={this.props.title} />
        </figure>
        <div className="card-body ">
          <h2 className="card-title justify-center"> {this.props.title}</h2>
          <div className="card-actions justify-end">
            <button className="btn  bg-[#678983] text-[#f0e9d2]">
              Add to Favorite
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export class CardMyFavorite extends Component<CardProps> {
  render() {
    return (
      <div className="card card-compact  bg-base-100 shadow-xl ">
        <figure>
          <img src={this.props.image} alt={this.props.title} />
        </figure>
        <div className="card-body ">
          <h2 className="card-title justify-center"> {this.props.title}</h2>
          <div className="card-actions justify-end">
            <button className="btn  text-[#f0e9d2]">Remove Favorite</button>
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
        <figure>
          <img
            className="h-[25rem] w-[-25] "
            src={this.props.image}
            alt={this.props.title}
          />
        </figure>
        <div className="ml-9 ">
          <h2 className="card-title  justify-center mb-5">
            {this.props.title}
          </h2>
          <p className="mb-10">
            Runtime: 192 minutes <br /> Release date: Wednesday, 14 December
            2022 <br />
            Genre: Science Fiction, Adventure, Action <br /> Language: en <br />{" "}
            Overview: <br /> Set more than a decade after the events of the
            first film, learn the story of the Sully family (Jake, Neytiri, and
            their kids), the <br /> trouble that follows them, the lengths they
            go to keep each other safe, the battles they fight to stay alive,
            and the <br /> tragedies they endure.
          </p>
          <div className="card-actions justify-end ">
            <button className="btn btn-primary">Watch Now</button>
          </div>
        </div>
      </div>
    );
  }
}
