import { useEffect } from "react"

import "./base/variables.css"

import * as Settings from "./Startpage/Settings/settingsHandler"
import { Startpage } from "./Startpage/Startpage"

const App = () => {
  const colors: Record<string, string> =
    Settings.Design.getWithFallback().colors

  useEffect(() => {
    const root = document.documentElement
    Object.keys(colors).forEach(key => {
      root.style.setProperty(key, colors[key] ?? null)
    })
  }, [colors])

  return <Startpage />
}

export default App
