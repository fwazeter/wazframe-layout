/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import {setClassName} from "./setClassName";
import {getInlineStyle, getPresetClass} from "../editor-components";
import {options} from "./constants";


export default function save( { attributes, className }
) {
	const {
		tagName: Tag,
		margin,
		recursive,
		splitAfter
	} = attributes

	const newClassNames = getPresetClass( options, margin )

	const inlineStyle = getInlineStyle( options, margin )

	const isRecursive = recursive ? 'recursive' : '';

	const styleProps = {
		"--wf-stack--space": inlineStyle
	}

	const splitAfterValue = splitAfter;
	const splitClassNames = splitAfterValue ? `split-${splitAfterValue} ${isRecursive}` : isRecursive;

	const stackClasses = classnames(
		className,
		newClassNames,
		splitClassNames
	)

	const splitClassStyle = setClassName( splitAfterValue );

	return (
		<>
			{ splitAfterValue &&
				<style>{ splitClassStyle }</style>
			}
			<Tag
				{...useInnerBlocksProps.save(
					useBlockProps.save({ className: stackClasses })
				)} style={ { ...styleProps } }
			/>
		</>
	);
}
