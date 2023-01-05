import axios from "axios";
import React from "react";
import { useParams, useLocation } from "react-router-dom";
import Loading from "../loading";
import { API_CONFIG } from "../../common/const";
import Alert, { ALERT_TYPE } from "../alert";

const baseURL = API_CONFIG.BASE_URL;

type createdPostType = {ErrorCode: string} | null;
type errorDataType = {ErrorCode: number, ErrorMessageJP: string, ErrorMessageEN: string} | null;

export default function Thread() {
  const [posts, setPosts] = React.useState([]);
  const [pageNum, setPageNum] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [loaded, setLoaded] = React.useState(false);
  const [text, setText] = React.useState('');
  const [createdPost, setCreatedPost] = React.useState<createdPostType>(null);

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
  }, [total, threadId, createdPost]);

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
    setCreatedPost(null);
  }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  }

  const post = async (text: string) => {
    const data = {
      post: text
    }
    try {
      const res = await axios.post(`${baseURL}/threads/${threadId}/posts`, data);
      setCreatedPost(res.data);
      setText('');
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        const status = error.response ? error.response.status : null;
        switch (status) {
          case 400:
          case 500:
            const errorData: errorDataType = error.response !== undefined ? error.response.data as errorDataType : null;
            if (errorData !== null && "ErrorMessageJP" in errorData) {
              setCreatedPost({
                "ErrorCode": errorData.ErrorMessageJP
              });
            } else {
              setCreatedPost({
                "ErrorCode": `不明なエラー(${status})`
              });
            }
            break;
          default:
            setCreatedPost({
              "ErrorCode": "不明なエラー"
            });
            break;
        }
      } else {
        setCreatedPost({
          "ErrorCode": "不明なエラー"
        });
      }
    }
  }
  const handleClick = () => {
    post(text);

  }
  const getAlert = () => {
    if (!createdPost) return null;

    if ('id' in createdPost) {
      return (
        <Alert alertType={ALERT_TYPE.SUCCESS}>
          <span>投稿が完了しました！</span>
        </Alert>
      );
    } else {
      return (
        <Alert alertType={ALERT_TYPE.ERROR}>
          <span>投稿に失敗しました。（{createdPost.ErrorCode}）</span>
        </Alert>
      );
    }
  }
  const alert = getAlert();
  const buttonState = text.length > 0 ? 'btn-active btn-primary' : 'btn-disabled'

  return (
    <div className="flex flex-col items-center">
      <div className="my-10">
        <h1 className="text-2xl font-bold">{threadTitle}</h1>
      </div>
      {alert}
      <div className="grid grid-cols-4 gap-2 lg:gap-4 w-10/12 lg:w-1/2 mt-10">
        {postItems}
      </div>
      <div className="btn-group my-10">
        <button className={`btn ${prevButtonState}`} onClick={() => clickPaginationHandle(-1)}>«</button>
        <button className="btn">Page {pageNum + 1}</button>
        <button className={`btn ${nextButtonState}`} onClick={() => clickPaginationHandle(1)}>»</button>
      </div>
      <div className="my-10 w-1/2 flex flex-col">
        <textarea className="textarea textarea-bordered mb-10" placeholder="投稿内容を入力してください。" value={text} onChange={handleChange}></textarea>
        <button className={`btn ${buttonState}`} onClick={handleClick}>投稿</button>
      </div>
    </div>
  )
}
