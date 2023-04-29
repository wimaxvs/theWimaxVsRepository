import "./globals.css";
import { Inter } from "next/font/google";

import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/Modals/RegisterModal";
import LoginModal from "./components/Modals/LoginModal";
import ToasterProvider from "./providers/ToasterProvider";
import getCurrentUser from "./actions/getCurrentUser";
import { ReduxProvider } from "./GlobalRedux/Provider";

export const metadata = {
  title: "Me-CV: Digitized resumes",
  description:
    "The CV for you and the 21st century job market. Digitize your professional persona and stand out from the crowd!",
};

const font = Inter({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
