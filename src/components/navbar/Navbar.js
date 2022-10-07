// import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="flex-1">
        <Link className="btn btn-ghost normal-case text-xl" to="/">スレッド</Link>
      </div>
      <div className="navbar-end">
        <Link className="btn" to="/thread/new">スレッド作成</Link>
      </div>
    </div>
  )
}