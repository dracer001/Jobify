'use client'

import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function PopUp({ jobData }) {
  const [open, setOpen] = useState(false)

  const handleDeleteClick = () => {
    setOpen(true)
  }
  const renderModalContent = () => {
    // Conditions for the modal content based on job and payment status
    if (jobData.jobStatus === "pending" && jobData.paymentStatus === "pending") {
      return (
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Warning: Deleting Job</h3>
          <p className="mt-2 text-sm text-gray-500">You are about to delete this job. Please note that jobs cannot be permanently deleted, but they will be moved to the trash.</p>
        </div>
      );
    }

    if (jobData.jobStatus === "pending" && jobData.paymentStatus === "completed") {
      return (
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Warning: Deleting Job</h3>
          <p className="mt-2 text-sm text-gray-500">You are about to delete this job. Please note that jobs cannot be permanently deleted, but they will be moved to the trash. Additionally, 90% of the money paid will be deposited back to your account within 3 days.</p>
        </div>
      );
    }

    if (jobData.jobStatus === "ongoing") {
      return (
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Cannot Delete</h3>
          <p className="mt-2 text-sm text-gray-500">You cannot delete a job that is currently ongoing. Please wait until it is completed or terminated.</p>
        </div>
      );
    }

    if (jobData.jobStatus === "completed" || jobData.jobStatus === "terminated") {
      return (
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Deleting Job</h3>
          <p className="mt-2 text-sm text-gray-500">The job will be deleted only on your end. It will remain visible to the person who is doing the job.</p>
        </div>
      );
    }

    return null;
  }

  return (
    <div>

      {/* Modal Pop-Up */}
      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                    <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                      Job Deletion Confirmation
                    </DialogTitle>
                    <div className="mt-2">
                      {renderModalContent()}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  Confirm Deletion
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
