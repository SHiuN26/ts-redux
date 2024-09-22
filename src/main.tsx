import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store";
import UserComponent from "./pages/User/UserComponent";

async function enableMocking() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  const { worker } = await import("../src/mock/browser.ts");
  return worker.start();
}
(async () => {
  await enableMocking();
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <Provider store={store}>
        {/* 分別切換以下兩個組件的註解來看結果，因為專案沒用路由 */}
        <App />
        {/* <UserComponent /> */}
      </Provider>
    </StrictMode>
  );
})();
