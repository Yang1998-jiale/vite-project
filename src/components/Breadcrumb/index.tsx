
import { useLocation, Link } from "react-router-dom";
import { routerList } from "@/router/index";
import { Breadcrumb } from "antd";

function findRouter(target, routers) {
  const targetArr = target.split("/").splice(1);
  const targetArr2 = targetArr.map((_item, index) => {
    return "/" + targetArr.slice(0, index + 1).join("/");
  });
  const routerTarge: any = [];
  targetArr2.forEach((item, index) => {
    if (index === 0) {
      routerTarge.push(routers.find((f) => f.path === item));
      return;
    }
    if (routerTarge[index - 1]) {
      const p = routerTarge[index - 1];
      if (p.children?.find((f) => f.path === item)) {
        routerTarge.push(p.children?.find((f) => f.path === item));
      }

      return;
    }
  });
  return routerTarge.map((item) => {
    return {
      ...item,
      title: item?.meta?.title,
    };
  });
}

export default function Index() {
  const location = useLocation();
  const routerActives = findRouter(location.pathname, routerList);
  function itemRender(currentRoute, _params, _items, paths) {

    const isLast = currentRoute?.meta?.noBread;

    return isLast ? (
      <span>{currentRoute.title}</span>
    ) : (
      <Link to={`/${paths.at(-1)}`}>{currentRoute.title}</Link>
    );
  }

  return (
    <>
      <div className="m-x-24px m-y-16px">
        <Breadcrumb items={routerActives} itemRender={itemRender} />
      </div>
    </>
  );
}
