import React, { useEffect, useState } from 'react'

function Theme() {

    const [theme, setTheme] = useState("light")

    useEffect(() => {
        document.documentElement.className = theme
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
  class="group relative px-5 py-2.5 text-sm font-semibold
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
         dark:hover:bg-gray-700">

  <span class="flex items-center gap-2">
    {theme === "light" ? "🌙 dark" : "☀️ light"}
  </span>
</button>
  )
}

export default Theme