+++
fragment = "content"
weight = 100

title = "Grid"
background = "light"
+++

Grid fragment creates a [Bootstrap grid](https://getbootstrap.com/docs/4.1/layout/grid/) layout, with customizable columns that can be used to create custom layouts for a page.

The columns are by default using `.col-sm-3` class but this can be customized either generally or column by column.

Columns are filled by rendering fragments assigned to the `column` slot of the fragment.

- [Default grid - Four columns](#grid)
- [Two column grid](#grid-two-column)
- [Grid with custom columns](#grid-custom-columns)
