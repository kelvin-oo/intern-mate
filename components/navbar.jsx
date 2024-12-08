"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Briefcase, LayoutDashboard, LogIn, Menu, LogOut, Home, FileText, BookOpen, Plus } from "lucide-react";
import { useState } from "react";
import { currentClientUser } from "@/helpers/current-client-user";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useProfileStore } from "@/store";
import { useSession } from "next-auth/react"
import { LogoutButton } from "./LogoutButton";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const user = currentClientUser();
  const { name, email, image } = useProfileStore();
  const { data: session, status } = useSession()
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-3">
        {/* Mobile Navigation */}
        <div className="flex items-center justify-between md:hidden">
          <Link href="/" className="flex items-center space-x-2">
            {/* <Briefcase className="h-6 w-6" /> */}
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
                {(user || name) && (
                  <div className="flex flex-col items-center space-y-4 pb-6 border-b">
                   <Image
                    className="rounded-full"
                    src={
                      session?.user?.image ||
                      image ||
                      "/vecteezy_a-flat-icon-of-a-woman-with-long-hair_52835315.jpg"
                    }
                    alt="User Avatar"
                    width={32}
                    height={32}
                    />
                    <div className="flex flex-col items-center space-y-1">
                      <span className="font-semibold text-lg">
                        {session?.user?.name || name}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {session?.user?.email || email}
                      </span>
                    </div>
                  </div>
                )}
                <Button 
                  variant="default"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                 <Link href="/applications/new">Submit Internship</Link>
                </Button>
                <Link 
                  href="/" 
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-2 p-2 rounded-md hover:bg-accent ${
                    pathname === '/' ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  <Home className="h-5 w-5" />
                  <span>Home</span>
                </Link>

                <Link 
                  href="/overview" 
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-2 p-2 rounded-md hover:bg-accent ${
                    pathname === '/overview' ? 'text-primary' : 'text-muted-foreground'
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
                  <FileText className="h-5 w-5" />
                  <span>Applications</span>
                </Link>

                <Link 
                  href="/cv-builder"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-2 p-2 rounded-md hover:bg-accent ${
                    pathname === '/cv-builder' ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  <FileText className="h-5 w-5" />
                  <span>CV Builder</span>
                </Link>

                <Link 
                  href="/resources"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-2 p-2 rounded-md hover:bg-accent ${
                    pathname === '/resources' ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  <BookOpen className="h-5 w-5" />
                  <span>Resources</span>
                </Link>

                <div className="pt-4">
               {
               ( user || name) ?  <LogoutButton>
                <Button 
                   variant="ghost" 
                   className="w-full flex items-center justify-start space-x-2 text-red-500 hover:text-red-600 hover:bg-red-50"
                 >
                   <LogOut className="h-4 w-4" />
                   <span>Log Out</span>
                 </Button>
                </LogoutButton> : <Button onClick={() => setIsOpen(false)} variant="outline" asChild>
                  <Link href="signin" className="flex items-center space-x-2">
                    <LogIn className="h-4 w-4" />
                    <span>Sign In</span>
                  </Link>
                </Button>
               }
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:block">
          <NavigationMenuList className="flex items-center justify-between w-full">
            <Link href="/" className="flex items-center space-x-2">
              {/* <Briefcase className="h-6 w-6" /> */}
              <span className="font-bold text-xl">InternMate</span>
            </Link>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4">
                <NavigationMenuItem>
                  <Link 
                    href="/" 
                    className={`flex items-center space-x-1 ${
                      pathname === '/' ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    <Home className="h-4 w-4" />
                    <span>Home</span>
                  </Link>
                </NavigationMenuItem>

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
                    className={`flex items-center space-x-1 ${
                      pathname === '/applications' ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    <FileText className="h-4 w-4" />
                    <span>Applications</span>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link 
                    href="/resources" 
                    className={`flex items-center space-x-1 ${
                      pathname === '/resources' ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>Resources</span>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link 
                    href="/cv-builder" 
                    className={`flex items-center space-x-1 ${
                      pathname === '/cv-builder' ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    <FileText className="h-4 w-4" />
                    <span>CV Builder</span>
                  </Link>
                </NavigationMenuItem>
              </div>

              {/* <Button 
                variant="default"
                className="flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Submit Internship</span>
              </Button> */}

              {!user && !name ? (
                <Button variant="outline" asChild>
                  <Link href="signin" className="flex items-center space-x-2">
                    <LogIn className="h-4 w-4" />
                    <span>Sign In</span>
                  </Link>
                </Button>
              ) : (
                <Image
                  className="rounded-full"
                  src={
                    session?.user?.image ||
                    image ||
                    "/vecteezy_a-flat-icon-of-a-woman-with-long-hair_52835315.jpg"
                  }
                  alt="User Avatar"
                  width={32}
                  height={32}
                />
              )}

             {
              (user || name) &&  <LogoutButton>
              <Button 
                variant="ghost"
                className="flex items-center space-x-2 text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                <span>Log Out</span>
              </Button>
              </LogoutButton>
             }
            </div>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}
