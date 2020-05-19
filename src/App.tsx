import React, { useState } from 'react';
import { useInterval } from './useInterval';
import { MatrixCode, MatrixCodeProps } from './MatrixCode';
import './App.css';

export const App = () => {
  const maxLines = 50;
  const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 500;
  const [currentId, setCurrentId] = useState(0);
  const [matrixLines, setMatrixLines] = useState<MatrixCodeProps[]>([]);
  const [autoGenerate, setAutoGenerate] = useState(false);

  const clearAllCodes = () => {
    setCurrentId(0);
    setMatrixLines([]);
  };

  const createMatrixLine = (): MatrixCodeProps => {
    const xPosition = Math.floor(Math.random() * windowWidth);
    const length = Math.floor(Math.random() * 30) + 5;
    const speed = Math.floor(Math.random() * 20) + 10;

    return {
      id: currentId,
      xPosition,
      length,
      speed,
    };
  };

  const createNewCode = () => {
    if(!autoGenerate) return;
    const matrixLine = createMatrixLine();

    setCurrentId((currentId) => currentId + 1);
    setMatrixLines((matrixLines) => {
      let newMatrixLines;
      if (matrixLines.length >= maxLines) {
        newMatrixLines = matrixLines.slice(1);
      } else {
        newMatrixLines = matrixLines.slice();
      }
      newMatrixLines.push(matrixLine);
      return newMatrixLines;
    });
  };
  
  useInterval(() => createNewCode(), 80);

  return (
    <>
      <button onClick={() => setAutoGenerate(!autoGenerate)} type="button">
        { !autoGenerate ? 'Auto Generate Codes' : 'Stop Generating Codes'}
      </button>
      <button onClick={createNewCode} type="button">
        Create Single Code
      </button>
      <button onClick={clearAllCodes} type="button">
        Clear All
      </button>
      {matrixLines.map((matrixLine) => (
        <MatrixCode
          id={matrixLine.id}
          key={matrixLine.id}
          length={matrixLine.length}
          xPosition={matrixLine.xPosition}
          speed={matrixLine.speed}
        />
      ))}
    </>
  );
};

export default App;
