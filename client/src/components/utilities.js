import axios from "axios";
import { toast } from "react-toastify";
import io from "socket.io-client";
import DefaultUser from "../assets/images/default.jpg";
import ErrorNull from "../assets/images/404.jpg";
import ErrorBadRequest from "../assets/images/400.png";

export const PresetUser = DefaultUser;
export const ErrorPage = ErrorNull;
export const ErrorFalse = ErrorBadRequest;

export const ENDPOINT = "http://localhost:5000"; // server (specify ip if you will debug in other devices)
// export const ENDPOINT = window.location.origin; // deployed

export const socket = io.connect(ENDPOINT);

export const register = data =>
  axios
    .post("auth/save", data)
    .then(() => true)
    .catch(err => {
      toast.error(err.response.data.error);
      return false;
    });

export const fullName = fullName => {
  if (fullName) {
    const { fname, mname, lname } = fullName;
    let middleName = "";
    if (mname) {
      middleName = `${mname
        .split(" ")
        .map(middle => middle.charAt(0).toUpperCase())
        .join("")}.`;
    }
    return `${lname}, ${fname} ${middleName}`.replace(/^\s+|\s+$/gm, "");
  }
};

export const formatCurrency = num =>
  num && num > 0
    ? num.toLocaleString("en-US", { style: "currency", currency: "PHP" })
    : "-";

export const handlePagination = (array, page, maxPage) =>
  array.slice((page - 1) * maxPage, maxPage + (page - 1) * maxPage);

export const getAge = age => {
  var ageInMilliseconds = new Date() - new Date(age);
  return Math.floor(ageInMilliseconds / 1000 / 60 / 60 / 24 / 365);
};

export const fullMobile = mobile =>
  mobile
    ? `+63 ${mobile.slice(0, 3)}-${mobile.slice(3, 6)}-${mobile.slice(6, 10)}`
    : "-";

export const validateContactNumber = e => {
  if (
    (e.keyCode >= 48 && e.keyCode <= 58) ||
    (e.keyCode >= 96 && e.keyCode <= 105) ||
    e.keyCode === 8
  ) {
    return true;
  } else {
    e.preventDefault();
  }
};

export const handleTimer = mili => {
  const padTo2Digits = num => num.toString().padStart(2, "0");

  if (mili > 0) {
    let seconds = Math.floor(mili / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds = seconds % 60;
    minutes = minutes % 60;

    // 👇️ If you don't want to roll hours over, e.g. 24 to 00
    // 👇️ comment (or remove) the line below
    // commenting next line gets you `24:00:00` instead of `00:00:00`
    // or `36:15:31` instead of `12:15:31`, etc.
    hours = hours % 24;

    return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
      seconds
    )}`;
  } else {
    return "-:-:-";
  }
};

export const miliToHours = mili => {
  let seconds = mili / 1000;
  let minutes = seconds / 60;
  let hours = minutes / 60;

  seconds = seconds % 60;
  minutes = minutes % 60;

  // 👇️ If you don't want to roll hours over, e.g. 24 to 00
  // 👇️ comment (or remove) the line below
  // commenting next line gets you `24:00:00` instead of `00:00:00`
  // or `36:15:31` instead of `12:15:31`, etc.
  hours = hours % 24;

  return hours;
};

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
