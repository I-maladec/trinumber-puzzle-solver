import {parsePuzlinkTxt} from './puzlinkParser';
import {findHeaviestChain} from './heaviestChainFinder';

self.onmessage = (event: MessageEvent<string>) => {
    const puzlinks = parsePuzlinkTxt(event.data);
    const heaviestChain = findHeaviestChain(puzlinks);
    const result = `${heaviestChain[0].start}${heaviestChain.map(p => `${p.middle}${p.end}`).join('')}`;
    self.postMessage(result);
};
