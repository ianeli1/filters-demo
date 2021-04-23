import { useState } from "react";
import Box from "../components/Box";
import Button from "../components/Button";
import Gallery from "../components/Gallery";
import Image from "../components/Image";
import Layout from "../components/layout";
import Select from "../components/Select";

const filters = ["Clown"];

const people = [
  {
    name: "The Rock",
    image:
      "https://cdn.discordapp.com/attachments/795461900367429643/834976521067560990/dwayne-the-rock-.png",
  },
  {
    name: "Dr. Phil",
    image:
      "https://cdn.discordapp.com/attachments/795461900367429643/834976580295458816/sub-buzz-187-1574803579-6.png",
  },
  {
    name: "Michael Jackson",
    image:
      "https://cdn.discordapp.com/attachments/795461900367429643/834976603028979732/Fwd-1zan0-Famous-People-With-Vitiligo-sal-jxtgroup.png",
  },
  {
    name: "Will Smith",
    image:
      "https://cdn.discordapp.com/attachments/795461900367429643/834976691814006814/Culture_Monitor_WillSmith-465783654.png",
  },
  {
    name: "Dunno their name",
    image:
      "https://cdn.discordapp.com/attachments/795461900367429643/834976767105433640/gettyimages-472015658.png",
  },
];

const Home = () => {
  const [val, setVal] = useState(0);
  const [person, setPerson] = useState(0);

  return (
    <Layout>
      <div className="bg-background h-screen flex justify-center items-center p-8">
        <Box styles="flex flex-col max-h-full">
          <Image image={people[person].image} size="h-64 w-full" />
          <Box color="bg-gray-500" styles="flex">
            <div className="flex-grow pr-1">
              <Select
                options={filters}
                id={val}
                onChange={(_, id) => setVal(id)}
              />
            </div>

            <Button>Process</Button>
          </Box>
          <Gallery
            images={people.map((x) => x.image)}
            onSelect={(_, id) => setPerson(id)}
            selected={person}
          />
        </Box>
        <Box styles="h-full">
          <Image
            image={`/api?url=${people[person].image}&filter=${filters[val]}`}
          />
        </Box>
      </div>
    </Layout>
  );
};

export default Home;

/*
<h1>Next Tailwind Theme Typescript</h1>
      <h2>The Perfect Stack</h2>

      <div className="flex mt-8">
        <a href="https://github.com/muhajirdev/next-tailwind-theme" className="mx-4">
          <button type="button" className="btn btn-primary">
            Read More
          </button>
        </a>
        <a href="https://github.com/muhajirdev/next-tailwind-theme" className="mx-4">
          <button type="button" className="btn btn-secondary">
            Github
          </button>
        </a>
      </div>
*/
