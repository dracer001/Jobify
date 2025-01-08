import { useState } from 'react';
import { handleDropFile } from '../../hooks/fileHandler';
import { UserIcon } from '@heroicons/react/24/solid';
import { CameraIcon } from '@heroicons/react/24/outline';

export default function ProfilePhotoUpload({
    profilePhoto,
    saveProfilePhoto,
    size="size-24",
    border="border-4",
    className="",
    cameraClass="bottom-2 right-3 w-12 h-12 z-10",
}) {
      const [error, setError] = useState(null);
    
      const {
        getInputProps,
        getRootProps,
      } = handleDropFile('image', saveProfilePhoto, setError);
    
    
    return (
        <div>
            {error && <span className="text-sm text-red-500">{error}</span>}
            <div
                className={`relative flex items-center justify-center ${size} rounded-full overflow-hidden ${border} border-gray-300 ${className}`}
                {...getRootProps()} // Apply dropzone props here
            >
                <input
                    {...getInputProps()}
                    accept="image/*"

                />

                {/* If image is set, show the uploaded image; else show default */}
                {profilePhoto ? (
                    <img
                        src={profilePhoto}
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <UserIcon className={`${size} text-gray-300`} />
                )}

                {/* Camera Icon for Upload Button */}
                <div className={`grid place-items-center absolute rounded-full bg-white/50 cursor-pointer ${cameraClass}`}>
                    <CameraIcon className="w-6 h-6 text-gray-600" />
                </div>
            </div>
        </div>
    )
}
