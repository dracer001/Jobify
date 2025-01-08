import { ChevronDownIcon } from '@heroicons/react/16/solid';

export default function DatalistForm({
  name, 
  label = "", 
  error, 
  register, 
  options = [], 
  disabled = false,
  onChange = () => {}
}) {
  return (
    <>
      <label htmlFor={name} className="block text-sm/6 font-medium text-gray-900">
        {label}
      </label>
      <div className="mt-2 grid grid-cols-1 relative">
        <input
          {...register(name, {
            onChange: (e) => onChange(e),
          })}
          list={`${name}-list`}  // Links the input field to the datalist
          className={`col-start-1 row-start-1 w-full rounded-md bg-white py-1.5 pl-3 pr-8 
            ${error ? 'border-red-500' : 'border-gray-300'} 
            text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6
            appearance-none`}  // Added appearance-none to hide default arrow
          disabled={disabled}
          placeholder={`Select a ${name}`}  // Placeholder for the input
        />
        <datalist id={`${name}-list`}>
          {options.map((option) => (
            <option key={option.code} value={option.name} />
          ))}
        </datalist>

        {/* Chevron Icon (Custom arrow) */}
        <ChevronDownIcon
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 sm:w-5 sm:h-5 w-4 h-4"
        />

        {error && <span className="text-sm text-red-500">{error}</span>}
      </div>
    </>
  );
}
