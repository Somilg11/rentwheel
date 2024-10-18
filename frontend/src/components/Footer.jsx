// React and Next.js imports
// import Image from "next/image";
// import a from "next/a";

// Third-party library imports
import Balancer from "react-wrap-balancer";

// Icon imports
import { Github, Twitter, Instagram, Car } from "lucide-react";
import { Button } from "./ui/button";

// Asset imports
// import Logo from "@/public/logo.svg";

export default function Footer() {
  return (
    <footer className="p-20">
        <div className="grid gap-12 md:grid-cols-[1.5fr_0.5fr_0.5fr]">
          <div className="not-prose flex flex-col gap-6">
            <a href="/">
              <h3 className="sr-only">rentwheel.</h3>
              {/* <Image
                src={Logo}
                alt="Logo"
                width={120}
                height={27.27}
                className="transition-all hover:opacity-75 dark:invert"
              ></Image> */}
              <h2 className="text-xl font-bold inline-flex gap-2 items-center"><Car />rentwheel.</h2>
            </a>
            <p>
              <Balancer>
              Drive in style, anytime, anywhere ...
              <br />
              <span className="text-zinc-500">- designed and developed by </span><span className="font-semibold tracking-wide">@vanguards</span>
              </Balancer>
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h5>Website</h5>
            <a href="/">Blog</a>
            <a href="/">Authors</a>
            <a href="/">Categories</a>
          </div>
          <div className="flex flex-col gap-2">
            <h5>Legal</h5>
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-of-service">Terms of Service</a>
            <a href="/cookie-policy">Cookie Policy</a>
          </div>
        </div>
        <br />
        <div className="not-prose flex flex-col justify-between gap-6 border-t md:flex-row md:items-center md:gap-2 pt-5 pb-[-20px]">
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <a
              href="https://github.com/Somilg11/rentwheel"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github />
              </a>
              
            </Button>
            <Button variant="outline" size="icon">
            <a
              href="https://x.com/somil_1101"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter />
            </a> 
            </Button>
            <Button variant="outline" size="icon">
            <a
              href="https://www.instagram.com/somil_1101/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram/>
              </a>
            </Button>
          </div>
          <p className="text-muted-foreground">
            ©{" "}
            <a href="https://github.com/Somilg11/rentwheel">rentwheel. </a>
            All rights reserved. 2024-present.
          </p>
        </div>
    </footer>
  );
}
