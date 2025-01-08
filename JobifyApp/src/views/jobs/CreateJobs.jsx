

import { useEffect, useState } from 'react';
import axios from 'axios';
import { PaperClipIcon } from '@heroicons/react/20/solid';
import useStateCookie from '../../hooks/useStateCookie';
import useError from '../../hooks/useNotification';
import { axiosClient } from '../../context/axios';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import InputForm from '../../components/form/InputForm';
import SelectForm from '../../components/form/SelectForm';
import TextareaForm from '../../components/form/TextareaForm';
import Loader from '../../components/core/Loader';
import useNotification from '../../hooks/useNotification';
import Notification from '../../components/core/Notification';
import TButton from '../../components/core/TButton';
import { useNavigate } from 'react-router-dom';


export default function CreateJobs() {

  const navigate = useNavigate();
  const { message, type, isVisible, showError, showSuccess } = useNotification();

  const [tagLists, setTagLists] = useStateCookie("tagLists", []);
  const [categories, setCategories] = useStateCookie("categories", []);

  const [loading, setLoading] = useState(false);

  const [jobPayload, setJobPayload] = useState({
    title: "",
    category_id: null,
    description: "",
    salary: 0.00,
    tags: [],
  })

  useEffect(() => {
    if (categories.length == 0) {
      console.log("setting loading to ture")
      setLoading(true);
      axiosClient.get('/categories')
        .then(response => {
          const categories = response.data.map((category) => ({
            code: category.id, // Convert id to code
            name: category.name,
          }));
          setCategories(categories);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          showError("Failed In fetching interest list, Please refresh browser or skip stage !")
          setLoading(false);
          console.log("setting loading to false")

        })
    }
  }, []);

  const validation = Yup
    .object()
    .shape({
      title: Yup.string().required("Job title is required"),
      description: Yup.string().required("Job Description is required"),
      salary: Yup
      .number()
      .required('Salary is required')
      .typeError('Salary must be a number')
      .min(5, 'Salary must be at least $5')
      .max(1000000, 'Salary must be less than $1,000,000')
    })
    .required()

  // react-hook-form
  const { register, trigger, getValues, formState: { errors } } = useForm({
    resolver: yupResolver(validation),
    mode: "onChange",
    defaultValues: jobPayload
  })

  // Form submission handler
  const handleSubmit = async () => {
    const isValid = await trigger();  // Trigger validation for all fields in the form
    if (isValid) {

      const updatedValues = getValues();



      const payload = {
        ...updatedValues,  // Spread the rest of the updated values
        category_id: parseInt(updatedValues.category_id, 10)
      };

      setLoading(true);
      axiosClient
        .post("/work", payload)
        .then(({ data }) => {
          setLoading(false);
          console.log(data);
          showSuccess("Work has been addedd!")
          setTimeout(() => {
            navigate("/job/payment?job_id=" + data.data.id);
          }, 3000);
        })
        .catch((error) => {
          setLoading(false);
          console.error(error);
          if (error.response && error.response.data.errors) {
            const finalErrors = Object.values(error.response.data.errors).reduce(
              (accum, next) => [...accum, ...next],
              []
            );
            console.log(finalErrors);
            showError(finalErrors.join("<br>")); // Make sure to sanitize HTML if needed
          } else {
            console.error("Unknown error:", error);
          }
        });
    } else {
      console.log("Validation failed");
    }
  };


  return (
    <div className="max-w-4xl m-5 md:m-auto bg-white shadow-lg rounded-lg p-8 md:py-12 md:px-16">
      {isVisible && <Notification message={message} type={type} />}

      {loading && <Loader />}
      <h2 className="text-2xl font-semibold text-blue-500 mb-6">Post New Job</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }} className=''>
        {/* Job Title */}
        <div className="mb-5">
          <InputForm
            name="title"
            label='Job Title'
            register={register}
            error={errors.title?.message}
            placeHolder="Your Titile should capture what your job is about."
          />

        </div>



        {/* Description */}
        <div className="mb-5">
          <TextareaForm
            name="description"
            label='Job Description'
            register={register}
            error={errors?.category?.message}
            placeHolder="make your job describtion sort and as detailed as possible"
          />
        </div>

        {/* Category */}
        <div className="mb-5">
          <SelectForm
            name="category_id"
            label='Job Category'
            register={register}
            error={errors?.category?.message}
            options={categories}
          />
        </div>

        {/* Salary */}
        <div className="mb-5">
          <InputForm
          type='number'
            name="salary"
            label="How much would you like to pay for this Job ($)"
            register={register}
            error={errors.salary?.message}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <TButton
            type="submit"
            className="font-semibold rounded-lg shadow-md"
          >
            Post Job
          </TButton>
        </div>
      </form>
    </div>
  )
}
