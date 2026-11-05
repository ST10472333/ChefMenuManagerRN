import React, { createContext, useState } from "react";

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState([]);

  const addItem = (item) => {
    setMenuItems([
      ...menuItems,
      {
        id: Date.now().toString(),
        ...item,
      },
    ]);
  };

  return (
    <MenuContext.Provider
      value={{
        menuItems,
        addItem
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};