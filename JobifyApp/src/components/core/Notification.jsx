import { CheckCircleIcon, XCircleIcon, InformationCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';
import { useState, useEffect } from 'react';

// Notification Component
export default function Notification({ message, type, onClose }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (!message) return;
        setVisible(true);

        const timer = setTimeout(() => {
            setVisible(false);
            onClose();
        }, 5000);

        return () => clearTimeout(timer);
    }, [message, onClose]);

    const handleClose = () => {
        setVisible(false);
        if (onClose) {
            onClose();
        }
    };

    let icon;
    let bgColor;
    let notificationClass = 'animate-drop-in'; // Default drop-in animation

    if (!visible) {
        notificationClass = 'animate-fade-out'; // Apply fade-out animation when closing
    }

    switch (type) {
        case 'success':
            icon = <CheckCircleIcon className="h-8 w-8 text-white" />;
            bgColor = 'bg-green-500';
            break;
        case 'error':
            icon = <XCircleIcon className="h-8 w-8 text-white" />;
            bgColor = 'bg-red-500';
            break;
        case 'info':
            icon = <InformationCircleIcon className="h-8 w-8 text-white" />;
            bgColor = 'bg-blue-500';
            break;
        case 'warning':
            icon = <ExclamationCircleIcon className="h-8 w-8 text-white" />;
            bgColor = 'bg-yellow-500';
            break;
        default:
            icon = <CheckCircleIcon className="h-8 w-8 text-white" />;
            bgColor = 'bg-green-500';
    }

    return (
        visible && (
            <div
                className={`fixed top-1 left-1/2 transform -translate-x-1/2 w-full sm:max-w-lg px-6 py-4 text-white rounded-lg shadow-xl flex items-center justify-between space-x-4 z-50 transition-all duration-500 ease-out ${bgColor} ${notificationClass}`}
            >
                <div className="flex items-center space-x-4">
                    {icon}
                    <span className="text-lg font-semibold flex-1">{message.message || message.__html}</span>
                </div>
                <button
                    onClick={handleClose}
                    className="ml-4 bg-transparent text-white hover:text-gray-200 focus:outline-none"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>
        )
    );
}