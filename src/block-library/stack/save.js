/**
 * WordPress dependencies
 */
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';
import {setClassName} from "./setClassName";


export default function save(
	{ attributes: {
		tagName: Tag,
		recursive,
		splitAfter,
		style
	} }
) {
	const isRecursive = recursive ? 'recursive' : '';

	const spaceValue = style?.spacing?.preset;
	const customValue = style?.spacing?.margin?.top;

	const marginValue = spaceValue === 'custom' ? customValue : spaceValue;

	const styleProps = {
		"--wf-stack--space": marginValue
	}

	const splitAfterValue = splitAfter;
	const newClassNames = splitAfterValue ? `split-${splitAfterValue} ${isRecursive}` : isRecursive;

	const splitClassStyle = setClassName( splitAfterValue );

	return (
		<>
			{ splitAfterValue &&
				<style>{ splitClassStyle }</style>
			}
			<Tag
				{...useInnerBlocksProps.save(
					useBlockProps.save({ className: newClassNames, style: styleProps })
				)}
			/>
		</>
	);
}
