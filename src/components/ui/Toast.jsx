import { useState, useEffect } from "react"

function Toast({ message, type = "success", onClose }) {
  const types = {
    success: "bg-green-800 text-white",
    error: "bg-red-500 text-white",
    info: "bg-blue-500 text-white",
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`fixed bottom-6 right-6 px-6 py-3 rounded-lg shadow-lg ${types[type]} transition-all`}>
      {message}
    </div>
  )
}

export default Toast