import React, { useEffect } from "react";
// import axios from "axios";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";

export default function (SpecificComponent, option, adminRoute = null) {
  // option:
  // null== anyone can come
  // true== login user only
  // false== login user not allowed
  function AuthenticationCheck(props) {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth()).then((response) => {
        console.log(response);
        // not login status

        if (!response.payload.isAuth) {
          if (option) {
            props.history.push("/login");
          }
        } else {
          //login status
          if (adminRoute && !response.payload.isAdmin) {
            // not admin
            props.history.push("/");
          } else {
            // login user
            if (option === false) props.history.push("/");
          }
        }
      });
    }, []);

    return <SpecificComponent />;
  }
  return AuthenticationCheck;
}
