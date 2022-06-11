/**
 * Handles the dimension panel for reels block.
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	__experimentalToolsPanelItem as ToolsPanelItem,
	__experimentalToolsPanel as ToolsPanel
} from '@wordpress/components';

import {
	store as blockEditorStore,
} from '@wordpress/block-editor';
import {useCallback} from "@wordpress/element";
import { useDispatch, useSelect } from '@wordpress/data';


/**
 * Internal Dependencies
 */
import {
	HeightEdit,
	hasHeightValue,
	resetHeight,
} from "./height";

import {
	WidthEdit,
	hasWidthValue,
	resetWidth,
} from "./width";

import {cleanEmptyObject} from "./utils";



function SizePanel( props ) {

	const { updateBlockAttributes } = useDispatch( blockEditorStore );
	const {
		getBlockAttributes,
		getSelectedBlockClientId
	} = useSelect( blockEditorStore );

	const panelId = getSelectedBlockClientId();

	/**
	 * Uses the block editor data store to get the clientId's for
	 * each panel, associated with the block and panel area, then
	 * allows for the createResetAllFilters function on individual blocks to work.
	 *
	 * This is slightly complicated, but could be basis for extending
	 * global styles.
	 * @url https://github.com/WordPress/gutenberg/blob/8675f86f885ca389f3bca39971b22cb897bab61b/packages/block-editor/src/components/inspector-controls/block-support-tools-panel.js
	 * @url https://github.com/WordPress/gutenberg/blob/6215bbcba156793eeaec2c77f8ae6b78876670eb/packages/block-editor/src/hooks/dimensions.js
	 * @type {(function(*=): void)|*}
	 */
	const resetAll = useCallback(
		( resetFilters = [] ) => {
			const newAttributes = {};

			const clientIds = [ panelId ];

			clientIds.forEach( ( clientId ) => {
				const { style } = getBlockAttributes( clientId );
				let newBlockAttributes = { style };

				resetFilters.forEach( ( resetFilter ) => {
					newBlockAttributes = {
						...newBlockAttributes,
						...resetFilter( newBlockAttributes ),
					};
				} );

				newBlockAttributes = {
					...newBlockAttributes,
					style: cleanEmptyObject( newBlockAttributes.style ),
				};

				newAttributes[ clientId ] = newBlockAttributes;
			} )

			updateBlockAttributes( clientIds, newAttributes, true );
		},
		[
			cleanEmptyObject,
			getBlockAttributes,
			panelId,
			updateBlockAttributes,
		]
	);

	const createResetAllFilter = ( attribute ) => ( newAttributes ) => ( {
		...newAttributes,
		style: {
			...newAttributes.style,
			[ attribute ]: undefined,
		}
	} );

	return (
		<>
				<ToolsPanel
					label={ __( 'Sizes' ) }
					resetAll={ resetAll }
					className={ 'wp-block-wazframe-reel-dimensions-panel' }
					panelId={ props.clientId }
				>
					<p className={ 'double-column' }>
						Height controls overall reel height, default auto.
						Width controls individual item widths (children), default auto.
						Block Spacing controls block gap.
					</p>
				<ToolsPanelItem
					hasValue={ () => hasHeightValue( props ) }
					label={ __( 'Height' ) }
					onDeselect={ () => resetHeight( props ) }
					resetAllFilter={ createResetAllFilter( 'height' ) }
					isShownByDefault={ true }
					panelId={ props.clientId }
					className="single-column"
				>
					<HeightEdit { ...props } />
				</ToolsPanelItem>
				<ToolsPanelItem
					hasValue={ () => hasWidthValue( props ) }
					label={ __( 'Width' ) }
					onDeselect={ () => resetWidth( props ) }
					resetAllFilter={ createResetAllFilter( 'width' ) }
					isShownByDefault={ true }
					panelId={ props.clientId }
					className="single-column"
				>
					<WidthEdit { ...props } />
				</ToolsPanelItem>
				</ToolsPanel>
		</>
	)
}

export default SizePanel;
