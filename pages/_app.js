import "@/styles/reset.css";
import "@/styles/global.css";

import { Fira_Code } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const inter = Fira_Code({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
  );
}
