
// components/navbar.tsx
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import NextLink from "next/link";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
  Logo,
} from "@/components/icons";
import Image from "next/image";
import { DesktopNavigation } from "./organisms/navigation/DesktopNavigation";
import { navigationConfig } from "@/config/navigation";
import { MobileNavigation } from "./organisms/navigation/MobileNavigation";

export const Navbar = () => {
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <HeroUINavbar maxWidth="full" position="sticky">
      <NavbarContent className="grid grid-cols-3 w-full items-center justify-self-start" >
        <NavbarBrand as="li" className="gap-3 max-w-fit pt-3" >
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Image
                      src="/muko_logo.png"
                      alt="Muko Furniture Logo"
                     width={150}
                     height={150}
                      className="object-cover"
                    
                    />
          </NextLink>
        </NavbarBrand>
  
        {/* Center: Navigation */}
        <div className="justify-self-center pt-3">
          <DesktopNavigation navItems={navigationConfig} />
        </div>

      </NavbarContent>
    
    

      <NavbarContent className="sm:hidden basis-1 " justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>
     <NavbarMenu>
      
       {/*  {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div> */}
        <div className="mx-4 mt-2">
    <MobileNavigation />
  </div>
      </NavbarMenu> 
    </HeroUINavbar>
  );
};