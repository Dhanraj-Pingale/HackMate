import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../App.css";
import { Button } from "../ui/button";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import techLogos from "../data/techLogos.json";
import Autoplay from "embla-carousel-autoplay";

const Homepage = () => {
    return (
        <>
            <div className="grid-background"></div>
            <main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20">
                <section className="text-center">
                    <h1 className="flex flex-col items-center justify-center gradient-title text-4xl font-extrabold sm:text-6xl lg:text-8xl tracking-tighter py-4">
                        Hack, Innovate, Win.{" "}
                    </h1>
                    <p className="text-gray-300 sm:mt-4 text-xs sm:text-xl">
                        Where organizations and developers come together to build, inspire,
                        and innovate.
                    </p>
                </section>

                <div className="flex justify-center gap-6">
                    <Link to="/allHackathons">
                        <Button variant="blue" size="xl">
                            Find Hackathons
                        </Button>
                    </Link>
                    <Link to="/studentDetail">
                        <Button variant="destructive" size="xl">
                            Update Profile
                        </Button>
                    </Link>
                </div>

                <Carousel
                    plugins={[Autoplay({ delay: 1000 })]}
                    className="w-full py-12"
                    loop={true}
                >
                    <CarouselContent className="flex gap-10 sm:gap-24 items-center pl-10 sm:pl-20 pr-10 sm:pr-20">
                        {techLogos.map(({ name, id, path }) => (
                            <CarouselItem key={id} className="basis-1/3 lg:basis-1/6">
                                <img
                                    src={path}
                                    alt={name}
                                    className="h-14 sm:h-20 lg:h-24 object-contain transition-transform duration-300 hover:scale-110"
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </main>
        </>
    );
};

export default Homepage;
