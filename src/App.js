// =========== Style.
import "./Reset.css";
import "./Scss/style.css";
// =========== Components.
import Card from "./Components/Card";
import Input from "./Components/Input";
import PopUp from "./Components/PopUp";



function App() {
  return (
    <div className="App">
      <Card />
      <Input />
      <PopUp />
    </div>
  );
}

export default App;