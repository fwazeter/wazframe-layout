/**
 * WordPress dependencies
 */
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';


export default function save(
	{ attributes: {
		tagName: Tag,
		recursive,
		style
	} }
) {
	const isRecursive = recursive ? 'recursive' : '';

	const spaceValue = style?.spacing?.preset;
	const customValue = style?.spacing?.margin?.top;

	const marginValue = spaceValue === 'custom' ? customValue : spaceValue;

	const styleProps = {
		"--space": marginValue
	}

	return <Tag
			{...useInnerBlocksProps.save(
				useBlockProps.save({ className: isRecursive })
			)} style={ { ...styleProps } }
		/>;
}
