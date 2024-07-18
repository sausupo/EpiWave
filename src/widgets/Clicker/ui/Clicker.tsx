import WebApp from "@twa-dev/sdk";
import useClicker from "../../../store/useClicker";
import clicker from "../../../assets/clicker.png";
import "./Clicker.css";
import { useState } from "react";
import { ENERGY_DECREMENT, INCREMENT_VALUE } from "../../../shared/config";
import { v4 as uuidv4 } from 'uuid';
import clickerBgVideo from "../../../assets/2.mp4";
import { useRef } from "react";
import axios from "axios";

interface NumberPosition {
  id: string;
  left: number;
  top: number;
}


export default function Clicker(): JSX.Element {
  const {increment, energyDecrement, energy} = useClicker((state) => state);

  const [numbers, setNumbers] = useState<NumberPosition[]>([]);
  const [scaleX, setScaleX] = useState(1);

const timerDebounceRef = useRef<number>(0);

const debounceRequest = () => {
  if (timerDebounceRef.current){
    clearTimeout(timerDebounceRef.current);
  }

  timerDebounceRef.current = setTimeout(() => {
    axios.post('http://localhost:3000/taps', {
      userId: 123,
      coinsAmount: 123
    });
  }, 5000);
}

  const handleClick = (event: MouseEventHandler<HTMLDivElement>) => {
    const {clientX, clientY} = event;
    increment();
    debounceRequest();
    energyDecrement();
    WebApp.HapticFeedback.impactOccurred("light");

    setNumbers([{
      id: uuidv4(),
      left: clientX,
      top: clientY,
    }]);
    setScaleX(0.98);
  }

  const handleTap = (event: React.TouchEvent<HTMLDivElement>) => {
    increment();
    debounceRequest();
    energyDecrement();
    WebApp.HapticFeedback.impactOccurred("light");
    const { touches } = event;
    const newNumbers: NumberPosition[] = []
    for (let i = 0; i < touches.length; i++) {
      const touch = touches[i];
      const newNumber: NumberPosition = {
        id: uuidv4(),
        left: touch.clientX,
        top: touch.clientY,
      };

      newNumbers.push(newNumber);
    }

    setNumbers([...numbers, ...newNumbers]);
    setScaleX(0.98);
  };

  const removeNumber = (id: string) => {
    setNumbers(numbers.filter((num) => num.id !== id));
  };

  const handleTouchEnd = () => {
    setScaleX(1);
  };

  return (
    <>
     {numbers.map((number) => (
        <AnimatedNumber
          key={number.id}
          number={number}
          onAnimationEnd={() => removeNumber(number.id)}
        />
        
      ))}
        <div
          onMouseDown={handleClick}
          onMouseUp={handleTouchEnd}
          onTouchStart={energy > ENERGY_DECREMENT ? handleTap : () => {}}
          onTouchEnd={handleTouchEnd}
          className="clicker"
          style={{ transform: `scaleX(${scaleX})` }}
        >
        <div className="glass">
          <img src={clicker} className="home-page__ff" alt="coin" />
          <video className="clicker-bg" playsInline autoPlay muted loop id="bgvid">
            <source src={clickerBgVideo} type="video/mp4"/>
          </video>
        </div>
      </div>
    </>
  );
}

const AnimatedNumber: React.FC<{
  number: NumberPosition;
  onAnimationEnd: () => void;
}> = ({ number, onAnimationEnd }) => {
  return (
    <div
      className="animated-number"
      style={{ left: number.left, top: number.top }}
      onAnimationEnd={onAnimationEnd}
    >
      {`+${INCREMENT_VALUE}`}
    </div>
  );
};
