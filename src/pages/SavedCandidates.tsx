import { useEffect, useState } from "react";

import { saveToLocalStorage, loadFromLocalStorage } from "../api/LocalStorage";
import { Candidate } from '../interfaces/Candidate.interface';


const SavedCandidates = () => {
  const [candidates, setCandidates] = useState<Candidate[]>(loadFromLocalStorage());
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>(loadFromLocalStorage());

  useEffect(() => {
    const loadedCandidates = loadFromLocalStorage();
    setCandidates(loadedCandidates);
    setSavedCandidates(loadedCandidates);
  }, []);

  useEffect(() => {
    saveToLocalStorage(savedCandidates);
  }, [savedCandidates]);

  const handleReject = (index: number) => {
    setCandidates((prevCandidate) => {
      const newCandidate = [...prevCandidate];
      newCandidate.splice(index, 1);
      setSavedCandidates(newCandidate);
      return newCandidate;
    });
  };


  return (
    <>
      <h1>Your <em>Potential</em> Candidates</h1>
      <table>
        <thead>
          <tr>
            <th>Icon</th>
            <th>Name</th>
            <th>Profile</th> {/* github url */}
            <th>Location</th>
            <th>Company</th>
            <th>About</th> {/* Bio or Blog */}
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
        {candidates.map((candidate) => (
            <tr key={candidates.indexOf(candidate)}>
              <td className="icon">
                <img src={candidate.avatar_url ? candidate.avatar_url : "./githubLogo.png" } 
                alt={(candidate.login ? candidate.login : 'user ') + 'avatar'}
                />
              </td>
              <td className="name">
                {candidate.name ? candidate.name : (
                  candidate.login ? candidate.login : 'None'
                )}
              </td>
              <td className={`profile ${candidate.html_url ? "" : "missing-data"}`}>
                <a href={candidate.html_url ? candidate.html_url : "about:blank" } target="_blank" rel="noopener noreferrer">Profile</a>
              </td>
              <td className={`location ${candidate.location ? "" : "missing-data"}`}>
                {candidate.location ? candidate.location : 'Not Provided'}
              </td>
              <td className={`company ${candidate.company ? "" : "missing-data"}`}>
                {candidate.company ? candidate.company : 'None'}
              </td>
              <td className={`bio ${candidate.bio || candidate.blog ? "" : "missing-data"}`}>
                {(candidate.bio || candidate.blog) ? (candidate.bio ? candidate.bio : candidate.blog) : 'None'}
              </td>
              <td>
                <button className="reject" onClick={() => handleReject(candidates.indexOf(candidate))}>-</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default SavedCandidates;
