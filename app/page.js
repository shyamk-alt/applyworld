"use client";
import { useState, useEffect } from "react";

export default function Home(){
  const [liveJobs,setLiveJobs]=useState([]);
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
    fetchLiveJobs('developer jobs in India');
  },[]);

  const handleSearch = () => {
    fetchLiveJobs(search);
  };

  return (
    <div style={{padding:20, fontFamily:'sans-serif', background:'white', color:'black', minHeight:'100vh'}}>
      <h1 style={{color:'black', fontSize:24, fontWeight:'bold'}}>ApplyWorld - {liveJobs.length} Live Jobs 🔥</h1>
      <div style={{display:'flex', gap:10, margin:'15px 0'}}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search jobs... e.g. Python" style={{padding:12, width:'100%', border:'1px solid #ccc', borderRadius:8, background:'white', color:'black'}}/>
        <button onClick={handleSearch} style={{padding:'12px 20px', background:'black', color:'white', borderRadius:8, border:'none'}}>Search</button>
      </div>
      {loading && <p style={{color:'black'}}>Loading 1M Jobs...</p>}
      {!loading && liveJobs.length===0 && <p style={{color:'black'}}>No jobs found.</p>}
      {liveJobs.map((job,i)=>(
        <div key={job.job_id || i} style={{border:'1px solid #ddd', padding:16, marginBottom:12, borderRadius:10, background:'white'}}>
          <h3 style={{color:'black', margin:'0 0 6px 0', fontSize:16}}>{job.job_title}</h3>
          <p style={{color:'#666', margin:'0 0 10px 0', fontSize:14}}>{job.employer_name} {job.job_city ? `- ${job.job_city}` : ''} {job.job_country ? `(${job.job_country})` : ''}</p>
          <button onClick={()=>window.open(job.job_apply_link,'_blank')} style={{background:'black', color:'white', padding:'8px 16px', borderRadius:6, border:'none', cursor:'pointer'}}>Apply Now</button>
        </div>
      ))}
    </div>
  );
}