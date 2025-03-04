import { useState } from "react";

const App = () => {
  
  const [singleFile, setSingleFile] = useState(null);
  const [displayImage, setDisplayImage] = useState(null);
  const [displayImages, setDisplayImages] = useState([]);
  const [displayDogImage, setDisplayDogImage] = useState(null);
  const [message, setMessage] = useState("");

  const fetchDogImage = async () => {
    try {
      const response = await fetch(`https://dog.ceo/api/breeds/image/random`);
      const data = await response.json();
      
      setDisplayDogImage(data.message);
      console.log(data.message)
    } catch (error) {
      console.log(error);
    }
  };

  const submitDogImage = async (e) =>{
    e.preventDefault()
    
    try {
        const response = await fetch (displayDogImage);
        const data = await response.blob();

        const formData = new FormData();
        formData.append("file", data, "dogo.jpg")

        const uploadFile = await fetch(`http://localhost:8000/save/single`, {
          method: "POST",
          body: formData,
        });

        const responseData = await uploadFile.json();
        setMessage(responseData.message)

    } catch (error) {
      console.log(error)
    }
  } 

  const fetchMultipleImages = async () => {
    try {
      const response = await fetch(`http://localhost:8000/fetch/multiple`);
      const data = await response.json();


      const filePromises = data.map(async (filename) => {
        const fetchFile = await fetch(
          `http://localhost:8000/fetch/file/${filename}`
        );
        const fileBlob = await fetchFile.blob();

        const imageURL = URL.createObjectURL(fileBlob);
        return imageURL;
      });

      const imageUrls = await Promise.all(filePromises);
      setDisplayImages(imageUrls);
    } catch (error) {
      console.log(error);
    }
  };

  
  const handleSingleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSingleFile(e.target.files[0]);
    }
  };

  const fetchSingleFile = async () => {
    try {
      const response = await fetch(`http://localhost:8000/fetch/single`);
      const blob = await response.blob(); 
    

      const imageUrl = URL.createObjectURL(blob);
      setDisplayImage(imageUrl);
    } catch (error) {
      console.error("Error fetching single file:", error);
    }
  };


  const handleSubmitSingleFile = async (e) => {
    e.preventDefault();
    if (!singleFile) {
      setMessage("Please select a file before uploading.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", singleFile);

      const response = await fetch(`http://localhost:8000/save/single`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Image upload failed");
      }
      setMessage("File uploaded successfully!");
    } catch (error) {
      console.log("Error:", error);
    }
  };


  return (
    <div>
      <p>{message}</p>
      <h2>Fetch Single Random Image</h2>
      <button onClick={fetchSingleFile}>Fetch Single File</button>
      {displayImage && (
        <div>
          <h3>Single File</h3>
          <img 
            src={displayImage}  
            alt = "Display image"
            style={{ width: "200px", marginTop: "10px" }}/>
        </div>
      )}

      <form onSubmit={handleSubmitSingleFile}>
        <h2>Upload single file</h2>
        <input type="file" onChange={handleSingleFileChange} />
        <button type="submit">Upload single file</button>
      </form>

      <button onClick={fetchMultipleImages}>Fetch multiple images</button>
      {displayImages.length > 0 ? (
        displayImages.map((imageUrl, index) => (
          <div key={index}>
            <img 
            src={imageUrl} 
            alt = {`fetched ${index}`}
            style={{ width: "200px",height: "200px" ,margin: "10px" }} />
          </div>
        ))
      ) : (
        <p>No images to display</p>
      )}

      <button onClick={fetchDogImage}>Get the Dogo</button>
      {displayDogImage && (
        <div>
          <h3>Here's the Dogo</h3>
          <img src={displayDogImage} style={{width: "300px"}} />
          <button onClick={submitDogImage}>Submit to the server</button>
        </div>
      )}
    </div>
  );
};

export default App;
