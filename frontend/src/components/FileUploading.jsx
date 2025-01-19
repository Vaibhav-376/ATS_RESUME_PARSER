import React, { useState } from 'react';

const FileUploading = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    setIsUploading(true);

    try {
      const response = await fetch('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('File uploaded and processed successfully.');
        console.log(result);
      } else {
        setMessage(result.error || 'File upload failed.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage('An error occurred during file upload.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-200 via-white to-blue-300">
        <div className="p-6 bg-white shadow-2xl rounded-lg max-w-md w-full space-y-6 transform transition duration-500 hover:scale-105">
          <h1 className="text-2xl font-bold text-center text-gray-700">
            Upload Your File
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center space-y-6"
          >
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-300 ease-in-out"
              accept=".pdf,.doc,.docx,.txt"
            />
            <button
              type="submit"
              className={`w-full py-2 px-4 text-white font-semibold rounded-md ${
                isUploading ? 'bg-blue-300' : 'bg-blue-500'
              } hover:bg-blue-600 transition-all duration-300 ease-in-out ${
                isUploading && 'cursor-not-allowed'
              }`}
              disabled={isUploading}
            >
              {isUploading ? (
                <span className="flex justify-center items-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  Uploading...
                </span>
              ) : (
                'Upload'
              )}
            </button>
          </form>
          {message && (
            <p
              className={`text-center text-sm font-medium transition-transform transform ${
                message.includes('successfully')
                  ? 'text-green-600 scale-110'
                  : 'text-red-600'
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default FileUploading;
