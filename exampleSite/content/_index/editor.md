{
  "date": "2018-6-27",
  "weight": 310,
  "fragment": "editor",
  "title": "Login",
  "form": {
    "endpoint": "http://example.com",
    "netlify": false,
    "submit_label": "Submit",
    "fields": [
      {
        "type": "text",
        "label": "Name",
        "name": "name",
        "placeholder": "Enter your name",
        "required": true,
        "default": "",
        "validation": ""
      }, {
        "type": "email",
        "label": "Email",
        "name": "email",
        "placeholder": "Enter your email",
        "required": true,
        "validation": "email"
      }, {
        "type": "text",
        "label": "Phone",
        "name": "phone",
        "placeholder": "Enter your phone",
        "required": true,
        "validation": "regex",
        "validation_regex": "^([0-9,\\+]+)$",
        "validation_msg": "Invalid phone number"
      }, {
        "type": "textarea",
        "label": "Message",
        "name": "message",
        "placeholder": "Enter your message",
        "required": true,
        "validation": "",
        "rows": 4
      }
    ]
  }
}
