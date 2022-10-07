import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Threads from '../threads';
import ThreadCreation from '../thread/new';
import Thread from '../thread';
import Navbar from '../navbar';

function App() {
  return (
    <BrowserRouter>
      <div className="text-center">
        <Navbar />
        <Routes>
          <Route path="/" element={<Threads />} />
          <Route path="/thread/new" element={<ThreadCreation />} />
          <Route path="/thread/:threadId" element={<Thread />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
