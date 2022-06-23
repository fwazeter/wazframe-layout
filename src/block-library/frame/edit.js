/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    MediaPlaceholder,
    MediaReplaceFlow,
    BlockIcon,
    BlockControls,
    useBlockProps,
} from '@wordpress/block-editor';
import { image as icon } from '@wordpress/icons';
import {
    ToolbarGroup,
    PanelBody,
    PanelRow,
} from "@wordpress/components";
import { useCallback, useState, useRef } from "@wordpress/element";

/**
 * Internal dependencies
 */
import namespace from '../utils/namespace';
import ImagePanel from './editor/image-panel';
import URLPicker from "../utils/url-picker";
import {
    getPresetClass
} from "../editor-components";

const NEW_TAB_REL = 'noreferrer noopener';

export default function Edit( props ) {
    const {
        attributes: {
            aspectRatio,
            portraitRatio,
            mediaID,
            mediaURL,
            mediaAlt,
            mediaLink,
            title,
            url,
            rel,
            linkTarget,
            linkClass,
        },
        setAttributes,
        isSelected,
    } = props;

    const ratioValue = aspectRatio;
    const portraitValue = portraitRatio;

    const styleProps = {}

    if ( ratioValue !== '16 / 9' ) {
        Object.assign( styleProps, { '--wf--ratio': ratioValue } );
    }

    if ( portraitValue !== '16 / 9' ) {
        Object.assign( styleProps, { '--wf--portrait-ratio': portraitValue } );
    }

    const onSelectImage = media => {
        setAttributes({
            mediaURL: media.url,
            mediaID: media.id,
            mediaAlt: media.alt,
            mediaLink: media.link,
            mediaCaption: media.caption,
            mediaSizes: media.sizes,
        });
    };

    function onSelectURL( newURL ) {
        if ( newURL !== mediaURL ) {
            setAttributes( {
                mediaURL: newURL,
                id: undefined
            } );
        }
    }

    const onSetLinkRel = useCallback(
        ( value ) => {
            setAttributes( { rel: value } );
        },
        [ setAttributes ]
    );

    const onToggleOpenInNewTab = useCallback(
        ( value ) => {
            const newLinkTarget = value ? '_blank' : undefined;

            let updatedRel = rel;
            if ( newLinkTarget && ! rel ) {
                updatedRel = NEW_TAB_REL;
            } else if ( ! newLinkTarget && rel === NEW_TAB_REL ) {
                updatedRel = undefined;
            }

            setAttributes( {
                linkTarget: newLinkTarget,
                rel: updatedRel,
            } );
        },
        [ rel, setAttributes ]
    );

    const ref = useRef();

    const blockProps = useBlockProps( { ref } );

    const hasImage = mediaID || mediaURL;

    return (
      <>
          { hasImage && (
              <ImagePanel { ...props } />
          )}
          { hasImage && (
              <BlockControls>
                  <URLPicker
                      url={ url }
                      setAttributes={ setAttributes }
                      isSelected={ isSelected }
                      opensInNewTab={ linkTarget === '_blank' }
                      onToggleOpenInNewTab={ onToggleOpenInNewTab }
                      anchorRef={ ref }
                  />
                  <ToolbarGroup>
                      <MediaReplaceFlow
                          mediaURL={ mediaURL }
                          mediaId={ mediaID }
                          allowedTypes={ [ 'image' ] }
                          accept="image/*"
                          onSelect={ onSelectImage }
                          onSelectURL={ onSelectURL }
                      />
                  </ToolbarGroup>
              </BlockControls>
          )}
          <figure { ...blockProps } style={ { ...styleProps } }>
              { ! hasImage && (
                  <MediaPlaceholder
                      onSelect={ onSelectImage }
                      allowedTypes={ ['image' ] }
                      icon={ <BlockIcon icon={ icon } /> }
                      labels={ {
                          title: __('Framed Image', namespace),
                          instructions: __( 'Insert an image that follows aspect ratio', namespace)
                      } }
                      value={ { mediaID, mediaURL } }
                      onSelectURL={ onSelectURL }
                  />
              )}
              { hasImage && (
                  <img src={ mediaURL } alt={ mediaAlt } title={ title }/>
              )}
          </figure>
      </>
    );
}