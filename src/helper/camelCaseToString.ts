export const camelCaseToTitleCase = (input: string): string => {
	const titleCase = input
		.replace(/([A-Z])/g, ' $1')
		.trim()
		.toLowerCase();

	return titleCase
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
};
