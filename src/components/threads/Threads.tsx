import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import Loading from "../loading";
import { API_CONFIG } from "../../common/const";

const baseURL = API_CONFIG.BASE_URL;


export default function Threads() {
  const [threads, setThreads] = React.useState([]);
  const [pageNum, setPageNum] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    const offset: number = total === 0 ? 0 : total + 1;
    const urlParams: string = `offset=${offset}`;
    const getThreadsData = async () => {
      const res = await axios.get(`${baseURL}/threads?${urlParams}`);
      setLoaded(true);
      setThreads(res.data);
      return;
    }
    getThreadsData();
  }, [total]);

  if (loaded === false) return <Loading />;

  const threadItems = threads.map((threadObj: {id: string, title: string}) => {
    const title: string = threadObj.title.length > 0 ? threadObj.title : '(名無しスレッド)';
    return (
      <li key={threadObj.id}>
        <Link to={`/thread/${threadObj.id}`} state={{threadTitle: threadObj.title}}>{title}</Link>
      </li>
    )
  });

  const prevButtonState = pageNum > 0 ? 'btn-active' : 'btn-disabled'
  const nextButtonState = threads.length >= API_CONFIG.MAX_FETCH_THREADS ? 'btn-active' : 'btn-disabled'

  const clickPaginationHandle = (calcNum: number) => {
    setPageNum(pageNum + calcNum);
    setTotal(total + (API_CONFIG.MAX_FETCH_THREADS * calcNum));
    setLoaded(false);
  }

  return (
    <div className="flex flex-col items-center">
      <div className="my-10">
        <h1 className="text-2xl font-bold">スレッド一覧</h1>
      </div>
      <ul className="menu w-3/4 rounded-box shadow-xl">
        {threadItems}
      </ul>
      <div className="btn-group my-10">
        <button className={`btn ${prevButtonState}`} onClick={() => clickPaginationHandle(-1)}>«</button>
        <button className="btn">Page {pageNum + 1}</button>
        <button className={`btn ${nextButtonState}`} onClick={() => clickPaginationHandle(1)}>»</button>
      </div>
    </div>
  )
}
