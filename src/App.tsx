import './App.css';
import Ball from './Ball';
import { RECTANGLES } from "./constants";

const App = () => {
  return (
    <div className="app">
      <Ball />
      <Ball />
      <Ball />
      {RECTANGLES.map((rect) => (
        <div
          className="rectangle"
          style={{
            top: rect.y,
            left: rect.x,
            width: rect.width,
            height: rect.height,
          }}
        />
      ))}
    </div>
  );
}

export default App;
