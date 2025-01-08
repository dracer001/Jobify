import DOMPurify from 'dompurify';
import { useState, useEffect } from 'react';


const formatMessage = (msg) => {

  if (msg && /<[a-z][\s\S]*>/i.test(msg)) {
    // If the message contains HTML, sanitize it
    return { __html: DOMPurify.sanitize(msg) };
  }
  return { message: msg }
};


  // Define the custom hook
  export default function useNotification() {
    // State to hold the notification message and its type
    const [message, setMessage] = useState(null);
    const [type, setType] = useState('success'); // Can be 'success', 'error', 'info', 'warning'
    const [isVisible, setIsVisible] = useState(false);
  
    // State to store the formatted message (optional if formatting is required)
    const [formattedMessage, setFormattedMessage] = useState('');
  
    // Effect to auto-hide the message after 5 seconds
    useEffect(() => {
      if (message) {
        setIsVisible(true);
  
        // Format the message if needed
        setFormattedMessage(formatMessage(message));
  
        // Auto-hide the notification after 5 seconds
        const timer = setTimeout(() => {
          setIsVisible(false);
          setMessage(null); // Clear message
        }, 5000);
  
        return () => clearTimeout(timer);
      }
    }, [message]);
  
    // Function to format the message if needed (this can be customized)

  
    // Function to trigger the error notification
    const showError = (msg) => {
      setType('error');
      setMessage(msg);
    };
  
    // Function to trigger the success notification
    const showSuccess = (msg) => {
      setType('success');
      setMessage(msg);
    };
  
    // Function to trigger the info notification
    const showInfo = (msg) => {
      setType('info');
      setMessage(msg);
    };
  
    // Function to trigger the warning notification
    const showWarning = (msg) => {
      setType('warning');
      setMessage(msg);
    };
  
    return {
      message: formattedMessage,
      type,
      isVisible,
      showError,
      showSuccess,
      showInfo,
      showWarning,
    };
  }
  