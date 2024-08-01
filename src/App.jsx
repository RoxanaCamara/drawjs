import "./App.css";
import Scketch_01 from "./components/Scketch_01";
import Scketch_02 from "./components/Scketch_02";
import Scketch_03 from "./components/Scketch_03";
import Scketch_04 from "./components/Scketch_04";
import Scketch_05 from "./components/Scketch_05";
import Scketch_06 from "./components/Scketch_06";

function App() {
  return (
    <>
      <div>
        <h2>Sketch 1</h2>
        <Scketch_01 />
      </div>

      <div>
        <h2>Sketch 2</h2>
        <Scketch_02 />
      </div>
      <div>
        <h2>Sketch 3</h2>
        <Scketch_03 />
      </div>

      {/**<div>
        <h2>Sketch 4</h2>
        <Scketch_04 />
      </div> */}
      <div>
        <h2>Sketch 5</h2>
        <Scketch_05 />
      </div>

      <div>
        <h2>Sketch 6</h2>
        <Scketch_06 />
      </div>
    </>
  );
}

export default App;
