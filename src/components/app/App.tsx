import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Threads from '../threads';
import NewThread from '../newThread';
import Thread from '../thread';

function App() {
  return (
    <BrowserRouter>
      <div className="text-center">
        <div className="navbar">
          <div className="flex-1">
            <Link className="btn btn-ghost normal-case text-xl" to="/">スレッド</Link>
          </div>
          <div className="navbar-end">
            <Link className="btn" to="/thread/new">スレッド作成</Link>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Threads />} />
          <Route path="/thread/new" element={<NewThread />} />
          <Route path="/thread/:threadId" element={<Thread />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
