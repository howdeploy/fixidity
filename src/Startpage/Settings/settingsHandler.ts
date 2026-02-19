import {
  linkGroup,
  Theme,
  Search as SearchType,
  links,
  searchSettings,
  themes,
} from "../../data/data"

export const Search = {
  get: () => {
    const lsSearch = localStorage.getItem("search-settings")
    if (lsSearch) return Search.parse(lsSearch)
    return undefined
  },
  getWithFallback: () => {
    try {
      return Search.get() ?? searchSettings
    } catch {
      console.error(
        "Your currently applied search settings appear to be corrupted."
      )
      return searchSettings
    }
  },

  set: (searchSettings: SearchType) =>
    localStorage.setItem("search-settings", JSON.stringify(searchSettings)),

  parse: (searchSettings: string) => JSON.parse(searchSettings) as SearchType,
}

export const Themes = {
  get: () => {
    const lsThemes = localStorage.getItem("themes")
    if (lsThemes) return JSON.parse(lsThemes) as Theme[]
    return undefined
  },
  getWithFallback: () => {
    try {
      return Themes.get() ?? themes
    } catch {
      console.error("Your currently applied themes appear to be corrupted.")
      return themes
    }
  },

  set: (themes: Theme[]) =>
    localStorage.setItem("themes", JSON.stringify(themes)),

  add: (theme: Theme) => {
    const lsThemes = Themes.get()
    if (lsThemes) Themes.set([...lsThemes, theme])
    else Themes.set([theme])
  },

  remove: (name: string) => {
    const lsThemes = Themes.get()
    if (lsThemes) Themes.set(lsThemes.filter(theme => theme.name !== name))
  },

  parse: (theme: string) => JSON.parse(theme) as Theme,
}

const linkGroupsKey = "link-groups"
export const Links = {
  getRaw: () => localStorage.getItem(linkGroupsKey),
  get: () => {
    const lsLinks = localStorage.getItem(linkGroupsKey)
    if (lsLinks) return Links.parse(lsLinks)
    return undefined
  },
  getWithFallback: () => {
    try {
      return Links.get() ?? links
    } catch {
      console.error("Your currently applied links appear to be corrupted.")
      return links
    }
  },

  set: (themes: linkGroup[]) =>
    localStorage.setItem(linkGroupsKey, JSON.stringify(themes)),

  parse: (linkGroups: string) => JSON.parse(linkGroups) as linkGroup[],
}

export const Design = {
  get: () => {
    const lsDesign = localStorage.getItem("design")
    if (lsDesign) return Themes.parse(lsDesign)
    return undefined
  },
  getWithFallback: () => {
    try {
      return Design.get() ?? themes[0]!
    } catch {
      console.error("Your currently applied design appears to be corrupted.")
      return themes[0]!
    }
  },

  set: (design: Theme) =>
    localStorage.setItem("design", JSON.stringify(design)),
}

const CONFIG_KEYS = ["design", "themes", "link-groups", "search-settings"] as const

export const exportConfig = () => {
  const config: Record<string, unknown> = {}
  for (const key of CONFIG_KEYS) {
    const value = localStorage.getItem(key)
    if (value) config[key] = JSON.parse(value)
  }
  const blob = new Blob([JSON.stringify(config, null, 2)], {
    type: "application/json",
  })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = "fixidity-config.json"
  a.click()
  URL.revokeObjectURL(url)
}

export const importConfig = (file: File): Promise<boolean> =>
  new Promise(resolve => {
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const config = JSON.parse(reader.result as string)
        const hasValidKey = CONFIG_KEYS.some(key => key in config)
        if (!hasValidKey) {
          resolve(false)
          return
        }
        for (const key of CONFIG_KEYS) {
          if (key in config) {
            localStorage.setItem(key, JSON.stringify(config[key]))
          }
        }
        resolve(true)
      } catch {
        resolve(false)
      }
    }
    reader.onerror = () => resolve(false)
    reader.readAsText(file)
  })
