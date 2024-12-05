import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCurrentUser } from "./store/slice/authSlice";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { HomePage } from "./pages/HomePage";

import AuthLayout from "./components/AuthLayot";
import VideoDetail from "./pages/VideoDetail";
import Layout from "./components/Layout";
import SearchPage from "./pages/SearchPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import TermsandCondition from "./pages/TermsandCondition";
import Collections from "./pages/Collections";
import LikedVideos from "./pages/LikedVideos";
import Playlists from "./pages/Playlists";
import Playlist from "./pages/Playlist";
import HistoryPage from "./pages/HistoryPage";
import Subscriptions from "./pages/Subscriptions";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {" "}
          {/* Layout is the base route */}
          <Route
            index
            element={
              <AuthLayout authentication={false}>
                <HomePage /> {/* This is the child route */}
              </AuthLayout>
            }
          />
        </Route>
        <Route
          path="/search/:query"
          element={
            <AuthLayout authentication={false}>
              <SearchPage />
            </AuthLayout>
          }
        />
        <Route
          path="/watch/:videoId/:ownerId"
          element={
            <AuthLayout authentication={true}>
              <VideoDetail />
            </AuthLayout>
          }
        />
        <Route
          path="/liked-videos"
          element={
            <AuthLayout authentication={true}>
              <LikedVideos />
            </AuthLayout>
          }
        />
        <Route
          path="/playlists"
          element={
            <AuthLayout authentication={true}>
              <Playlists />
            </AuthLayout>
          }
        />
        <Route
          path="/playlists/:playlistId"
          element={
            <AuthLayout authentication={true}>
              <Playlist />
            </AuthLayout>
          }
        />
        <Route
          path="/history"
          element={
            <AuthLayout authentication={true}>
              <HistoryPage />
            </AuthLayout>
          }
        />
        <Route
          path="/subscriptions"
          element={
            <AuthLayout authentication={true}>
              <Subscriptions />
            </AuthLayout>
          }
        />
        <Route
          path="/collections"
          element={
            <AuthLayout authentication={true}>
              <Collections />
            </AuthLayout>
          }
        />

        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/terms&conditions"
          element={
            <AuthLayout authentication={true}>
              <TermsandCondition />
            </AuthLayout>
          }
        />
      </Routes>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "12px",
            background: "linear-gradient(135deg, #1e3a8a, #3b82f6)",
            color: "#ffffff",
            boxShadow: "0 4px 14px rgba(0, 0, 0, 0.15)",
            padding: "16px",
            fontFamily: "Roboto, sans-serif",
            fontSize: "16px",
            display: "flex",
            alignItems: "center",
          },
          success: {
            icon: "✅",
            style: {
              borderRadius: "12px",
              background: "linear-gradient(135deg, #22c55e, #4ade80)",
              color: "#ffffff",
              borderLeft: "5px solid #16a34a",
            },
          },
          error: {
            icon: "❌",
            style: {
              borderRadius: "12px",
              background: "linear-gradient(135deg, #ef4444, #f87171)",
              color: "#ffffff",
              borderLeft: "5px solid #dc2626",
            },
          },
        }}
      />
    </>
  );
}

export default App;
