# Contact Fragment

Contact fragment provides a simple form, containg 4 fields. Name, email, phone number and message. These fields can be hidden using FrontMatter variables. This fragment can be used in posts as comment form or as the contact form in the about or contact page of your website, for example.

## FrontMatter variables

### fragment = "contact"
### disabled *boolean*
Disable the fragment. If set true, the fragment would not be rendered. (default **false**)
### background *string*
Background of the fragment. (default **secondary**)
### form_name *string*
This value is used for the `name` property of the `form` tag. (default **contactForm**)
### title *string*
Title of the form. This is displayed in the section that shows the form.
### subtitle *string*
Subtitle of the form. This is displayed in the section shows the form.
### post_url *string* *Either **post_url** or **email** should be provided*
If set, submitted data would be sent to this url.
### email *string* *Either **post_url** or **email** should be provided*
If set and there is no **post_url** provided, then the form data would be sent to `https://formspree.io/[email]`. This is the default behavior and can be overriden using the `post_url` variable.
### button *string*
Submit button's title. Default value is called from the i18n dictionary using the key `contact.defaultButton`
### netlify *boolean*
This variable can be used if your website is hosted on Netlify. If set to true, `post_url` and `email` are ignored and the form is handled by Netlify form handlers.
### recaptcha.sitekey *string*
If set, the form would be protected by Recaptcha. You need to provide Recaptcha key for this variable.
### message.success
Success message for the form. Shown when the form is submitted without any errors.
### message.error
Error message for the form. Shown when the form has errors from the server.
### fields.[name, email, phone, message].text
Title of the given field. Title is shown as the placeholder of the fields and default value is called from the i18n dictionary.
### fields.[name, email, phone, message].error
Error message of the given field. Shown when the field value is not valid.
### fields.hidden.[name, value]
`fields.hidden` can be used when you want to receive more data from the form. No field is set as default.
