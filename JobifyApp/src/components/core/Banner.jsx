import { XMarkIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react';

export default function Banner() {

    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
    setIsVisible(true);
    }, []);

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 transform transition-all duration-500 ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"} isolate flex items-center gap-x-6 overflow-hidden bg-gray-50 px-6 py-2.5 sm:px-3.5 sm:before:flex-1`}>
      <div
        aria-hidden="true"
        className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
      >
        <div
          style={{
            clipPath:
              'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
          }}
          className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
      >
        <div
          style={{
            clipPath:
              'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
          }}
          className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
        />
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="text-sm/6 text-gray-900">
          <strong className="font-semibold">GeneriCon 2023</strong>
          <svg viewBox="0 0 2 2" aria-hidden="true" className="mx-2 inline size-0.5 fill-current">
            <circle r={1} cx={1} cy={1} />
          </svg>
          Join us in Denver from June 7 – 9 to see what’s coming next.
        </p>
        <a
          href="#"
          className="flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
        >
          Register now <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
      <div className="flex flex-1 justify-end">
        <button type="button" className="-m-3 p-3 focus-visible:outline-offset-[-4px]" onClick={()=>{setIsVisible(false)}}>
          <span className="sr-only">Dismiss</span>
          <XMarkIcon aria-hidden="true" className="size-5 text-gray-900" />
        </button>
      </div>
    </div>
  )
}


// import { XMarkIcon } from '@heroicons/react/20/solid';
// import { useState, useEffect } from 'react';

// export default function Banner({
//   bgColor = "blue",
//   shouldClose = true,
//   onClose = () => {},
//   className = "",
//   children,
// }) {
//   // State to handle animation
//   const [isVisible, setIsVisible] = useState(false);

//   // Slide-down animation logic (triggered on mount)
//   useEffect(() => {
//     setIsVisible(true);
//   }, []);

//   // Initialize classes array
//   let classes = [];

//   // Set background color based on the provided bgColor
//   switch (bgColor) {
//     case "blue":
//       classes = [...classes, "bg-blue-600"];
//       break;
//     case "green":
//       classes = [...classes, "bg-emerald-600", "hover:bg-emerald-700"];
//       break;
//     case "gray":
//       classes = [...classes, "bg-slate-800", "hover:bg-slate-900"];
//       break;
//     case "light-gray":
//       classes = [...classes, "bg-gray-300", "hover:bg-gray-400"];
//       break;
//     default:
//       classes = [...classes, "bg-transparent", "text-slate-800", "border-slate-800"];
//   }

//   // Merge the dynamic background color classes and the passed className
//   const classNames = `${classes.join(" ")} ${className}`;

//   // Close button, rendered conditionally based on shouldClose
//   const closeButton = shouldClose ? (
//     <div className="flex flex-1 justify-end">
//       <button type="button" className="-m-3 p-3 focus-visible:outline-offset-[-4px]" onClick={onClose}>
//         <span className="sr-only">Dismiss</span>
//         <XMarkIcon aria-hidden="true" className="size-5 text-gray-900" />
//       </button>
//     </div>
//   ) : null;

//   return (
//     <div
//       className={`fixed top-0 left-0 right-0 z-50 transform transition-all duration-500 ${
//         isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
//       } ${classNames}`}
//     >
//       <div
//         aria-hidden="true"
//         className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
//       >
//         <div
//           style={{
//             clipPath:
//               'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
//           }}
//           className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
//         />
//       </div>
//       <div
//         aria-hidden="true"
//         className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
//       >
//         <div
//           style={{
//             clipPath:
//               'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
//           }}
//           className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
//         />
//       </div>
//       <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
//         <div
//           className="text-sm/6 text-gray-900"
//           dangerouslySetInnerHTML={{ __html: children }} // Injecting HTML content
//         />
//       </div>
//       {closeButton}
//     </div>
//   );
// }
