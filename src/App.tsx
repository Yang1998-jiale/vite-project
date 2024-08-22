/*
 * @Author: yjl
 * @Date: 2024-08-21 09:09:24
 * @LastEditors: yjl
 * @Description: 描述
 */

import "./App.css";
import Layout from "@/components/Layout/index";
import { useLocation } from "react-router-dom";
import { CreateLoginRouter } from "@/router/index";
import ProtectedRoute from "@/components/AuthRouter/ProtectedRoute";
import AuthRouter from "@/components/AuthRouter/Auth.tsx";
import { useEffect } from "react";

function App() {
  const location = useLocation();

  const routerWhite = ["/login", "/404", "/register"];

  useEffect(() => {
    function setRem() {
      const baseSize = 1920; // 基准设计稿宽度
      const designWidth =
        document.documentElement.clientWidth || document.body.clientWidth; // 获取当前屏幕宽度
      const rem = (designWidth * 100) / baseSize; // 计算当前屏幕的rem比例
      document.documentElement.style.fontSize = `${rem > 75 ? rem : 75}px`; // 设置html的字体大小
    }

    // 初始化设置
    setRem();
    // 监听窗口大小变化重新设置
    window.addEventListener("resize", setRem);
    // 组件卸载时移除监听器
    return () => window.removeEventListener("resize", setRem);
  }, []);

  return (
    <>
      <AuthRouter>
        {routerWhite.includes(location.pathname) ? <CreateLoginRouter /> : null}
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      </AuthRouter>
    </>
  );
}

export default App;
