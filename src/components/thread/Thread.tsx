import axios from "axios";
import React from "react";
import { useParams, useLocation } from "react-router-dom";
import Loading from "../loading";
import { API_CONFIG } from "../../common/const";

const baseURL = API_CONFIG.BASE_URL;

export default function Thread() {
  const [posts, setPosts] = React.useState([]);
  const [pageNum, setPageNum] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [loaded, setLoaded] = React.useState(false);

  const location = useLocation();
  const { threadTitle } = location.state;
  const params = useParams();
  const threadId = params.threadId;

  React.useEffect(() => {
    const offset: number = total === 0 ? 0 : total;
    const urlParams: string = `offset=${offset}`;
    const getThreadsData = async () => {
      const res = await axios.get(`${baseURL}/threads/${threadId}/posts?${urlParams}`);
      setLoaded(true);
      if ("posts" in res.data){
        setPosts(res.data.posts === null ? [] : res.data.posts);
      }
      return;
    }
    getThreadsData();
  }, [total, threadId]);

  if (loaded === false) return <Loading />;

  const postItems = posts.length === 0 && pageNum === 0 ? (
    <div className="col-span-4 text-center break-all">
      <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current h-6 w-6 inline" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
      まだ投稿が存在しません。
    </div>
  ) : posts.map((postData: {id: string, post: string}, index) => {
    const postText: string = postData.post;
    return (
      <React.Fragment key={postData.id}>
        <div className="col-span-1">{index + total + 1}</div>
        <div className="col-span-3 text-left break-all">{postText}</div>
      </React.Fragment>
    )
  });

  const prevButtonState = pageNum > 0 ? 'btn-active' : 'btn-disabled'
  const nextButtonState = posts.length >= API_CONFIG.MUX_FETCH_POSTS ? 'btn-active' : 'btn-disabled'

  const clickPaginationHandle = (calcNum: number) => {
    setPageNum(pageNum + calcNum);
    setTotal(total + (API_CONFIG.MUX_FETCH_POSTS * calcNum));
    setLoaded(false);
    setPosts([]);
  }

  return (
    <div className="flex flex-col items-center">
      <div className="my-10">
        <h1 className="text-2xl font-bold">{threadTitle}</h1>
      </div>
      <div className="grid grid-cols-4 gap-2 lg:gap-4 w-10/12 lg:w-1/2">
        {postItems}
      </div>
      <div className="btn-group my-10">
        <button className={`btn ${prevButtonState}`} onClick={() => clickPaginationHandle(-1)}>«</button>
        <button className="btn">Page {pageNum + 1}</button>
        <button className={`btn ${nextButtonState}`} onClick={() => clickPaginationHandle(1)}>»</button>
      </div>
    </div>
  )
}
