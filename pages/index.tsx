import type { NextPage } from "next";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import prisma from "../lib/prisma";
import Balance from "../components/Balance";
import Status from "../components/Status";
import Nav from "../components/Nav";
import Inventory from "../components/Inventory";
import Recipes from "../components/Recipes";

const Home: NextPage<any> = () => {
  return (
    <div className="App max-w-screen bg-zeldabg xl:max-h-screen min-h-screen xl:h-screen flex flex-col divide-y divide-def divide-solid overflow-x-hidden overflow-hidden">
      <header className="relative px-6 py-6 md:px-16 md:py-12 bg-black bg-opacity-75 backdrop-filter backdrop-blur-lg flex justify-between">
        <Status />
        <Nav />
        <Balance />
      </header>
      <main className="flex-1 flex flex-wrap xl:flex-nowrap xl:px-4 py-10 xl:py-4 gap-10 xl:gap-20 justify-center content-center items-center max-w-full bg-black bg-opacity-30 backdrop-filter backdrop-blur">
        <Inventory key={1} />
      </main>
      <footer className="p-4 bg-black bg-opacity-75 backdrop-filter backdrop-blur-lg">
        footer
      </footer>
    </div>
  );
};


export default Home;
