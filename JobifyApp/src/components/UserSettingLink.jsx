import { ChevronRightIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'

export default function UserSettingLink({
    title,
    description,
    link,
    verb
}) {
    return (
        <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md hover:bg-white-200 transition-all">
            <div>
                <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
                <p className="text-sm text-gray-500">{description}</p>
                <Link
                    to={link}
                    className="text-blue-600 hover:text-blue-800 transition duration-300"
                >
                    {verb}
                </Link>
            </div>
            <Link
                to={link}
            >
                <ChevronRightIcon
                    className="size-8 flex-shrink text-gray-400"
                />
            </Link>

        </div>
    )
}
