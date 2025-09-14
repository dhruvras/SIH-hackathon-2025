import { Stack } from "expo-router";
import React from "react";
import { CategoryProvider } from "../../contex/CategoryContext"; // adjust path based on your folder structure

export default function MarkerLayout() {
  return (
    // Wrap your Stack in CategoryProvider so all screens inside can use context
    <CategoryProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </CategoryProvider>
  );
}
