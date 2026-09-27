"use client";
import { useState, useEffect } from "react";

export default function Home(){
  const [interns,setInterns]=useState([]);
  const [jobs,setJobs]=useState([]);
  const [liveJobs,setLiveJobs]=useState([]);
  const [ai,setAi]=useState([]);
  const [aj,setAj]=useState([]);
  const [search,setSearch]=useState("");
  const [loading,setLoading]=useState(false);

  const fetchLiveJobs = (query) => {
    setLoading(true);
    fetch(`/api/jobs?query=${encodeURIComponent(query || 'developer jobs in India')}`)
      .then(r=>r.json())
      .then(d=>{
        const jobsList = d.data?.jobs || d.jobs || [];
        setLiveJobs(jobsList);
        setLoading(false);
      }).catch(()=>setLoading(false));
  };

  useEffect(()=>{
    fetch("https://raw.githubusercontent.com/shyamk-alt/applyworld-companies/main/companies/internships/eu.json").then(r=>r.json()).then(setInterns).catch(()=>{});
    fetch("https://raw.githubusercontent.com/shyamk-alt/applyworld-companies/main/companies/jobs/eu.json").then(r=>r.json()).then(setJobs).catch(()=>{});
    
    try {
      setAi(JSON.parse(localStorage.getItem("ai")||"[]"));
      setAj(JSON.parse(localStorage.getItem("aj")||"[]"));
    } catch(e){}

    fetchLiveJobs('developer jobs in India');
  },[]);

  const handleSearch = () => {
    fetchLiveJobs(search);
  };

  return (
    <div style={{padding:20, fontFamily:'sans-serif'}}>
      <h1>ApplyWorld - {liveJobs.length} Live Jobs 🔥</h1>
      <div style={{display:'flex', gap:10, margin:'15px 0'}}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search jobs... e.g. Python" style={{padding:12, width:'100%'}}/>
        <button onClick={handleSearch} style={{padding:'12px 20px', background:'black', color:'white', borderRadius:8}}>Search</button>
      </div>
      {loading && <p>Loading 1M Jobs...</p>}
      {!loading && liveJobs.length===0 && <p>No jobs found. Try another search.</p>}
      {liveJobs.map((job,i)=>(
        <div key={job.job_id || i} style={{border:'1px solid #ddd', padding:12, marginBottom:10, borderRadius:8}}>
          <h3>{job.job_title}</h3>
          <p>{job.employer_name} {job.job_city ? `- ${job.job_city}` : ''}</p>
          <button onClick={()=>window.open(job.job_apply_link,'_blank')} style={{background:'black', color:'white', padding:'8px 16px', borderRadius:6, cursor:'pointer'}}>Apply</button>
        </div>
      ))}
    </div>
  );
}