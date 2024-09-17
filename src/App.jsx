import React, { useState } from 'react';
import { Stage, Layer, Rect, Circle, Line, Text } from 'react-konva';

function App() {
  const [shape, setShape] = useState('rectangle');
  const [shapes, setShapes] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });
  const [selectedShape, setSelectedShape] = useState(null);

  const handleMouseDown = (e) => {
    if (selectedShape) {
      const pos = e.target.getStage().getPointerPosition();
      const updatedShapes = shapes.map((s, index) => {
        if (index === selectedShape) {
          return { ...s, x: pos.x - s.width / 2, y: pos.y - s.height / 2 };
        }
        return s;
      });
      setShapes(updatedShapes);
      setSelectedShape(null);
      return;
    }

    setIsDrawing(true);
    const pos = e.target.getStage().getPointerPosition();
    setStartPos(pos);
  };

  const handleMouseUp = () => {
    if (isDrawing) {
      const newShape = {
        type: shape,
        x: startPos.x,
        y: startPos.y,
        width: currentPos.x - startPos.x,
        height: currentPos.y - startPos.y,
      };
      setShapes([...shapes, newShape]);
      setIsDrawing(false);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const pos = e.target.getStage().getPointerPosition();
    setCurrentPos(pos);
  };

  const handleShapeClick = (index) => {
    setSelectedShape(index);
  };

  return (
    <div>
      <h1>Geometrik Shakillarni Chizish</h1>
      <select onChange={(e) => setShape(e.target.value)} value={shape}>
        <option value="rectangle">To'rtburchak</option>
        <option value="circle">Doira</option>
        <option value="triangle">Uchburchak</option>
      </select>
      <Stage
        width={500}
        height={500}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <Layer>
          {/* Koordinatalar sistemasini chizish */}
          <Line points={[0, 250, 500, 250]} stroke="black" strokeWidth={2} />
          <Line points={[250, 0, 250, 500]} stroke="black" strokeWidth={2} />
          
          {/* Chizilgan shakillar */}
          {shapes.map((s, index) => {
            if (s.type === 'rectangle') {
              return (
                <Rect
                  key={index}
                  x={s.x}
                  y={s.y}
                  width={s.width}
                  height={s.height}
                  fill="blue"
                  draggable
                  onClick={() => handleShapeClick(index)}
                />
              );
            } else if (s.type === 'circle') {
              return (
                <Circle
                  key={index}
                  x={s.x}
                  y={s.y}
                  radius={Math.sqrt(s.width ** 2 + s.height ** 2) / 2}
                  fill="red"
                  draggable
                  onClick={() => handleShapeClick(index)}
                />
              );
            } else if (s.type === 'triangle') {
              return (
                <Line
                  key={index}
                  points={[s.x, s.y, s.x + s.width, s.y + s.height, s.x, s.y + s.height]}
                  fill="green"
                  closed
                  draggable
                  onClick={() => handleShapeClick(index)}
                />
              );
            }
            return null;
          })}
          
          {/* Koordinatalar */}
          <Text x={10} y={10} text={`Boshlanish: (${startPos.x}, ${startPos.y})`} />
          <Text x={10} y={30} text={`Hozirgi: (${currentPos.x}, ${currentPos.y})`} />
        </Layer>
      </Stage>
    </div>
  );
}

export default App;
