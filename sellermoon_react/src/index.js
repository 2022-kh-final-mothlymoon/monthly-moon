import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "@fortawesome/fontawesome-free/js/all.js";
import AuthLogic from "./service/authLogic";
import firebaseApp from "./service/firebase";
import { Provider, useSelector } from "react-redux";
import { legacy_createStore } from "redux";
import reducer, { initAuth } from "./store";
import PictureUpload from "./service/pictureUpload";

const authLogic = new AuthLogic(firebaseApp);
const pictureUpload = new PictureUpload();
const root = ReactDOM.createRoot(document.getElementById("root"));

let store = legacy_createStore(reducer);
//const auth = useSelector((store) => store.auth)
store.dispatch(
  initAuth(authLogic.getUserAuth(), authLogic.getGoogleAuthProvider())
);
//console.log(store.getState());

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App authLogic={authLogic} pictureUpload={pictureUpload} />
    </Provider>
  </BrowserRouter>
);
