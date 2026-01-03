import ProLayout from "@ant-design/pro-layout";
import gbhlIcon from "../../public/logo.jpg";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { FiBriefcase, FiUsers } from "react-icons/fi";
import React, { useEffect } from "react";
import axios from "../helpers/axios";



export default function MainLayout() {


    //const [user_id, setUser_id] = React.useState(null);

    // const getUser = () => {
    //    const request =  axios.get("/user/current");
    //     request.then((response) => {
    //         setUser_id(response.data.user_.blk_unittracker_users_status);
    //         //console.log("User", response);
    //         return response;
    //     }).catch((error) => {
    //         console.log(error);
    //     });

    // }
    // useEffect(() => {
    //     getUser();
    // }, []);



    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [token, navigate]);




    return (
        <ProLayout
            logo={gbhlIcon}
            title="Mhandisi System"
            layout="mix"
            menuDataRender={() => [
                {
                    path: "/",
                    name: "Home",
                    icon: <FiBriefcase />,
                },
                {
                    path: "/attendance",
                    name: "Attendance",
                    icon: <FiBriefcase />,
                },
                {
                    path: "/assessment",
                    name: "Assessments",
                    icon: <FiBriefcase />,
                    children: [
                        {
                            path: "/assessment/assessment",
                            name: "Dashboard",
                            icon: <FiUsers />,
                        },
                        {
                            path: "/assessment/records",
                            name: "Records",
                            icon: <FiUsers />,
                        },
                        {
                            path: "/assessment/types",
                            name: "Types",
                            icon: <FiUsers />,
                        },
                    ],
                },
                {
                    path: "/fees",
                    name: "Fees",
                    icon: <FiBriefcase />,
                    children: [
                        {
                            path: "/fees/feepayments",
                            name: "Payments",
                            icon: <FiUsers />,
                        },
                        {
                            path: "/fees/feestructure",
                            name: "Fee Structures",
                            icon: <FiUsers />,
                        },

                        {
                            path: "/fees/paymenttypes",
                            name: "Payment Types",
                            icon: <FiUsers />,
                        },
                    ]

                },
                // Sample Role based views
                // user_id && user_id === 1 && 
                {
                    path: "/masters",
                    name: "Masters",
                    icon: <FiBriefcase />,
                    children: [
                        {
                            path: "/masters/students",
                            name: "Students",
                            icon: <FiUsers />,
                        },
                        // user_id && user_id === 1 && 
                        {
                            path: "/masters/classes",
                            name: "Grades",
                            icon: <FiUsers />,
                        },
                        {
                            path: "/masters/streams",
                            name: "Streams",
                            icon: <FiUsers />,
                        },
                        //parents
                        {
                            path: "/masters/parents",
                            name: "Parents",
                            icon: <FiUsers />,
                        },
                        {
                            path: "/masters/teachers",
                            name: "Teachers",
                            icon: <FiUsers />,
                        },
                        {
                            path: "/masters/teachertypes",
                            name: "Teacher Types",
                            icon: <FiUsers />,
                        },
                        {
                            path: "/masters/subjects",
                            name: "Subjects",
                            icon: <FiUsers />,
                        },
                        {
                            path: "/masters/subjecttypes",
                            name: "Subjects Types",
                            icon: <FiUsers />,
                        },
                        {
                            path: "/masters/exams",
                            name: "Exams",
                            icon: <FiUsers />,
                        },
                        {
                            path: "/terms",
                            name: "Terms",
                            icon: <FiUsers />,
                        },
                        {
                            path: "/masters/meals",
                            name: "Meals",
                            icon: <FiUsers />,
                        },
                        {
                            path: "/masters/mealtypes",
                            name: "Meal Types",
                            icon: <FiUsers />,
                        },
                        {
                            path: "/masters/paymenttypes",
                            name: "Payment Types",
                            icon: <FiUsers />,
                        },
                        {
                            path: "/masters/workers",
                            name: "Workers",
                            icon: <FiUsers />,
                        },
                        {
                            path: "/masters/workertypes",
                            name: "Worker Types",
                            icon: <FiUsers />,
                        },
                        {
                            path: "/masters/assets",
                            name: "Assets",
                            icon: <FiUsers />,
                        },
                        {
                            path: "/masters/assettypes",
                            name: "Asset Types",
                            icon: <FiUsers />,
                        }
                    ],
                },
                // user_id && user_id === 1 && 



            ]}
            menuItemRender={(item, dom) => <Link to={item.path} onClick={() => {
                navigate(item.path);
            }}>{dom}</Link>}
        >
            <Outlet />

        </ProLayout>

    )
}
