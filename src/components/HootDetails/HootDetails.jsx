import { useState, useEffect, useContext } from 'react';
import CommentForm from '../CommentForm/CommentForm';

import * as hootService from '../../services/hootService';
import { useParams } from 'react-router-dom';


const HootDetails = (props) => {
   


const [hoot, setHoot] = useState(null);

const { hootId } = useParams();


useEffect(() => {
    const fetchHoot = async () => {
      const hootData = await hootService.show(hootId);
     
      setHoot(hootData);
    };
    fetchHoot();
  }, [hootId]);
  

  


if (!hoot) return <main>Loading...</main>;


const handleAddComment = async (commentFormData) => {
    const newComment = await hootService.createComment(hootId, commentFormData);
    setHoot({ ...hoot, comments: [...hoot.comments, newComment] });
  };
  

return (
    <main>
   

<header>
  <p>{hoot.category.toUpperCase()}</p>
  <h1>{hoot.title}</h1>
  <p>
    {hoot.author.username} posted on
    {new Date(hoot.createdAt).toLocaleDateString()}
  </p>

</header>
      <p>{hoot.text}</p>
     

<section>
  <h2>Comments</h2>
  <CommentForm handleAddComment={handleAddComment} />
  {!hoot.comments.length && <p>There are no comments.</p>}

  {hoot.comments.map((comment) => (
    <article key={comment._id}>

      <header>
        <p>
          {comment.author.username} posted on
          {new Date(comment.createdAt).toLocaleDateString()}
        </p>
      </header>
      <p>{comment.text}</p>


    </article>
  ))}

</section>
    </main>
  );
  };
  
  export default HootDetails;