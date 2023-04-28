export interface IIcon {
	className?: string;
	width?: number;
	height?: number;
	stroke?: string;
	fill?: string;
	strokeWidth?: number;
	onClick?: () => void;
}
export const LinkedinLogo = ({ className, width, height, onClick }: IIcon) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={width || '30'}
		height={height || '30'}
		className={className}
		onClick={onClick}
		fill="none"
		viewBox="0 0 32 32"
	>
		<rect
			width="28"
			height="28"
			x="2"
			y="2"
			fill="#1275B1"
			rx="14"
		></rect>
		<path
			fill="#fff"
			d="M12.619 9.692c0 .935-.81 1.692-1.81 1.692C9.81 11.384 9 10.627 9 9.692 9 8.758 9.81 8 10.81 8c.998 0 1.809.758 1.809 1.692zM9.247 12.628h3.093V22H9.247v-9.372zM17.32 12.628h-3.093V22h3.093v-4.795c0-1.107.378-2.22 1.886-2.22 1.705 0 1.695 1.45 1.687 2.572-.01 1.467.014 2.965.014 4.443H24v-4.946c-.026-3.159-.85-4.614-3.557-4.614-1.608 0-2.604.73-3.123 1.39v-1.202z"
		></path>
	</svg>
);

export const GithubLogo = ({ className, width, height, onClick }: IIcon) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={width || '30'}
		height={height || '30'}
		className={className}
		fill="none"
		viewBox="0 0 32 32"
		onClick={onClick}
	>
		<path
			fill="#000"
			fillRule="evenodd"
			d="M16 0C7.163 0 0 7.174 0 16.027c0 7.08 4.584 13.088 10.942 15.207.8.147 1.092-.348 1.092-.773 0-.38-.013-1.389-.021-2.725-4.451.968-5.39-2.149-5.39-2.149-.727-1.853-1.777-2.345-1.777-2.345-1.452-.992.11-.973.11-.973 1.606.112 2.45 1.651 2.45 1.651 1.428 2.448 3.746 1.74 4.656 1.331.148-1.035.56-1.74 1.018-2.14-3.552-.405-7.288-1.781-7.288-7.922 0-1.749.624-3.181 1.646-4.301-.164-.405-.713-2.035.157-4.24 0 0 1.344-.432 4.4 1.642A15.302 15.302 0 0116 7.75c1.36.007 2.728.184 4.006.54 3.055-2.074 4.396-1.644 4.396-1.644.873 2.207.323 3.837.16 4.242 1.024 1.12 1.644 2.552 1.644 4.3 0 6.158-3.742 7.513-7.305 7.91.574.494 1.085 1.472 1.085 2.968 0 2.14-.02 3.87-.02 4.395 0 .429.288.928 1.101.771A16.03 16.03 0 0032 16.027C32 7.174 24.835 0 16 0z"
			clipRule="evenodd"
		></path>
	</svg>
);
