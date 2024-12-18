import { useRoutes } from "react-router-dom";

import { privateRoutes } from "./routes/private";
import { publicRoutes } from "./routes/protected";

function Router() {
  const routes = useRoutes([publicRoutes, privateRoutes]);

  return routes;
}

export default Router;
