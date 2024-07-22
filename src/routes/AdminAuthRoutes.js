import React from "react";
import { Route } from "react-router-dom";
import AdminAuthGaurd from "../gaurd/AdminAuthGaurd";

import AddOpenings from "../admin_pages/AdminLogin/AdminChildPages/MasterCurrentOpening/AddOpeningForm/AddOpenings";
import AdminDashboard from "../admin_pages/AdminLogin/AdminDashboard/AdminDashboard.jsx";
import MasterCurrentOpening from "../admin_pages/AdminLogin/AdminChildPages/MasterCurrentOpening/MasterCurrentOpening";
import MasterJobProfile from "../admin_pages/AdminLogin/AdminChildPages/MasterJobProfile/MasterJobProfile";
import MasterInterviewSchedule from "../admin_pages/AdminLogin/AdminChildPages/MasterInterviewSchedule/MasterInterviewSchedule";
import Reports from "../admin_pages/AdminLogin/Reports/Reports.jsx";
import AddPostApplied from "../admin_pages/AdminLogin/MasterPages/AddPostApplied.jsx";
import AddSubPostApplied from "../admin_pages/AdminLogin/MasterPages/AddSubPostApplied.jsx";
import AddDepartment from "../admin_pages/AdminLogin/MasterPages/AddDepartment.jsx";
import AddExamType from "../admin_pages/AdminLogin/MasterPages/AddExamType.jsx";
import AddDegree from "../admin_pages/AdminLogin/MasterPages/AddDegree.jsx";
import AddCategories from "../admin_pages/AdminLogin/MasterPages/AddCategories.jsx";
import AddSubjects from "../admin_pages/AdminLogin/MasterPages/AddSubjects.jsx";
import AdminList from "../admin_pages/AdminLogin/SuperAdmin/AdminList.jsx";
import GetRights from "../admin_pages/AdminLogin/SuperAdmin/GetRights.jsx";
import GetRole from "../admin_pages/AdminLogin/SuperAdmin/GetRole.jsx";
import EditOpenings from "../admin_pages/AdminLogin/AdminChildPages/MasterCurrentOpening/EditOpeningForm/EditOpenings.jsx";

