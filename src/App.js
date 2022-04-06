// =========== Style.
import "./Reset.css";
import "./Scss/style.css";
// =========== Components.
import Comment from "./Components/Comment";
import Input from "./Components/Input";
import Likes from "./Components/Likes";
import Action from "./Components/Action";



function App() {
  return (
    <div className="App">
      <Comment />
      <Input />
    </div>
  );
}

export default App;