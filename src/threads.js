import axios from "axios";
import React from "react";

const baseURL = "https://railway-react-bulletin-board.herokuapp.com";


export default function Threads() {
  const [threads, setThreads] = React.useState(null);

  const urlParams = "offset=0";

  React.useEffect(() => {
    axios.get(`${baseURL}/threads?${urlParams}`).then((res) => {
      setThreads(res.data);
    });
  }, []);

  if (threads === null) return null;

  const threadItems = threads.map((threadObj) => {
    return <li><a href>{threadObj.title}</a></li>
  });

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl my-10">スレッド一覧</h1>
      <ul className="menu bg-slate-100 w-3/4 rounded-box shadow-xl">{threadItems}</ul>
    </div>
  )
}
