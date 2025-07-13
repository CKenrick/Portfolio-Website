import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaComment, FaPaperPlane, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

const ContactForm = ({ className = "" }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [submitMessage, setSubmitMessage] = useState('');

  // EmailJS configuration - replace with your actual service credentials
  const EMAILJS_CONFIG = {
    serviceId: process.env.REACT_APP_EMAILJS_SERVICE_ID || 'your_service_id',
    templateId: process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'your_template_id',
    publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'your_public_key'
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = 'Subject must be at least 5 characters';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 20) {
      newErrors.message = 'Message must be at least 20 characters';
    } else if (formData.message.trim().length > 500) {
      newErrors.message = 'Message must be less than 500 characters';
    }

    return newErrors;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Submit form using EmailJS
  const submitWithEmailJS = async (data) => {
    try {
      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        subject: data.subject,
        message: data.message,
        to_name: 'Christopher Kenrick', // Replace with your name
        reply_to: data.email
      };

      const result = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams,
        EMAILJS_CONFIG.publicKey
      );

      console.log('Email sent successfully:', result);
      return result;
    } catch (error) {
      console.error('EmailJS error:', error);
      throw error;
    }
  };

  // Alternative: Submit to backend API
  const submitToBackend = async (data) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Backend submission successful:', result);
      return result;
    } catch (error) {
      console.error('Backend submission error:', error);
      throw error;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Try EmailJS first, fallback to backend if needed
      if (EMAILJS_CONFIG.serviceId !== 'your_service_id') {
        await submitWithEmailJS(formData);
      } else {
        // If EmailJS not configured, try backend
        await submitToBackend(formData);
      }
      
      setSubmitStatus('success');
      setSubmitMessage('Thank you for your message! I\'ll get back to you soon.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setErrors({});
      
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage(
        'Sorry, there was an error sending your message. Please try again or contact me directly at christopher.kenrick@gmail.com.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`max-w-2xl mx-auto ${className}`}>
      {/* Success/Error Messages */}
      {submitStatus && (
        <div className={`mb-6 p-4 rounded-lg border ${
          submitStatus === 'success' 
            ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
            : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
        }`}>
          <div className="flex items-center">
            {submitStatus === 'success' ? (
              <FaCheckCircle className="text-green-500 mr-2" />
            ) : (
              <FaExclamationTriangle className="text-red-500 mr-2" />
            )}
            <p className={`text-sm ${
              submitStatus === 'success' 
                ? 'text-green-800 dark:text-green-200' 
                : 'text-red-800 dark:text-red-200'
            }`}>
              {submitMessage}
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Name *
          </label>
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent transition-colors duration-200 ${
                errors.name 
                  ? 'border-red-300 dark:border-red-600' 
                  : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder="Your full name"
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email *
          </label>
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent transition-colors duration-200 ${
                errors.email 
                  ? 'border-red-300 dark:border-red-600' 
                  : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder="your.email@example.com"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
          )}
        </div>

        {/* Subject Field */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Subject *
          </label>
          <div className="relative">
            <FaComment className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent transition-colors duration-200 ${
                errors.subject 
                  ? 'border-red-300 dark:border-red-600' 
                  : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder="What's this about?"
            />
          </div>
          {errors.subject && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.subject}</p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={formData.message}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent transition-colors duration-200 resize-vertical ${
              errors.message 
                ? 'border-red-300 dark:border-red-600' 
                : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="Tell me about your project, question, or how I can help you..."
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>
          )}
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {formData.message.length}/500 characters
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
            isSubmitting
              ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
              : 'bg-primary-light dark:bg-primary-dark hover:bg-primary-dark dark:hover:bg-primary-light transform hover:scale-105'
          } text-white focus:ring-2 focus:ring-offset-2 focus:ring-primary-light dark:focus:ring-primary-dark`}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Sending...
            </>
          ) : (
            <>
              <FaPaperPlane className="mr-2" />
              Send Message
            </>
          )}
        </button>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          I'll get back to you within 24 hours. You can also reach me directly at{' '}
          <a 
            href="mailto:christopher.kenrick@gmail.com" 
            className="text-primary-light dark:text-primary-dark hover:underline"
          >
            christopher.kenrick@gmail.com
          </a>
        </p>
      </form>
    </div>
  );
};

export default ContactForm; 