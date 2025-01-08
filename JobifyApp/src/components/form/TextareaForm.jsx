export default function TextareaForm({ 
  label, 
  name, 
  rows = 3, 
  required = false, 
  register,
  placeHolder="",
  disabled=false
}) {
  return (
    <>
      <label htmlFor={name} className="block text-sm/6 font-medium text-gray-900">
        {label}
      </label>
      <div className="mt-2">
        <textarea
          id={name}
          name={name}
          rows={rows}
          placeholder={placeHolder}
          className={`block w-full rounded-md ${disabled ? "bg-gray-50" : "bg-white"} px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6`}
          required={required}
          {...register(name)}
          disabled={disabled}
          // Conditionally apply register or manual value and onChange
        >
        </textarea>
      </div>
    </>
  );
}
