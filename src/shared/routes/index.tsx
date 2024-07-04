import { ReactNode } from "react";
import Home from "../../pages/Home/ui/Home";
import { HomeIcon } from "../../icons/HomeIcon";
import { ReferalsIcon } from "../../icons/ReferalsIcon";
import { TasksIcons } from "../../icons/TasksIcon";
import { Tasks } from "../../pages/Tasks";
import { Friends } from "../../pages/Friends";
import { CloseIcon } from "../../icons/CloseIcon";

export enum TgAppRouteNames {
  HOME = "home",
  TASKS = "tasks",
  REFERALS = "referals",
  SOON = "soon",
}

type Page = {
  path: string;
  label: string;
  element: ReactNode;
  svg: string;
  disabled?: boolean;
};

export const AppRoutes: Record<TgAppRouteNames, Page> = {
  [TgAppRouteNames.HOME]: {
    path: "*",
    label: "Home",
    element: <Home />,
    svg: HomeIcon,
  },
  [TgAppRouteNames.TASKS]: {
    path: "/tasks",
    label: "Tasks",
    element: <Tasks />,
    svg: TasksIcons,
  },
  [TgAppRouteNames.REFERALS]: {
    path: "/friends",
    label: "Friends",
    element: <Friends />,
    svg: ReferalsIcon,
  },
  [TgAppRouteNames.SOON]: {
    path: "/soon",
    label: "SOON",
    element: <Home />,
    svg: CloseIcon,
    disabled: true,
  },
};
