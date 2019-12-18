+++
fragment = "content"
weight = 110
+++

<details><summary>Code</summary>

```
+++
fragment = "config"

[[config]]
  type = "css" # Acceptable values are icon, meta, link, css, js. Default is empty. Would not add anything on empty.
  # block = true # If set to true, would inject the code to the <head> tag. Default is false
  html = "<link rel='stylesheet' href='https://bootswatch.com/4/united/bootstrap.min.css'>" # HTML code injected directly to the page. Default is empty.
  # file = "" # Path to file, can be on page or in static/ directory. Default is empty.

[[config]]
  type = "js"
  # block = true # Default is false
  html = """
  <script>
    document.getElementsByTagName("body")[0].style.cursor = "url('http://wiki-devel.sugarlabs.org/images/e/e2/Arrow.cur'), auto";
  </script>
  """
+++
```
</details>
