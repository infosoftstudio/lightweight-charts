import { Coordinate } from '../model/coordinate';

import { UserBetData } from './series-markers-renderer';
import { hitTestSquare } from './series-markers-square';

function makeArrow(
	ctx: CanvasRenderingContext2D,
	centerX: Coordinate,
	centerY: Coordinate,
	up: boolean
): void {
	const arrowCenterY = up ? centerY - 10 : centerY + 10;
	const color = up ? '#4CAF50' : '#F44336';

	ctx.moveTo(centerX - 5, arrowCenterY);
	if (up) {
		ctx.lineTo(centerX, arrowCenterY + 5);
	} else {
		ctx.lineTo(centerX, arrowCenterY - 5);
	}
	ctx.lineTo(centerX + 5, arrowCenterY);
	ctx.lineTo(centerX + 5, arrowCenterY);
	ctx.fillStyle = color;
	ctx.fill();
	ctx.closePath();
}

export function drawUserBet(
	ctx: CanvasRenderingContext2D,
	centerX: Coordinate,
	centerY: Coordinate,
	size: number,
	betData: UserBetData
): void {
	const imgSize = 25;

	const halfSize = imgSize / 2;

	const imgElement = new Image(imgSize, imgSize);

	const { user, up } = betData;
	const imageSrc = user.image
		? user.image
		: 'https://mdn.mozillademos.org/files/5397/rhino.jpg';

	const color = up ? '#4CAF50' : '#F44336';

	const imgLeft = centerX - halfSize;
	let imgTop = centerY - imgSize - 10;
	let arcCenterY = centerY - halfSize - 10;

	if (!up) {
		imgTop = centerY + 10;
		arcCenterY = centerY + halfSize + 10;
	}

	const dotSize = 6;
	ctx.beginPath();
	ctx.arc(centerX, centerY, dotSize / 2, 0, 2 * Math.PI, false);
	ctx.fillStyle = '#000000';
	ctx.fill();
	ctx.closePath();

	ctx.lineWidth = 1;
	ctx.beginPath();
	ctx.arc(centerX, centerY, dotSize / 2, 0, 2 * Math.PI, false);
	ctx.strokeStyle = color;
	ctx.stroke();
	ctx.closePath();

	makeArrow(ctx, centerX, centerY, up);

	function drawImage(): void {
		ctx.save();
		ctx.beginPath();
		ctx.arc(centerX, arcCenterY, halfSize, 0, 2 * Math.PI, false);
		ctx.clip();
		ctx.closePath();
		ctx.drawImage(imgElement, imgLeft, imgTop, imgSize, imgSize);
		ctx.restore();

		ctx.beginPath();
		ctx.arc(centerX, arcCenterY, halfSize, 0, 2 * Math.PI, false);
		ctx.lineWidth = 2;
		ctx.strokeStyle = color;
		ctx.stroke();
	}

	imgElement.onload = drawImage;
	imgElement.src = imageSrc;
}

export function hitTestUserBet(
	up: boolean,
	centerX: Coordinate,
	centerY: Coordinate,
	size: number,
	x: Coordinate,
	y: Coordinate
): boolean {
	// TODO: implement userBet hit test
	return hitTestSquare(centerX, centerY, size, x, y);
}
