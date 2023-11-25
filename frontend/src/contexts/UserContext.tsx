import { createContext, useState, ReactNode } from "react";
import User from "../interfaces/user";

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  country: "",
  state: "",
  dateOfBirth: "",
  city: "",
  gender: "",
  age: "",
};

interface FetchedUser extends User {
  age: string;
}

export const UserContext = createContext({
  user: defaultValues,
  setUser: (userData: FetchedUser) => console.log("Setting user: ", userData),
});

interface Props {
  children: ReactNode;
}

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState(defaultValues);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
