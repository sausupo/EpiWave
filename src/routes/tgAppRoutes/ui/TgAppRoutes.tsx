import { Route, Routes } from "react-router-dom";
import { AppRoutes, TgAppRouteNames } from "../../../shared/routes";

export default function TgAppRoutes(): JSX.Element {
  const checkIsFromTgInfo = () => {
    return true;
  };

  if (checkIsFromTgInfo()) {
    return (
      <Routes>
        {Object.keys(AppRoutes).map((key) => (
          <Route
            // index
            key={key}
            path={AppRoutes[key as TgAppRouteNames].path}
            element={AppRoutes[key as TgAppRouteNames].element}
          />
        ))}
        {/* <Route index path="*" element={<Home />} /> */}
        {/* <Route path="/" element={<Navigate to={AppRoutes.HOME} />} />
                <Route path="/" element={<Navigate to={AppRoutes.HOME} />} /> */}
      </Routes>
    );
  } else {
    return <div>poshel na XYI</div>;
  }
}
