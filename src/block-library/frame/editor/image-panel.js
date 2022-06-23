/**
 * WordPress dependencies
 */
import {__} from "@wordpress/i18n";
import {
    ExternalLink,
    TextareaControl,
    TextControl,
    PanelBody,
} from "@wordpress/components";

import {
    InspectorControls,
    InspectorAdvancedControls,
} from "@wordpress/block-editor";

/**
 * Internal dependencies
 */
import namespace from '../../utils/namespace';
import RatioPanel from "./ratio-panel";

function ImagePanel( props ) {
    const {
        attributes: { mediaAlt, title },
        setAttributes,
    } = props

    function updateAlt( newAlt ) {
        setAttributes( { mediaAlt: newAlt } );
    }

    function onSetTitle( value ) {
        setAttributes( { title: value } );
    }

    return(
        <>
            <InspectorControls>
                <RatioPanel { ...props } />
                <PanelBody title={ __('Image Settings', namespace) }>
                    <TextareaControl
                        label={ __( 'Alt text (alternative text)' ) }
                        value={ mediaAlt }
                        onChange={ updateAlt }
                        help={
                            <>
                                <ExternalLink href="https://www.w3.org/WAI/tutorials/images/decision-tree">
                                    { __(
                                        'Describe the purpose of the image'
                                    ) }
                                </ExternalLink>
                                { __(
                                    'Leave empty if the image is purely decorative.'
                                ) }
                            </>
                        }
                    />
                </PanelBody>
            </InspectorControls>
            <InspectorAdvancedControls>
                <TextControl
                    label={ __( 'Title attribute', namespace ) }
                    value={ title || '' }
                    onChange={ onSetTitle }
                    help={
                        <>
                            { __(
                                'Describe the role of this image on the page.'
                            ) }
                            <ExternalLink href="https://www.w3.org/TR/html52/dom.html#the-title-attribute">
                                { __(
                                    '(Note: many devices and browsers do not display this text.)'
                                ) }
                            </ExternalLink>
                        </>
                    }
                />
            </InspectorAdvancedControls>
        </>
    );
}

export default ImagePanel;