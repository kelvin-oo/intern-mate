"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Briefcase, LayoutDashboard, LogIn, Menu } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-3">
        {/* Mobile Navigation */}
        <div className="flex items-center justify-between md:hidden">
          <Link href="/" className="flex items-center space-x-2">
            <Briefcase className="h-6 w-6" />
            <span className="font-bold text-xl">InternMate</span>
          </Link>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-8">
                <Link 
                  href="/dashboard" 
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-2 p-2 rounded-md hover:bg-accent ${
                    pathname === '/dashboard' ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  <LayoutDashboard className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
                
                <Link 
                  href="/applications"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-2 p-2 rounded-md hover:bg-accent ${
                    pathname === '/applications' ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  <span>Applications</span>
                </Link>

                <div className="pt-4">
                  <Button variant="outline" asChild className="w-full">
                    <Link 
                      href="/auth/signin" 
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center space-x-2"
                    >
                      <LogIn className="h-4 w-4" />
                      <span>Sign In</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:block">
          <NavigationMenuList className="flex items-center justify-between w-full">
            <Link href="/" className="flex items-center space-x-2">
              <Briefcase className="h-6 w-6" />
              <span className="font-bold text-xl">InternMate</span>
            </Link>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4">
                <NavigationMenuItem>
                  <Link 
                    href="/dashboard" 
                    className={`flex items-center space-x-1 ${
                      pathname === '/dashboard' ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link 
                    href="/applications" 
                    className={pathname === '/applications' ? 'text-primary' : 'text-muted-foreground'}
                  >
                    Applications
                  </Link>
                </NavigationMenuItem>
              </div>
              
              <Button variant="outline" asChild>
                <Link href="/auth/signin" className="flex items-center space-x-2">
                  <LogIn className="h-4 w-4" />
                  <span>Sign In</span>
                </Link>
              </Button>
            </div>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}