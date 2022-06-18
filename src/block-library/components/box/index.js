/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { options } from './constants';

/**
 * The simple, versatile and powerful box.
 */
export function Box( props ) {
   const {
       padding,
       border,
       color,
       background,
       tagName,
       className,
       children,
       ...additionalProps
    } = props

    const defaultClass = className ? className : 'wf-box'

    const styleNames = ( options, padding ) => {
       options.map( ( { name } ) => {
           return (
               { [`wf--scale-${name}`]: padding === name }
           );
       } )
    }

   const classes = classnames(
       defaultClass,
       { styleNames }
   );

   const Tag = tagName ? tagName : 'div'

    return(
        <Tag
            className={ classes }
            aria-label={ additionalProps[ 'aria-label' ] }
        >
            { children }
        </Tag>
    );
}