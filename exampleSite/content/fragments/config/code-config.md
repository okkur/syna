+++
fragment = "content"
weight = 110
+++

```
+++
fragment = "config"

# Define meta tags
[[meta]]
  # html = "<meta meta charset="utf-8">"

# Define link tags
[[link]]
  # block = false # Default is true
  html = "<link rel='stylesheet' href='https://bootswatch.com/4/united/bootstrap.min.css'>"

# Define scripts
[[script]]
  # block = true # Default is false
  html = """
  <script>
    document.querySelector("#code-config").style.cursor = "url('http://wiki-devel.sugarlabs.org/images/e/e2/Arrow.cur'), auto";
  </script>
  """
+++
```
