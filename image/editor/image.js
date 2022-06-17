/**
 * External dependencies
 */
import { get, filter, map, pick, includes } from 'lodash';

/**
 * WordPress dependencies
 */
import { isBlobURL } from '@wordpress/blob';
import {
    ExternalLink,
    PanelBody,
    ResizableBox,
    Spinner,
    TextareaControl,
    TextControl,
    ToolbarButton,
} from '@wordpress/components';
import { useViewportMatch, usePrevious } from '@wordpress/compose';
import { useSelect, useDispatch } from '@wordpress/data';
import {
    BlockControls,
    InspectorControls,
    RichText,
    __experimentalImageSizeControl as ImageSizeControl,
    __experimentalImageURLInputUI as ImageURLInputUI,
    MediaReplaceFlow,
    store as blockEditorStore,
    BlockAlignmentControl,
    __experimentalImageEditor as ImageEditor,
    __experimentalImageEditingProvider as ImageEditingProvider,
} from '@wordpress/block-editor';
import { useEffect, useMemo, useState, useRef } from '@wordpress/element';
import { __, sprintf, isRTL } from '@wordpress/i18n';
import { getFilename } from '@wordpress/url';
import { createBlock, switchToBlockType } from '@wordpress/blocks';
import { crop, overlayText, upload } from '@wordpress/icons';
import { store as noticesStore } from '@wordpress/notices';
import { store as coreStore } from '@wordpress/core-data';

/**
 * Internal dependencies
 */
import { createUpgradedEmbedBlock } from '../embed/util';
import useClientWidth from './use-client-width';
import { isExternalImage, isMediaDestroyed } from './edit';

/**
 * Module constants
 */
import { MIN_SIZE, ALLOWED_MEDIA_TYPES } from './constants';

