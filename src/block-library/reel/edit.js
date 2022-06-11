/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore,
} from '@wordpress/block-editor';

import {
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
	__experimentalUnitControl as UnitControl,
	ToggleControl,
	SelectControl,
	__experimentalUseCustomUnits as useCustomUnits,
} from '@wordpress/components';

import { useState } from '@wordpress/element';

import { useSelect } from '@wordpress/data';

import SizePanel from './dimensions';

const htmlElementMessages = {
	header: __(
		'The <header> element represents introductory content, typically a group of introductory or navigational aids. '
	),
	section: __(
		"The <section> element represents a standalone portion of the document that can't be better represented by another element"
	),
	aside: __(
		"The <aside> element represents a portion of a document whose content is only indirectly related to the document's main content"
	),
	div: __(
		'The <div> element is the default non-semantic HTML element wrapper tag'
	),
	footer: __(
		'The <footer> element represents a footer for its nearest sectioning element (e.g.: <section>, <article>, <main> etc.).'
	),
};

function Edit(props) {
	const { attributes, setAttributes, clientId } = props;
	const { tagName: TagName = 'section', templateLock, noBar, style } = attributes;

	const styleProps = {
		"--space": style?.spacing?.margin?.left,
		"--item-width": style?.width,
		"--height": style?.height
	}

	const toggleScrollbar = noBar ? 'no-scrollbar' : '';

	/* adding another className here duplicates default className */
	const blockProps = useBlockProps({ className: toggleScrollbar });

	const { hasInnerBlocks } = useSelect(
		(select) => {
			const { getBlock } = select(blockEditorStore);
			const block = getBlock(clientId);
			return {
				hasInnerBlocks: !!(block && block.innerBlocks.length),
			};
		},
		[clientId]
	);

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		templateLock,
		renderAppender: hasInnerBlocks
			? undefined
			: InnerBlocks.ButtonBlockAppender,
	});

	const [tag, setTag] = useState();
	const [scrollbar, setScrollbar] = useState();

	const resetAllHTML = () => {
		setTag('section');
		setScrollbar(!noBar);
	};

	return (
		<>
			<InspectorControls>
				<SizePanel { ...props } />
				<ToolsPanel label={__('HTML Options')} resetAll={resetAllHTML}>
					<ToolsPanelItem
						hasValue={() => !!tag}
						label={__('HTML Element')}
						onDeselect={() => setTag}
						isShownByDefault={true}
					>
						<SelectControl
							label={__('HTML Element')}
							options={[
								{
									label: __('Default (<section>)'),
									value: 'section',
								},
								{ label: __('<header>'), value: 'header' },
								{ label: __('<aside>'), value: 'aside' },
								{ label: __('<footer>'), value: 'footer' },
								{ label: __('<div>'), value: 'div' },
							]}
							help={htmlElementMessages[TagName]}
							value={TagName}
							onChange={(value) =>
								setAttributes({ tagName: value })
							}
						/>
					</ToolsPanelItem>
					<ToolsPanelItem
						hasValue={() => !!scrollbar}
						label="Show Scrollbar"
						onDeselect={() => setScrollbar}
						isShownByDefault={true}
					>
						<ToggleControl
							label="Hide Scrollbar"
							help={
								noBar
									? 'Scrollbar is hidden'
									: 'Scrollbar is showing'
							}
							checked={noBar}
							onChange={() => setAttributes({ noBar: !noBar })}
						/>
					</ToolsPanelItem>
				</ToolsPanel>
			</InspectorControls>
			<TagName {...innerBlocksProps} style={ { ...styleProps } }/>
		</>
	);
}

export default Edit;
