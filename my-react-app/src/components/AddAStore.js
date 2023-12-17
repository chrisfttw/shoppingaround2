// import React, { useState } from 'react';
// import { db } from '../googledatebase/config.js';
// import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// const StoreForm = ({ onClose }) => {
//   const [formData, setFormData] = useState({
//     geocode: '',
//     popUp: '',
//     imageUrl: '',
//     phoneNumber: '',
//     address: '',
//     website: '',
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const storeCollectionRef = collection(db, 'markers');
//       await addDoc(storeCollectionRef, {
//         ...formData,
//         geocode: formData.geocode.split(',').map(coord => parseFloat(coord.trim())),
//         timestamp: serverTimestamp(),
//       });

//       
//       setFormData({
//         geocode: '',
//         popUp: '',
//         imageUrl: '',
//         phoneNumber: '',
//         address: '',
//         website: '',
//       });

//       console.log('Store submitted successfully!');
//       onClose(); 
//     } catch (error) {
//       console.error('Error submitting store:', error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevData => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   return (
//     <div className="popup">
//       <div className="popup-content">
//         <form onSubmit={handleSubmit}>
//         <label>
//         Geocode (latitude, longitude):
//         <input type="text" name="geocode" value={formData.geocode} onChange={handleChange} required />
//       </label>
//       <label>
//         Store Name:
//         <input type="text" name="popUp" value={formData.popUp} onChange={handleChange} required />
//       </label>
//       <label>
//         Image URL:
//         <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} required />
//       </label>
//       <label>
//         Phone Number:
//         <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
//       </label>
//       <label>
//         Address:
//         <input type="text" name="address" value={formData.address} onChange={handleChange} required />
//       </label>
//       <label>
//         Website:
//         <input type="url" name="website" value={formData.website} onChange={handleChange} required />
//       </label>
//           <button type="submit">Submit Store</button>
//         </form>
//         <button onClick={onClose}>Close</button>
//       </div>
//     </div>
//   );
// };

// export default StoreForm;
