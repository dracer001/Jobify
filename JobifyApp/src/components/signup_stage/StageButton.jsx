export default function StageButton({ stage, totalStage, handleNext, handlePrevious, handleSubmit }) {
  return (
    <div className="flex justify-between mt-6">
      {stage > 1 && (
        <button
          onClick={handlePrevious}
          className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700"
        >
          Previous
        </button>
      )}

      <button
        onClick={(stage === totalStage) ? handleSubmit : handleNext}
        className="px-6 py-3 rounded-md text-white bg-blue-600 hover:bg-blue-700"
      >
        {stage === totalStage ? 'Submit' : 'Next'}
      </button>
    </div>
  );
}
