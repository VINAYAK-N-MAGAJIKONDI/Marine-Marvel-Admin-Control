import React, { useState, useRef, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db, storage } from '../../firebase';
import './funding.css';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FaTrash } from 'react-icons/fa';

function AddFunding() {
    const [label, setLabel] = useState('');
    const [dec, setDec] = useState('');
    const [type, setType] = useState('');
    const [image, setImage] = useState(null);
    const [imageurl, setImageUrl] = useState('');
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);

    const handleImageChange = (event) => {
        const selectedFile = event.target.files[0];
        if (!selectedFile) {
            setImageUrl('');
            return;
        }

        if (!['image/jpeg', 'image/png'].includes(selectedFile.type)) {
            setError('Invalid image format. Please select a JPEG or PNG file.');
            return;
        }

        setImage(selectedFile);
        setImageUrl(URL.createObjectURL(selectedFile));
    };

    const handleImageUpload = async (event) => {
        event.preventDefault();
    
        setError(null);
    
        if (!image) {
            setError('Please select an image to upload.');
            return;
        }
    
        try {
            const storageRef = ref(storage, `fund/${image.name}`);
            await uploadBytes(storageRef, image);
    
            const downloadUrl = await getDownloadURL(storageRef);
    
            await addDoc(collection(db, 'fund'), {
                label,
                dec,
                type,
                imageurl: downloadUrl, // Update to use the download URL from Firebase Storage
            });
    
            console.log('Fund added successfully');
            setLabel('');
            setDec('');
            setType('');
            setImage(null);
            setImageUrl(downloadUrl); // Set the imageurl state with the download URL
        } catch (error) {
            setError('An error occurred while uploading the image or adding the fund.');
            console.error('Error:', error);
        }
    };
    

    return (
        <div className="product-upload">
            <h2>Funding Upload</h2>
            {imageurl && (
                <img src={imageurl} alt="Preview" className="product-preview-img" />
            )}
            <form onSubmit={handleImageUpload}>
                <div className="form-group">
                    <label htmlFor="label">Label:</label>
                    <input
                        type="text"
                        id="label"
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="dec">Description:</label>
                    <textarea
                        id="dec"
                        value={dec}
                        onChange={(e) => setDec(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="type">Type:</label>
                    <input
                        type="text"
                        id="type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
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

function Fundings() {
    const [fund, setFund] = useState([]);

    useEffect(() => {
        const fetchFund = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'fund'));
                const fundData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setFund(fundData);
            } catch (error) {
                console.error('Error fetching fund:', error);
            }
        };

        fetchFund();
    }, []);

    const handleDelete = async (fundId) => {
        try {
            await deleteDoc(doc(db, 'fund', fundId));
            setFund(fund.filter(fund => fund.id !== fundId));
        } catch (error) {
            console.error('Error deleting fund:', error);
        }
    };

    return (
        <div className="marketplace" style={{ background: 'linear-gradient(rgb(110, 132, 150), #002633)' }}>
            <AddFunding />
            <h1>Available Fundings</h1>
            <div className="fund-grid">
                {fund.map((fund) => (
                    <div key={fund.id} className="fund">
                        <h2 className="fund-label">{fund.label}</h2>
                        <img src={fund.imageurl} alt={fund.label} className="fund-img" />
                        <p className="fund-description">Description: {fund.dec}</p>
                        <p className="fund-type">Type: {fund.type}</p>
                        <button onClick={() => handleDelete(fund.id)} className="delete-button">
                            <FaTrash /> Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Fundings;
