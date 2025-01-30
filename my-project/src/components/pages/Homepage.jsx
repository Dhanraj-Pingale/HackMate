import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../App.css";
import { Button } from "../ui/button";

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
        </section>
      </main>
    </>
  );
};

export default Homepage;
