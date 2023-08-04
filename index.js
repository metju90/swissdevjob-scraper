import got from "got";

let jobs;

try {
  jobs = await got.get("https://swissdevjobs.ch/api/jobsLight").json();
} catch (err) {
  console.log(err);
  process.exit(1);
}

// Sorting by salary, desc.
jobs.sort((a, b) => b.annualSalaryTo - a.annualSalaryTo);

// keep the first 100 only.
jobs = jobs.slice(0, 100);

// Removes data that is not needed
const filteredJobs = jobs.map((opportunity) => {
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
  } = opportunity;

  return {
    city: actualCity,
    address,
    annualSalaryFrom,
    annualSalaryTo,
    company,
    companyWebsiteLink,
    name,
    spokenLanguage: language,
    technologies: filterTags,
    hasStockOrBonuses: offerStockOrBonus,
    perks: perkKeys,
  };
});

console.log(filteredJobs);
