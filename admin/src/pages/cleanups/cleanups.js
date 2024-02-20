import React, { useState, useRef, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db, storage } from '../../firebase';
import './cleanups.css';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FaTrash } from 'react-icons/fa';

function AddCleanup() {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [time, setTime] = useState('');
  const [mapurl, setMapurl] = useState('');
  const [image, setImage] = useState(null);
  const [imgurl, setImgurl] = useState('');
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) {
      setImgurl('');
      return;
    }

    if (!['image/jpeg', 'image/png'].includes(selectedFile.type)) {
      setError('Invalid image format. Please select a JPEG or PNG file.');
      return;
    }

    setImage(selectedFile);
    setImgurl(URL.createObjectURL(selectedFile));
  };

  const handleImageUpload = async (event) => {
    event.preventDefault();

    setError(null);

    if (!image) {
      setError('Please select an image to upload.');
      return;
    }

    try {
      const storageRef = ref(storage, `locations/${image.name}`);
      await uploadBytes(storageRef, image);

      const downloadUrl = await getDownloadURL(storageRef);
      setImgurl(downloadUrl);

      await addDoc(collection(db, 'locations'), {
        name,
        contact,
        date,
        description,
        organizer,
        time,
        mapurl,
        imgurl,
      });

      console.log('Location added successfully');
      setName('');
      setContact('');
      setDate('');
      setDescription('');
      setOrganizer('');
      setTime('');
      setMapurl('');
      setImage(null);
      setImgurl('');
    } catch (error) {
      setError('An error occurred while uploading the image or adding the location.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="product-upload">
      <h2>Location Upload</h2>
      {imgurl && (
        <img src={imgurl} alt="Preview" className="product-preview-img" />
      )}
      <form onSubmit={handleImageUpload}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contact">Contact Number:</label>
          <input
            type="text"
            id="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="time">Time:</label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="organizer">Organizer Name:</label>
          <input
            type="text"
            id="organizer"
            value={organizer}
            onChange={(e) => setOrganizer(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="mapurl">Map URL:</label>
          <input
            type="text"
            id="mapurl"
            value={mapurl}
            onChange={(e) => setMapurl(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            accept="image/jpeg, image/png"
            ref={fileInputRef}
            onChange={handleImageChange}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

function CleanUps() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'locations'));
        const locationData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLocations(locationData);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

  const handleDelete = async (locationId) => {
    try {
      await deleteDoc(doc(db, 'locations', locationId));
      setLocations(locations.filter(location => location.id !== locationId));
    } catch (error) {
      console.error('Error deleting location:', error);
    }
  };

  return (
    <div className="marketplace">
      <AddCleanup />
      <h1>Upcoming CleanUps</h1>
      <div className="products-grid">
        {locations.map((location) => (
          <div key={location.id} className="product">
            <h2 className="product-title">{location.name}</h2>
            <img src={location.imgurl} alt={location.name} className="product-img" />
            <p className="product-price">Contact Number: {location.contact}</p>
            <p className="product-price">Date: {location.date}</p>
            <p className="product-price">Time: {location.time}</p>
            <p className="product-price">Organizer: {location.organizer}</p>
            <p className="product-description">Description: {location.description}</p>
            <a href={location.mapurl} target="_blank" rel="noopener noreferrer">Map URL</a>
            <button onClick={() => handleDelete(location.id)} className="delete-button">
              <FaTrash /> Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CleanUps;
