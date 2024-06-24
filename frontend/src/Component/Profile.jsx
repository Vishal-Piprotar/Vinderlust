import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../firebase/firebase';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ fullName: '', photo: '', mobile: '' });
  const [loginMethod, setLoginMethod] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser(userData);
            setFormData({
              fullName: userData.fullName || '',
              photo: user.photoURL || userData.photo || '',
              mobile: userData.mobile || '',
            });
            const providerId = user.providerData[0].providerId;
            setLoginMethod(providerId === 'password' ? 'Email/Password' : 'Google');
          } else {
            toast.error('No user data found');
          }
        } else {
          toast.error('No user is signed in');
        }
      } catch (error) {
        toast.error(`Failed to fetch user data: ${error.message}`);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (allowedTypes.includes(file.type)) {
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
      } else {
        toast.error('Please select a valid image file (jpg, jpeg, or png)');
      }
    }
  };

  const handleSave = async () => {
    try {
      const user = auth.currentUser;
      let photoURL = formData.photo;

      if (user && imageFile) {
        const storageRef = ref(storage, `profile_images/${user.uid}`);
        await uploadBytes(storageRef, imageFile);
        photoURL = await getDownloadURL(storageRef);
      }

      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        await updateDoc(userDocRef, { ...formData, photo: photoURL });
        setUser((prevUser) => ({ ...prevUser, ...formData, photo: photoURL }));
        setIsEditing(false);
        setShowModal(false);
        toast.success('Profile updated successfully');
      } else {
        toast.error('No user is signed in');
      }
    } catch (error) {
      toast.error(`Failed to update profile: ${error.message}`);
    }
  };

  const reauthenticateUser = async () => {
    try {
      const user = auth.currentUser;
      if (user && loginMethod === 'Email/Password') {
        const credential = EmailAuthProvider.credential(user.email, password);
        await reauthenticateWithCredential(user, credential);
      }
    } catch (error) {
      toast.error(`Failed to reauthenticate: ${error.message}`);
      throw error;
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await reauthenticateUser();
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        await deleteDoc(userDocRef);
        await user.delete();

        toast.success('Account deleted successfully');
        navigate('/');
      } else {
        toast.error('No user is signed in');
      }
    } catch (error) {
      toast.error(`Failed to delete account: ${error.message}`);
    }
  };

  const openModal = () => {
    setIsEditing(true);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
   <div className='pt-20'>
     <div className="container mx-auto my-10 p-5">
      <h1 className="text-2xl font-bold mb-5">Profile</h1>
      <div className="bg-white p-5 rounded-lg shadow-lg">
        <div className="mb-5 md:flex md:items-center">
          <div className="md:flex-shrink-0">
            <img
              src={imagePreview || user.photo || 'default-profile.png'}
              alt="Profile"
              className="w-20 h-20 rounded-full"
            />
          </div>
          <div className="mt-4 md:mt-0 md:ml-6">
            <h2 className="text-xl font-bold">{user.fullName}</h2>
            <p className="text-gray-500">{user.email}</p>
            {user.emailVerified && (
              <span className="text-green-500 font-bold">Verified</span>
            )}
            <div className="mt-2">
              <p><strong>Mobile:</strong> {user.mobile || 'Not provided'}</p>
              <p><strong>Login Method:</strong> {loginMethod}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-2"> 
          <button
            onClick={openModal}
            className="w-full md:w-auto mt-4 px-4 py-2 text-white font-medium bg-orange-600 hover:bg-orange-500 rounded-lg"
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
          <button
            onClick={handleDeleteAccount}
            className="w-full md:w-auto mt-4 px-4 py-2 text-white font-medium bg-red-500 hover:bg-red-400 rounded-lg"
          >
            Delete Account
          </button>
        </div>
      </div>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Photo
                </label>
                <input
                  type="file"
                  name="photo"
                  onChange={handleImageChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              {imagePreview && (
                <div className="mb-4">
                  <img src={imagePreview} alt="Preview" className="w-20 h-20 rounded-full" />
                </div>
              )}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Mobile
                </label>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <button
                type="button"
                onClick={handleSave}
                className="w-full mt-4 px-4 py-2 text-white font-medium bg-orange-600 hover:bg-orange-500 rounded-lg"
              >
                Save
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="w-full mt-4 px-4 py-2 text-white font-medium bg-red-600 hover:bg-red-500 rounded-lg"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
   </div>
  );
};

export default Profile;
