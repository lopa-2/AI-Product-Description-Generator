/**
 * Input component.
 *
 * @param {Object} props
 * @param {string} [props.label] - Optional label text shown above the input.
 * @param {string} [props.placeholder] - Placeholder text shown inside the input.
 * @param {string} [props.type="text"] - HTML input type (e.g. "text", "email", "password").
 * @param {string} props.value - Current input value (controlled component).
 * @param {(e: React.ChangeEvent<HTMLInputElement>) => void} props.onChange - Change handler.
 * @param {string} [props.error] - Error message to display below the input; also applies error styling.
 */
function Input({ label, placeholder, type = "text", value, onChange, error }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-semibold text-green-900">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`border-2 rounded-lg px-4 py-2 text-sm outline-none focus:border-green-600 ${
          error ? "border-red-400" : "border-gray-300"
        }`}
      />
      {error && (
        <p className="text-red-500 text-xs">{error}</p>
      )}
    </div>
  )
}

export default Input