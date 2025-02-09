import { ReactNode } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

const Layout = () => {
  const location = useLocation();

  const isActiveLink = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-md">
        <div className="w-full px-6 flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-lg font-bold text-primary-foreground">
                B
              </span>
            </div>
            <span className="text-xl font-semibold">부동산 플랫폼</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link
              to="/search"
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                isActiveLink("/search")
                  ? "bg-secondary text-secondary-foreground"
                  : "hover:bg-secondary/80"
              )}
            >
              매물 검색
            </Link>
            <Link
              to="/map"
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                isActiveLink("/map")
                  ? "bg-secondary text-secondary-foreground"
                  : "hover:bg-secondary/80"
              )}
            >
              지도 보기
            </Link>
            <Link
              to="/favorites"
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                isActiveLink("/favorites")
                  ? "bg-secondary text-secondary-foreground"
                  : "hover:bg-secondary/80"
              )}
            >
              관심 매물
            </Link>
          </nav>

          {/* Auth Buttons & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link to="/login">로그인</Link>
              </Button>
              <Button asChild>
                <Link to="/register">회원가입</Link>
              </Button>
            </div>

            {/* Mobile Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link to="/search">매물 검색</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/map">지도 보기</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/favorites">관심 매물</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/login">로그인</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/register">회원가입</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full px-6 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t bg-secondary/30">
        <div className="w-full px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">회사 소개</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/about"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    소개
                  </Link>
                </li>
                <li>
                  <Link
                    to="/careers"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    채용
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">고객 지원</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/contact"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    문의하기
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faq"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    자주 묻는 질문
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">법적 고지</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/privacy"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    개인정보처리방침
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    이용약관
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">고객센터</h4>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>평일 09:00 - 18:00</p>
                <p>점심시간 12:00 - 13:00</p>
                <p className="font-medium text-foreground">1544-0000</p>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            © 2024 부동산 플랫폼. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
