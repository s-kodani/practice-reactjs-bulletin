import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_CONFIG } from "../../common/const";
import Alert, { ALERT_TYPE } from "../alert";

const baseURL = API_CONFIG.BASE_URL;

type createdThreadType = {ErrorCode: string} | { id: string, title: string } | null;
type errorDataType = {ErrorCode: number, ErrorMessageJP: string, ErrorMessageEN: string} | null;

export default function NewThread() {
  const [text, setText] = React.useState('');
  const [createdThread, setCreatedThread] = React.useState<createdThreadType>(null);

  // Doc: https://app.swaggerhub.com/apis/INFO_3/BulletinBoardApplication/1.0.0#/thread/post_threads
  const createThread = async (threadName: string) => {
    const data = {
      title: threadName
    };
    try {
      const res = await axios.post(`${baseURL}/threads`, data);
      setCreatedThread(res.data);
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
              setCreatedThread({
                "ErrorCode": errorData.ErrorMessageJP
              });
            } else {
              setCreatedThread({
                "ErrorCode": `不明なエラー(${status})`
              });
            }
            break;
          default:
            setCreatedThread({
              "ErrorCode": "不明なエラー"
            });
            break;
        }
      } else {
        setCreatedThread({
          "ErrorCode": "不明なエラー"
        });
      }
    }
    return;
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  }

  const handleClick = () => {
    createThread(text);
  }

  const getAlert = () => {
    if (!createdThread) return null;

    if ('id' in createdThread) {
      return (
        <Alert alertType={ALERT_TYPE.SUCCESS}>
          <span>スレッド「<Link className="link" to={`/thread/${createdThread.id}/`} key={createdThread.id} state={{threadTitle: createdThread.title}}>{createdThread.title}</Link>」(ID: {createdThread.id})の作成が完了しました！</span>
        </Alert>
      );
    } else {
      return (
        <Alert alertType={ALERT_TYPE.ERROR}>
          <span>スレッドの作成に失敗しました。（{createdThread.ErrorCode}）</span>
        </Alert>
      );
    }
  }

  const alert = getAlert();
  const buttonState = text.length > 0 ? 'btn-active' : 'btn-disabled'

  return (
    <div className="flex flex-col items-center">
      <div className="my-10">
        <h1 className="text-2xl font-bold">スレッド新規作成</h1>
      </div>
      {alert}
      <div className="my-5 w-4/5 max-w-sm">
        <input type="text" value={text} onChange={handleChange} placeholder="作成するスレッド名を記入" className="input input-bordered w-full max-w-sm" />
      </div>
      <div className="my-5">
        <button className={`btn ${buttonState}`} onClick={handleClick}>スレッドを作成</button>
      </div>
    </div>
  )
}