import { Route, Routes } from 'react-router-dom';
import PostList from '../pages/post/PostList';
import PostRead from '../pages/post/PostRead';
import PostWrite from '../pages/post/PostWrite';
import PostUpdate from '../pages/post/PostUpdate';

import MemberLogin from '../pages/member/MemberLogin';
import MemberFindUsername from '../pages/member/MemberFindUsername';
import MemberCheckPassword from '../pages/member/MemberCheckPassword';
import MemberRead from '../pages/member/MemberRead';
import MemberChangePassword from '../pages/member/MemberChangePassword'
import MemberResetPassword from '../pages/member/MemberResetPassword';

import NotFound from '../pages/NotFound';
import Admin from '../pages/admin/Admin';
import E403 from '../pages/E403';

import AdminRoute from '../routes/AdminRoute';
import PublicRoute from '../routes/PublicRoute';
import UserRoute from '../routes/UserRoute';

import MemberSignup from '../pages/member/MemberSignup';
import MemberVerify from '../pages/member/MemberVerify';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PostList />} />
      <Route path="/admin" element={<AdminRoute element={<Admin />} />} />
      <Route path="/post/read" element={<PostRead />} />
      <Route path="/post/write" element={<UserRoute element={<PostWrite />} /> } />
      <Route path="/post/update" element={<UserRoute element={<PostUpdate />} /> } />
      <Route path="/member/signup" element={<PublicRoute element={<MemberSignup />} />} />
      <Route path="/member/verify" element={<PublicRoute element={<MemberVerify />} />} />
      <Route path="/member/login" element={<PublicRoute element={<MemberLogin />} /> } />
      <Route path="/member/find-username" element={<PublicRoute element={<MemberFindUsername />} /> } />
      <Route path="/member/find-password" element={<PublicRoute element={<MemberResetPassword />} /> } />
      <Route path="/member/check-password" element={<UserRoute element={<MemberCheckPassword />} /> } />
      <Route path="/member/read" element={<UserRoute element={<MemberRead />} /> } />
      <Route path="/member/change-password" element={<UserRoute element={<MemberChangePassword />} /> } />
      <Route path="/e403" element={<E403 />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes