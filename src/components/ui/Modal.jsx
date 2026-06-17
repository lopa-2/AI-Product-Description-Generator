function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
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