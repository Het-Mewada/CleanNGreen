import { useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import {Spinner} from "react-bootstrap";

const FileUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first!");

    const formData = new FormData();
    formData.append("file", file);
    setUploading(true)
    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      const { data } = await axios.post(
        `${__API_URL__}/upload`,
        formData,
        { 
          withCredentials: true, 
          headers: { Authorization: `Bearer ${token}` }
         }
      );
      onUploadSuccess(data.url); // Send Cloudinary URL to parent component
    } catch (error) {
      alert("File upload failed!");
    }finally{
      setUploading(false)
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 max-w-md mx-auto bg-dark rounded-xl ">
  {/* Preview Image */}
  {preview && (
    <div className="relative group">
      <img 
        src={preview} 
        alt="Preview" 
        className="w-40 h-40 object-cover rounded-lg shadow-sm border border-gray-200"
      />
      <button 
        onClick={() => setPreview(null)}
        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-600"
        aria-label="Remove image"
      >
        ×
      </button>
    </div>
  )}

  {/* File Input */}
  <div className="w-full">
    <label className="block mb-1 text-sm font-medium text-[#e8b98f]">
      Select an image
    </label>
    <input 
      type="file" 
      onChange={handleFileChange}
      accept="image/*"
      className="block w-full text-sm text-white
        file:mr-4 file:py-2.5 file:px-6
        file: file:border-0
        file:text-sm file:font-medium
        file:bg-emerald-50 file:text-emerald-700
        hover:file:bg-emerald-100
        
        border border-gray-300 rounded-lg
        focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent
        transition-all duration-200"
    />
  </div>  

  {/* Upload Button */}
  <button
    onClick={handleUpload}
    disabled={uploading}
    className={`w-full py-3 px-6 rounded-full font-bold text-white transition-all duration-300
      ${uploading ? 'bg-emerald-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 shadow-md hover:shadow-lg'}
      flex items-center justify-center gap-2`}
  >
    {uploading ? (
      <>
        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Uploading...
      </>
    ) : (
      "Upload Image"
    )}
  </button>
</div>
  );
};

export default FileUpload;
