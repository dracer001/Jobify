import { ChevronDownIcon } from '@heroicons/react/16/solid'

export default function SelectForm({
    name, 
    label="", 
    error, 
    register, 
    options=[], 
    disabled=false,
    onChange = ()=>{}
}) {
  return (
    <>
        <label htmlFor={name} className="block text-sm/6 font-medium text-gray-900">
            {label}
        </label>
        <div className="mt-2 grid grid-cols-1">
            <select
                {...register(name, {
                    onChange: (e) => {onChange(e)},
                })}
                className={`col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 
                    ${error ? 'border-red-500' : 'border-gray-300'} 
                    text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6`}
                disabled={disabled}
            >
                <option value="">select a {label}</option>
                {options.map((option) => (
                <option 
                    key={option.code} 
                    value={option.code}
                >
                    {option.name}
                </option>
                ))}
            </select>
            <ChevronDownIcon
                aria-hidden="true"
                className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
            />
            {error && <span className="text-sm text-red-500">{error}</span>}
        </div>
    </>
  )
}
