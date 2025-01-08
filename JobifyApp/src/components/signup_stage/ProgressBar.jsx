
export default function ProgressBar ({ currentStage, totalStages }){
  // Calculate the width of the progress bar (percentage of completion)
  const progress = (currentStage / totalStages) * 100;

  return (
    <div className="w-full mt-4">
      {/* Background of the progress bar */}
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600">
            Step {currentStage} of {totalStages}
          </div>
        </div>
        <div className="flex mb-2">
          <div className="w-full bg-gray-300 rounded-full h-2.5">
            <div
              style={{ width: `${progress}%` }}
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

