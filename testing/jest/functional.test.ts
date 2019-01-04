import request from 'request';

test('should render textual content in the build source', () => {
	return new Promise((resolve, reject) => {
		request('http://127.0.0.1:8081/list-of-supported-cards/', (error: Error, response: any, body: string) => {
			resolve(
				expect(body).toContain(
					'Sometimes you want to inform your users of certain events') &&
				expect(body).toContain(
					'Callouts visually highlight important content for the user. They can contain a title, an icon and a message') &&
				expect(body).toContain(
					'The hero (name subject to change as I\'m not sure it\'s the right one)') &&
				expect(body).toContain(
					'A card is automatically created with the post title, excerpt and post cover (if exists)') &&
				expect(body).toContain(
					'Quote test: These data indicate that low serum testosterone levels',
				),
			);
		});
	});
});

test('should include static (default) cards (image, section-heading)', () => {
	return new Promise((resolve, reject) => {
		request('http://127.0.0.1:8081/list-of-supported-cards/', (error: Error, response: any, body: string) => {
			if (error) {
				reject(reject);
			} else {
				resolve(
					expect(body).toContain('Card Hero') &&
					expect(body).toContain(`Well, you're looking at it. It has a title and subtitle`) &&
					expect(body).toContain('Galleries') &&
					expect(body).toContain(`One or multiple images that will be inserted accordingly`) &&
					expect(body).toContain(`Audio playlist`) &&
					expect(body).toContain(`An audio playlist can contain one or multiple audio files`) &&
					expect(body).toContain(`Reveals`) &&
					expect(body).toContain(`Accordions of collapsed content`),
				);
			}
		});
	});
});

test('should not include non-static (default) cards (image, section-heading)', () => {
	return new Promise((resolve, reject) => {
		request('http://127.0.0.1:8081/list-of-supported-cards/', (error: Error, response: any, body: string) => {
			if (error) {
				reject(reject);
			} else {
				resolve(
					expect(body).not.toContain(`Time until robots take over the world`) &&
					expect(body).not.toContain(`export default class PostTags extends Component`) &&
					expect(body).not.toContain(`An accordion is a list of html elements that can collapse or reveal content based on user interaction`) &&
					expect(body).not.toContain(`The general population doesn't know whats happening and it doesn't even know that it doesn't know`),
				);
			}
		});
	});
});
