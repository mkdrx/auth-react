import { useRef, useContext } from "react";
import AuthContext from "../../store/auth-context";

import { useHistory } from "react-router-dom";

import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const history = useHistory();

  const newPasswordInputRef = useRef();
  // Tap into AuthContext to get the idToken
  const authCtx = useContext(AuthContext);

  const submitHandler = (e) => {
    e.preventDefault();

    // Extract the value
    const enteredNewPassword = newPasswordInputRef.current.value;

    // Could add validation here

    // Send the request for new password to Firebase
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC1kAcGNjyuJkui58rzbEeoIuFApVd8hks",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: false,
        }),
        headers: { "Content-type": "application/json" },
      }
    ).then((res) => {
      // Redirection after success
      history.replace("/");
    });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="7"
          ref={newPasswordInputRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
