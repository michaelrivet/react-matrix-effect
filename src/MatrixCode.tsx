import React, { useState } from 'react';
import { useInterval } from './useInterval';

import './MatrixApp.scss';

const characterRefreshIntervalMS = 100;

const characters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
];

export type MatrixCodeProps = {
    id: number;
    xPosition: number;
    length: number;
    speed: number;
};

export const MatrixCode = ({ xPosition, length, speed }: MatrixCodeProps) => {
  const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 500;
  const [code, setCode] = useState<string[]>([]);
  const [depth, setDepth] = useState(0);

  const increaseDepth = () => {
    if (depth > windowHeight + 800) {
      setDepth(() => 0);
      return;
    }
    setDepth((depth) => {
      return depth + speed;
    });
  };

  useInterval(() => {
    const newCode = [];
    for (let i = 0; i < length; i++) {
      const newChar = characters[Math.floor(Math.random() * characters.length)];
      newCode.push(newChar);
    }
    setCode(newCode);
  }, characterRefreshIntervalMS);

  useInterval(() => increaseDepth(), 50);

  return (
    <div
      className="code"
      style={{
        position: 'absolute',
        transform: `translate(${xPosition}px, ${depth}px)`,
        top: -(length * 22),
      }}
    >
      {code.map((character, i) => (
        <div className="code-character" key={i}>
          {character}
        </div>
      ))}
    </div>
  );
};
