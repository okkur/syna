+++
fragment = "stripe"
weight = 110
background = "secondary"

title = "Payment Fragment"
subtitle = "Doesn't work in demo"

post_url = "http://localhost:3000/charge"
stripe_token = "pk_test_36PckiAlsGm9KmHj9b034GAW"

product = "Example Product"

[[prices]]
  text = "20.00$"
  currency = "usd"

[email]
  label = "Your email address"
+++

You can pay for the product by filling this form (provided by Stripe).
