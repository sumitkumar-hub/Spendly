import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { verifyEmail } from "../api/auth";

export default function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      try {
        await verifyEmail(token);
        toast.success("Email verified");
        navigate("/login");
      } catch {
        toast.error("Verification failed");
      }
    };

    verify();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      Verifying your email...
    </div>
  );
}