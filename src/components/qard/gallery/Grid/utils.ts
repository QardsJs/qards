export function round(value: any, decimals: any) {
	if (!decimals) decimals = 0;
	return Number(Math.round(Number(value + 'e' + decimals)) + 'e-' + decimals);
}

// return two decimal places rounded number
export function ratio({width, height}: any) {
	return round(width / height, 2);
}

// takes the Gallery's photos array, width of the container,
// margin between photos Gallery prop, and columns Gallery prop.
// calculates, sizes based on columns and returns the photos array
// with new height/width props in each object
export function computeSizes({photos, columns, width, margin}: any) {
	if (!width) {
		return [];
	}
	// divide photos over rows, max cells based on `columns`
	// effectively resulting in [[0, 1, 2], [3, 4, 5], [6, 7]]
	const rows = photos.reduce((acc: any, cell: any, idx: any) => {
		const row = Math.floor(idx / columns);
		acc[row] = acc[row] ? [...acc[row], cell] : [cell]; // eslint-disable-line no-param-reassign
		return acc;
	}, []);
	// calculate total ratio of each row, and adjust each cell height and width
	// accordingly.
	let ratios: any = [];
	const rowsWithSizes = rows.map((row: any, rowIndex: any) => {
		const totalRatio = row.reduce((result: any, photo: any) => result + ratio(photo), 0);
		const rowWidth = width - row.length * (margin * 2);

		// save total ratio of each row
		if (rowIndex !== rows.length - 1) ratios.push(totalRatio);

		// assign height
		// 3 scenarios...
		//  if its a regular row where row.length === columns
		//    rowWidth / totalRatio
		//  if columns > row.length
		//    if !lastRow
		//      use the average aspect ratio of previous rows
		//    else (all photos are on a single row)
		//      ...
		const height =
				 row.length === columns
					 ? rowWidth / totalRatio
					 : photos.length < columns
					 ? rowWidth / totalRatio * (row.length / columns)
					 : rowWidth / (ratios.reduce((acc: any, item: any) => acc + item, 0) / (rows.length - 1));

		return row.map((photo: any) => ({
			...photo,
			height: round(height, 1),
			width : round(height * ratio(photo), 1),
		}));
	});
	return rowsWithSizes.reduce((acc: any, row: any) => [...acc, ...row], []);
}

export function computeSizesColumns({photos, columns, width, margin}: any) {
	// calculate each colWidth based on total width and column amount
	let colWidth = (width - margin * 2 * columns) / columns;

	// map through each photo to assign adjusted height and width based on colWidth
	const photosWithSizes = photos.map((photo: any) => {
		const newHeight = photo.height / photo.width * colWidth;
		return {
			...photo,
			width : round(colWidth, 1),
			height: round(newHeight, 1),
		};
	});

	// store all possible left positions
	// and current top positions for each column
	const colLeftPositions: any = [];
	const colCurrTopPositions: any = [];
	for (let i = 0; i < columns; i++) {
		colLeftPositions[i] = round(i * (colWidth + margin * 2), 1);
		colCurrTopPositions[i] = 0;
	}

	// map through each photo, then reduce thru each "column"
	// find column with the smallest height and assign to photo's 'top'
	// update that column's height with this photo's height
	return photosWithSizes.map((photo: any) => {
		const smallestCol = colCurrTopPositions.reduce((acc: any, item: any, i: any) => {
			acc = item < colCurrTopPositions[acc] ? i : acc;
			return acc;
		}, 0);

		photo.top = colCurrTopPositions[smallestCol];
		photo.left = colLeftPositions[smallestCol];
		colCurrTopPositions[smallestCol] = colCurrTopPositions[smallestCol] + photo.height + margin * 2;

		// store the tallest col to use for gallery height because of abs positioned elements
		const tallestCol = colCurrTopPositions.reduce((acc: any, item: any, i: any) => {
			acc = item > colCurrTopPositions[acc] ? i : acc;
			return acc;
		}, 0);
		photo.containerHeight = colCurrTopPositions[tallestCol];
		return photo;
	});
}