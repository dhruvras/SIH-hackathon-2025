// app/_layout.tsx
import { Stack } from "expo-router";
import { NotificationsProvider } from "../contex/NotificationsContext";

export default function RootLayout() {
  return (
    <NotificationsProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </NotificationsProvider>
  );
}
