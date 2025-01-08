import RadioInput from './RadioInput'

export default function RadioForm({ label = "", name = "", options = [], error, register }) {
  return (
    <div>
      <label className="block text-sm/6 font-medium text-gray-900">
        {label}
      </label>
      <div className="mt-2 flex space-x-4">
        {
          options.map((option) => (
            <RadioInput
              key={name + "-" + option.value}
              id={name + "-" + option.value}
              name={name}
              label={option.label}
              value={option.value}
              register={register} // Pass register from the parent form
              // error={error} // Pass the error message to RadioInput
            />
          ))
        }
      </div>
      {error && <span className="text-sm text-red-500">{error}</span>} {/* Display error in RadioForm */}
    </div>
  );
}
