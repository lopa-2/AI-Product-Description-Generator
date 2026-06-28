/**
 * Loader component.
 * A spinning loading indicator used during data fetching or async actions.
 *
 * @param {Object} props
 * @param {"sm"|"md"|"lg"} [props.size="md"] - Size of the spinner.
 */
function Loader({ size = "md" }) {
  const sizes = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-4",
    lg: "w-12 h-12 border-4",
  }

  return (
    <div className="flex items-center justify-center">
      <div
        className={`${sizes[size]} border-green-800 border-t-transparent rounded-full animate-spin`}
      />
    </div>
  )
}

export default Loader