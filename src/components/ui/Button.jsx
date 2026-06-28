/**
 * Button component.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button label/content.
 * @param {"primary"|"secondary"|"outline"} [props.variant="primary"] - Visual style of the button.
 * @param {"sm"|"md"|"lg"} [props.size="md"] - Size of the button.
 * @param {boolean} [props.disabled=false] - Disables the button and applies a disabled style.
 * @param {() => void} [props.onClick] - Click handler.
 */
function Button({ children, variant = "primary", size = "md", disabled = false, onClick }) {
  const base = "font-semibold rounded-lg transition-all duration-200"

  const variants = {
    primary: "bg-green-800 text-white hover:bg-green-700",
    secondary: "bg-transparent text-green-800 border-2 border-green-800 hover:bg-green-100",
    outline: "bg-transparent text-gray-600 border-2 border-gray-400 hover:bg-gray-100",
  }

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-5 py-2 text-base",
    lg: "px-8 py-3 text-lg",
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${sizes[size]} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {children}
    </button>
  )
}

export default Button