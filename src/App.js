import Container from "@mui/material/Container";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";

import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import { User } from "./pages/User/User";
import { fetchAuthMe } from "./redux/slices/auth";

function App() {
  const dispatch = useDispatch();
  // const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);
  
  return (
    <>
      <Header />
      <Container maxWidth="md">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/popular" element={<Home />} />
          <Route path="/tags/:tag" element={<Home />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/posts/:id/edit" element={<AddPost />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/user/:id/edit" element={<User />} />
        </Routes>


      </Container>
    </>
  );
}

export default App;
