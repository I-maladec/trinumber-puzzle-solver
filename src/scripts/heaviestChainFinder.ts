import { PuzlinkModel } from '../models/puzlinkModel';

export function findHeaviestChain(puzlinks: PuzlinkModel[]): PuzlinkModel[] {
    let heaviestChain: PuzlinkModel[] = [];
    const linksByStart = new Map<number, Array<{ link: PuzlinkModel; index: number }>>();

    puzlinks.forEach((link, index) => {
        const links = linksByStart.get(link.start) ?? [];
        links.push({link, index});
        linksByStart.set(link.start, links);
    });
    
    function dfs(currentChain: PuzlinkModel[], used: Set<number>): void {
        if(currentChain.length > heaviestChain.length || (currentChain.length === heaviestChain.length && chainValue(currentChain) > chainValue(heaviestChain))) {
            heaviestChain = [...currentChain];
        }
        const lastPuzlink = currentChain[currentChain.length - 1];
        const nextLinks = linksByStart.get(lastPuzlink.end) ?? [];
        for(const next of nextLinks) {
            if(used.has(next.index)) continue;
            used.add(next.index);
            currentChain.push(next.link);
            dfs(currentChain, used);
            currentChain.pop();
            used.delete(next.index);
        }
    }

    for(let i = 0; i < puzlinks.length; i++) {
        dfs([puzlinks[i]], new Set([i]));
    }
    return heaviestChain;
}

function chainValue(chain: PuzlinkModel[]): string {
    return chain
        .map(p => `${p.start}${p.middle}${p.end}`)
        .join('');
}