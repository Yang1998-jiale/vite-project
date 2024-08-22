/*
 * @Author: yjl
 * @Date: 2024-04-18 15:52:33
 * @LastEditors: yjl
 * @LastEditTime: 2024-08-21 09:36:22
 * @Description: 描述
 */
import { lazy } from "react";
const Home = lazy(() => import("@/pages/home/index"));
// import Home from "@/views/home/index";

const home: any[] = [
  {
    path: "/home",
    element: <Home />,
    name: "Home",
    order: 1,
    meta: {
      title: "首页",
    },
  },
];

export default home;