import MasterTable from "../admin_pages/AdminLogin/AdminChildPages/MasterCurrentOpening/MasterCurrentOpeningChild/MasterTable.jsx";
import AdminRegister from "../admin_pages/AdminLogin/AdminChildPages/RegisterAdmin/AdminRegister.jsx";
import VisitorsReports from "../admin_pages/AdminLogin/VisitorsReport/VisitorsReports.jsx";
import Dashboard from "../admin_pages/AdminLogin/AdminDashboard/Dashboard.jsx";
import MasterJobTable from "../admin_pages/AdminLogin/AdminChildPages/MasterJobProfile/MasterJobProfileChild/MasterJobTable.jsx";
// import MasterJobTable from "../admin_pages/AdminLogin/AdminChildPages/MasterJobProfile/MasterJobProfileChild/MasterJobTable.jsx";
import AddForm from "../admin_pages/AdminLogin/AdminChildPages/MasterJobProfile/AddForm/AddForm.jsx";
import EditJobProfile from "../admin_pages/AdminLogin/AdminChildPages/MasterJobProfile/EditJobProfileForm/EditJobProfile.jsx";
import FrontEndPanel from "../AdminFrontend/FrontEndPanel/FrontEndPanel.jsx";
import EditHeader from "../AdminFrontend/FrontendPages/EditHeader/EditHeader.jsx";
import EditHome from "../AdminFrontend/FrontendPages/EditHome/EditHome.jsx";
import Section1 from "../AdminFrontend/FrontendPages/EditHome/HomeSubPages/Section1.jsx";
import Section2 from "../AdminFrontend/FrontendPages/EditHome/HomeSubPages/Section2.jsx";
import Section3 from "../AdminFrontend/FrontendPages/EditHome/HomeSubPages/Section3.jsx";
import Section4 from "../AdminFrontend/FrontendPages/EditHome/HomeSubPages/Section4.jsx";
import Section5 from "../AdminFrontend/FrontendPages/EditHome/HomeSubPages/Section5.jsx";
import FaqSection from "../AdminFrontend/FrontendPages/FaqSection/FaqSection.jsx";
import EditInterviewSchedule from "../AdminFrontend/FrontendPages/EditInterviewSchedule/EditInterviewSchedule.jsx";
import EditContact from "../AdminFrontend/FrontendPages/EditHome/HomeSubPages/EditContact.jsx";
import EditFooter from "../AdminFrontend/FrontendPages/EditFooter/EditFooter.jsx";
import FrontendDashboard from "../AdminFrontend/FrontendDashboard/FrontendDashboard.jsx";
// console.log("inside Candidate-Auth Routes");
const AdminAuthRoutes = [
  // <Route path="adminpanel" element= {<AdminAuthGaurd component ={<Adminpanel />} />}></Route>,
  <Route
    key="admin-dashboard"
    path="/admin-dashboard"
    element={<AdminAuthGaurd component={<AdminDashboard />} />}
  >
    {/* whitelabel routing starts */}
    <Route
      key="EditHeader"
      path="EditHeader"
      element={<AdminAuthGaurd component={<EditHeader />} />}
    ></Route>
    <Route
      key="EditHome"
      path="EditHomePage"
      element={<AdminAuthGaurd component={<EditHome />} />}
    ></Route>
    <Route
      key="Section1"
      path="Section1"
      element={<AdminAuthGaurd component={<Section1 />} />}
    ></Route>
    <Route
      key="Section2"
      path="Section2"
      element={<AdminAuthGaurd component={<Section2 />} />}
    ></Route>
    <Route
      key="Section3"
      path="Section3"
      element={<AdminAuthGaurd component={<Section3 />} />}
    ></Route>
    <Route
      key="Section4"
      path="Section4"
      element={<AdminAuthGaurd component={<Section4 />} />}
    ></Route>
    <Route
      key="Section5"
      path="Section5"
      element={<AdminAuthGaurd component={<Section5 />} />}
    ></Route>
    <Route
      key="FaqSection"
      path="FaqSection"
      element={<AdminAuthGaurd component={<FaqSection />} />}
    ></Route>
    <Route
      key="EditInterviewSchedule"
      path="EditInterviewSchedule"
      element={<AdminAuthGaurd component={<EditInterviewSchedule />} />}
    ></Route>
    <Route
      key="EditContact"
      path="EditContact"
      element={<AdminAuthGaurd component={<EditContact />} />}
    ></Route>
    <Route
      key="EditFooter"
      path="EditFooter"
      element={<AdminAuthGaurd component={<EditFooter />} />}
    ></Route>
    {/* whitelabel routing ends */}
    <Route
      key="dashboard"
      path="dashboard"
      element={<AdminAuthGaurd component={<Dashboard />} />}
    />
    <Route
      key="current-openings"
      path="current-openings"
      element={<AdminAuthGaurd component={<MasterCurrentOpening />} />}
    >
      <Route path="" element={<AdminAuthGaurd component={<MasterTable />} />} />
      <Route
        path="add-openings"
        element={<AdminAuthGaurd component={<AddOpenings />} />}
      />
      <Route
        path="edit-openings/:profileId"
        element={<AdminAuthGaurd component={<EditOpenings />} />}
      />
    </Route>
    {/* <Route
      key="job-profile"
      path="job-profile"
      element={<AdminAuthGaurd component={<MasterJobProfile />} />}
    /> */}
    <Route
      key="job-profile"
      path="job-profile"
      element={<AdminAuthGaurd component={<MasterJobProfile />} />}
    >
      <Route
        path=""
        element={<AdminAuthGaurd component={<MasterJobTable />} />}
      />
      <Route
        path="add-jobprofiles"
        element={<AdminAuthGaurd component={<AddForm />} />}
      />
      <Route
        path="edit-jobprofiles/:profileId"
        element={<AdminAuthGaurd component={<EditJobProfile />} />}
      />
    </Route>
    {/* ----------------------- */}
    <Route
      key="interview-schedule"
      path="interview-schedule"
      element={<AdminAuthGaurd component={<MasterInterviewSchedule />} />}
    />
    <Route
      key="reports"
      path="reports"
      element={<AdminAuthGaurd component={<Reports />} />}
    />
    <Route
      key="add-post-applied"
      path="add-post-applied"
      element={<AdminAuthGaurd component={<AddPostApplied />} />}
    />
    <Route
      key="add-sub-post-applied"
      path="add-sub-post-applied"
      element={<AdminAuthGaurd component={<AddSubPostApplied />} />}
    />
    <Route
      key="add-departments"
      path="add-departments"
      element={<AdminAuthGaurd component={<AddDepartment />} />}
    />
    <Route
      key="add-exam-type"
      path="add-exam-type"
      element={<AdminAuthGaurd component={<AddExamType />} />}
    />
    <Route
      key="add-degree"
      path="add-degree"
      element={<AdminAuthGaurd component={<AddDegree />} />}
    />
    <Route
      key="add-categories"
      path="add-categories"
      element={<AdminAuthGaurd component={<AddCategories />} />}
    />
    <Route
      key="add-subjects"
      path="add-subjects"
      element={<AdminAuthGaurd component={<AddSubjects />} />}
    />
    <Route
      key="admin-list"
      path="admin-list"
      element={<AdminAuthGaurd component={<AdminList />} />}
    />
    <Route
      key="right-list"
      path="right-list"
      element={<AdminAuthGaurd component={<GetRights />} />}
    />
    <Route
      key="role-list"
      path="role-list"
      element={<AdminAuthGaurd component={<GetRole />} />}
    />
    <Route key="add-openings" path="add-openings" element={<AddOpenings />} />,
    <Route
      key="admin_register"
      path="admin_register"
      element={<AdminAuthGaurd component={<AdminRegister />} />}
    ></Route>
    ,
    <Route
      key="admin_visitors_reports"
      path="admin_visitors_reports"
      element={<AdminAuthGaurd component={<VisitorsReports />} />}
    ></Route>
    ,
  </Route>,
  // ---------------------------------------------------

  //    <Route
  //    key="FrontendDashboard"
  //    path="FrontendDashboard"
  //    element={<AdminAuthGaurd component={<FrontendDashboard />} />}
  //  >
  //    <Route
  //      key="EditHeader"
  //      path="EditHeader"
  //      element={<AdminAuthGaurd component={<EditHeader />} />}
  //    ></Route>
  //    <Route
  //      key="EditHome"
  //      path="EditHomePage"
  //      element={<AdminAuthGaurd component={<EditHome />} />}
  //    ></Route>
  //    <Route
  //      key="Section1"
  //      path="Section1"
  //      element={<AdminAuthGaurd component={<Section1 />} />}
  //    ></Route>
  //    <Route
  //      key="Section2"
  //      path="Section2"
  //      element={<AdminAuthGaurd component={<Section2 />} />}
  //    ></Route>
  //    <Route
  //      key="Section3"
  //      path="Section3"
  //      element={<AdminAuthGaurd component={<Section3 />} />}
  //    ></Route>
  //    <Route
  //      key="Section4"
  //      path="Section4"
  //      element={<AdminAuthGaurd component={<Section4 />} />}
  //    ></Route>
  //    <Route
  //      key="Section5"
  //      path="Section5"
  //      element={<AdminAuthGaurd component={<Section5 />} />}
  //    ></Route>
  //    <Route
  //      key="FaqSection"
  //      path="FaqSection"
  //      element={<AdminAuthGaurd component={<FaqSection />} />}
  //    ></Route>
  //    <Route
  //      key="EditInterviewSchedule"
  //      path="EditInterviewSchedule"
  //      element={<AdminAuthGaurd component={<EditInterviewSchedule />} />}
  //    ></Route>
  //    <Route
  //      key="EditContact"
  //      path="EditContact"
  //      element={<AdminAuthGaurd component={<EditContact />} />}
  //    ></Route>
  //    <Route
  //      key="EditFooter"
  //      path="EditFooter"
  //      element={<AdminAuthGaurd component={<EditFooter />} />}
  //    ></Route>
  //    ,
  //  </Route>,
];

export default AdminAuthRoutes;

/* <Route
      path="add-openings"
      element={<AdminAuthGaurd component={<AddOpenings />} />}
    ></Route>
    ,
    <Route
      path="edit-openings/:id"
      element={<AdminAuthGaurd component={<EditOpenings />} />}
    ></Route> */
