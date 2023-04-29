// 'use client'
// import {store} from "./store"
// import { Provider } from "react-redux"

// interface ProviderProps{
//     children?: React.ReactNode
// }
// export const ReduxProvider: React.FC<ProviderProps> = ({children}) => {
//   return (
//     <Provider store={store}>{children}</Provider>
//   )
// }


"use client";

import { Provider } from "react-redux";
import { store } from "./store";

export function ReduxProvider({ children }: {children: React.ReactNode}) {
  return <Provider store={store}>{children}</Provider>;
}
