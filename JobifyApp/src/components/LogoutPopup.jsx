
const LogoutPopup = ({ onConfirmLogout, onCancelLogout, showPopup }) => {
  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-semibold text-center">You are about to log out of this account</h3>
            <div className="flex justify-between mt-6">
              <button
                onClick={onConfirmLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
              >
                Logout
              </button>
              <button
                onClick={onCancelLogout}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200"
              >
                Keep me logged in
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LogoutPopup;
