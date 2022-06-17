# WazFrame Layout Primitives

WazFrame Layout primitives provides UI components and a systematized approach to managing CSS in WordPress blocks.


## CSS Philosophy

CSS works best when utilized for it's strengths, namely the cascade setting smart global defaults. Inheritance allows us
to reduce the duplication of code, errors in debugging CSS and allows for more complex design patterns with less redundant work.

However, because most developers and designers have become accustomed to a granular component based approach where we're
hand editing each style, this approach seems a bit awkward at first.

### Two Separate Concerns: Layout & Design.

Layout handles how elements should be composed, literally how they should be "laid out" on a screen. These properties primarily
handle things like spacing between elements, spacing within themselves and their overall size (such as width, height, typographic scale etc). This
is an entirely separate concern from _design_ which is primarily concerned with attributes like color, font family and artistic
effects or animations.

### Layer 0: Design Tokens & Global Reset

Design tokens are global standards such as typographic scale and color palette. Handled through CSS custom props and passed 
through different elements.

Global reset involves things like resetting browser opinionated styles to a sensible default.

### Layer 1: Layout Composition Through Primitives

The most time consuming task in CSS is assuredly dealing with spacing and wrapping layouts for the multitude of devices.
By starting with composition of common layout patterns as _component primitives_ we can compose more complex layouts easier,
more reliably and without having to resort to media queries for everything.

Primitives only handle _one job and do that one job well_. For example, the Stack primitive only handles vertical spacing between
elements. If it was to also handle horizontal spacing between elements, it would defeat the purpose of the primitive and make 
reliable inheritance and debugging more complex (which is what happens today in most CSS design systems).

These primitives are tools like: Box, Stack, Center.

### Layer 2: Components

Components are combinations of layout primitives to achieve certain re-used simple patterns. Search bars, banners,
cards, and the like all fall into this category.

### Layer 3: Utility Classes

Utility classes handle one task exceptionally well and only that one task. These are classes such as a utility class to 
make a div full width when it's inside a contained div. Or a class that defines a singular color. 

### Layer 4: Patterns

Patterns combine layout primitives, components and their design together into an overall reusable _section_ of content.

### Layer 5: Exceptions

Exception classes are the final piece. They are specific overrides for specific instances of a css style, that are used either
on a one off or infrequent basis.


## Custom Properties as Design Tokens

### `--wf`

The `--wf` prefix indicates a globally scoped variable. E.g. `--wf--border-width`

### `--wf-{block}`

The `--wf-{block}` prefix indicates a block scoped variable, e.g `--wf-box--space`