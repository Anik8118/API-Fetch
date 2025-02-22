import React, { useState } from 'react'
import { useEffect } from 'react'
import { useLoaderData } from 'react-router'

 const Notes = () => {
    const notes = useLoaderData();
//     const [notes,setNotes] = useState([]);
//     useEffect(()=>{
//         fetch(`http://localhost:3000/todos`)
//         .then((res)=>res.json())
//         .then((data)=> {
//             setNotes(data);
//         })
//     },[])
  return (
    <div>
      <form action="">
        <input type="text" />
        <button>Create Notes</button>
      </form>
      <div className="all-notes">
        <h2>All Notes</h2>
        <ul>
            {notes.map(note =>(
                <li key={note.id}>{note.title}</li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export const loader = async ()=>{
    const res = await fetch("http://localhost:3000/todos");
    const data = await res.json();
    return data;
  }

export default Notes;
