/**
 * Internal Dependencies
 */

function Edit(props) {
	const { attributes, setAttributes, clientId } = props;
	const {
		side, // string / default left / which element to treat as sidebar (everything except "left" is considered right)
		width, // widht of the sidebar when adjacent if not set (null) it defaults to content width.
		contentWidth, // A CSS Percentage value the minimum width of the content element in horizontal config.
		space, // CSS gap value for marginb etween two elements.
		noStretch, // boolean, default false. Make adjacent elements adopt natural height.
	} = attributes;
}
