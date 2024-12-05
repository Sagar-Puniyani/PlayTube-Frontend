import React from "react";
import { Link } from "react-router-dom";
import { IoLogoYoutube } from "./icons";

export const Logo = ({ size = "30" }) => {
  return (
    <Link to={"/"} className="flex gap-2 items-center">
      <IoLogoYoutube size={size} color="red" />
      <span className="text-white font-bold ">PLAYTUBE</span>
    </Link>
  );
};
