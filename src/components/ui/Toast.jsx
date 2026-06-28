import { useEffect } from "react"

/**
 * Toast component.
 * A brief notification that appears in the corner of the screen and
 * automatically dismisses itself after 3 seconds.
 *
 * @param {Object} props
 * @param {string} props.message - The text to display in the toast.
 * @param {"success"|"error"|"info"} [props.type="success"] - Visual style of the toast.
 * @param {() => void} props.onClose - Called automatically after the toast's timeout elapses, to hide it.
 */
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