import React, { useState, useEffect } from "react";
import FormInput from "./FormInput";
import ApplicationInput from "./ApplicationInput";
import { CreateHackathon, getAllHackathons } from "@/pages/BlockchainServices";
const OrganiserForm = () => {
  const [firstClick, setFirstClick] = useState(true);
  const [secondClick, setSecondClick] = useState(false);
  const [save, setSave] = useState(false);
  const [haveMetamask, sethaveMetamask] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    tagline: "",
    theme: "",
    maxTeamSize: "",
    appOpen: "",
    appClose: "",
    venue: "",
    pno: "",
    email: "",
  });

  const [name, setName] = useState();
  const [tagLine, setTagLine] = useState();
  const [theme, setTheme] = useState();
  const [maxteamSize, setMaxteamSize] = useState();
  const [appOpen, setappOpen] = useState();
  const [appClose, setappClose] = useState();
  const [venue, setVenue] = useState();
  const [pno, setPno] = useState();
  const [email, setEmail] = useState();
  useEffect(() => {
    const { ethereum } = window;
    const checkMetamaskAvailability = async () => {
      if (!ethereum) {
        sethaveMetamask(false);
      }
      sethaveMetamask(true);
    };
    checkMetamaskAvailability();
  }, []);
  function callback(data) {
    console.log(formData);
    console.log(data);
  }
  const handleSubmit = () => {
    if (secondClick) {
      setSave(true);
    }
    if (setSave) {
      setFormData({});
      setFirstClick(false);
      setSecondClick(false);
    }
    if (!firstClick) {
      setFirstClick(true);
    } else {
      setFirstClick(false);
      setSecondClick(true);
      setSave(true);
    }
  };

  const handlePrev = () => {
    setSecondClick(false);
    setFirstClick(true);
  };

  const handleSave = async () => {
    console.log(
      name,
      theme,
      tagLine,
      maxteamSize,
      appOpen,
      appClose,
      venue,
      pno,
      email
    );
    const tagline = tagLine;
    const app_open = appOpen;
    const app_close = appClose;
    const max_players = maxteamSize;
    const phone_number = pno;

    const res = await CreateHackathon({
      name,
      tagline,

      max_players,
      theme,
      app_open,
      app_close,
    });
    console.log(res);
  };
  const getAll = async () => {
    const izuku = await getAllHackathons();
    console.log(izuku);
  };

  const fromElements = [
    {
      name: "Name of the Hackathon",
      type: "text",
      staf: setName,
    },
    {
      name: "Tagline",
      type: "text",
      staf: setTagLine,
    },
    {
      name: "Theme",
      type: "text",
      staf: setTheme,
    },
    {
      name: "max team size",
      type: "number",
      staf: setMaxteamSize,
    },
    {
      name: "Application open date",
      type: "text",
      staf: setappOpen,
    },
    {
      name: "application close date",
      type: "text",
      staf: setappClose,
    },
    // {
    //   name: "Venue",
    //   type: "text",
    //   staf: setVenue,
    // },
    // {
    //   name: "Phone No",
    //   type: "text",
    //   staf: setPno,
    // },
    // {
    //   name: "Email",
    //   type: "email",
    //   staf: setEmail,
    // },
  ];
  return (
    <div className=" my-4 border border-white mx-[90px] rounded-3xl bg-[#06002E] text-white">
      <div className="flex flex-col  py-8 px-auto ">
        <div className="mb-8 ">
          <h1 className="text-[30px] text-center ">Host your Hackathon</h1>
        </div>

        <div className="mt-6 pt-8 ml-[150px] ">
          <div className=" flex flex-col gap-[20px] ">
            <h2>Fill-in the requirements:</h2>

            <div className="flex justify-between w-3/4 bg-[#1C1536] px-6 rounded-2xl py-2">
              <h4>Basic Info</h4>
              <h4>Applications</h4>
              <h4 onClick={getAll}>Prizes</h4>
            </div>
          </div>
        </div>
      </div>
      {firstClick && (
        <div>
          {fromElements.map((elem, index) => (
            <div key={index} className="ml-[150px]">
              <div className="py-4">
                <label>{elem.name}</label>
              </div>
              <div>
                <input
                  type={elem.type}
                  onChange={(e) => elem.staf(e.target.value)}
                  className="w-[814px] h-[43px] rounded-2xl outline-none bg-[#1C1536] placeholder:text-center placeholder:ml-[40px]"
                />
              </div>
            </div>
          ))}

          {/* <FormInput
            label="Name of the Hackathon"
            type="text"
            tate={formData}
            setTate={setFormData}
            la="name"
            handleChange={callback}
          />
          <FormInput label="Tagline" type="text" />
          <FormInput label="Themes" type="text" />
          <FormInput label="Max Team Size" type="number" />
          <FormInput label="Application open date" type="date" />
          <FormInput label="Application close date" type="date" />
          <FormInput label="Venue" type="text" />
          <FormInput label="Phone Number" type="text" />
          <FormInput label="Email" type="email" /> */}
        </div>
      )}

      {secondClick && (
        <div className="my-[40px]">
          <ApplicationInput label="github" />
          <ApplicationInput label="LinkedIn" />
          <ApplicationInput label="Twitter" />
          <ApplicationInput label="Email" />
          <ApplicationInput label="Phone-No" />
        </div>
      )}

      <div className="flex justify-end my-[70px] mr-[100px] gap-[50px] ">
        <div>
          <button
            className="border border-white py-2 px-4 text-white rounded-full flex items-center hover:bg-white hover:text-black"
            type="button"
            onClick={handlePrev}
          >
            prev
          </button>
        </div>
        <div className="">
          {!save && (
            <button
              className="border border-white py-2 px-4 text-white rounded-full flex items-center hover:bg-white hover:text-black"
              type="button"
              onClick={handleSubmit}
            >
              next
            </button>
          )}
          {save && (
            <button
              className="border border-white py-2 px-4 text-white rounded-full flex items-center hover:bg-white hover:text-black"
              type="button"
              onClick={handleSave}
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganiserForm;
