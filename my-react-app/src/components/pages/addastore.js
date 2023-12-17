// import React, { useState } from 'react';
// import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
// import { db } from '../../googledatebase/config.js';
// import GeocodingComponent from '../AddressToLatLong.js';

// const AddAStore = ({ onClose, onStoreSubmitted }) => {
//   const [storeName, setStoreName] = useState('');
//   const [address, setAddress] = useState('');
//   const [website, setWebsite] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

    
//     if (!storeName.trim() || !address.trim() || !website.trim() || !phoneNumber.trim()) {
//       console.error('All fields must be filled');
//       return;
//     }

//     setLoading(true);

//     try {
//       const { lat, lng } = await GeocodingComponent.geocodeAddress(address);

//       const docRef = await addDoc(collection(db, 'stores'), {
//         storeName,
//         address,
//         website,
//         phoneNumber,
//         location: { lat, lng },
//         createdAt: serverTimestamp(),
//       });

//       console.log('Store created with ID:', docRef.id);

      
//       onStoreSubmitted();
//     } catch (error) {
//       console.error('Error creating store:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="add-store-form">
//       <GeocodingComponent 
//         onAddressChange={(newAddress) => setAddress(newAddress)}
//       />
//       <button type="submit" disabled={loading} className="submit-button">
//         {loading ? 'Creating...' : 'Add Store'}
//       </button>
//     </form>
//   );
// };

// export default AddAStore;
