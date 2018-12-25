+++
fragment = "stripe"
weight = 120

post_url = "https://us-central1-syna-222118.cloudfunctions.net/function-1/charge"
stripe_token = "pk_test_36PckiAlsGm9KmHj9b034GAW"

[[prices]]
  text = "20.00$"
  amount = "2000"
  currency = "usd"

[email]
  label = "Your email address"
+++
