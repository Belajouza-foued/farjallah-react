import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/AdminLayout.css";


function AdminLayout(){

    return (

        <div className="admin-layout">

            <div className="row g-0">

                {/* SIDEBAR */}
                <aside className="col-lg-2 admin-layout-sidebar">

                    <AdminSidebar />

                </aside>


                {/* CONTENT */}
                <main className="col-lg-10 admin-layout-content">

                    <Outlet />

                </main>


            </div>

        </div>

    );

}


export default AdminLayout;