import React, { Component } from 'react';
import TransitionLink, { TransitionPortal } from 'gatsby-plugin-transition-link';
import { TimelineMax, Power1} from 'gsap';

export default class CoverTransitionLink extends Component {
	constructor(props) {
		super(props);

		this.horizontal		= this.horizontal.bind(this);
		this.vertical		= this.vertical.bind(this);
		this.cover			= React.createRef();
		this.transparentBg	= React.createRef();
	}

	horizontal = ({ node, props: { length: seconds }, direction, transparentBg }) => {
		const directionTo	= direction === 'left' ? '-100%' : '100%';
		const directionFrom	= direction === 'left' ? '100%' : '-100%';

		return new TimelineMax()
			.set(transparentBg,{ y: 0, x: directionFrom, display: 'block' })
			.to(transparentBg, .25, {
				x:		'0%',
				ease:	Power1.easeInOut,
			})
			.set(this.cover, { y: 0, x: directionFrom, display: 'block' }, .25)
			.to(this.cover, .25, {
				x:		'0%',
				ease:	Power1.easeInOut,
			})
			.set(node, { opacity: 0 }, .5)
			.to(this.cover, .5, {
					x:		directionTo,
					ease:	Power1.easeInOut,
				}
			)
	}

	vertical = ({ node, props: { length: seconds }, direction, transparentBg }) => {
		const directionTo	= direction === 'up' ? '-100%' : '100%';
		const directionFrom	= direction === 'up' ? '100%' : '-100%';

		return new TimelineMax()
			.set(transparentBg, {y: directionFrom})
			.to(transparentBg, .25, {
				y:		'0%',
				ease:	Power1.easeInOut,
			})
			.set(this.cover,{y: directionFrom}, .25)
			.to(this.cover, .25, {
				y:		'0%',
				ease:	Power1.easeInOut
			})
			.set(node, {opacity: 0}, .5)
			.to(this.cover, .5, {
				y:		directionTo,
				ease:	Power1.easeIn
			})
	}

	moveInDirection = ({ props, direction, node, transparentBg }) => {
		if (direction === 'left' || direction === 'right')
			return this.horizontal({ props, direction, node, transparentBg });

		return this.vertical({ props, direction, node, transparentBg });
	}

	render() {
		const direction		= this.props.direction || 'left';
		const length		= this.props.duration || 1;
		const transparentBg	= this.transparentBg
		const {
			exit:	removedExit,
			entry:	removedEntry,
			cover:	removedProp,
			...props
		} = this.props;
		return (
			<>
				<TransitionLink
					exit={{
						length: length,
						trigger: ({ exit, node }) =>
							this.moveInDirection({
								props: exit,
								node,
								direction,
								transparentBg
							}),
					}}
					entry={{
						delay: length / 2,
					}}
					{...props}>
					{this.props.children}
				</TransitionLink>

				<TransitionPortal>
					<div
						className="transparentBg"
						ref={n => (this.transparentBg = n)}
						style={{
							position:	'fixed',
							background:	'#19a87c',
							top:		0,
							left:		0,
							opacity:	.4,
							width:		'100vw',
							height:		'100vh',
							transform:	'translateY(100%)',
					}}/>
					<div
						ref={n => (this.cover = n)}
						style={{
							position:	'fixed',
							background:	this.props.bg || '#19a87c',
							top:		0,
							left:		0,
							width:		'100vw',
							height:		'100vh',
							transform:	'translateY(100%)',
					}}/>
				</TransitionPortal>
			</>
		)
	}
}
