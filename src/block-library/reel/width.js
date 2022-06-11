/**
 * Handles the width component for wazframe dimensions panel.
 */

/**
 * WordPress dependencies
 */
import { __, _x } from '@wordpress/i18n';
import {
	__experimentalUnitControl as UnitControl,
} from '@wordpress/components';
import {cleanEmptyObject} from "./utils";


/**
 * Checks if there is a current value in the height block support attributes.
 * ToolsPanelItem requires a bool check for an existing value.
 *
 * @param {Object} props Block props.
 * @return {boolean}	Whether or not the block has a value set.
 */
export function hasWidthValue( props ) {
	return props.attributes.style?.width !== undefined;
}

/**
 * Resets the height attribute.
 *
 * @param {Object} props		Block props.
 * @param {Object} props.attributes	Block's attributes.
 * @param {Object} props.setAttributes Function to set block's attribute.
 */
export function resetWidth( { attributes = {}, setAttributes } ) {
	const { style }	= attributes;

	setAttributes( {
		style: cleanEmptyObject( {
			...style,
			width: undefined,
		} ),
	} );
}

/**
 * Inspector control panel containing the height related configuration.
 *
 * @param {Object} props
 * @returns {WPElement} Height edit element.
 */

export function WidthEdit( props ) {
	const {
		attributes: { style },
		setAttributes,
	} = props

	const units = [
		{ value: 'rem', label: 'REM', step: 0.001, a11yLabel: _x( 'rems', 'Relative to root font size (rem)' ),},
		{ value: 'em', label: 'EM', step: 0.001, a11yLabel: _x( 'ems', 'Relative to parent font size (em)' ), },
		{ value: 'vw', label: 'VW', step: 0.1, a11yLabel: __( 'Viewport width (vw)' ), },
		{ value: '%', label: '%', step: 0.1, a11yLabel: __( 'Percent (%)' ), },
		{ value: 'px', label: 'PX', step: 1, a11yLabel: __( 'Pixels (px)' ), },
	]

	const onChange = ( modifyValue ) => {



		const newValue = {
			...style,
			width: modifyValue,
		};

		setAttributes( {
			style: cleanEmptyObject( newValue ),
		} );
	};

	return (
		<>
			<UnitControl
				label={ __( 'Width' ) }
				value={ style?.width }
				units={ units }
				onChange={ onChange }
			/>
		</>
	);
}
