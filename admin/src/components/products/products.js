import React, { useState, useRef,useEffect } from 'react';
import { collection, getDocs, addDoc ,deleteDoc, doc} from "firebase/firestore";
import { db, storage } from '../../firebase';
import './products.css'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FaTrash } from 'react-icons/fa'; 


function ProductUpload() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [rating, setRating] = useState(0);
    const [sellerName, setSellerName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
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
        const storageRef = ref(storage, `products/${image.name}`);
        await uploadBytes(storageRef, image);
  
        const downloadUrl = await getDownloadURL(storageRef);
        setImageUrl(downloadUrl);
  
       
         await addDoc(collection(db, 'products'), {
          name,
          price,
          rating,
          sellerName,
          description,
          imageUrl,
        });
  
        console.log('Product added successfully to collection');
        setName(''); 
        setPrice(0);
        setRating(0);
        setSellerName('');
        setDescription('');
        setImage(null);
        setImageUrl('');
      } catch (error) {
        setError('An error occurred while uploading the image or adding the product.');
        console.error('Error:', error);
      }
    };
  
    return (
      <div className="product-upload">
        <h2>Product Upload</h2>
        {imageUrl && (
          <img src={imageUrl} alt="Preview" className="product-preview-img" />
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
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="rating">Rating:</label>
            <input
              type="number"
              id="rating"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              min={0}
              max={5}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="sellerName">Seller Name:</label>
            <input
              type="text"
              id="sellerName"
              value={sellerName}
              onChange={(e) => setSellerName(e.target.value)}
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
  
  
  
  

  function ProductDisplay() {
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, 'products'));
          const productData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setProducts(productData);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
  
      fetchProducts();
    }, []);
  
    const handleDelete = async (productId) => {
      try {
        await deleteDoc(doc(db, 'products', productId));
        setProducts(products.filter(product => product.id !== productId));
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    };
  
    return (
      <div className="marketplace" style={{ background: 'linear-gradient(rgb(110, 132, 150), #002633)' }}>
        <ProductUpload />
        <h1>Products</h1>
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product">
              <h2 className="product-title">{product.name}</h2>
              <img src={product.url} alt={product.name} className="product-img" />
              <p className="product-price">Price: {product.price}</p>
              <p className="product-price">Rating: {product.rating}</p>
              <p className="product-price">Seller: {product.sellername}</p>
              <p className="product-description">Description: {product.description}</p>
              <button onClick={() => handleDelete(product.id)} className="delete-button">
              <FaTrash /> Delete</button>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default ProductDisplay;
  







