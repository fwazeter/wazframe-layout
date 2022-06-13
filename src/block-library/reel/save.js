/**
 * WordPress dependencies
 */
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save({ attributes: { tagName: Tag, noBar, style } }) {
	const toggleScrollbar = noBar ? 'no-scrollbar' : '';

	const styleProps = {
		"--wf-reel--space": style?.spacing?.blockGap,
		"--wf--height": style?.size?.height,
		"--wf--content-width": style?.size?.width,
	}

	return (
		<Tag
			{...useInnerBlocksProps.save(
				useBlockProps.save({ className: toggleScrollbar, style: styleProps })
			)}
		/>
	);
}
