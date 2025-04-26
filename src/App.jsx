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
  const [showStillWorking, setShowStillWorking] = useState(false);

  function OnCalculate() {
    setResult(null); // Hide result section when calculation starts
    setLoading(true);
    setShowStillWorking(false);
    // Show still working message after 5 seconds
    const stillWorkingTimeout = setTimeout(() => {
      setShowStillWorking(true);
    }, 5000);
    // Combine year, month, day into YYYY-MM-DD format using select values
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
        clearTimeout(stillWorkingTimeout);
        setResult(data);
        setLoading(false);
        setShowStillWorking(false);
        console.log("API result:", data);
      })
      .catch((err) => {
        clearTimeout(stillWorkingTimeout);
        setLoading(false);
        setShowStillWorking(false);
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
          <source src="/galaxy-c1000.mp4" type="video/mp4" />
        </video>
        <header className="fixed top-0 right-0 left-0 inset-0 z-[99] bg-[#fcfcfc2d] w-full h-[70px] px-[30px] backdrop-blur-sm shadow-xl shadow-black/80">
          <div className="flex flex-row w-full h-full text-white items-center justify-between gap-4">
            <h1>
              MY <span className="gradient"> DIVINATIONS</span>
            </h1>
            <ul className="flex flex-row gap-4 w-120 h-12 justify-around items-center rounded-full border border-white bg-[rgba(0,0,69,0.3)] shadow-[0_0_30px_0_rgba(0,0,0,0.5)]">
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

        <div className="lighten-blend -z-10 fixed top-[-230px]">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="relative h-[600px] object-cover">
            <source src="/blackhole.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <div className="flex flex-col items-center mt-[200px] gap-4">
        <div className="relative">
          <h2 className="text-white">NATAL CHART CALCULATOR</h2>
        </div>
        <div className="flex flex-col items-center justify-center w-100 gap-4 bg-[#d4d4d4f2] mt-5 p-10 border border-white/50 rounded-2xl">
          <h2 className="font-bold text-black">Birth Info</h2>
          <input
            type="text"
            placeholder="Enter your name"
            className="flex w-full border-2 border-gray-300 rounded-lg p-2"
            onChange={(e) => setName(e.target.value)}
          />
          <div className="flex flex-row w-full items-center gap-4">
            <select
              className="flex border-1 border-primary h-8 font-Dosis text-lg weig-"
              value={day}
              onChange={(e) => setDay(e.target.value)}>
              <option value="">Day</option>
              {[...Array(31)].map((_, i) => (
                <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select
              className="flex border-1 border-primary h-8 font-Dosis text-lg"
              value={month}
              onChange={(e) => setMonth(e.target.value)}>
              <option value="">Month</option>
              {[
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ].map((name, i) => (
                <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
                  {name}
                </option>
              ))}
            </select>
            <select
              className="flex border-1 border-primary h-8 font-Dosis text-lg"
              value={year}
              onChange={(e) => setYear(e.target.value)}>
              <option value="">Year</option>
              {Array.from({ length: 100 }, (_, i) => {
                const y = new Date().getFullYear() - i;
                return (
                  <option key={y} value={y}>
                    {y}
                  </option>
                );
              })}
            </select>
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
          CALCULATE
        </button>

        {loading && (
          <div className="code text-blue-500 font-semibold">
            Calculating...
            {showStillWorking && (
              <div className="text-xs text-gray-300 mt-2">
                The server is booting, the process will be ready in a minute
              </div>
            )}
          </div>
        )}

        {result && (
          <div className="flex flex-col items-center justify-center w-60 gap-4 text-shadow-neutral-900/30 text-shadow-lg">
            <h2 className="text-cyan-300">Results</h2>
            <div className="flex flex-col code items-center justify-center w-full gap-4 text-white">
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
