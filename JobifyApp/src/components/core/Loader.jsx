export default function Loader () {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="flex space-x-2">
                <div className="w-6 h-6 rounded-full bg-slate-800 animate-zoom-1"></div>
                <div className="w-6 h-6 rounded-full bg-slate-800 animate-zoom-2"></div>
                <div className="w-6 h-6 rounded-full bg-slate-800 animate-zoom-3"></div>
            </div>
        </div>
    );
};