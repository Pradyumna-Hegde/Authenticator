import { RouterProvider } from "react-router-dom";
import router from "./routes";

const App = () => {
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
};

export default App;
