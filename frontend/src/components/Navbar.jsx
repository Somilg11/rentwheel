import { useState } from "react";
import { Car, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Vehicles", href: "/vehicles" },
    { name: "Locations", href: "/locations" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 md:h-20">
          <div className="flex items-center">
            <a href="/" className="flex-shrink-0 flex items-center">
              <Car className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              <span className="ml-2 text-lg sm:text-xl font-bold text-primary">rent<span className="text-blue-600">wheel.</span></span>
            </a>
          </div>
          <div className="hidden md:ml-6 md:flex md:space-x-4 lg:space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="inline-flex items-center px-1 pt-1 text-sm lg:text-base font-medium text-gray-500 hover:text-primary"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden md:ml-6 md:flex md:items-center">
            <Button className="text-sm lg:text-base px-4 py-2 lg:px-6 lg:py-3">Book Now</Button>
          </div>
          <div className="flex items-center md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-primary">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open main menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] sm:w-[300px]">
                <div className="flex items-center justify-between mb-8">
                  <a href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
                    <Car className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                    <span className="ml-2 text-lg sm:text-xl font-bold text-primary">CarRental</span>
                  </a>
                  
                </div>
                <div className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-base font-medium text-gray-500 hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </a>
                  ))}
                  <Button className="mt-4 w-full text-base" onClick={() => setIsOpen(false)}>Book Now</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      {/* <div className="md:hidden border-t border-gray-200 py-2">
        <Button className="w-[90vw] mx-4 rounded-none text-base py-3">Book Now</Button>
      </div> */}
    </nav>
  );
};

export default Navbar;