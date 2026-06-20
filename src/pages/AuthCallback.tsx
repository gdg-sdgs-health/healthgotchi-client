import { useEffect } from "react";
import { useLocation } from "wouter";

export default function AuthCallback() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const hash = window.location.hash;
    const token = new URLSearchParams(hash.replace("#", "?")).get("token");

    if (token) {
      localStorage.setItem("auth_token", token);
      setLocation("/");
    } else {
      setLocation("/login");
    }
  }, [setLocation]);

  return (
    <div className="h-screen flex items-center justify-center">
      <p className="text-muted-foreground font-medium">로그인 처리 중...</p>
    </div>
  );
}
