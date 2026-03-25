import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

function Theme() {
    const { t } = useTranslation();

    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "light"
    })

    useEffect(() => {
        document.documentElement.className = theme
        localStorage.setItem("theme", theme)
    },[theme])

  return (
<button
    onClick={() => {
        if (theme === "light") {
            setTheme("dark")
        } else {
            setTheme("light")
        }
    }}
  className="group relative px-5 py-2.5 text-sm font-semibold
         rounded-xl border border-gray-300
         text-gray-800 bg-white
         transition-all duration-300 ease-out
         
         hover:-translate-y-0.5
         hover:shadow-md
         hover:bg-gray-100
         
         active:translate-y-0
         active:scale-95
         
         dark:bg-gray-800
         dark:border-gray-600
         dark:text-gray-100
         dark:hover:bg-gray-700"
>
  <span className="flex items-center gap-2">
    {theme === "light" ? `🌙 ${t("dark_mode")}` : `☀️ ${t("light_mode")}`}
  </span>
</button>
  )
}

export default Theme