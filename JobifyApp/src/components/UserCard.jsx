import { Link } from "react-router-dom";
import { CheckBadgeIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import  PhotoDisplay  from "../components/PhotoDisplay";

export default function UserCard({
    user
}) {
    const isCompany = user.user_type == "company"
  return (
    <div
    className="min-w-[280px] bg-white p-6 rounded-lg shadow-lg transition-transform relative"
  >
    {/* Profile photo or initials */}
    <div className="flex items-center space-x-4 mb-4">
      <PhotoDisplay user={user} />
      <div>
        <h3 className="text-xl font-semibold text-blue-600">
            { isCompany ? `${user.company_name}` : `${user.first_name} ${user.last_name}`}</h3>
            {
                isCompany ? ( user.company_website && <a href={user.company_website} className="text-sm text-blue-400">website</a>)
                : (<p className="text-sm text-gray-600">{user.title}</p>)
            }
        
      </div>
    </div>

    {/* Verified Status */}
    { (
      <div className="absolute top-2 right-2 flex items-center space-x-2 px-3 py-1 rounded-lg">
        <CheckBadgeIcon className="h-5 w-5 text-blue-600" />
        {/* <span className="text-sm font-semibold">Verified</span> */}
      </div>
    )}

    {/* Location and Bio */}
    <div className="mt-4 text-sm text-gray-700">
      <p className="italic">{`${user.city}, ${user.country}`}</p>
      <p className="mt-2 mb-5 text-gray-500 h-16 overflow-hidden">{user.about}</p>
    </div>

    {/* View Profile Link */}
    <Link
      href={`/user/view/${user.id}`}
      className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-blue-500 font-semibold hover:text-blue-700 transition duration-300"
    >
      View Profile
    </Link>
  </div>
  )
}
