import { useState, createContext } from "react";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [profile, setProfile] = useState([]);
  const [images, setImages] = useState([]);

  const updatedProfile = (item) => {
    setProfile(item);
    //console.log(item);
  };
  const updatedImages = (item) => {
    setImages([...images, item]);
  };

  return (
    <UserContext.Provider
      value={{
        profile,
        setProfile,
        updatedProfile,
        images,
        setImages,
        updatedImages,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
