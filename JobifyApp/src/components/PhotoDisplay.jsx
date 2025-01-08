
export default function PhotoDisplay({ user, size="w-16 h-16" }) {

    const isCompany = user.user_type == "company"

    const getInitials = (firstName, lastName) => {
        return `${firstName[0]}${lastName[0]}`;
      };
    
      const getInitialsC = (companyName) => {
        return companyName.slice(0, 2).toUpperCase(); // Take the first two letters of the company name
      };

    return (
        <>
            {user.profile_photo ? (
                <img
                    src={user.profile_photo}
                    alt={isCompany ? user.company_name : user.first_name}
                    className={`${size} rounded-full object-cover`}
                />
            ) : (
                <div className={`${size} bg-gray-400 text-white flex items-center justify-center rounded-full`}>
                    <span className="text-2xl font-bold">{isCompany ? getInitialsC(user.company_name) : getInitials(user.first_name, user.last_name)}</span>
                </div>
            )}
        </>
    )
}
