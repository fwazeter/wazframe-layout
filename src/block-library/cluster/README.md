# The Cluster

Using grids aren't always an appropriate approach to even vertical and horiztonal lines. 
Most notably when events are uneven in size (such as text). The cluster makes spacing consistent between inconsistently sized objects.

## Key concepts

### Flex

Making the cluster a Flexbox context allows us to configure
elements into clusters without dealing with undesirable word spaces. Flex makes
it possible to vertically align elements as well as eliminate the need for a clear fix.

### Margin is obscured

Alignment changes where margins appear, so uneven margin values results
in unexpected spacing on different screen sizes, alignments and such.

The solution here is to add margin symmetrically to all sides. 

Unfortunately, margins collapse on child elements that are side by side making the
margin values appear uneven when the margin is between parent and child and child to child.

The solution here is to use a calc function with custom prop to halve the value of the 
space and then insulate adjacent content from the negative margin because we still want to respect
vertical spacing from a parent like Stack.

```css
.cluster {
    --space: 1rem;
}

.cluster > * {
    display: flex;
    flex-wrap: wrap;
    /* multiply by -1 to negate the halved value */
    margin: calc(var(--space) / 2 * -1);
}

.cluster > * > * {
    /* half the value because of the doubling up */
    margin: calc(var(--space) / 2);
}
```

That's a complicated solution. Luckily there's the Gap property that we use instead.

### Justification

Groups or clusters of elements take any justify-content value because that  aligns the content.


### Use cases

Clusters suit groups of elements that differ in length and are most likely to wrap.
For example, buttons that appear together at the end of forms, lists of tags, keywords or other meta info.

The cluster will horiztonally align all the laid out elements to left right or center.