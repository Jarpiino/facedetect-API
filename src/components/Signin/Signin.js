import React from "react";
import { useState } from "react";
// !!! react query
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

const Signin = ({ onRouteChange, loadUser }) => {
  const [credentials, setCredentials] = useState({
    signInEmail: "",
    signInPassword: "",
  });
  const onEmailChange = (e) => {
    setCredentials({ ...credentials, signInEmail: e.target.value });
  };
  const onPasswordChange = (e) => {
    setCredentials({ ...credentials, signInPassword: e.target.value });
  };
  const onSubmitSignIn = () => {
    // fetch("https://facedetect-api-backend.onrender.com/signin", {
    fetch("http://localhost:3000/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: credentials.signInEmail,
        password: credentials.signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          // does the user exist? Did we receive a user with a property of id?
          loadUser(user);
          onRouteChange("home");
        }
      });
  };
  // !CANT USE BECAUSE OF CLASS COMPONENTS
  // onSubmitSignIn = () => {
  //   // fetch("https://facedetect-api-backend.onrender.com/signin", {
  //   const {} = useQuery({
  //     murationFn: async () => {
  //       const { data } = await axios.post("http://localhost:3000/signin");
  //       return data;
  //     },
  //   });
  // };

  return (
    <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <div className="facerec center ma">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  onChange={onEmailChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  onChange={onPasswordChange}
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                />
              </div>
            </fieldset>
            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
                onClick={onSubmitSignIn}
              />
            </div>
            <div className="lh-copy mt3">
              <p
                onClick={() => {
                  onRouteChange("register");
                }}
                className="f6 pointer link dim black db"
              >
                Register
              </p>
            </div>
          </div>
        </main>
      </div>
    </article>
  );
};

export default Signin;
