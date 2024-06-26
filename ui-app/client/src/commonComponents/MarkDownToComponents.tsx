import React from 'react';

const unorderedCondition = (text: string) =>
	text.startsWith('* ') ||
	text.startsWith('+ ') ||
	text.startsWith('- ') ||
	text.startsWith('_ ');

const findLevel = (text: string) => {
	let level = 1;
	if (!text.startsWith('    ')) return -1;
	while (text.startsWith('    ')) {
		level++;
		text = text.slice(4);
	}
	if (unorderedCondition(text) || text.match(/^\d+\.\s/)) {
		return level;
	} else return -1;
};

const processList = (listItems: string[], isOrdered: boolean, level = 1) => {
	const finalList = [];
	let subList: Array<{ line: Array<string>; type: 'ordered' | 'unordered' }> = [];
	let currentIndex = 0;
	let prevType: 'ordered' | 'unordered' = isOrdered == true ? 'ordered' : 'unordered';
	let start = isOrdered ? listItems[0]?.slice(0, 1) : '1';
	for (let i = 0; i < listItems.length; i++) {
		// looping throught list items
		if (listItems[i + 1]?.startsWith('    '.repeat(level))) {
			// if next has sublist

			let j = i + 1;
			while (listItems[j]?.startsWith('    ')) {
				// k holds the sliced string removing current levels indentation

				let k = '';
				k = listItems[j].slice('    '.repeat(level).length);

				if (unorderedCondition(k)) {
					// unordered list is next sublist
					subList[currentIndex] = subList[currentIndex]?.line
						? subList[currentIndex]
						: { line: [], type: 'unordered' };
					if (prevType === 'unordered') {
						// if prev type is unordered we push to prev array
						subList[currentIndex].line.push(k);
					} else {
						// if prev type is ordered we create new sublist in next index
						subList[currentIndex + 1] = { line: [k], type: 'unordered' };
						currentIndex += 1;
						prevType = 'unordered';
					}
				} else if (k.match(/^\d+\.\s/)) {
					// ordered list is next sublist
					subList[currentIndex] = subList[currentIndex]?.line
						? subList[currentIndex]
						: { line: [], type: 'ordered' };
					if (prevType === 'ordered') {
						// if prev type is ordered we push to prev array
						subList[currentIndex].line.push(k);
					} else {
						// if prev type is unordered we create new sublist in next index
						subList[currentIndex + 1] = { line: [k], type: 'ordered' };
						currentIndex += 1;
						prevType = 'ordered';
					}
				} else {
					// its sub sub level, so push to sublist and wait for next iteration
					subList[currentIndex] = subList[currentIndex]?.line
						? subList[currentIndex]
						: { line: [], type: prevType };

					subList[currentIndex].line.push(listItems[j]);
				}
				j++;
			}
			// render current item plus any sublists through recursion
			finalList.push(
				<li key={`${listItems[i]}_${subList.map(e => e.line).join('_')}`}>
					{renderLine(listItems[i].slice(isOrdered ? 3 : 2))}
					{subList.map(e => processList(e.line, e.type === 'ordered', level + 1))}
				</li>,
			);
			i = j - 1;
			// empty sublist so items dont repeat when we have multiple sublists
			subList = [];
		} else {
			// normal list rendering when next item does not have sub list
			let k = listItems[i];
			if (listItems[i]?.startsWith('    '.repeat(level))) {
				k = listItems[i].slice('    '.repeat(level).length);
			}
			finalList.push(<li key={k}>{renderLine(k.slice(isOrdered ? 3 : 2))}</li>);
		}
	}
	// final return
	if (isOrdered) {
		return (
			<ol start={isNaN(parseInt(start)) ? 1 : parseInt(start)} key={listItems.join('_')}>
				{finalList}
			</ol>
		);
	} else return <ul key={listItems.join('_')}>{finalList}</ul>;
};

