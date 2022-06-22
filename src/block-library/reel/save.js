/**
 * External dependencies
 */
import classnames from "classnames";

/**
 * WordPress dependencies
 */
import {
	useInnerBlocksProps,
	useBlockProps
} from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import {
	blockGapOptions,
	getInlineStyle,
	getPresetClass
} from "../../block-editor";

import {
	heightOptions,
	itemWidthOptions
} from "./constants";


export default function save( { attributes, className } ) {
	const {
		itemWidth,
		height,
		blockGap,
		noBar,
		tagName: Tag
	} = attributes

	const heightClassNames = getPresetClass( heightOptions, height );
	const heightInlineStyle = getInlineStyle( heightOptions, height );

	const itemWidthClassNames = getPresetClass( itemWidthOptions, itemWidth );
	const itemWidthInlineStyle = getInlineStyle( itemWidthOptions, itemWidth );

	// NOTE: we aren't actually using gap prop in CSS, but the style is accomplishing the same
	const blockGapClassNames = getPresetClass( blockGapOptions, blockGap );
	const blockGapInlineStyle = getInlineStyle( blockGapOptions, blockGap );

	const toggleScrollbar = noBar ? 'no-scrollbar' : '';

	const styleProps = {
		"--wf--height": heightInlineStyle,
		"--wf--content-width": itemWidthInlineStyle,
		"--wf-reel--space": blockGapInlineStyle,
	}

	const optionalClassNames = classnames(
		className,
		toggleScrollbar,
		blockGapClassNames,
		itemWidthClassNames,
		heightClassNames
	)

	return (
		<Tag
			{...useInnerBlocksProps.save(
				useBlockProps.save({
					className: optionalClassNames,
					style: styleProps
				})
			)}
		/>
	);
}
