import { ArrowLeftIcon, KeyIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import LeftSide from "../../layout/authLeft";
import { resetPassword } from "../../redux/user/user";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState({});

  const { token } = useParams();

  const dispatch = useDispatch();
  const store = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const handleReset = (e) => {
    e.preventDefault();
    handleValidate();
  };

  useEffect(() => {
    if (
      Object.keys(store.error).length &&
      store.error?.message === "APPLICATION_ERROR"
    ) {
      setError({
        resetPasswordError: "Token is incorrect or expired. Please try again.",
      });
    }
  }, [store]);

  useEffect(() => {
    if (error.confirm === "" && error.password === "") {
      const data = {
        token: token,
        password: password,
        confirm: confirm,
      };
      dispatch(resetPassword(data));
    }
    if (store.success) {
      navigate("/confirm-reset");
    }
  }, [error, navigate, store, token, confirm, password, dispatch]);

  const handleValidate = () => {
    let passwordValid = password.length >= 8;
    let confirmValid = password === confirm;
    setError({
      password: password.length
        ? passwordValid
          ? ""
          : "Password must be at least 8 characters"
        : "Password Field is required",
      confirm: confirm.length
        ? confirmValid
          ? ""
          : "Confirm password must be match with password"
        : "Confirm password Field is required",
    });
  };

  return (
    <div className="h-screen md:flex font-poppinslight">
      <LeftSide />
      <div className="flex md:w-1/2 h-full justify-center py-10 items-center bg-white">
        <form className="bg-white w-2/3 lg:w-1/2" onSubmit={handleReset}>
          <div className="flex justify-center mb-6">
            <div className="bg-primary-50 rounded-full p-2">
              <div className="bg-primary-100 rounded-full p-2">
                <KeyIcon className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </div>
          <h1 className="text-gray-800 font-poppinsSemiBold text-center text-3xl mb-3">
            Set new password
          </h1>
          <p className="text-base font-normal text-center text-gray-600 mb-8">
            Your new password must be different to previously used passwords.
          </p>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-1.5 text-sm font-poppinsMedium text-gray-900"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className={`border mb-2 text-base rounded-lg focus:shadow-primary focus:border-primary-600 focus:ring-1 focus:ring-primary-600 focus:outline-none block w-full py-2.5 px-3.5 ${
                error.password
                  ? "text-red-500 border-red-500"
                  : "border-gray-300 text-gray-500"
              }`}
              placeholder="•••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />
            {error.password && (
              <div className="font-poppinsMedium mb-2 text-red-500">
                {error.password}
              </div>
            )}
            <span className="text-sm">Must be at least 8 characters.</span>
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-1.5 text-sm font-poppinsMedium text-gray-900"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm password"
              className={`border mb-2 text-base rounded-lg focus:shadow-primary focus:border-primary-600 focus:ring-1 focus:ring-primary-600 focus:outline-none block w-full py-2.5 px-3.5 ${
                error.confirm
                  ? "text-red-500 border-red-500"
                  : "border-gray-300 text-gray-500"
              }`}
              placeholder="•••••••••"
              onChange={(e) => setConfirm(e.target.value)}
            />
            {error.confirm && (
              <div className="font-poppinsMedium text-red-500">
                {error.confirm}
              </div>
            )}
          </div>
          {error.resetPasswordError && (
            <div className="font-poppinsMedium text-red-500">
              {error.resetPasswordError}
            </div>
          )}
          <button
            type="submit"
            className="block w-full bg-primary-600 hover:bg-primary-700 mt-6 py-2 rounded-lg text-white font-poppinsSemiBold mb-2"
          >
            Reset Password
          </button>
          <div className="text-center mt-8">
            <Link
              to="/login"
              className="text-sm font-poppinsSemiBold justify-center flex"
            >
              <ArrowLeftIcon className="w-3 align-middle mr-2" />
              <span>Back to log in</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
