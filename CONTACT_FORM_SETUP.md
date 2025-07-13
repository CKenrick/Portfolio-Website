# Contact Form Setup Guide

The contact form now supports actual email submissions using EmailJS, a service that allows you to send emails directly from frontend JavaScript without needing a backend server.

## EmailJS Setup

### 1. Create an EmailJS Account
- Go to [https://www.emailjs.com/](https://www.emailjs.com/)
- Sign up for a free account
- Verify your email address

### 2. Create an Email Service
- In your EmailJS dashboard, go to "Email Services"
- Click "Add New Service"
- Choose your email provider (Gmail, Outlook, etc.)
- Follow the setup instructions for your provider
- Note down the **Service ID**

### 3. Create an Email Template
- Go to "Email Templates" in your dashboard
- Click "Create New Template"
- Use this template structure:

```
Subject: New Contact Form Submission - {{subject}}

From: {{from_name}} <{{from_email}}>
Reply-To: {{reply_to}}

Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

- Save the template and note down the **Template ID**

### 4. Get Your Public Key
- Go to "Account" → "General"
- Find your **Public Key** (User ID)

### 5. Configure Environment Variables
Create a `.env` file in your project root with:

```bash
REACT_APP_EMAILJS_SERVICE_ID=your_service_id_here
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id_here
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key_here
```

Replace the placeholder values with your actual EmailJS credentials.

## Alternative: Backend API Setup

If you prefer to use a backend API instead of EmailJS, the form will automatically try to submit to `/api/contact` with a POST request containing the form data as JSON.

Example backend endpoint structure:
```javascript
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I'd like to discuss a project with you."
}
```

## Testing

1. Fill out the contact form with valid data
2. Submit the form
3. Check your email inbox for the message
4. Verify the auto-reply is sent to the form submitter (if configured)

## Troubleshooting

### Common Issues:
- **"User ID not found"**: Check your public key in the .env file
- **"Service not found"**: Verify your service ID is correct
- **"Template not found"**: Verify your template ID is correct
- **CORS errors**: Make sure your domain is added to EmailJS allowed origins

### Debug Mode:
The form logs submission results to the browser console. Check the developer tools for detailed error messages.

## Security Notes

- Never commit your `.env` file to version control
- Add `.env` to your `.gitignore` file
- EmailJS has rate limits on free accounts
- Consider adding a captcha for production use

## Cost Considerations

- EmailJS free plan: 200 emails/month
- Paid plans start at $15/month for 1000 emails
- Consider costs when scaling up

## Support

For EmailJS specific issues, check their [documentation](https://www.emailjs.com/docs/) or contact their support team. 