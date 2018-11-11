+++
fragment = "content"
title = "Global Variables"
weight = 100

[sidebar]
  enable = true
+++

There are a few frontmatter variables that can be used for all fragments. The
variables are as follows:

#### fragment
**Required for every fragment**

Specifies what fragment the current file controls. Checkout [Fragment Implementation](/docs/fragments-implementation/) for more info.

#### weight
**Required for every fragment**

This variable is used for ordering fragments in a page. It can be empty but it would cause the fragment to be sorted in an unexpected manner.

#### background
Set the background of the fragment.

Background also affects the text color of the fragment's content.
For the background colors of `white`, `light`, `secondary` and `primary` we use Bootstrap's `text_dark` class on content and for other backgrounds, we use `text_light`.

List of all supported colors can be found in [supported colors](/docs/supported-colors) section of the docs.

#### title
Set title of the fragment

#### subtitle    
Set subtitle of the fragment

#### title_align 
Change alignment of fragment's header

#### padding
*Experimental* 

Changes the padding of fragment's container
