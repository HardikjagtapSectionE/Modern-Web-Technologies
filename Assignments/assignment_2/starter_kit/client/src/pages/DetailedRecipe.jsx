import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8001/recipe/${id}`)
      .then(response => response.json())
      .then(data => setRecipe(data))
      .catch(error => console.error(error));
  }, [id]);

  function handleDelete(id) {
    fetch(`http://localhost:8001/recipe/${id}`, { method: 'DELETE' })
      .then(() => (window.location.href = "/"))
      .catch(error => console.error(error));
  }

  if (!recipe) return <p>Loading...</p>;

  return (
    <div>
      <style>
        {`
          div {
            background-color: #f9f9f9;
            padding: 20px;
            margin: 20px auto;
            max-width: 800px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }

          h1 {
            font-size: 2.5rem;
            color: #333;
            margin-bottom: 16px;
          }

          p {
            font-size: 1.2rem;
            color: #555;
            line-height: 1.6;
            margin-bottom: 12px;
          }

          h3 {
            font-size: 1.5rem;
            margin-top: 20px;
            color: #333;
          }

          ul {
            list-style-type: none;
            padding: 0;
          }

          ul li {
            font-size: 1.1rem;
            color: #555;
            padding-left: 1em;
            position: relative;
          }

          ul li:before {
            content: "✔";
            position: absolute;
            left: 0;
            color: #4caf50;
          }

          ol {
            padding-left: 1.5em;
          }

          ol li {
            font-size: 1.1rem;
            color: #555;
            padding-left: 1em;
            position: relative;
          }

          ol li:before {
            content: "•";
            position: absolute;
            left: 0;
            color: #4caf50;
          }

          button {
            padding: 12px 20px;
            border-radius: 6px;
            border: none;
            font-size: 1.1rem;
            cursor: pointer;
            margin-right: 10px;
            transition: all 0.3s ease;
          }

          button:hover {
            opacity: 0.9;
          }

          button:focus {
            outline: none;
          }

          button.edit {
            background-color: #007bff;
            color: white;
          }

          button.delete {
            background-color: #f44336;
            color: white;
          }

          button.edit:hover {
            background-color: #0056b3;
          }

          button.delete:hover {
            background-color: #d32f2f;
          }

          a {
            color: #007bff;
            text-decoration: none;
            font-size: 1.2rem;
            margin-right: 15px;
          }

          a:hover {
            text-decoration: underline;
          }
        `}
      </style>
      
      <h1>{recipe.name}</h1>
      <p>{recipe.description}</p>
      <p>Difficulty: {recipe.difficulty}</p>
      <h3>Ingredients</h3>
      <ul>{recipe.ingredients.map((item, index) => <li key={index}>{item}</li>)}</ul>
      <h3>Steps</h3>
      <ol>{recipe.steps.map((step, index) => <li key={index}>{step}</li>)}</ol>
      <div>
        <Link to={`/recipes/${id}/edit`} className="edit">Edit</Link>
        <button onClick={() => handleDelete(id)} className="delete">Delete</button>
      </div>
    </div>
  );
}

export default RecipeDetail;
