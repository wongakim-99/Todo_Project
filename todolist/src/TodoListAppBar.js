import { AppBar, Typography, Toolbar } from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";
import { initializeApp } from "firebase/app";

import {
  GoogleAuthProvider,
  getAuth,
  signInWithRedirect,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDzGzhVvNxftVUbxCLudMG6apP5auR56ls",
  authDomain: "todolist-f0d54.firebaseapp.com",
  projectId: "todolist-f0d54",
  storageBucket: "todolist-f0d54.appspot.com",
  messagingSenderId: "800631363262",
  appId: "1:800631363262:web:448c743ec556cce326b0ef",
  measurementId: "G-7544P1V0ZJ",
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);

const TodoListAppBar = (props) => {
  const loginWighGoogleButton = (
    <Button
      color="inherit"
      onClick={() => {
        signInWithRedirect(auth, provider);
      }}
    >
      Login with Google
    </Button>
  );
  const logoutButton = (
    <Button
      color="inherit"
      onClick={() => {
        signOut(auth);
      }}
    >
      Log out
    </Button>
  );
  const button =
    props.currentUser === null ? loginWighGoogleButton : logoutButton;

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Todo List App
        </Typography>
        {button}
      </Toolbar>
    </AppBar>
  );
};

export default TodoListAppBar;
