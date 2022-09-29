import axios from "axios";
import React from "react";
import Loading from "./loading";
import { Header } from "semantic-ui-react";

const baseURL = "https://railway-react-bulletin-board.herokuapp.com";


export default function Threads() {
  const [threads, setThreads] = React.useState(null);

  const urlParams = "offset=0";

  React.useEffect(() => {
    axios.get(`${baseURL}/threads?${urlParams}`).then((res) => {
      setThreads(res.data);
    });
  }, []);

  if (threads === null) return <Loading />;

  const threadItems = threads.map((threadObj) => {
    return <li key={threadObj.id}><a href="">{threadObj.title}</a></li>
  });

  return (
    <div className="flex flex-col items-center">
      <div className="my-10">
        <Header as="h1" inverted>スレッド一覧</Header>
      </div>
      <ul className="menu bg-slate-100 w-3/4 rounded-box shadow-xl">{threadItems}</ul>
    </div>
  )
}
