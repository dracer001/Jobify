import { useDropzone } from 'react-dropzone';


const handleFileUpload = (event, setFile=(file)=>{console.log(file)}) => {

    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setFile(file);
        };
        reader.readAsDataURL(file);
    }
};

const handleDropFile = ( fileType = "image", setFile=(file) => { console.log(file) }, setError) => {
    return useDropzone({
      onDrop: (acceptedFiles) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        // Handle image file
        if (fileType === 'image' && validateImage(file, setError)) {
          reader.onloadend = () => {
            setFile(reader.result); // Save the file data (base64) to state
          };
          reader.readAsDataURL(file);
          setError(false);
        } else if (fileType === 'document' && validateDocument(file, setError)) {
          reader.onloadend = () => {
            setFile(file); // Save the file data (base64) to state
          };
          reader.readAsDataURL(file);
          // setFile(URL.createObjectURL(file)); // Save the file URL (for preview)
          setError(false);
        }
      }
    });
  };
  

// Validate image files (max size 5MB, only image types)
const validateImage = (file, setError=(error)=>{console.log(error)}) => {

    // Check if a file is selected
    if (!file) {
      setError('No file selected.');
      return false;
    }

    // Validate image file type (only images)
    if (!file.type.startsWith('image/')) {
      setError('Only image files are allowed.');
      return false;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) { // 5MB max size
      setError('Image file size is too large. Maximum size is 5MB.');
      return false;
    }

    // If all validations pass
    setError(null); // Clear any previous error
    return true;
  };

  const validateDocument = (file, setError) => {

    // Check if a file is selected
    if (!file) {
      setError('No file selected.');
      return false;
    }

    // Validate file type (only documents)
    const allowedDocumentTypes = [
      'application/pdf',  // Allow .pdf files
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // Allow .docx files
    ];
    
    if (!allowedDocumentTypes.includes(file.type)) {
      setError('Only document files are allowed (PDF, DOCX).');
      return false;
    }

    // Validate file size (max 10MB)
    if (file.size > 3 * 1024 * 1024) { 
      setError('Document file size is too large. Maximum size is 5MB.');
      return false;
    }

    // If all validations pass
    setError(null); // Clear any previous error
    return true;
  };


export {
    handleDropFile,
    handleFileUpload,
    validateDocument,
    validateImage
}