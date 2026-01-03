import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Login from "./pages/Auth/Login";
import { Layout } from "antd";
import Home from "./pages/Home";
import Classes from "./pages/Classes";
import Students from "./pages/Students";
import Assets from "./pages/Assets";
import Assettypes from "./pages/Assettypes";
import Exams from "./pages/Exams";
import Meals from "./pages/Meals";
import Mealtypes from "./pages/Mealtypes";
import Streams from "./pages/Streams";
import Subjects from "./pages/Subjects";
import Subjecttypes from "./pages/Subjecttypes";
import Teachers from "./pages/Teachers";
import Teachertypes from "./pages/Teachertypes";
import Workers from "./pages/Workers";
import Workertypes from "./pages/Workertypes";
import Parents from "./pages/Parents";
import Paymenttypes from "./pages/Paymenttypes";
import Feepayments from "./pages/Feepayments";
import Feestructure from "./pages/Feestructure";
import Terms from "./pages/Terms";
import Assessment from "./pages/Assessment";
import Assessmentrecords from "./pages/Assessmentrecords";
import Assessmenttypes from "./pages/Assessmenttypes";
import Attendance from "./pages/Attendance";



const router = createBrowserRouter([


    {
      path: "/",
    //loader: () => import("./Layout/MainLayout"),
      element: <MainLayout />,
      children: [
        
        { path: "/", element: <Home /> },
        { path: "attendance", element: <Attendance /> },
        { path: "masters/students", element: <Students /> },
        { path: "masters/classes", element: <Classes /> },
        { path: "masters/streams", element: <Streams /> },
        { path: "masters/teachers", element: <Teachers /> },
        { path: "masters/teachertypes", element: <Teachertypes /> },
        { path: "masters/subjects", element: <Subjects /> },
        { path: "masters/subjecttypes", element: <Subjecttypes /> },
        { path: "masters/exams", element: <Exams /> },
        { path: "terms", element: <Terms /> },
        { path: "masters/meals", element: <Meals /> },
        { path: "masters/mealtypes", element: <Mealtypes /> },
        { path: "masters/parents", element: <Parents /> },
        { path: "masters/assettypes", element: <Assettypes /> },
        { path: "masters/assets", element: <Assets /> },
        { path: "masters/workers", element: <Workers /> },
        { path: "masters/workertypes", element: <Workertypes /> },
        { path: "fees/paymenttypes", element: <Paymenttypes /> },
        { path: "fees/feepayments", element: <Feepayments />},
        { path: "fees/feestructure", element: <Feestructure />},
        { path: "assessment/assessment", element: <Assessment /> },
        { path: "assessment/records", element: <Assessmentrecords /> },
        { path: "assessment/types", element: <Assessmenttypes /> },
   
      ],
    },

    {path: "/login", element: <Layout><Login /></Layout>},

  ]);
  

  export default router;