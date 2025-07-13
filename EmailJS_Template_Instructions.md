# EmailJS Template Setup Instructions

## Overview
This HTML email template is designed to match your portfolio's visual design and branding. It creates professional, responsive emails that look great on all devices and email clients.

## Template Features

### 🎨 **Design Elements**
- **Color Scheme**: Matches your portfolio (#06D6A0 primary, #118AB2 secondary, #073B4C dark)
- **Typography**: Clean, modern font stack with proper hierarchy
- **Layout**: Professional card-based design with clear sections
- **Responsiveness**: Optimized for mobile, tablet, and desktop viewing
- **Dark Mode**: Supports dark mode preferences

### 📧 **Template Variables**
The template uses these EmailJS variables (automatically populated by your ContactForm):

| Variable | Description | Example |
|----------|-------------|---------|
| `{{from_name}}` | Contact's full name | "John Doe" |
| `{{from_email}}` | Contact's email address | "john@example.com" |
| `{{subject}}` | Message subject | "Project Inquiry" |
| `{{message}}` | Full message content | "I'd like to discuss..." |
| `{{date}}` | Date received (optional) | "March 15, 2024" |
| `{{time}}` | Time received (optional) | "2:30 PM" |

## Setting Up the Template in EmailJS

### Step 1: Access Email Templates
1. Log into your [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Navigate to **Email Templates** in the sidebar
3. Click **Create New Template**

### Step 2: Configure Template Settings
1. **Template Name**: `Portfolio Contact Form`
2. **Template ID**: `template_portfolio_contact` (or your preferred ID)
3. **From Name**: `{{from_name}}` (Dynamic)
4. **From Email**: `{{from_email}}` (Dynamic)
5. **Subject**: `New Contact: {{subject}}`
6. **Reply To**: `{{from_email}}`

### Step 3: Add Template Content
1. Switch to **HTML** view in the template editor
2. Copy the entire contents of `EmailJS_Template.html`
3. Paste into the HTML editor
4. Save the template

### Step 4: Test the Template
1. Use EmailJS's **Test** feature
2. Fill in sample values for all variables:
   ```
   from_name: John Doe
   from_email: john@example.com
   subject: Test Message
   message: This is a test message to verify the template works correctly.
   ```
3. Send test email and verify formatting

## Advanced Customization

### Adding Date/Time Stamps
If you want to include when the message was received, add these fields to your ContactForm component:

```javascript
const templateParams = {
  from_name: data.name,
  from_email: data.email,
  subject: data.subject,
  message: data.message,
  to_name: 'Christopher Kenrick',
  reply_to: data.email,
  date: new Date().toLocaleDateString(),
  time: new Date().toLocaleTimeString()
};
```

### Personalizing the Template
1. **Update Social Links**: Replace placeholder URLs with your actual profiles
2. **Modify Contact Info**: Update email address and name in the footer
3. **Adjust Colors**: Modify the CSS color values to match any branding changes
4. **Add Logo**: Include your portfolio logo in the header section

### Custom Fields
To add additional form fields (like phone number, company, etc.):

1. **Add to ContactForm**: Update the form state and template params
2. **Update Template**: Add new contact fields in the contact-info section:
   ```html
   <div class="contact-field">
       <span class="contact-label">Phone:</span>
       <span class="contact-value">{{phone}}</span>
   </div>
   ```

## Email Client Compatibility

The template is tested and optimized for:
- ✅ Gmail (Web, Mobile, App)
- ✅ Outlook (Web, Desktop, Mobile)
- ✅ Apple Mail (macOS, iOS)
- ✅ Yahoo Mail
- ✅ Thunderbird
- ✅ Mobile email clients

## Troubleshooting

### Common Issues:
1. **Template variables not showing**: Ensure variable names match exactly
2. **Styling not displaying**: Some email clients strip CSS - the template uses inline styles where necessary
3. **Links not working**: Verify mailto links are properly formatted

### Testing Tips:
1. Always test with real email addresses
2. Check rendering in multiple email clients
3. Test on mobile devices
4. Verify all links and buttons work correctly

## Template Maintenance

### Regular Updates:
- Update social media links when they change
- Modify contact information as needed
- Refresh color scheme if portfolio design changes
- Test template periodically to ensure compatibility

### Version Control:
Keep a backup of your template HTML for future reference or modifications.

## Support
If you encounter issues with the template:
1. Check EmailJS documentation for template syntax
2. Verify all variables are properly mapped
3. Test with simple text values first
4. Contact EmailJS support for platform-specific issues

---

**Note**: This template is designed specifically for your portfolio contact form. The styling and branding elements reflect your personal brand identity. 