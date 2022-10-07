// import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl"><Link to="/">スレッド</Link></a>
      </div>
      <div className="navbar-end">
        <a className="btn"><Link to="/thread/new">スレッド作成</Link></a>
      </div>
    </div>
  )
}