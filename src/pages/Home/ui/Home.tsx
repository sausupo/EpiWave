import "./Home.css";
import coin from "../../../assets/coin.svg";
import { Clicker } from "../../../widgets/Clicker";
import useClicker from "../../../store/useClicker";
import { useUserData } from "../../../store";
import { formatNumberWithoutCurrency } from "../../../shared/funcs";
import { useEffect } from "react";
import { ENERGY_MAX } from "../../../shared/config";

export default function Home(): JSX.Element {
  const {count, energy, energyIncrement} = useClicker((state) => state);
  const fisrtName = useUserData((state) => state.firstName);

  useEffect(() => {
    const intervalId = setInterval(() => {
      energyIncrement();
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="home-page">
      <div className="home-page__name">{`👋 Hi, ${fisrtName}`}</div>
      <div className="home-page__balance">
        <img src={coin} alt="coin" className="home-page__coin" />
        <div className="home-page__count">
          {formatNumberWithoutCurrency(count, "en-US")}
        </div>
      </div>
      <Clicker />
      <div className="home-page__energy">
        <div>⚡</div>
        <div className="home-page__energy__text ">{`${energy}/${ENERGY_MAX}`}</div>
      </div>
    </div>
  );
}
