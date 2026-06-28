import { useEffect, useRef } from "react"

/**
 * Modal component.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the modal is visible.
 * @param {() => void} props.onClose - Called when the modal should close (backdrop click, close button, or Escape key).
 * @param {string} [props.title] - Title shown in the modal header.
 * @param {React.ReactNode} props.children - Modal body content.
 */
function Modal({ isOpen, onClose, title, children }) {
  const modalRef = useRef(null)

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  // Basic focus trap: move focus into the modal when it opens
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus()
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl outline-none"
        onKeyDown={(e) => {
          // Keep focus inside the modal (simple trap: prevent Tab from leaving it)
          if (e.key === "Tab") {
            e.preventDefault()
            modalRef.current?.focus()
          }
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-green-900 font-bold text-xl">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-2xl font-bold"
          >
            ×
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}

export default Modal