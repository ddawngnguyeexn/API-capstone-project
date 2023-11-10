import styles from "./App.module.css";
import { BrowserRouter } from "react-router-dom";
import AppRoute from "./routes/AppRoute";
import NavigationBar from "./components/NavigationBar/NavigationBar";


function App ()
{
  return (
    <>
      <BrowserRouter>
        <div>
        <header>
          <NavigationBar />
        </header>
        <main>
          <AppRoute />
        </main>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
