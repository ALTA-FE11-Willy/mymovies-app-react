import { Component, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

export class Button extends Component<ButtonProps> {
  render() {
    return (
      <button
        className="btn w-full tracking-wider bg-[#678983] text-[#f0e9d2]"
        {...this.props}
      >
        {this.props.label}
      </button>
    );
  }
}

export default Button;
