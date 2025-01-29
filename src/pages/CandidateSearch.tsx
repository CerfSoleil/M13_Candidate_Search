import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser, fetchRandomGithubUser } from '../api/API';

import { Candidate } from "../interfaces/Candidate.interface";
import {saveToLocalStorage, loadFromLocalStorage} from "../api/LocalStorage";
import "../styles/candidateSearchStyle.css";

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<Candidate>({} as Candidate);
  const [candidateCache, setCandidateCache] = useState<Candidate[]>([] as Candidate[]);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>(loadFromLocalStorage());
  const [hasSavedCandidates, setHasSavedCandidates] = useState<boolean>(loadFromLocalStorage().length > 0);

  useEffect(() => {
    if(candidate && candidate.name) {
      document.title = "Candidate: " + candidate.name;
    } else {
        document.title = "Candidate Search";
    }
  } , [candidate]);

  useEffect(() => {
    fetchCandidate();
  }, []);

  useEffect(() => {
    saveToLocalStorage(savedCandidates);
  }, [savedCandidates]);

  const fetchCandidate = async () => {
    let data: Candidate = {} as Candidate;
    if(!hasSavedCandidates) {
      setHasSavedCandidates(false);
      console.warn("First load.");
      data = await searchGithubUser("octocat");
      await cacheCandidates();
    } else if
      (candidateCache.length > 0) {
        data = candidateCache.pop() as Candidate;
      } else {
        console.warn("No cache.");
        await cacheCandidates();
        data = await fetchRandomGithubUser();
      }
    setCandidate(data);
  };

  const cacheCandidates = async () => {
    const data = await searchGithub();
    setCandidateCache(data);
  }

    const  handleAccept = async () => {
      setSavedCandidates(prevSavedCandidate => {
        if(!prevSavedCandidate) {
          console.warn("No saved candidates yet...");
          return [candidate];
        } else {
          const updatedCandidates = [...prevSavedCandidate, candidate];
          return updatedCandidates;
        }
      });
      fetchCandidate();
    };
    

    const handleReject = async () => {
      fetchCandidate();
    };

  return <div className="candidate-search">
    <h1>Search Github Users</h1>

    <div className="search-module">
    <button className="reject" onClick={handleReject}>-</button>

    <section className="candidate-card">
      <a href={candidate.html_url ? candidate.html_url : "http://www.github.com/"} target="_blank" rel="noopener noreferrer">
      <img className="candidate-icon" src={candidate.avatar_url ? candidate.avatar_url : "./githubLogo.png"}
      alt={`${candidate.login ? candidate.login : "user"} avatar`}/>
      </a>
      <ul className="candidate-information">
        <li className="username">Username:
          <a href={candidate.html_url ? candidate.html_url : "http://www.github.com/"}>
          {candidate.name ? candidate.name : (candidate.login ? candidate.login : ' Unlisted')}</a>
        </li>
        <li className="location">Location:
          <p>{candidate.location ? candidate.location : 'Not Public'}</p>
        </li>
        <li className="email">Email:
          <p>{candidate.email ? candidate.email : 'Not Public'}</p>
        </li>
        <li className="company">Company:
          <p>{candidate.company ? candidate.company : 'None'}</p>
        </li>
        {candidate.bio ? (
        <li className="bio">Bio:
          <p>{candidate.bio}</p>
        </li>
        ) : candidate.blog? (
          <li className="blog">
          <a href={candidate.blog}>Blog</a>
        </li>
        ) : (null)
        }
      </ul>
    </section>

    <button className="accept" onClick={handleAccept} autoFocus>+</button>

    </div>
  </div>
};

export default CandidateSearch;
