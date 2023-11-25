import './App.css';
import Ball from './Ball';
import { RECTANGLES } from "./constants";

const App = () => {
  return (
    <div className="app">
      {[...Array(5)].map((_, i) => <Ball key={i} />)}
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
