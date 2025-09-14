import React, { createContext, useContext, useState } from "react";

// 👇 Define the type for context (purely compile-time, won't exist at runtime)
interface CategoryContextType {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

// 👇 Create context, default is undefined
const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

// 👇 Provider component to wrap your app
export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <CategoryContext.Provider value={{ selectedCategory, setSelectedCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

// 👇 Hook for easy access
export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }
  return context;
};
