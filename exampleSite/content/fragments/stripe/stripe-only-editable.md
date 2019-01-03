+++
fragment = "stripe"
weight = 130
background = "secondary"

title = "Payment Fragment with Custom Value"
subtitle = "Doesn't work in demo"

post_url = "https://us-central1-syna-222118.cloudfunctions.net/function-1/charge"
stripe_token = "pk_test_36PckiAlsGm9KmHj9b034GAW"

product = "Example Product"

[user_input]
  allow_change = true
  default = "20.00"
  currencies = ['usd', 'eur', 'cad']

[email]
  label = "Your email address"
+++

You can pay for the product by filling this form (provided by Stripe).
