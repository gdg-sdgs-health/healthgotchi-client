import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { Home, ListChecks, MessageSquare, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileContainerProps {
  children: ReactNode;
}

export function MobileContainer({ children }: MobileContainerProps) {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "홈", icon: Home },
    { href: "/missions", label: "미션", icon: ListChecks },
    { href: "/board", label: "게시판", icon: MessageSquare },
    { href: "/profile", label: "프로필", icon: User },
  ];

  return (
    <div className="min-h-[100dvh] w-full flex items-center justify-center bg-[#f8f7ff] p-0 md:p-4">
      <div className="relative w-full h-[100dvh] md:h-[850px] max-w-[420px] bg-gray-50 flex flex-col shadow-2xl md:rounded-[2.5rem] overflow-hidden ring-1 ring-gray-900/5">
        <main className="flex-1 overflow-y-auto pb-[80px] scroll-smooth">
          {children}
        </main>
        
        <nav className="absolute bottom-0 left-0 w-full bg-white border-t border-gray-100 px-6 py-4 pb-safe flex justify-between items-center shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)] md:rounded-b-[2.5rem] z-50">
          {navItems.map((item) => {
            const isActive = location === item.href;
            const Icon = item.icon;
            
            return (
              <Link key={item.href} href={item.href}>
                <div 
                  className={cn(
                    "flex flex-col items-center justify-center gap-1.5 transition-all duration-300 ease-out cursor-pointer px-3 py-1 rounded-2xl",
                    isActive ? "text-primary scale-110 bg-primary/5" : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                  )}
                >
                  <Icon className={cn("w-5 h-5", isActive ? "stroke-[2.5px]" : "stroke-[2px]")} />
                  <span className={cn("text-[10px]", isActive ? "font-bold" : "font-medium")}>
                    {item.label}
                  </span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
