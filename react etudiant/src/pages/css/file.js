import React, { useState } from 'react';

function FileInput() {
  const [fileName, setFileName] = useState('Upload File');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName('Upload File');
    }
  };

  return (
    <label className="file-input">
      <input type="file" onChange={handleFileChange} />
      <span className="file-icon" role="img" aria-label="landscape-icon">🏞️</span> 
      <span className="file-label">{fileName}</span>
    </label>
  );
}

export default FileInput;
