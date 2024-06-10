import { createBrowserRouter } from "react-router-dom";
import SearchPage from "../pages/SearchPage";
import App from "../pages/App";
import HistoryPage from "../pages/HistoryPage";
import MovieFollowingPage from "../pages/MovieFollowingPage";
import ViewPage from "../pages/ViewPage";
import PremiumPage from "../pages/PremiumPage";
import PlanformPage from "../pages/PlanformPage";
import Login, { LoginPage } from "../pages/user/LoginPage";
import RegisterPage from "../pages/user/RegisterPage";
import VerifyOtp from "../pages/user/VerifyOtp";
import NewPassword from "../pages/user/NewPassword";
import ForgetPage from "../pages/user/ForgetPage";
import AccountPage from "../pages/account/AccountPage";
import UpdateInfoAccount from "../pages/account/UpdateInfoAccount";
import ChangePasswordPage from "../pages/account/ChangePasswordPage";
import VIewTogetherPage from "../pages/VIewTogetherPage";
import MovieManagePage from "../pages/MovieManagePage";
import MovieEditPage from "../pages/EditMoviePage";
import MovieAddPage from "../pages/AddMoviePage";
import VipUserPage from "../pages/VipUserPage";
import AddActorPage from "../pages/AddActorPage"
import EditActorPage from "../pages/EditActorPage"
import AssignedMoviePage from "../pages/AssignedMoviePage"
import ActorManagePage from "../pages/ActorManagePage";
import ScheduleManagePage from "../pages/ScheduleManagePage";
import FollowingMoviePage from "../pages/FollowingMoviePage";
import AddEspisodePage from "../pages/AddEspisodePage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/search',
                element: <SearchPage />
            },
            {
                path: '/history',
                element: <HistoryPage />
            },
            {
                path: '/movie-following',
                element: <MovieFollowingPage />
            },
            {
                path: '/view/:id/:stt?',
                element: <ViewPage />
            },
            {
                path: '/premium',
                element: <PremiumPage />
            },
            {
                path: '/planform',
                element: <PlanformPage />
            },
            {
                path: '/account',
                element: <AccountPage />
            },
            {
                path: '/update-infomation',
                element: <UpdateInfoAccount />
            },
            {
                path: '/change-password',
                element: <ChangePasswordPage />
            },
            {
                path: '/view-together',
                element: <VIewTogetherPage />
            },
            {
                path: '/mManage',
                element: <MovieManagePage />
            },
            {
                path: '/mAdd',
                element: <MovieAddPage />
            },
            {
                path: '/mAddEsp/:id',
                element: <AddEspisodePage />
            },
            {
                path: '/mEdit/:id',
                element: <MovieEditPage />
            },
            {
                path: '/mVip',
                element: <VipUserPage />
            },
            {
                path: '/mActor',
                element: <ActorManagePage />
            },
            {
                path: '/mAddActor',
                element: <AddActorPage />
            },
            {
                path: '/mEditActor/:id',
                element: <EditActorPage />
            },
            {
                path: '/mAssign/:id',
                element: <AssignedMoviePage />
            },
            {
                path: '/mSchedule',
                element: <ScheduleManagePage />
            },
            {
                path: '/followedMovie',
                element: <FollowingMoviePage />
            }
        ]
    },
    {
        path: '/user',
        element: <Login />,
        children: [
            {
                path: 'login',
                element: <LoginPage />
            },
            {
                path: 'register',
                element: <RegisterPage />
            },
            {
                path: 'forget_password',
                element: <ForgetPage />
            },
            {
                path: 'verify',
                element: <VerifyOtp />
            },
            {
                path: 'new_password',
                element: <NewPassword />
            },
        ]
    }
])

export default router