const parseText = (text: string) => {
	// parsing line one character at a time
	let tokens: Array<React.ReactNode> = [];
	let tokenCount = 0;
	for (let i = 0; i < text.length; i++) {
		if (text[i] === '*' || text[i] === '_') {
			let chaar = text[i];
			if (text[i + 1] === chaar) {
				if (text[i + 2] === chaar) {
					// Triple asterisks, treat as strong and emhasis
					let endIndex = text.indexOf(chaar + chaar + chaar, i + 3);
					if (endIndex === -1) {
						tokens[tokenCount] = (tokens[tokenCount] ?? '') + text[i];
						continue;
					} else if (text[endIndex - 1] === '\\') {
						tokens[tokenCount] = (tokens[tokenCount] ?? '') + text[i];
						tokens.push(
							React.createElement(
								'strong',
								{ key: text?.slice(i + 3, endIndex + 1) },
								parseText(text?.slice(i + 3, endIndex + 1)),
							),
						);
						tokenCount += 2;
						i = endIndex + 2;
						continue;
					} else {
						tokens.push(
							React.createElement(
								'em',
								{ key: `em_${text?.slice(i + 3, endIndex)}` },
								React.createElement(
									'strong',
									{ key: `strong_${text?.slice(i + 3, endIndex)}` },
									parseText(text?.slice(i + 3, endIndex)),
								),
							),
						);
						tokenCount += 2;
						i = endIndex + 2;
						continue;
					}
				} else {
					// Double asterisk, only treat as strong
					let endIndex = text.indexOf(chaar + chaar, i + 1);
					if (endIndex === -1) {
						tokens[tokenCount] = (tokens[tokenCount] ?? '') + text[i];
						continue;
					} else if (text[endIndex - 1] === '\\') {
						tokens[tokenCount] = (tokens[tokenCount] ?? '') + text[i];
						tokens.push(
							React.createElement(
								'em',
								{ key: text?.slice(i + 2, endIndex + 1) },
								parseText(text?.slice(i + 2, endIndex + 1)),
							),
						);
						tokenCount += 2;
						i = endIndex + 1;
						continue;
					} else {
						tokens.push(
							React.createElement(
								'strong',
								{ key: text?.slice(i, endIndex) },
								parseText(text?.slice(i + 2, endIndex)),
							),
						);
						tokenCount += 2;
						i = endIndex + 1;
						continue;
					}
				}
			} else {
				// Single asterisk, only treat as emphasis
				let endIndex = text.indexOf(chaar, i + 1);
				if (endIndex === -1) {
					tokens[tokenCount] = (tokens[tokenCount] ?? '') + text[i];
					continue;
				} else if (text[endIndex - 1] === '\\') {
					tokens[tokenCount] = (tokens[tokenCount] ?? '') + text[i];
					tokens = [...tokens, parseText(text?.slice(i + 1, endIndex + 1))];
					tokenCount = tokens.length;
					i = endIndex;
					continue;
				} else {
					tokens.push(
						React.createElement(
							'em',
							{ key: `em_${text?.slice(i + 1, endIndex)}` },
							parseText(text?.slice(i + 1, endIndex)),
						),
					);
					tokenCount += 2;
					i = endIndex;
					continue;
				}
			}
		} else if (text[i] === '`') {
			// single code line
			let endIndex = -1;
			if (text[i + 1] === '`') {
				// using double `` to escape single backtick
				endIndex = text.indexOf('``', i + 2);
				if (endIndex === -1) {
					tokens[tokenCount] = (tokens[tokenCount] ?? '') + text[i];
					continue;
				}
				tokens.push(
					React.createElement(
						'code',
						{ key: `code_${text.slice(i + 2, endIndex)}` },
						text
							?.slice(i + 2, endIndex)
							.split('')
							.map((e, i) => {
								if (e === ' ') return <>&nbsp;</>;
								else return e;
							}),
					),
				);
				tokenCount += 2;
				i = endIndex + 1;
			} else {
				// single tick code line
				endIndex = text.indexOf('`', i + 1);
				if (endIndex === -1) {
					tokens[tokenCount] = (tokens[tokenCount] ?? '') + text[i];
					continue;
				}
				tokens.push(
					React.createElement(
						'code',
						{ key: text },
						text
							?.slice(i + 1, endIndex)
							.split('')
							.map((e, i) => {
								if (e === ' ') return <>&nbsp;</>;
								else return e;
							}),
					),
				);
				tokenCount += 2;
				i = endIndex;
			}
		} else if (text[i] === '!') {
			// image line
			if (text[i + 1] !== '[') {
				tokens[tokenCount] = (tokens[tokenCount] ?? '') + text[i];
				continue;
			}
			const endIndex = text.indexOf(']', i + 1);
			if (endIndex === -1 || text[endIndex + 1] !== '(') {
				tokens[tokenCount] = (tokens[tokenCount] ?? '') + text[i];
				continue;
			}
			const altText = text.slice(i + 2, endIndex);
			const linkEndIndex = text.indexOf(')', endIndex);
			if (linkEndIndex === -1) {
				tokens[tokenCount] = (tokens[tokenCount] ?? '') + text[i];
				continue;
			}
			let linkSubStr: string | string[] = text.slice(endIndex + 2, linkEndIndex);
			const spaceIndex = linkSubStr.indexOf(' ');
			let title = '';
			if (
				spaceIndex !== -1 &&
				linkSubStr[spaceIndex + 1] === '"' &&
				linkSubStr[linkSubStr.length - 1] === '"'
			) {
				title = linkSubStr.slice(spaceIndex + 2, linkSubStr.length - 1);
			}
			const actualLink = linkSubStr.slice(0, spaceIndex !== 1 ? spaceIndex : undefined);
			tokens.push(
				React.createElement('img', {
					key: linkSubStr,
					title: title ?? '',
					src: actualLink,
					loading: 'lazy',
					alt: altText,
				}),
			);
			tokenCount += 2;
			i = linkEndIndex;
		} else if (text[i] === '[') {
			// link line
			const endIndex = text.indexOf(']', i + 1);
			if (endIndex === -1 || text[endIndex + 1] !== '(') {
				tokens[tokenCount] = (tokens[tokenCount] ?? '') + text[i];
				continue;
			}
			const linkText = text.slice(i + 1, endIndex);
			const linkEndIndex = text.indexOf(')', endIndex);
			if (linkEndIndex === -1) {
				tokens[tokenCount] = (tokens[tokenCount] ?? '') + text[i];
				continue;
			}
			let linkSubStr: string | string[] = text.slice(endIndex + 2, linkEndIndex);
			const spaceIndex = linkSubStr.indexOf(' ');
			let title = '';
			if (
				spaceIndex !== -1 &&
				linkSubStr[spaceIndex + 1] === '"' &&
				linkSubStr[linkSubStr.length - 1] === '"'
			) {
				title = linkSubStr.slice(spaceIndex + 2, linkSubStr.length - 1);
			}
			const actualLink = linkSubStr.slice(0, spaceIndex !== 1 ? spaceIndex : undefined);
			tokens.push(
				React.createElement(
					'a',
					{ key: linkSubStr[0], title: title ?? '', href: actualLink },
					parseText(linkText),
				),
			);
			tokenCount += 2;
			i = linkEndIndex;
		} else if (text[i] === '\\') {
			// escape escape
			tokens[tokenCount] = (tokens[tokenCount] ?? '') + text[i + 1];
			i = i + 1;
			continue;
		} else {
			// normal text
			tokens[tokenCount] = (tokens[tokenCount] ?? '') + text[i];
		}
	}

	return tokens;
};

