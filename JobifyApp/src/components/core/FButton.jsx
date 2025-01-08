
export default function FButton({
    onClick,
    isActive,
    label,
    classNames="",
}) {
  return (
        <button
          onClick={onClick}
          className={`${classNames} px-4 py-2 rounded-lg ${isActive ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          {label}
        </button>
  )
}
