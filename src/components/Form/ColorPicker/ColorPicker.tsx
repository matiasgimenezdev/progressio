import { FunctionComponent } from 'react';

type ColorPickerProps = {
	setColor: (color: string) => void;
	color: string;
};

export const ColorPicker: FunctionComponent<ColorPickerProps> = ({
	setColor,
	color,
}) => {
	return (
		<div className='max-w-[220px] sm:max-w-[340px]'>
			<p className='text-sm py-2'>
				Current color:{' '}
				<span className='font-bold' style={{ color }}>
					{color}
				</span>
			</p>
			<div className='rounded-full flex flex-wrap gap-1'>
				{COLORS.map((currentColor) => {
					return (
						<button
							type='button'
							key={currentColor}
							className={`w-6 h-6 rounded-full ${
								currentColor === color ? 'border-2' : 'border'
							} border-white`}
							style={{ backgroundColor: currentColor }}
							onClick={() => setColor(currentColor)}
						/>
					);
				})}
			</div>
		</div>
	);
};

const COLORS = [
	'#FF0000', // Red
	'#FF4500', // OrangeRed
	'#FFA500', // Orange
	'#FFD700', // Gold
	'#FFFF00', // Yellow
	'#ADFF2F', // GreenYellow
	'#7FFF00', // Chartreuse
	'#00FF00', // Lime
	'#32CD32', // LimeGreen
	'#008000', // Green
	'#006400', // DarkGreen
	'#00FFFF', // Cyan
	'#40E0D0', // Turquoise
	'#000080', // Navy
	'#0000FF', // Blue
	'#6495ED', // CornflowerBlue
	'#4169E1', // RoyalBlue
	'#00008B', // DarkBlue
	'#800080', // Purple
	'#4B0082', // Indigo
	'#6A5ACD', // SlateBlue
	'#483D8B', // DarkSlateBlue
	'#EE82EE', // Violet
	'#DA70D6', // Orchid
	'#FF69B4', // HotPink
	'#FFC0CB', // Pink
	'#DC143C', // Crimson
	'#8B4513', // SaddleBrown
	'#CD853F', // Peru
	'#D2691E', // Chocolate
	'#FF6347', // Tomato
	'#FF4500', // OrangeRed
	'#FF7F50', // Coral
	'#FFA07A', // LightSalmon
	'#FFDAB9', // PeachPuff
	'#FFFFFF', // White
];
