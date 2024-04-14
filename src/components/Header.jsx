import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

function Header() {
    const user = useSelector(store=> store.user)
    const dispatch = useDispatch()

  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user);
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}))
        navigate('/dashBoard')

        // ...
      } else {
        // User is signed out
        dispatch(removeUser())
        navigate('/')
        // ...
      }
    });
  }, []);


  const SignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("signout successully");
        // navigate('/')


      })
      .catch((error) => {
        console.log(error);

        // An error happened.
      });
  };

  return (
    <div className="flex justify-between font-bold text-white  px-10 bg-black py-2 border-b-2 ">
      <div className="text-3xl">STUD</div>
      {user && <button
        onClick={SignOut}
        className="w-fit bg-red-500 px-3 py-1.5 rounded-md  text-xl"
      >
        SignOut
      </button>}
    </div>
  );
}

export default Header;
