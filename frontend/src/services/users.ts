import User from "../interfaces/user";

const backendUrl = import.meta.env.VITE_REGISTRATION_SERVICES;

export const saveUserRegistration = (user: User) => {
  return fetch(`${backendUrl}/users`, {
    method: "post",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const fetchRegisteredInfoByEmail = (payload: { email: string }) => {
  return fetch(`${backendUrl}/users/info`, {
    method: "post",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
