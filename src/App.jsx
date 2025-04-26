import { useState } from "react";
import "boxicons";

function App() {
  const [name, setName] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [location, setLocation] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  function OnCalculate() {
    setLoading(true);
    // Combine year, month, day into YYYY-MM-DD format
    const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
      2,
      "0"
    )}`;

    fetch("https://natal-chart-api-node-js.onrender.com/natal-chart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: formattedDate,
        time: "12:00", // You can set a default time or get it from user input
        lat: 35.7219,
        lon: 51.3347,
        timezone: "+3:30", // You can set a default timezone or get it from user input
        transit_date: "2025-04-25",
        transit_time: "12:00", // You can set a default time or get it from user input
        transit_timezone: "+3:30", // You can set a default timezone or get it from user input
        // You can add other required fields here if needed
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setResult(data);
        setLoading(false);
        console.log("API result:", data);
      })
      .catch((err) => {
        setLoading(false);
        console.error("API error:", err);
      });
  }

  return (
    <>
      <div className="flex justify-center">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="fixed inset-0 top-0 w-full h-full -z-20 object-cover">
          <source src="/galaxy.mp4" type="video/mp4" />
        </video>
        <header className="fixed top-0 right-0 left-0 inset-0 z-[99] bg-[#fcfcfc2d] w-full h-[70px] px-[30px] shadow-2xl shadow-black/80">
          <div className="flex flex-row w-full h-full text-white items-center justify-between gap-4">
            <h1>
              My <span className="gradient"> Divinations</span>
            </h1>
            <ul className="flex flex-row gap-4 w-120 h-12 justify-around items-center rounded-full border border-white bg-[rgba(0,0,69,0.3)] backdrop-blur-xl shadow-[0_0_30px_0_rgba(0,0,0,0.5)]">
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Contacts</a>
              </li>
              <li>
                <a href="#">App</a>
              </li>
            </ul>
            <div className="flex flex-row gap-2">
              <a href="#">
                <box-icon type="logo" name="github"></box-icon>
              </a>
              <a href="#">
                <box-icon type="logo" name="play-store"></box-icon>
              </a>
              <a href="#">
                <box-icon type="logo" name="apple"></box-icon>
              </a>
            </div>
          </div>
        </header>

        <div className="lighten-blend -z-10 fixed top-[-230px] items-center justify-center">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="relative h-[600px] object-cover">
            <source src="/blackhole.webm" type="video/webm" />
            <source src="/blackhole.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <div className="flex flex-col items-center mt-[200px] gap-4">
        <div className="relative">
          <h1 className="gradient text-white text-shadow-lg text-shadow-blue-100/80">
            Natal Chart Calculator
          </h1>
        </div>
        <div className="flex flex-col items-center justify-center w-100 gap-4 bg-[#d4d4d4] mt-5 p-10 border border-amber-50/30 rounded-2xl">
          <h1 className="font-bold text-black text-shadow-lg">Birth Info</h1>
          <input
            type="text"
            placeholder="Enter your name"
            className="flex w-full border-2 border-gray-300 rounded-lg p-2"
            onChange={(e) => setName(e.target.value)}
          />
          <div className="flex flex-row w-full items-center gap-4">
            <input
              type="text"
              placeholder="DD"
              className="flex border-2 border-gray-300 rounded-lg p-2 w-10"
              onChange={(e) => setDay(e.target.value)}
            />
            <input
              type="text"
              placeholder="MM"
              className="flex border-2 border-gray-300 rounded-lg p-2 w-10"
              onChange={(e) => setMonth(e.target.value)}
            />
            <input
              type="text"
              placeholder="YYYY"
              className="flex border-2 border-gray-300 rounded-lg p-2 w-15"
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
          <input
            type="text"
            placeholder="Birth Location"
            className="flex w-full border- border-gray-300 rounded-lg p-2"
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <button
          className="bg-primary text-white rounded-2xl h-15 w-40"
          onClick={OnCalculate}>
          Calculate
        </button>

        {loading && (
          <div className="text-blue-500 font-semibold">Calculating...</div>
        )}

        {result && (
          <div className="flex flex-col items-center justify-center w-60 gap-4 text-shadow-neutral-900/30 text-shadow-lg">
            <h1 className="text-cyan-300">Results</h1>
            <div className="flex flex-col items-center justify-center w-full gap-4 text-white">
              <div className="flex border bg-amber-50/10 border-gray-300/50 rounded-lg p-2 w-full backdrop-blur-xs">
                <p>
                  Sun:{" "}
                  {result?.Sun
                    ? `Sign: ${result.Sun.sign}, Degree: ${result.Sun.degree}, House: ${result.Sun.house}`
                    : "Not found"}
                </p>
              </div>
              <div className="flex border bg-amber-50/10 border-gray-300/50 rounded-lg p-2 w-full backdrop-blur-xs">
                <p>
                  Moon:{" "}
                  {result?.Moon
                    ? `Sign: ${result.Moon.sign}, Degree: ${result.Moon.degree}, House: ${result.Moon.house}`
                    : "Not found"}
                </p>
              </div>
              <div className="flex border bg-amber-50/10 border-gray-300/50 rounded-lg p-2 w-full backdrop-blur-xs">
                <p>
                  Mars:{" "}
                  {result?.Mars
                    ? `Sign: ${result.Mars.sign}, Degree: ${result.Mars.degree}, House: ${result.Mars.house}`
                    : "Not found"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
