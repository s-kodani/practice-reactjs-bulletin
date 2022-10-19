import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import Loading from "../loading";
import { API_CONFIG } from "../../common/const";

const baseURL = API_CONFIG.BASE_URL;


export default function Threads() {
  const [threads, setThreads] = React.useState([]);

  const urlParams = "offset=0";

  React.useEffect(() => {
    const getThreadsData = async () => {
      const res = await axios.get(`${baseURL}/threads?${urlParams}`);
      setThreads(res.data);
      return;
    }
    getThreadsData();
  }, []);

  if (threads.length === 0) return <Loading />;

  const threadItems = threads.map((threadObj: {id: string, title: string}) => {
    return <li key={threadObj.id}><Link to={`/thread/${threadObj.id}`} key={threadObj.id}>{threadObj.title}</Link></li>
  });

  return (
    <div className="flex flex-col items-center">
      <div className="my-10">
        <h1 className="text-2xl font-bold">スレッド一覧</h1>
      </div>
      <ul className="menu w-3/4 rounded-box shadow-xl">
        {threadItems}
      </ul>
    </div>
  )
}
