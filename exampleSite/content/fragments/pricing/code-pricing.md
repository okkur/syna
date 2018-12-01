+++
fragment = "content"
weight = 111
+++

<details>
<summary>Code (index)</summary>
```
+++
fragment = "pricing"
weight = 100
# background = "light"

title = "Pricing fragment"
subtitle = "Can be linked to 3rd party payment services"
#title_align = "left" # Default is center, can be left, right or center
+++

Pricing fragment supports **markdown** as it's subtitle.  
Supports feature listing of different plans and links to a payment service.
```
</details>

<details>
<summary>Code (subitem)</summary>
```
+++
weight = 10

title = "Starting plan"
subtitle = "starting at"

price = "0" # This value can be communicated to a stripe fragment
price_text = "Free" # Displayed value of the price
currency = "USD" # This value can be communicated to a stripe fragment
# highlight = true

button_text = "Start for free"
button_url = "#"

[[features]]
  text = "**Basic** feature"
  icon = "fas fa-check"

[[features]]
  text = "**Email** support"
  icon = "fas fa-check"
+++
```
</details>
