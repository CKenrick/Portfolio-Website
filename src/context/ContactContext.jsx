import React, { createContext, useContext, useState, useCallback } from 'react';

const ContactContext = createContext();

export const useContact = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error('useContact must be used within a ContactProvider');
  }
  return context;
};

export const ContactProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

  const updateFormData = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setSubmitStatus(null);
  }, []);

  const submitForm = useCallback(async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Simulate form submission (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For now, just log the data
      //console.log('Form submitted:', data);
      
      setSubmitStatus('success');
      resetForm();
      
      return { success: true };
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      
      return { success: false, error: error.message };
    } finally {
      setIsSubmitting(false);
    }
  }, [resetForm]);

  const value = {
    formData,
    updateFormData,
    resetForm,
    submitForm,
    isSubmitting,
    submitStatus
  };

  return (
    <ContactContext.Provider value={value}>
      {children}
    </ContactContext.Provider>
  );
};

export default ContactContext; 