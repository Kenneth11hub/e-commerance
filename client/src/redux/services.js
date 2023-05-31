import axios from "axios";
import { toast } from "react-toastify";

const breached = localStorage.getItem("rush_reload") || false;

export const login = async (email, password) =>
  await axios
    .get(`auth/login?email=${email}&password=${password}`)
    .then(res => {
      if (res.data.error) {
        toast.warn(res.data.error);
        throw new Error(res.data.error);
      } else {
        toast.success(`Please cheack your email to verify, ${email}`);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("isLogin", true);
        return res.data;
      }
    });

export const validateRefresh = async token =>
  await axios.get(`auth/validateRefresh?token=${token}`).then(res => {
    if (res.data.error) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    } else {
      return res.data;
    }
  });

export const browse = async (entity, key = "", token) => {
  if (!breached) {
    if (typeof key === "object") {
      key = `?${Object.keys(key)
        .map(i => `${i}=${key[i]}`)
        .join("&")}`;
    } else if (key) {
      key = `?key=${key}`;
    }

    return await axios
      .get(`${entity}${key}`, {
        headers: {
          Authorization: `QTracy ${token}`,
        },
      })
      .then(res => res.data)
      .catch(err => {
        if (err.response.data.expired) {
          toast.warn("Session expired, login again.");
        }
        toast.error(err.response.data.error);
        throw new Error(err);
      });
  }
};

export const find = async (entity, pk, token) =>
  !breached &&
  axios
    .get(`${entity}/${pk}/find`, {
      headers: {
        Authorization: `QTracy ${token}`,
      },
    })
    .then(res => res.data)
    .catch(err => {
      if (err.response.data.expired) {
        toast.warn("Session expired, login again.");
      }
      toast.error(err.response.data.error);
      throw new Error(err);
    });

export const save = async (entity, form, token, willToast = true) =>
  !breached &&
  axios
    .post(`${entity}/save`, form, {
      headers: {
        Authorization: `QTracy ${token}`,
      },
    })
    .then(res => {
      if (willToast) {
        toast.success("Item saved successfully");
      }
      return res.data;
    })
    .catch(err => {
      if (err.response.data.expired) {
        toast.warn("Session expired, login again.");
      }
      toast.error(err.response.data.error);
      throw new Error(err);
    });

export const update = (entity, data, id, token, willToast = true) =>
  !breached &&
  axios
    .put(`${entity}/${id}/update`, data, {
      headers: {
        Authorization: `QTracy ${token}`,
      },
    })
    .then(res => {
      if (willToast) {
        toast.info("Item updated successfully");
      }
      return res.data;
    })
    .catch(err => {
      if (err.response.data.expired) {
        toast.warn("Session expired, login again.");
      }
      toast.error(err.response.data.error);
      throw new Error(err);
    });

export const destroy = async (entity, id, token) =>
  !breached &&
  axios
    .delete(`${entity}/${id}/destroy`, {
      headers: {
        Authorization: `QTracy ${token}`,
      },
    })
    .then(res => {
      toast.success("Item deleted successfully");
      return res.data;
    })
    .catch(err => {
      if (err.response.data.expired) {
        toast.warn("Session expired, login again.");
      }
      toast.error(err.response.data.error);
      throw new Error(err);
    });

export const changePassword = async (entity, data) =>
  !breached &&
  axios
    .put(`${entity}/changePassword`, data.form, {
      headers: {
        Authorization: `QTracy ${data.token}`,
      },
    })
    .then(res => {
      if (res.data.error) {
        toast.warn("Please enter the correct current password!");
        throw new Error(res.data.error);
      } else {
        toast.success("Please login again!");
      }
    })
    .catch(err => {
      if (err.response.data.expired) {
        toast.warn("Session expired, login again.");
      }
      toast.error(err.response.data.error);
      throw new Error(err);
    });

export const upload = async (data, willRefresh = true) =>
  !breached &&
  axios
    .post("/auth/file", data.data, {
      headers: {
        Authorization: `QTracy ${data.token}`,
      },
    })
    .then(res => {
      if (res.data.success) {
        toast.success(res.data.message);
        if (willRefresh) {
          setTimeout(() => window.location.reload(), 5100);
        }
      } else {
        toast.error(res.data.message);
        throw new Error(res.data.message);
      }
    })
    .catch(err => {
      throw new Error(err);
    });
