import { PuzlinkModel } from '../models/puzlinkModel';

export function parsePuzlinkTxt(content: string): PuzlinkModel[] {
  return content
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line.length === 6)
    .map(line => ({
        start: Number(line.slice(0, 2)),
        middle: Number(line.slice(2, 4)),
        end: Number(line.slice(4, 6)),
    }));
}