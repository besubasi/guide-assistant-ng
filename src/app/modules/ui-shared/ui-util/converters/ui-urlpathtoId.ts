export function urlPathToId(path: string) {
    return path.slice(1).split('/').join('-') + '-';
}
