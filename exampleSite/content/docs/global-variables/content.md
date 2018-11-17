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
*type: string*  
**Required for every fragment**

Specifies what fragment the current file controls. Checkout [Fragment Implementation](/docs/fragments-implementation/) for more info.

#### weight
*type: number*  
**Required for every fragment**

This variable is used for ordering fragments in a page. It can be empty but it would cause the fragment to be sorted in an unexpected manner.

#### background
Set the background of the fragment.

Background also affects the text color of the fragment's content.
For the background colors of `white`, `light`, `secondary` and `primary` we use Bootstrap's `text_dark` class on content and for other backgrounds, we use `text_light`.

List of all supported colors can be found in [supported colors](/docs/supported-colors) section of the docs.

#### title
*type: string*

Set title of the fragment

#### subtitle
*type: string*

Set subtitle of the fragment

#### title_align
*type: right, left, center*

Change alignment of fragment's header

#### padding
*type: string*  
*Experimental* 

Changes the padding of fragment's container

#### asset
*type: asset object*

This variable is not global and is not always named `asset`. Any fragment that uses this variable would show either an image or an icon.

##### asset.image
*type: string*

If set, `asset.icon` will be ignored. `asset.image` supports [image fallthrough mechanism](/docs/image-fallthrough/).

##### asset.icon
*type: string*

If `asset.image` is not set, an icon will usually be shown and the icon will have `asset.icon` as it's class. Icons are powered by FontAwesome.

##### asset.url
*type: string*

URL of the image or the icon.

##### asset.text
*type: string*

If `asset.image` is set, alternative text of the image will be this variable.
