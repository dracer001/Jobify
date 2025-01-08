import { useState } from 'react';
import LogoutPopup from '../../components/LogoutPopUp';
import UserSettingLink from '../../components/UserSettingLink';
import { useStateContext } from '../../context/ContextProvider';

export default function UserSettings() {
    const settingsNavigation = [
        {
            title: "Profile Settings",
            description: "Edit your profile information.",
            link: "/user/profile",
            verb: "Edit"
        },
        {
            title: "Metrics",
            description: "View your account stats",
            link: "/user/metrics",
            verb: "View"
        },

        {
            title: "Activities",
            description: "View your account activities",
            link: "/user/activities",
            verb: "View"
        },
        {
            title: "Transaction History",
            description: "View and all related trannsaction",
            link: "/user/transactions",
            verb: "View"
        },
        {
            title: "Notifications",
            description: "View and manage your notifications",
            link: "/user/notifications",
            verb: "View"
        },
        {
            title: "Billing",
            description: "Manage Your billing info and payment",
            link: "/user/billing_info",
            verb: "Edit"
        },
        {
            title: "Change Password",
            description: "Update your account password",
            link: "/user/change-password",
            verb: "Edit"
        },
        {
            title: "Trash",
            description: "View and manage all deleted jobs",
            link: "/user/deleted_job",
            verb: "Edit"
        },

    ]

    const { logout } = useStateContext();

    const [showPopup, setShowPopup] = useState(false);

    // Handle the logout action
    const handleLogout = () => {
        logout();
        // Add the logout logic here (e.g., clear user session, redirect, etc.)
        console.log('User logged out');
        // After logout, you can redirect to login page or perform other actions
    };

    // Show the logout confirmation popup
    const triggerLogoutPopup = () => {
        setShowPopup(true);
    };

    // Cancel the logout action
    const cancelLogout = () => {
        setShowPopup(false);
    };
    return (
        <div className="min-h-screen p-6 md:p-12">
            <div className="max-w-md mx-auto space-y-6">

                {/* Settings Options */}
                <div className="space-y-4">

                    {settingsNavigation.map((navigation, index) => (
                        <UserSettingLink
                            key={index}
                            title={navigation.title}
                            description={navigation.description}
                            link={navigation.link}
                            verb={navigation.verb}
                        />
                    ))}
                    <div className="bg-gradient-to-r from-gray-200 to-white p-4 rounded-lg shadow-md transition-all">
                        <h2 className="text-xl font-semibold text-gray-700">Logout</h2>
                        <p className="text-sm text-gray-500">Log out of your account.</p>
                        <button
                            onClick={triggerLogoutPopup}
                            className="text-red-600 hover:text-red-800 transition duration-300 w-full">
                            Logout
                        </button>
                        <LogoutPopup
                            showPopup={showPopup}
                            onConfirmLogout={handleLogout}
                            onCancelLogout={cancelLogout}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
