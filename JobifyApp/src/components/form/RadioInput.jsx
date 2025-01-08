export default function RadioInput({ id, name, label = "", value, register}) {
  return (
    <div className="flex items-center gap-x-3">
      <input
        type="radio"
        value={value}
        {...register("gender")} // Register the input properly

        className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
      />
      <label htmlFor={id} className="block text-sm/6 text-gray-900">
        {label}
      </label>
      {/* {error && <span className="text-sm text-red-500">{error.message}</span>} Display error message */}
    </div>
  );
}
