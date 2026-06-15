function Card({ name, weight, description, tag }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="bg-green-100 rounded-lg p-4 mb-4 text-center text-3xl">
        🏔️
      </div>
      <span className="bg-green-900 text-yellow-400 text-xs font-bold px-3 py-1 rounded-full">
        {tag}
      </span>
      <h3 className="text-green-900 font-bold text-lg mt-3 mb-1">{name}</h3>
      <p className="text-gray-500 text-sm mb-2">{weight}</p>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  )
}

export default Card