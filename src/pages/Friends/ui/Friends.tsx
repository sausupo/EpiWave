import { formatNumberWithoutCurrency } from "../../../shared/funcs";
import "./Friends.css";
import coin from "../../../assets/coin.svg";
import WebApp from "@twa-dev/sdk";

type Friend = {
  name: string;
  totalNumber: number;
};

const friends: Friend[] = [
  {
    name: "Aboba",
    totalNumber: 51000,
  },
  {
    name: "Aboba",
    totalNumber: 51000,
  },
  {
    name: "Aboba",
    totalNumber: 51000,
  },
  {
    name: "Aboba",
    totalNumber: 51000,
  },
  {
    name: "Aboba",
    totalNumber: 51000,
  },
];

export default function Friends(): JSX.Element {
  const handleClick = () => {
    WebApp.HapticFeedback.impactOccurred("light");
  }

  return (
    <div className="friends-page">
      <div className="friends-page__title">Friends</div>
      <div className="friends-page__total">
        <div className="friends-page__total__cost">
          <div className="friends-page__total__cost__number">
            {formatNumberWithoutCurrency(1000000)}
          </div>
          <img src={coin} className="friends-page__total__cost__coin" />
        </div>
        <button className="friends-page__total__button" onClick={handleClick}>invite</button>
      </div>
      <div className="friends-page__list">
        {friends.map((friend) => (
          <div className="friends-page__list__item">
            <div className="friends-page__list__item__name">{friend.name}</div>
            <div className="friends-page__list__item__total-cost">
              <div className="friends-page__list__item__total-cost__number">
                {formatNumberWithoutCurrency(friend.totalNumber)}
              </div>
              <img
                src={coin}
                className="friends-page__list__item__total-cost__coin"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
