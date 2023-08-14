import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://swissdevjobs.ch/api/jobsLight");
      const resJson = await res.json();
      const jobs = resJson.map((job) => {
        const {
          actualCity,
          annualSalaryFrom,
          annualSalaryTo,
          company,
          companyWebsiteLink,
          name,
          language,
          filterTags,
          address,
          companySize,
          perkKeys,
          offerStockOrBonus,
        } = job;

        return {
          city: actualCity,
          address,
          annualSalaryFrom,
          annualSalaryTo,
          company,
          companyWebsiteLink,
          jobTitle: name,
          spokenLanguage: language,
          technologies: filterTags,
          hasStockOrBonuses: offerStockOrBonus,
          perks: perkKeys,
          companySize,
        };
      });
      setData(jobs.sort((a, b) => b.annualSalaryTo - a.annualSalaryTo));
    };
    try {
      fetchData();
    } catch (err) {
      setError(err);
    }
  }, []);

  return (
    <div className="App">
      <h2>Swissdevjobs.ch, but more sorting options 💵</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Company</th>
            <th>City</th>
            {/* <th>technologies</th> */}
            <th>Salary up to</th>
          </tr>
        </thead>
        <tbody>
          <tr></tr>
        </tbody>
        {data.map((d) => {
          return (
            <tr>
              <td>{d.jobTitle}</td>
              <td>{d.company}</td>
              <td>{d.city}</td>
              {/* <td>{d.technologies}</td> */}
              <td>${d.annualSalaryTo}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default App;
