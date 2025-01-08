// import { useState } from 'react';
// import {
//   Combobox,
//   ComboboxInput,
//   ComboboxButton,
//   ComboboxOptions,
//   ComboboxOption,
// } from '@headlessui/react';
// import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';


// export default function SelectSearch({
//   register=()=>{},
//   name="",
//   label="",
//   onChange=()=>{},
//   options=[],
//   placeHolder="",
//   error=null,
//   size="sm",
//   defaultValue="",
//   disabled=false
// }) {
//   const [query, setQuery] = useState('');
//   const [selectedOption, setSelectedOption] = useState(defaultValue);

//   const filteredOption =
//     query === ''
//       ? options
//       : options.filter((option) =>
//           option.name.toLowerCase().includes(query.toLowerCase())
//         );

//   // Sync selectedOption with react-hook-form
//   const handleSelectOption = (option) => {
//     setSelectedOption(option);
//     onChange(option || ''); // Update the form value
//   };

//   return (
//     <div className="space-y-4 w-72">
//       {/* Hidden input to register Combobox value */}
//       <input
//         type="hidden"
//         {...register(name) }
//       />
//       <div>
//       <label htmlFor={name} className="block text-sm/6 font-medium text-gray-900">
//       {label}
//     </label>
//         <Combobox value={selectedOption} onChange={handleSelectOption}>
//           <div className="relative mt-1">
//             <ComboboxInput
//               className={`block w-full  bg-white ${size=="lg"? 'p-3 rounded-lg': 'px-3 py-1.5 rounded-md sm:text-sm/6'}  text-base text-gray-900 
//               ${error ? 'outline-red-500' : 'outline-gray-300'} 
//               outline outline-1 -outline-offset-1  placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 `}
      
//               onChange={(event) => setQuery(event.target.value)}
//               displayValue={(option) => option?.name || ''}
//               placeholder={placeHolder}
//               disabled={disabled}

//             />
//             <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
//               <ChevronUpDownIcon
//                 className="h-5 w-5 text-gray-400"
//                 aria-hidden="true"
//               />
//             </ComboboxButton>
//             <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//               {filteredOption.length === 0 && query !== '' ? (
//                 <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
//                   Nothing found.
//                 </div>
//               ) : (
//                 filteredOption.map((option) => (
//                   <ComboboxOption
//                     key={option.code}
//                     className={({ focus }) =>
//                       `relative cursor-default select-none py-2 pl-10 pr-4 ${
//                         focus ? 'bg-indigo-600 text-white' : 'text-gray-900'
//                       }`
//                     }
//                     value={option}
//                   >
//                     {({ selected, focus }) => (
//                       <>
//                         <span
//                           className={`block truncate ${
//                             selected ? 'font-medium' : 'font-normal'
//                           }`}
//                         >
//                           {option.name}
//                         </span>
//                         {selected ? (
//                           <span
//                             className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
//                               focus ? 'text-white' : 'text-indigo-600'
//                             }`}
//                           >
//                             <CheckIcon
//                               className="h-5 w-5"
//                               aria-hidden="true"
//                             />
//                           </span>
//                         ) : null}
//                       </>
//                     )}
//                   </ComboboxOption>
//                 ))
//               )}
//             </ComboboxOptions>
//           </div>
//         </Combobox>
//         {error && <span className="text-sm text-red-500">{error}</span>}

//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from 'react';
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
} from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { isEmpty } from '../../helperFunctions';

export default function SelectSearch({
  register = () => {},
  name = "",
  label = "",
  onChange = () => {},
  options = [],
  placeHolder = "",
  error = null,
  size = "sm",
  defaultValue = {},
  disabled = false,
}) {
  const [query, setQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState(defaultValue);
  console.log("defaultValue ", defaultValue );
  console.log("selected option ", selectedOption );
  // Ensure default value is part of the options
  useEffect(() => {
    const isInOptions = (value) => 
      options.some(option => option.code === value.code);

    if (isEmpty(selectedOption)) {
      console.log("selected optin is empty");
      if(isInOptions(defaultValue)) {
        console.log(" found  something not new");
        setSelectedOption(defaultValue);
        onChange(defaultValue);
      }else{
        console.log(" default value not found in options");
        onChange({});
      }
    }else if(!isInOptions(selectedOption)){
      console.log(" found  something not so new but diffrent");
      setSelectedOption({});
      onChange({});
    }else if(isInOptions(selectedOption)){
      console.log(" make sure value is updated ");
      onChange(selectedOption);
    }
  }, [defaultValue, options]);

  const filteredOption =
    query === ''
      ? options
      : options.filter((option) =>
          option.name.toLowerCase().includes(query.toLowerCase())
        );

  // Sync selectedOption with react-hook-form
  const handleSelectOption = (option) => {
    console.log(option);
    setSelectedOption(option);
    onChange(option || ''); // Update the form value
  };

  return (
    <div className="space-y-4 w-72">
      {/* Hidden input to register Combobox value */}
      <input
        type="hidden"
        {...register(name)}
      />
      <div>
        <label htmlFor={name} className="block text-sm/6 font-medium text-gray-900">
          {label}
        </label>
        <Combobox value={selectedOption} onChange={handleSelectOption}>
          <div className="relative mt-1">
            <ComboboxInput
              className={`block w-full bg-white ${
                size === 'lg' ? 'p-3 rounded-lg' : 'px-3 py-1.5 rounded-md sm:text-sm/6'
              } text-base text-gray-900 ${
                error ? 'outline-red-500' : 'outline-gray-300'
              } 
              outline outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600`}
              onChange={(event) => setQuery(event.target.value)}
              displayValue={(option) => option?.name || ''}
              placeholder={placeHolder}
              disabled={disabled}
            />
            <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </ComboboxButton>
            <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {filteredOption.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredOption.map((option) => (
                  <ComboboxOption
                    key={option.code}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {option.name}
                        </span>
                        {selected && (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-indigo-600'
                            }`}
                          >
                            <CheckIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </span>
                        )}
                      </>
                    )}
                  </ComboboxOption>
                ))
              )}
            </ComboboxOptions>
          </div>
        </Combobox>
        {error && <span className="text-sm text-red-500">{error}</span>}
      </div>
    </div>
  );
}
