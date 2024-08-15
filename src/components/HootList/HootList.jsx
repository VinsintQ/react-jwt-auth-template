// src/components/HootList/HootList.jsx
// src/components/HootDetails/HootDetails.jsx

import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
const HootList = ({hoots}) => {
   // src/components/HootList/HootList.jsx
// src/components/HootDetails/HootDetails.jsx

const { hootId } = useParams();
console.log('hootId', hootId);
return (

    <main>
      {hoots.map((hoot) => (
        <Link key={hoot._id} to={`/hoots/${hoot._id}`}>
          <article>
            <header>
              <h2>{hoot.title}</h2>
              <p>{/*  if author not exist */}
                {hoot?.author?.username ?? "anonymous"} posted on : 
                {new Date(hoot.createdAt).toLocaleDateString()}
              </p>
            </header>
            <p>{hoot.text}</p>
          </article>
        </Link>
      ))}
    </main>
  );
  };
  export default HootList;