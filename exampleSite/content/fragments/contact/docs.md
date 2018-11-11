+++
fragment = "content"
weight = 300

title = "Documentation"

[sidebar]
  enable = true
+++

Contact form can be used to either send the message to your email using a service such as [formspree](formspree.io), use Netlify form service or use your custom endpoint.

**NOTE:** If `netlify` variable is set to true then value of `post_url` will be dismissed since Contact fragment can send the data to a single endpoint only.

This fragment uses text from the `contact` section of i18n. You can customize or translate them using the keys documented here and available in `i18n/` directory of your website.

### Variables

#### form_name
*type: string*  
*default: contact-form-{{ file_name }}*

Unique name for the form. This name will be used in the scripts and needs to be unique in the page.

#### post_url
*type: string*  
*default: formspree.io*

URL to your own backend or a service you are using.

#### email
*type: string*  
*Required if post_url is using default value*

The variable is appended to `https://formspree.io/` if `post_url` is not set (and uses the default value) and `netlify` is either not set or set to `false`.

#### button_text
*type: string*  
*default: i18n contact.defaultButton*

Title of submit button of the form.

#### netlify
*type: boolean*  
*default: false*

If set to `true`, `post_url` would be ignored and Contact fragment would use Netlify variables in order to enable Netlify form service.

Using Netlify form service you wouldn't need to worry about handling the submissions, preventing spam and reCaptcha. All of these would be handled by Netlify.

**NOTE:** In order to use Netlify form service your website needs to be hosted on [Netlify](https://netlify.com).

#### recaptcha
*type: object*  
*default: Not set*

If this object is set and `recaptcha.sitekey` is not empty and `netlify` is not set to `true` then Google reCaptcha would be added to the form.

This would help with preventing spam submission.

##### recaptcha.sitekey
*type: string*

Your sitekey from Google reCaptcha. Generate your own from [here](https://www.google.com/recaptcha/intro/v3.html).

#### message
*type: object*

These messages would be shown if form submission either succeeds or fails.

##### message.success
*type: string*  
*default: i18n contact.defaultGenericSuccess*

##### message.error
*type: string*  
*default: i18n contact.defaultGenericError*

#### fields
*type: Object of objects*

Each object defined under `fields` will be added to the form. You can remove any of the fields and they would not appear.

#### fields.name
##### fields.name.text
*type: string*

##### fields.name.error
*type: string*  
*default: i18n contact.defaultNameError*

#### fields.email
##### fields.email.text
*type: string*

##### fields.email.error
*type: string*  
*default: i18n contact.defaultEmailError*

#### fields.phone
##### fields.phone.text
*type: string*

##### fields.phone.error
*type: string*  
*default: i18n contact.defaultPhoneError*

#### fields.message
##### fields.message.text
*type: string*

##### fields.message.error
*type: string*  
*default: i18n contact.defaultButton*

#### fields.hidden
*type: Array of objects*

You can use this array to add new hidden fields to the form.

##### fields.hidden.name
*type: string*

[Global variables](/docs/global-variables) are documented as well and have been omitted from this page.
