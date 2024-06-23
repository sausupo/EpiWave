import { useState } from "react";
import "./BottomNavigation.css";
import { useNavigate } from "react-router-dom";
import { TgAppRouteNames, AppRoutes } from "../../../shared/routes";
import WebApp from "@twa-dev/sdk";

export default function BottomNavigation(): JSX.Element {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(TgAppRouteNames.HOME);

  const handleClick = (key: TgAppRouteNames) => {
    setCurrentPage(key);
    WebApp.HapticFeedback.impactOccurred("medium");
    navigate(AppRoutes[key as TgAppRouteNames].path);
  };

  console.log(AppRoutes);

  return (
    <div className="navbar">
      <div className="menu">
        {Object.keys(AppRoutes).map((key) => (
          <div
            key={key}
            onClick={() => handleClick(key as TgAppRouteNames)}
            className={`bloc-icon ${currentPage === key ? "bloc-active" : ""}`}
          >
            {/* <img className="navbar--icon" src={icon} alt=""/> */}
            {/* <Icon/> */}
            <div
              className="navbar--icon"
              dangerouslySetInnerHTML={{
                __html: AppRoutes[key as TgAppRouteNames].svg,
              }}
            />
            {AppRoutes[key as TgAppRouteNames].label}
          </div>
        ))}
      </div>
    </div>
  );
}
