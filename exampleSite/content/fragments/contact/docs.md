+++
fragment = "content"
weight = 300

title = "Documentation"

[sidebar]
  enable = true
+++

Contact form can be used to receive messages.

Various methods and providers are supported. You can use Netlify's form service, [formspree](formspree.io) or a custom endpoint.

**NOTE:** If `netlify` variable is set to true then value of `post_url` will be dismissed since Contact fragment can send the data to a single endpoint only.

This fragment uses internationalized text snippets. Customize them in the fragment or in your own `i18n/` website directory.

Contributions for translations are welcome.

### Variables

#### form_name
*type: string*  
*default: contact-form-{{ file_name }}*

Unique name for the form used to identify the form in scripts and on the page.

#### post_url
*type: string*  
*default: formspree.io*  
*Requires email to be set*

URL to your own backend or a service you are using.

#### email
*type: string*

Email used in case of error or if javascript is not available for a functioning contact form.

#### button_text
*type: string*  
*default: i18n contact.defaultButton*

Submit button text of the form.

#### netlify
*type: boolean*  
*default: false*

Setting netlify to `true` will enable Netlify's form handling and it will override any `post_url` configuration.

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