export default function Image( {
                                   temporaryURL,
                                   attributes: {
                                       mediaURL = '',
                                       mediaAlt,
                                       mediaCaption,
                                       mediaID,
                                       url, // was href
                                       rel,
                                       linkClass,
                                       linkDestination,
                                       title,
                                       linkTarget,
                                       sizeSlug,
                                   },
                                   setAttributes,
                                   isSelected,
                                   insertBlocksAfter,
                                   onReplace,
                                   onCloseModal,
                                   onSelectImage,
                                   onSelectURL,
                                   onUploadError,
                                   containerRef,
                                   context,
                                   clientId,
                                   onImageLoadError,
                               } ) {
    const imageRef = useRef();
    const captionRef = useRef();
    const prevUrl = usePrevious( url );
    const { allowResize = true } = context;
    const { getBlock } = useSelect( blockEditorStore );

    const { image, multiImageSelection } = useSelect(
        ( select ) => {
            const { getMedia } = select( coreStore );
            const { getMultiSelectedBlockClientIds, getBlockName } = select(
                blockEditorStore
            );
            const multiSelectedClientIds = getMultiSelectedBlockClientIds();
            return {
                image: mediaID && isSelected ? getMedia( mediaID ) : null,
                multiImageSelection:
                    multiSelectedClientIds.length &&
                    multiSelectedClientIds.every(
                        ( _clientId ) =>
                            getBlockName( _clientId ) === 'wazframe/image'
                    ),
            };
        },
        [ mediaID, isSelected ]
    );
    const {
        canInsertCover,
        imageEditing,
        imageSizes,
        maxWidth,
        mediaUpload,
    } = useSelect(
        ( select ) => {
            const {
                getBlockRootClientId,
                getSettings,
                canInsertBlockType,
            } = select( blockEditorStore );

            const rootClientId = getBlockRootClientId( clientId );
            const settings = pick( getSettings(), [
                'imageEditing',
                'imageSizes',
                'maxWidth',
                'mediaUpload',
            ] );

            return {
                ...settings,
                canInsertCover: canInsertBlockType(
                    'core/cover',
                    rootClientId
                ),
            };
        },
        [ clientId ]
    );
    const { replaceBlocks, toggleSelection } = useDispatch( blockEditorStore );
    const { createErrorNotice, createSuccessNotice } = useDispatch(
        noticesStore
    );
    const isLargeViewport = useViewportMatch( 'medium' );
    const [
        { loadedNaturalWidth, loadedNaturalHeight },
        setLoadedNaturalSize,
    ] = useState( {} );
    const [ isEditingImage, setIsEditingImage ] = useState( false );
    const [ externalBlob, setExternalBlob ] = useState();
    //const clientWidth = useClientWidth( containerRef, [ align ] );
    const isResizable = allowResize && ! ( isLargeViewport );
    const imageSizeOptions = map(
        filter( imageSizes, ( { slug } ) =>
            get( image, [ 'media_details', 'sizes', slug, 'source_url' ] )
        ),
        ( { name, slug } ) => ( { value: slug, label: name } )
    );

    // If an image is externally hosted, try to fetch the image data. This may
    // fail if the image host doesn't allow CORS with the domain. If it works,
    // we can enable a button in the toolbar to upload the image.
    useEffect( () => {
        if ( ! isExternalImage( mediaID, mediaURL ) || ! isSelected || externalBlob ) {
            return;
        }

        window
            .fetch( mediaURL )
            .then( ( response ) => response.blob() )
            .then( ( blob ) => setExternalBlob( blob ) )
            // Do nothing, cannot upload.
            .catch( () => {} );
    }, [ mediaID, mediaURL, isSelected, externalBlob ] );

    // Focus the caption after inserting an image from the placeholder. This is
    // done to preserve the behaviour of focussing the first tabbable element
    // when a block is mounted. Previously, the image block would remount when
    // the placeholder is removed. Maybe this behaviour could be removed.
    useEffect( () => {
        if ( mediaURL && ! prevUrl && isSelected ) {
            captionRef.current.focus();
        }
    }, [ mediaURL, prevUrl ] );

    // Get naturalWidth and naturalHeight from image ref, and fall back to loaded natural
    // width and height. This resolves an issue in Safari where the loaded natural
    // witdth and height is otherwise lost when switching between alignments.
    // See: https://github.com/WordPress/gutenberg/pull/37210.
    const { naturalWidth, naturalHeight } = useMemo( () => {
        return {
            naturalWidth:
                imageRef.current?.naturalWidth ||
                loadedNaturalWidth ||
                undefined,
            naturalHeight:
                imageRef.current?.naturalHeight ||
                loadedNaturalHeight ||
                undefined,
        };
    }, [
        loadedNaturalWidth,
        loadedNaturalHeight,
        imageRef.current?.complete,
    ] );

    function onSetHref( props ) {
        setAttributes( props );
    }

    function onSetTitle( value ) {
        // This is the HTML title attribute, separate from the media object
        // title.
        setAttributes( { title: value } );
    }

    function updateAlt( newAlt ) {
        setAttributes( { mediaAlt: newAlt } );
    }

    function updateImage( newSizeSlug ) {
        const newUrl = get( image, [
            'media_details',
            'sizes',
            newSizeSlug,
            'source_url',
        ] );
        if ( ! newUrl ) {
            return null;
        }

        setAttributes( {
            mediaURL: newUrl,
            sizeSlug: newSizeSlug,
        } );
    }

    function uploadExternal() {
        mediaUpload( {
            filesList: [ externalBlob ],
            onFileChange( [ img ] ) {
                onSelectImage( img );

                if ( isBlobURL( img.mediaURL ) ) {
                    return;
                }

                setExternalBlob();
                createSuccessNotice( __( 'Image uploaded.' ), {
                    type: 'snackbar',
                } );
            },
            allowedTypes: ALLOWED_MEDIA_TYPES,
            onError( message ) {
                createErrorNotice( message, { type: 'snackbar' } );
            },
        } );
    }

    useEffect( () => {
        if ( ! isSelected ) {
            setIsEditingImage( false );
        }
        if ( isSelected && isMediaDestroyed( mediaID ) ) {
            onImageLoadError();
        }
    }, [ isSelected ] );

    const canEditImage = mediaID && naturalWidth && naturalHeight && imageEditing;
    const allowCrop = ! multiImageSelection && canEditImage && ! isEditingImage;

    function switchToCover() {
        replaceBlocks(
            clientId,
            switchToBlockType( getBlock( clientId ), 'core/cover' )
        );
    }

    const controls = (
        <>
            <BlockControls group="block">
                { ! multiImageSelection && ! isEditingImage && (
                    <ImageURLInputUI
                        url={ url || '' }
                        onChangeUrl={ onSetHref }
                        linkDestination={ linkDestination }
                        mediaUrl={ ( image && image.source_url ) || mediaURL }
                        mediaLink={ image && image.link }
                        linkTarget={ linkTarget }
                        linkClass={ linkClass }
                        rel={ rel }
                    />
                ) }
                { allowCrop && (
                    <ToolbarButton
                        onClick={ () => setIsEditingImage( true ) }
                        icon={ crop }
                        label={ __( 'Crop' ) }
                    />
                ) }
                { externalBlob && (
                    <ToolbarButton
                        onClick={ uploadExternal }
                        icon={ upload }
                        label={ __( 'Upload external image' ) }
                    />
                ) }
            </BlockControls>
            { ! multiImageSelection && ! isEditingImage && (
                <BlockControls group="other">
                    <MediaReplaceFlow
                        mediaId={ mediaID }
                        mediaURL={ mediaURL }
                        allowedTypes={ ALLOWED_MEDIA_TYPES }
                        accept="image/*"
                        onSelect={ onSelectImage }
                        onSelectURL={ onSelectURL }
                        onError={ onUploadError }
                        onCloseModal={ onCloseModal }
                    />
                </BlockControls>
            ) }
            <InspectorControls>
                <PanelBody title={ __( 'Image settings' ) }>
                    { ! multiImageSelection && (
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
                    ) }
                    <ImageSizeControl
                        onChangeImage={ updateImage }
                        onChange={ ( value ) => setAttributes( value ) }
                        slug={ sizeSlug }
                        imageSizeOptions={ imageSizeOptions }
                        isResizable={ isResizable }
                        imageWidth={ naturalWidth }
                        imageHeight={ naturalHeight }
                    />
                </PanelBody>
            </InspectorControls>
            <InspectorControls __experimentalGroup="advanced">
                <TextControl
                    label={ __( 'Title attribute' ) }
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
            </InspectorControls>
        </>
    );

    const filename = getFilename( url );
    let defaultedAlt;

    if ( mediaAlt ) {
        defaultedAlt = mediaAlt;
    } else if ( filename ) {
        defaultedAlt = sprintf(
            /* translators: %s: file name */
            __( 'This image has an empty alt attribute; its file name is %s' ),
            filename
        );
    } else {
        defaultedAlt = __( 'This image has an empty alt attribute' );
    }

    let img = (
        // Disable reason: Image itself is not meant to be interactive, but
        // should direct focus to block.
        /* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */
        <>
            <img
                src={ temporaryURL || mediaURL }
                alt={ defaultedAlt }
                onLoad={ ( event ) => {
                    setLoadedNaturalSize( {
                        loadedNaturalWidth: event.target?.naturalWidth,
                        loadedNaturalHeight: event.target?.naturalHeight,
                    } );
                } }
                ref={ imageRef }
            />
            { temporaryURL && <Spinner /> }
        </>
        /* eslint-enable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */
    );
    }

    return (
        <ImageEditingProvider
            id={ mediaID }
            url={ mediaURL }
            onSaveImage={ ( imageAttributes ) =>
                setAttributes( imageAttributes )
            }
        >
            { /* Hide controls during upload to avoid component remount,
				which causes duplicated image upload. */ }
            { ! temporaryURL && controls }
            { img }
            { ( ! RichText.isEmpty( mediaCaption ) || isSelected ) && (
                <RichText
                    ref={ captionRef }
                    tagName="figcaption"
                    aria-label={ __( 'Image caption text' ) }
                    placeholder={ __( 'Add caption' ) }
                    value={ mediaCaption }
                    onChange={ ( value ) =>
                        setAttributes( { mediaCaption: value } )
                    }
                    inlineToolbar
                    __unstableOnSplitAtEnd={ () =>
                        insertBlocksAfter( createBlock( 'core/paragraph' ) )
                    }
                />
            ) }
        </ImageEditingProvider>
    );