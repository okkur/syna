+++
fragment = "table"
#disabled = false
date = "2017-10-10"
weight = 110
background = "secondary"

title = "Table Fragment"
subtitle= "Customized table using shortcodes"
#title_align = "left" # Default is center, can be left, right or center
+++

| Header 1 | Header 2 | {{< hide-on-mobile >}}Header 3{{< /hide-on-mobile >}} | {{< hide-on-mobile >}}Header 4{{< /hide-on-mobile >}} | Header 5 | Header 6 |
|----------|----------|------------|-----------|-------------|----------|
| {{< row-header >}}Row 1{{< /row-header >}} | Value | {{< hide-on-mobile >}}Long Value{{< /hide-on-mobile >}} | {{< hide-on-mobile >}}Value{{< /hide-on-mobile >}} | {{< button url="#" color="success" >}}Long Button{{< /button >}} | {{< align center >}}{{< button color="danger" url="#" >}}Button{{< /button >}}{{< /align >}} |
| {{< row-header >}}Row 2{{< /row-header >}} | Value | {{< hide-on-mobile >}}Value{{< /hide-on-mobile >}} | {{< hide-on-mobile >}}Long Value{{< /hide-on-mobile >}} | | {{< align center >}}{{< fontawesome icon="fas fa-download" url="#" >}}{{< /align >}} |
