(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // src/scripts/puzlinkParser.ts
  function parsePuzlinkTxt(content) {
    return content.split(/\r?\n/).map((line) => line.trim()).filter((line) => line.length === 6).map((line) => ({
      start: Number(line.slice(0, 2)),
      middle: Number(line.slice(2, 4)),
      end: Number(line.slice(4, 6))
    }));
  }
  var init_puzlinkParser = __esm({
    "src/scripts/puzlinkParser.ts"() {
    }
  });

  // src/scripts/heaviestChainFinder.ts
  function findHeaviestChain(puzlinks) {
    let heaviestChain = [];
    const linksByStart = /* @__PURE__ */ new Map();
    puzlinks.forEach((link, index) => {
      const links = linksByStart.get(link.start) ?? [];
      links.push({ link, index });
      linksByStart.set(link.start, links);
    });
    function dfs(currentChain, used) {
      if (currentChain.length > heaviestChain.length || currentChain.length === heaviestChain.length && chainValue(currentChain) > chainValue(heaviestChain)) {
        heaviestChain = [...currentChain];
      }
      const lastPuzlink = currentChain[currentChain.length - 1];
      const nextLinks = linksByStart.get(lastPuzlink.end) ?? [];
      for (const next of nextLinks) {
        if (used.has(next.index)) continue;
        used.add(next.index);
        currentChain.push(next.link);
        dfs(currentChain, used);
        currentChain.pop();
        used.delete(next.index);
      }
    }
    for (let i = 0; i < puzlinks.length; i++) {
      dfs([puzlinks[i]], /* @__PURE__ */ new Set([i]));
    }
    return heaviestChain;
  }
  function chainValue(chain) {
    return chain.map((p) => `${p.start}${p.middle}${p.end}`).join("");
  }
  var init_heaviestChainFinder = __esm({
    "src/scripts/heaviestChainFinder.ts"() {
    }
  });

  // src/scripts/solverWorker.ts
  var require_solverWorker = __commonJS({
    "src/scripts/solverWorker.ts"() {
      init_puzlinkParser();
      init_heaviestChainFinder();
      self.onmessage = (event) => {
        const puzlinks = parsePuzlinkTxt(event.data);
        const heaviestChain = findHeaviestChain(puzlinks);
        const result = `${heaviestChain[0].start}${heaviestChain.map((p) => `${p.middle}${p.end}`).join("")}`;
        self.postMessage(result);
      };
    }
  });
  require_solverWorker();
})();
