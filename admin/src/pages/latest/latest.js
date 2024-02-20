import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import './latest.css';
import { FaTrash } from 'react-icons/fa';

function AddCarouselItem() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState(null);

    const handleImageChange = (event) => {
        const selectedFile = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageUrl(reader.result);
        };
        if (selectedFile) {
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await addDoc(collection(db, 'carouselData'), {
                title,
                description,
                imageUrl,
            });

            console.log('Carousel item added successfully ');
            setTitle('');
            setDescription('');
            setImageUrl('');
        } catch (error) {
            setError('An error occurred while adding the carousel item.');
            console.error('Error:', error);
        }
    };

    return (
        <div className="carousel-item-form">
            <h2>Add Carousel Item</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
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
                    <label htmlFor="image">Image:</label>
                    <input
                        type="file"
                        id="image"
                        accept="image/jpeg, image/png"
                        onChange={handleImageChange}
                        required
                    />
                </div>
                {imageUrl && (
                    <img src={imageUrl} alt="Preview" className="image-preview" />
                )}
                {error && <div className="error-message">{error}</div>}
                <button type="submit">Add Carousel Item</button>
            </form>
        </div>
    );
}

function Carousel() {
    const [carouselItems, setCarouselItems] = useState([]);

    useEffect(() => {
        const fetchCarouselItems = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'carouselData'));
                const carouselData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setCarouselItems(carouselData);
            } catch (error) {
                console.error('Error fetching carousel items:', error);
            }
        };

        fetchCarouselItems();
    }, []);

    const handleDelete = async (itemId) => {
        try {
            await deleteDoc(doc(db, 'carouselData', itemId));
            setCarouselItems(carouselItems.filter((item) => item.id !== itemId));
        } catch (error) {
            console.error('Error deleting carousel item:', error);
        }
    };

    return (
        <div className="carousel">
            <AddCarouselItem />
            <h1>Latest News and Updates</h1>
            <div className="carousel-items">
                {carouselItems.map((item) => (
                    <div key={item.id} className="carousel-item">
                        <h2 className="item-title">{item.title}</h2>
                        <img src={item.imageUrl} alt={item.title} className="item-image" />
                        <p className="item-description">{item.description}</p>
                        <button
                            onClick={() => handleDelete(item.id)}
                            className="delete-button"
                        >
                            <FaTrash /> Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Carousel;
