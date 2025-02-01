import Navbar from "./Navbar";
import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";
import { Button } from "@/components/ui/button";
const MainLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="mx-auto max-w-7xl p-6 lg:px-8 font-Outfit min-h-screen">
      {/* <Navbar />
       */}
      <Button>ShadCN Button</Button>
    </div>
  );
};

//   <div className="relative flex justify-center">
//     {/* Open Modal Button */}
//     <button
//       onClick={() => setIsOpen(true)}
//       className="px-6 py-2 mx-auto tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-md hover:cursor-pointer hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-80"
//     >
//       Open Modal
//     </button>

//     {/* Modal */}
//     <Transition appear show={isOpen} as={Fragment}>
//       <Dialog
//         as="div"
//         className="fixed inset-0 z-10 overflow-y-auto"
//         onClose={() => setIsOpen(false)}
//       >
//         <div
//           className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0 bg-red-200"
//           onClick={() => setIsOpen(false)}
//         >
//           {/* Background Overlay */}
//           <TransitionChild
//             as={Fragment}
//             enter="transition-opacity duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-40"
//             leave="transition-opacity duration-150"
//             leaveFrom="opacity-40"
//             leaveTo="opacity-0"
//           >
//             <div className="fixed inset-0 bg-black bg- opacity-40" />
//           </TransitionChild>

//           {/* Modal Panel */}
//           <TransitionChild
//             as={Fragment}
//             enter="transition duration-300 ease-out"
//             enterFrom="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
//             enterTo="translate-y-0 opacity-100 sm:scale-100"
//             leave="transition duration-150 ease-in"
//             leaveFrom="translate-y-0 opacity-100 sm:scale-100"
//             leaveTo="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
//           >
//             <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl rtl:text-right dark:bg-gray-900 sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
//               <div>
//                 <div className="flex items-center justify-center">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="w-8 h-8 text-gray-700 dark:text-gray-300"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
//                     />
//                   </svg>
//                 </div>

//                 <div className="mt-2 text-center">
//                   <DialogTitle
//                     as="h3"
//                     className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white"
//                   >
//                     Archive Project
//                   </DialogTitle>
//                   <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
//                     Lorem, ipsum dolor sit amet consectetur adipisicing
//                     elit. Aspernatur dolorum aliquam ea, ratione deleniti
//                     porro officia? Explicabo maiores suscipit.
//                   </p>
//                 </div>
//               </div>

//               <div className="mt-5 sm:flex sm:items-center sm:justify-between">
//                 <a
//                   href="#"
//                   className="text-sm text-blue-500 hover:underline"
//                 >
//                   Learn more
//                 </a>

//                 <div className="sm:flex sm:items-center ">
//                   <button
//                     onClick={() => setIsOpen(false)}
//                     className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mt-0 sm:w-auto sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
//                   >
//                     Cancel
//                   </button>

//                   <button className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:w-auto sm:mt-0 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
//                     Archive
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </TransitionChild>
//         </div>
//       </Dialog>
//     </Transition>
//   </div>
export default MainLayout;
