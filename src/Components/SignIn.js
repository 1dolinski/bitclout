import React from "react";
import { useForm } from "react-hook-form";
import firebase from 'firebase/compat/app';

import { FirebaseAuthConsumer } from "@react-firebase/auth";

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) =>
    firebase
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("user", user);
        // ...
      })
      .catch((error) => {
        alert(
          "Did not sign in, dm @bitcloutoffers for an account",
          error.errorMessage
        );
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // ..
      });

  return (
    <FirebaseAuthConsumer>
      {({ isSignedIn, user, providerId }) => {
        return (
          <pre className="text-md font-bold m-4">
            {!isSignedIn && (
              <div class="">
                <p class=""> Sign In</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <input
                    class="border"
                    {...register("email", { required: true })}
                  />{" "}
                  {/* register an input */}
                  {errors.email && <p>E-mail is required.</p>}
                  <input
                    class="border"
                    type="password"
                    {...register("password", { required: true })}
                  />
                  {errors.password && <p>Last name is required.</p>}
                  <input type="submit" />
                </form>
              </div>
            )}

            {isSignedIn && (
              <button
                onClick={() => {
                  firebase.auth().signOut();
                }}
              >
                Sign Out
              </button>
            )}
          </pre>
        );
      }}
    </FirebaseAuthConsumer>
  );
}
