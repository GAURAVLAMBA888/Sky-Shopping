import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { productInputs, userInputs } from "./formSource";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const App = () => {
  const isAdmin = useSelector((state) => state.currentUser)?.isAdmin;

  return (
    <div className="App">
      <Routes>
        <Route path="/">
          <Route index element={isAdmin ? <Home /> : <Login />} />
          <Route path="login" element={isAdmin ? <Navigate to="/"/> : <Login />} />
          {isAdmin && (
            <>
              <Route path="users">
                <Route index element={<List />} />
                <Route path=":userId" element={<Single />} />
                <Route
                  path="new"
                  element={<New inputs={userInputs} title="Add New User" />}
                />
              </Route>
              <Route path="products">
                <Route index element={<List />} />
                <Route path=":productId" element={<Single />} />
                <Route
                  path="new"
                  element={
                    <New inputs={productInputs} title="Add New Product" />
                  }
                />
              </Route>
            </>
          )}
        </Route>
      </Routes>
    </div>
  );
};

export default App;
