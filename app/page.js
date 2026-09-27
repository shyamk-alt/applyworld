"use client";
import { useState, useEffect } from "react";

export default function Home(){
  const [interns,setInterns]=useState([]);
  const [jobs,setJobs]=useState([]);
  const [liveJobs,setLiveJobs]=useState([]);
  const [ai,setAi]=useState([]);
  const [aj,setAj]=useState([]);
  const [tab,setTab]=useState("intern");
  const [search,setSearch]=useState("");
  const [loading,setLoading]=useState(false);

  useEffect(()=>{
    fetch("https://raw.githubusercontent.com/shyamk-alt/applyworld-companies/main/companies/internships/eu.json").then(r=>r.json()).then(setInterns).catch(()=>{});
    fetch("https://raw.githubusercontent.com/shyamk-alt/applyworld-companies/main/companies/jobs/eu.json").then(r=>r.json()).then(setJobs).catch(()=>{});
    
    setAi(JSON.parse(localStorage.getItem("ai")||"[]"));
    setAj(JSON.parse(localStorage.getItem("aj")||"[]"));

    // Fetch LIVE 1M Jobs
    setLoading(true);
    fetch(`/api/jobs?query=${search || 'developer jobs'}`)
      .then(r=>r.json())
      .then(d=>{
        if(d.data) setLiveJobs(d.data);
        setLoading(false);
      }).catch(()=>setLoading(false));
  },[]);

  const apply=(c,t)=>{
    window.open(c.careers_url || c.job_apply_link || c.apply_link,"_blank");
    if(t==="intern"){
      const n=[...ai,c.name];setAi(n);localStorage.setItem("ai",JSON.stringify(n))
    }else{
      const n=[...aj,c.name];setAj(n);localStorage.setItem("aj",JSON.stringify(n))
    }
  };
  return (
    <div style={{padding:20, fontFamily:'sans-serif'}}>
      <h1>ApplyWorld - {liveJobs.length} Live Jobs 🔥</h1>
      <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search jobs..." style={{padding:12, width:'100%', margin:'15px 0'}}/>
      {loading && <p>Loading 1M Jobs...</p>}
      {liveJobs.map((job,i)=>(
        <div key={i} style={{border:'1px solid #ddd', padding:12, marginBottom:10, borderRadius:8}}>
          <h3>{job.job_title}</h3>
          <p>{job.employer_name} - {job.job_city}</p>
          <button onClick={()=>window.open(job.job_apply_link,'_blank')} style={{background:'black', color:'white', padding:'8px 16px', borderRadius:6}}>Apply</button>
        </div>
      ))}
    </div>
  );
}