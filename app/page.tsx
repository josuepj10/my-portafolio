
import { Button } from "@/components/ui/button";
import { FiDownload } from "react-icons/fi";

//Components
import { Social } from "@/components/Social";
import { Gif } from "@/components/Gif";

export default function Home() {
  return (
    <section className="h-full ">
      <div className="container mx-auto h-full ">
        <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24 font-secondary">

          {/* text */}
          {/* <div className="text-center xl:text-left order-2 xl:order-none"> */}
          <div className="text-center xl:text-left">
            <h1 className="h1 mb-6">
              Hello, I'm <span className="text-secondary">Josue Perez</span>
            </h1>
            <span className="text-xl">Informatic Engineer</span>
            <p className="max-w-[500px] mb-9 text-white/80">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Architecto ullam velit a nemo omnis.
            </p>

            {/* btn and socials */}
            <div className="flex flex-col xl:flex-row items-center gap-8">
              <Button variant="outline" size="lg" className="uppercase flex items-center gap-2 hover:bg-secondary hover:text-primary hover:transition-all duration-500">
                <span>Download CV</span>
                <FiDownload className="text-xl" />
              </Button>
              <div className="mb-8 xl:mb-0">
                <Social containerStyles="flex gap-6" iconStyles="w-9 h-9 border border-secondary rounded-full flex justify-center items-center text-secondary
                text-base hover:bg-secondary hover:text-primary hover:transition-all duration-500" />
              </div>
            </div>
          </div>

          {/* photo */}
          <div className="order-1 xl:order-none mb-8 xl:mb-0">
          <Gif />
          </div>
          
        </div>
      </div>
    </section>
  );
}
