// BillingPage.jsx

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import InputForm from "../../components/form/InputForm";
import TButton from "../../components/core/TButton";
import * as yup from 'yup';
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import Loader from "../../components/core/Loader";
import Notification from "../../components/core/Notification";
import useNotification from "../../hooks/useNotification";
import { axiosClient } from "../../context/axios";
import { isEmpty } from "../../helperFunctions";
import { useStateContext } from "../../context/ContextProvider";
import WarningDialog from "../../components/core/warningDialog";
import SuccessDialog from "../../components/core/SuccessDialog";

const validationSchema = yup.object().shape({
  cardNumber: yup
    .string()
    .matches(
      /^[0-9]{4}(?: [0-9]{4}){3}$/,  // Updated regex
      "Card number must be 16 digits"
    )
    .required("Card number is required"),

  cardExpiry: yup
    .string()
    .matches(
      /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
      "Expiry date must be in MM/YY format"
    )

    .required("Expiry date is required"),

  cardCvv: yup
    .string()
    .matches(/^[0-9]{3}$/, "CVV must be 3 digits")
    .required("CVV is required"),
});


export default function JobPayment() {

  const navigate = useNavigate();

  // Get jobId from searchParams
  const { currentUser } = useStateContext();

  const [searchParams] = useSearchParams();
  const jobId = searchParams.get('job_id'); // Use 'job_id' or the query parameter you're passing
  const [job, setJob] = useState({});
  const { message, type, isVisible, showError, showSuccess } = useNotification();
  const [loading, setLoading] = useState(false);

  const [isWarningDialog, setIsWarningDialog] = useState(false);
  const [isSuccessDialog, setIsSuccessDialog] = useState(false);


  const [billingDetails, setBillingDetails] = useState({
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);  // Set loading to true when starting the API calls
      try {
        const jobResponse = await axiosClient.get(`/work/work_id_by_user/${jobId}`);
        setJob(jobResponse.data.data);
        const billingInfoResponse = await axiosClient.get(`/user/billing_info`);
        setBillingDetails(billingInfoResponse?.data);
      } catch (error) {
          console.error('An error occurred:', error);
          if (error.response && error.response.status === 401) {
              navigate("/401"); // Redirect to 403 page if the response status is 403.
          }
      } finally {
        setLoading(false);  // Always set loading to false when done
      }
    };
    if (jobId && !isEmpty(currentUser)) {
      fetchData();  // Call the async function
    }
  }, [jobId, currentUser]);

  const { register, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: billingDetails,
    mode: "onChange"
  });


  // Function to format card number with spaces
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
    value = value.replace(/(\d{4})(?=\d)/g, '$1 '); // Add space after every 4 digits
    setValue('cardNumber', value); // Set raw value without spaces for submission
  };

  // Function to format expiry date with "/"
  const handleExpiryDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
    if (value.length >= 3) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4); // Add '/' after 2 digits
    }
    setValue('cardExpiry', value); // Set raw value without slash for submission
  };



  const handleWarningDialog = () => {
    setIsWarningDialog(true);
  };

  const handleSuccessDialog = () => {
    setIsSuccessDialog(true);
  };

  const handleWarningClose = () => {
    setIsWarningDialog(false);
  };
  const handleSuccessClose = () => {
    setIsSuccessDialog(false);
  };

  const handleWarningConfirm = () => {
    // Add your logic for the "Proceed with Action" button here
    console.log('Action confirmed');
    navigate("/job/"+jobId);
  };
  const handleSuccessConfirm = () => {
    // Add your logic for the "Proceed with Action" button here
    console.log('Action confirmed');
  };

  return (
    <>
      {isVisible && <Notification message={message} type={type} />}
      {
        loading ? (
          <Loader />
        ) : (

          <div className="min-h-screen bg-gray-100 py-12 px-6 sm:px-8">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-center text-blue-500 mb-6">
                Billing Information
              </h2>

              {/* Job Info */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="md:text-lg font-semibold text-gray-700">Job Title</span>
                  <span className="md:text-lg font-medium text-gray-900">{job.title}</span>
                </div>

                <div className="flex justify-between">
                  <span className="md:text-lg font-semibold text-gray-700">Amount</span>
                  <span className="md:text-lg font-medium text-gray-900">${job.salary}</span>
                </div>
              </div>

              {/* Billing Details Form */}
              <div className="space-y-4 mb-6">

                <div>
                  <InputForm
                    name="cardNumber"
                    label="Card Number"
                    placeHolder="1234 5678 9876 5432"
                    size="lg"
                    register={register}
                    onChange={handleCardNumberChange}
                    error={errors.cardNumber?.message}
                  />
                </div>

                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <InputForm
                      name="cardExpiry"
                      label="Expiry Date"
                      size="lg"
                      placeHolder="MM/YY"
                      register={register}
                      onChange={handleExpiryDateChange}
                      error={errors.cardExpiry?.message}

                    />
                  </div>
                  <div className="w-1/2">
                    <InputForm
                      name="cardCvv"
                      label="CVV"
                      size="lg"
                      placeHolder="123"
                      register={register}
                      error={errors.cardCvv?.message}
                    />
                  </div>
                </div>
              </div>

              {/* Payment Buttons */}
              <div className="mt-8 flex flex-col md:flex-row justify-between md:space-x-6 space-x-0 md:space-y-0 space-y-4">
                <TButton
                  onClick={handleSuccessDialog}
                  className="w-full font-semibold shadow-md"
                >
                  Proceed to Payment
                </TButton>

                <TButton
                  onClick={handleWarningDialog}
                  color="light-gray"
                  className="font-semibold shadow-md w-full"
                >
                  Make Payment Later
                </TButton>
              </div>
            </div>

            <WarningDialog
              isOpen={isWarningDialog}
              onClose={handleWarningClose}
              onConfirm={handleWarningConfirm}
              title="Payment Reminder"
              message="Your job will not be made public until payment is made. You can pay later, but keep in mind that your job will remain hidden from potential applicants until payment is processed."
              confirmButtonText="Proceed Without Payment"
              cancelButtonText="Cancel"
            />

            <SuccessDialog
              isOpen={isSuccessDialog}
              onClose={handleSuccessClose}
              title="Payment Successful"
              message="Your payment has been successfully processed. Your job is now public and visible to potential applicants."
              buttonText="Close"
            />
          </div>

        )
      }
    </>
  );
};