const getHeaderComp = (line: string) => {
	let i = 0;

	while (line[i] === '#') {
		i++;
	}
	if (i > 6 || line[i] !== ' ') {
		return React.createElement(
			'p',
			{ key: line },
			parseText(line).filter(e => !!e),
		);
	}
	const HeaderComponent = `h${i}` as keyof JSX.IntrinsicElements;
	let id = '';
	line = line.slice(i);
	const idIndex = line.indexOf('{#');
	if (idIndex != -1 && line.indexOf('}', idIndex) !== -1) {
		id = line.slice(idIndex + 2, line.indexOf('}', idIndex));
		line = line.slice(0, idIndex) + line.slice(line.indexOf('}', idIndex) + 1);
	}
	return React.createElement(
		HeaderComponent,
		{ key: line, id },
		parseText(line).filter(e => !!e),
	);
};

const renderLine = (line: string) => {
	line = line.trim();
	const elements: React.ReactNode[] = [];
	if (line.startsWith('#')) {
		elements.push(getHeaderComp(line));
	} else if (line.startsWith('>')) {
		elements.push(
			React.createElement('blockquote', { key: line.slice(1) }, renderLine(line.slice(1))),
		);
	} else if (line.startsWith('***') || line.startsWith('---') || line.startsWith('___')) {
		elements.push(React.createElement('hr', { key: `hr${line}` }));
	} else if (line.trim() === '') {
		// creating line breaks on return or enter
		elements.push(
			React.createElement('br', { key: `br_${line}_${Math.random().toString(36)}` }),
		);
	} else {
		const paragraphTokens = parseText(line);
		elements.push(React.createElement('p', { key: line }, paragraphTokens));
	}

	return elements;
};

