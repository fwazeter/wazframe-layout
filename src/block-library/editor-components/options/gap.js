/**
 * Wordpress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    Flex,
    Button,
    __experimentalUnitControl as UnitControl
} from "@wordpress/components";

/**
 * Internal dependencies
 */
import namespace from '../../utils/namespace';
import { spaceUnits } from "../../utils";

/**
 * Custom setting for default options provided
 * to blocks.
 */
/**
 *
 * @param {Object} props            Block Props
 */
export function CustomBlockGap( props ) {
    const {
        attributes: { blockGap },
        setAttributes
    } = props

    return (
        <>
            <Flex direction="column">
                <Flex justify="space-between" align="baseline">
                    <p className="component-box-control__label">
                        <strong>{ __( "Set Custom Block Gap", namespace ) }</strong>
                    </p>
                    <Button
                        className="component-box-control__reset-button"
                        isSecondary
                        isSmall
                        onClick={ () => setAttributes( { blockGap: undefined} ) }
                    >
                        { __('Reset', namespace) }
                    </Button>
                </Flex>
                <UnitControl
                    value={ blockGap }
                    onChange={ ( value ) => setAttributes({ blockGap: value}) }
                    units={ spaceUnits }
                    __unstableInputWidth="50%"
                />
            </Flex>
        </>
    );
}