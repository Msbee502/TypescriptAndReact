import { useState, useEffect } from 'react'
import './App.css'

function App() {

  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect (() => {
    const headers = {
      'Accept': 'application/json',
      'Authorization': 'Bearer tefzp3f24QrDRnZ8Mg1z'
    }

    // Fetch function containing a try/catch statement to improve user experience by showing if data is loading or not.
    const fetchAllCharacters = async () => {
      try {
        setIsLoading(true);
        const rawCharacter = await fetch('https://the-one-api.dev/v2/character', {
          headers: headers,
        });
        const data = await rawCharacter.json();
        return data.docs; 
      } catch (error) {
          setError(error)
      } finally {
        setIsLoading(false);
      }

    };
    
    fetchAllCharacters().then(characters => setData(characters))

  }, [])

  // Message to display if data is loading.
  if (isLoading) {
    return <div className='loading-state-msg'>Loading...</div>;
  }

  // Message to display if an error has occurred.
  if (error) {
    return <div className='loading-state-msg'>Something went wrong. Try refreshing the page.</div>
  }

  return (
    <div>
      <h1>Search for a Character from the works of Tolkien</h1>
      <input 
        type="text"
        placeholder='ex. Aragorn'
        value={search}
        onChange={(e) => setSearch(e.target.value)} 
      />

      {data.filter((character) =>{
        return (
          search.toLowerCase() === "" ? character : character.name.toLowerCase().includes(search)
        )
      }).map((character, index) => (
      
      <ul key={index}>
        <li><a href={character.wikiUrl}>{character.name}</a></li>
      </ul>
      
    ))}

    </div>
  )
}

export default App
