"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  createSearch: () => createSearch
});
module.exports = __toCommonJS(index_exports);
var import_react_router = require("@tanstack/react-router");
function createSearch(initialState) {
  return function useSearchState() {
    const search = (0, import_react_router.useSearch)({ strict: false });
    const navigate = (0, import_react_router.useNavigate)();
    async function set(update) {
      await navigate({
        to: ".",
        search: (prevRaw) => {
          const prev = { ...initialState, ...prevRaw };
          return typeof update === "function" ? update(prev) : { ...prev, ...update };
        }
      });
    }
    return {
      ...initialState,
      ...search,
      set
    };
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createSearch
});
