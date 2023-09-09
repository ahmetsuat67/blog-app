import store, { persistor } from "./app/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import AppRouter from "./router/AppRouter";
import { Flowbite } from "flowbite-react";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="bg-slate-300 dark:bg-gray-800 dark:text-white">
      <Flowbite>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AppRouter />
          </PersistGate>
        </Provider>
        <ToastContainer />
      </Flowbite>
    </div>
  );
}

export default App;
