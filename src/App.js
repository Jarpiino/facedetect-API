import React, { useState } from "react";
import { useImmer } from "use-immer";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";

// const formButton = document.getElementById("formbutton");
// const inputImage = document.getElementById("inputimage");

// const sum = formButton.addEventListener("click", (event) => {
//   inputImage.classList.add("show");
//   console.log("click");
// });
// sum();

const returnClarifaiRequestOptions = (imageUrl) => {
  // Your PAT (Personal Access Token) can be found in the portal under Authentification
  // const PAT = process.env.API_CLARIFAI;
  const PAT = process.env.REACT_APP_API_CLARIFAI;
  // Specify the correct user_id/app_id pairings
  // Since you're making inferences outside your app's scope
  const USER_ID = "jarpiino";
  const APP_ID = "my-first-application";
  // Change these to whatever model and image URL you want to use
  // const MODEL_ID = "face-detection";
  // const MODEL_VERSION_ID = "aa7f35c01e0642fda5cf400f543e7c40";
  const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: IMAGE_URL,
          },
        },
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Key " + PAT,
    },
    body: raw,
  };

  return requestOptions;
};

const App = () => {
  const [loggedOut, setLoggedOut] = useState({
    input: "",
    imageUrl: "",
    box: {},
    route: "signin",
    isSignedIn: false,
    user: {
      id: "",
      name: "",
      email: "",
      entries: 0,
      joined: new Date(),
    },
  });
  const [firstState, setFirstState] = useState({
    input: "",
    imageUrl: "",
    box: {},
    route: "signin",
    isSignedIn: false,
    user: {
      id: "",
      name: "",
      email: "",
      entries: 0,
      joined: new Date(),
    },
  });
  let route = firstState.route;
  console.log(firstState.route);
  console.log("is signed in?");
  console.log(firstState.isSignedIn);

  const loadUser = (data) => {
    setFirstState((draft) => {
      draft.user.id = data.id;
      draft.user.name = data.name;
      draft.user.email = data.email;
      draft.user.entries = data.entries;
      draft.user.joined = data.joined;
    });
    console.log("firstState in data");
    console.log(firstState);
  };

  const calcFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };
  const displayFaceBox = (box) => {
    setFirstState({ ...firstState, box: box });
    // firstState.box = box;
  };
  const onInputChange = (event) => {
    setFirstState({ ...firstState, input: event.target.value });
    // firstState.input = event.target.value;
  };
  const onPictureSubmit = () => {
    setFirstState({ ...firstState, imageUrl: firstState.input });
    // firstState.imageUrl = firstState.input;

    fetch(
      "https://api.clarifai.com/v2/models/" + "face-detection" + "/outputs",
      returnClarifaiRequestOptions(firstState.input)
    )
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          // fetch("https://facedetect-api-backend.onrender.com/image", {
          fetch("https://localhost:3000/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: firstState.user.id,
            }),
          })
            .then((response) => response.json())
            // !!! deal with later
            // .then((count) => {
            //   this.setState(Object.assign(this.state.user, { entries: count }));
            // })
            .catch(console.log());
        }
        this.displayFaceBox(this.calcFaceLocation(response));
      })
      .catch(console.log);
  };
  // let route = firstState.route;
  const onRouteChange = (route) => {
    if (route === "signout") {
      setFirstState(loggedOut);
    } else if (route === "home") {
      setFirstState({ ...firstState, isSignedIn: true });
    }
    setFirstState({ ...firstState, route: route });

    console.log("firstState in route change");
    console.log(firstState);
  };
  return (
    <div className="App">
      <Navigation
        isSignedIn={firstState.isSignedIn}
        onRouteChange={onRouteChange}
      />
      {route === "home" ? (
        <div>
          <Rank name={firstState.user.name} entries={firstState.user.entries} />
          <ImageLinkForm
            onInputChange={onInputChange}
            onPictureSubmit={onPictureSubmit}
          />
          <FaceRecognition
            box={firstState.box}
            imageUrl={firstState.imageUrl}
          />
        </div>
      ) : route === "signin" || route === "signout" ? (
        <Signin loadUser={loadUser} onRouteChange={onRouteChange} />
      ) : (
        <Register loadUser={firstState.user} onRouteChange={onRouteChange} />
      )}
    </div>
  );
};
export default App;
