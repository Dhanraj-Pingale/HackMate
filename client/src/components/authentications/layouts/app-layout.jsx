import { Outlet } from "react-router-dom";

const AppLayout = () => {
    return (
        <div>
            <div className="grid-background"></div>
            <main className="min-h-screen container">
                <Outlet />
            </main>
            <div className="p-10 text-center bg-gray-800 mt-10">
                Made with 💟 by Tejas Limbikai
            </div>
        </div>
    );
};

export default AppLayout;

