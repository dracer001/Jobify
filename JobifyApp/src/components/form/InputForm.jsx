
export default function InputForm({
  name, 
  type="text", 
  label="", 
  register, 
  error,
  onChange=()=>{},
  placeHolder="",
  size="sm",
  disabled=false
}) {
  return (
    <>
    <label htmlFor={name} className="block text-sm/6 font-medium text-gray-900">
      {label}
    </label>
    <div className="mt-2">
    <input
      type={type}
      placeholder={placeHolder}
      {...register(name, {
        onChange: (e) => {onChange(e)},
      })}

      className={`block w-full  ${disabled ? "bg-gray-50" : "bg-white"} ${size=="lg"? 'p-3 rounded-lg': 'px-3 py-1.5 rounded-md sm:text-sm/6'}  text-base text-gray-900 
        ${error ? 'outline-red-500' : 'outline-gray-300'} 
        outline outline-1 -outline-offset-1  placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 `}
      disabled={disabled}
    />

      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  </>
  )
}