function MarkDownToComponents({ text }: { text: string }) {
	const lines = text?.replaceAll('\t', '    ').split('\n');
	let elements: React.ReactNode[] = [];
	for (let i = 0; i < lines.length; i++) {
		let line = lines[i];
		if (line.startsWith('\\')) {
			// \ escape next character
			const elements: React.ReactNode[] = [line[1]];
			elements.push(parseText(line.slice(2)));
		} else if (line.startsWith('#')) {
			// Headings
			elements.push(getHeaderComp(line));
		} else if (line.startsWith('>')) {
			// Blockquote
			let j = i + 1;
			let blockLines = [];
			blockLines.push(line.slice(1));
			while (lines[j] && lines[j]?.trim() !== '') {
				if (lines[j].startsWith('>')) blockLines.push(lines[j].slice(1));
				else blockLines[(blockLines.length ?? 1) - 1] += ' ' + lines[j];

				j++;
			}
			elements.push(
				React.createElement(
					'blockquote',
					{ key: blockLines.join('_'), className: '_topLevel_blockquote' },
					blockLines.map(e => renderLine(e)),
				),
			);
			i = j;
		} else if (line.match(/^\d+\.\s/)) {
			// Ordered list
			let currentLevel = 1;
			const currentListType: string = 'ordered';
			const listItems: string[] = [];
			let j = i;
			while (
				j < lines.length &&
				(lines[j].match(/^\d+\.\s/) || lines[j].startsWith('    '))
			) {
				if (lines[j].match(/^\d+\.\s/)) listItems.push(lines[j]);

				if (lines[j].startsWith('    ')) {
					let level = findLevel(lines[j]);

					if (level === -1) {
						listItems[listItems.length - 1] += lines[j];
					} else if (level <= currentLevel + 1) {
						listItems.push(lines[j]);
						currentLevel = level;
					} else {
						listItems[listItems.length - 1] += lines[j];
					}
				}

				j++;
			}
			elements.push(processList(listItems, currentListType === 'ordered'));
			i = j - 1;
		} else if (unorderedCondition(line)) {
			// Unordered list
			let currentLevel = 1;
			const currentListType: string = 'unordered';
			const listItems: string[] = [];
			let j = i;
			while (
				j < lines.length &&
				(unorderedCondition(lines[j]) || lines[j]?.startsWith('    '))
			) {
				if (unorderedCondition(lines[j])) listItems.push(lines[j]);
				if (lines[j].startsWith('    ')) {
					let level = findLevel(lines[j]);

					if (level === -1) {
						listItems[listItems.length - 1] += lines[j];
					} else if (level <= currentLevel + 1) {
						listItems.push(lines[j]);
						currentLevel = level;
					} else {
						listItems[listItems.length - 1] += lines[j];
					}
				}
				j++;
			}
			elements.push(processList(listItems, currentListType === 'ordered'));
			i = j - 1;
		} else if (line.startsWith('```')) {
			// code blocks
			let endIndex = line.indexOf('```', 3);
			if (endIndex !== -1) {
				elements.push(
					React.createElement(
						'code',
						{ key: `code_${line.slice(3, endIndex)}` },
						line
							.slice(3, endIndex)
							.split('')
							.map((e, i) => {
								if (e === ' ') return <>&nbsp;</>;
								else return e;
							}),
					),
				);
				if (line.slice(endIndex + 3).trim() !== '') {
					elements.push(parseText(line.slice(endIndex + 3)));
				}
			} else {
				let code = line.slice(3);
				let j = i + 1;
				while (j < lines.length && !lines[j].startsWith('```')) {
					code += lines[j] + '\n';
					j++;
				}

				elements.push(
					React.createElement(
						'pre',
						{ key: `pre_${code}` },
						React.createElement('code', { key: `code_${code}` }, code),
					),
				);
				i = j;
			}
		} else if (line.startsWith('`')) {
			// single line code
			const tokens = parseText(line);
			elements.push(tokens);
		} else if (line.startsWith('!')) {
			// Image
			const tokens = parseText(line);
			elements.push(tokens);
		} else if (line.startsWith('[')) {
			// Link
			const tokens = parseText(line);
			elements.push(tokens);
		} else if (line.startsWith('***') || line.startsWith('---') || line.startsWith('___')) {
			// Horizontal line
			if (line.slice(3).trim() !== '') {
				elements.push(parseText(line));
			} else elements.push(React.createElement('hr', { key: `hr${i}${line}` }));
		} else if (line.trim() === '') {
			// creating line breaks on return or enter
			elements.push(React.createElement('br', { key: `br_${line}_${i}` }));
		} else if (line.startsWith('*')) {
			elements.push(parseText(line));
		} else {
			// Paragraph
			if (line === '') continue;
			const paragraphTokens = parseText(line);
			elements.push(React.createElement('p', { key: line }, paragraphTokens));
		}
	}
	return <div className="_markDownContent">{elements}</div>;
}

export default MarkDownToComponents;
