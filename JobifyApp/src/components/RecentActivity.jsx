import React from 'react'

export default function RecentActivity({title, timestamp}) {
    return (
        <div className="min-w-max bg-blue-100 rounded-lg p-4 shadow-md flex-shrink-0">
            <h3 className="text-lg font-semibold text-blue-600">{title}</h3>
            <p className="text-sm text-gray-500">{timestamp}</p>
        </div>
    )
}
